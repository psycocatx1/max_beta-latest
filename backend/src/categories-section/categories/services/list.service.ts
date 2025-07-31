import { Injectable } from "@nestjs/common";
import {
  PrismaService,
  BaseListResult,
  Category,
  Prisma,
  LocalCategory,
} from "@lib/prisma";
import { CategoryFiltersDto } from "../dto";

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}
  /**
   * Кастомные фильтры для категорий
   */
  private readonly customFilters = (
    options: CategoryFiltersDto,
  ): Prisma.CategoryWhereInput => {
    const { search, type, parent_id, is_excluded } = options;
    const filters: Prisma.CategoryWhereInput = {};
    if (search) {
      filters.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (type) filters.type = type;
    if (parent_id) filters.parent_id = parent_id;
    if (is_excluded !== undefined) filters.is_excluded = is_excluded;
    return filters;
  };

  /**
   * Получение локализованного имени по умолчанию (английский)
   */
  private async getDefaultLocalization(categoryId: string) {
    const defaultLocale = await this.prisma.locale.findFirst({
      where: { symbol: "US" },
    });

    if (!defaultLocale) return null;

    return await this.prisma.localCategory.findFirst({
      where: { category_id: categoryId, locale_id: defaultLocale.id },
    });
  }

  /**
   * Применение локализации к категории
   */
  private applyLocalization(
    category: Category & { local_categories: LocalCategory[] },
    locale_id?: string,
  ) {
    if (
      !locale_id ||
      !category.local_categories ||
      category.local_categories.length === 0
    )
      return category;

    const localization = category.local_categories[0];
    return {
      ...category,
      name: localization?.name || category.name,
      description: localization?.description || category.description,
    };
  }

  /**
   * Построение дерева категорий
   * @param categories - плоский список категорий
   * @returns дерево категорий
   */
  private buildCategoryTree(
    categories: (Category & { children: Category[] })[],
  ) {
    const categoryMap = new Map<string, Category & { children: Category[] }>();
    const rootCategories: (Category & { children: Category[] })[] = [];

    // Создаем карту категорий
    categories.forEach((category) => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    // Строим дерево
    categories.forEach((category) => {
      if (category.parent_id) {
        const parent = categoryMap.get(category.parent_id);
        if (parent)
          parent.children.push(
            categoryMap.get(category.id) as Category & { children: Category[] },
          );
      } else {
        rootCategories.push(
          categoryMap.get(category.id) as Category & { children: Category[] },
        );
      }
    });

    return rootCategories;
  }

  /**
   * Рекурсивный подсчет продуктов и услуг для категории с учетом всех потомков
   * @param categoryId - ID категории
   * @returns объект с количеством продуктов и услуг
   */
  private async calculateTotalCounts(
    categoryId: string,
  ): Promise<{ products: number; services: number }> {
    // Получаем прямые продукты и услуги категории
    const directCounts = await this.prisma.category.findUnique({
      where: { id: categoryId },
      select: {
        _count: {
          select: {
            products: { where: { is_excluded: false } },
            services: { where: { is_excluded: false } },
          },
        },
      },
    });

    // Получаем всех дочерних категорий
    const children = await this.prisma.category.findMany({
      where: { parent_id: categoryId, is_excluded: false },
      select: { id: true },
    });

    // Рекурсивно считаем для всех детей
    let totalProducts = directCounts?._count.products || 0;
    let totalServices = directCounts?._count.services || 0;

    // Если есть дочерние категории, считаем их продукты и услуги
    if (children.length > 0) {
      const childrenCounts = await Promise.all(
        children.map((child) => this.calculateTotalCounts(child.id)),
      );

      childrenCounts.forEach((counts) => {
        totalProducts += counts.products;
        totalServices += counts.services;
      });
    }

    return {
      products: totalProducts,
      services: totalServices,
    };
  }

  /**
   * Применение рекурсивных счетчиков к дереву категорий
   */
  private async applyRecursiveCounts(
    categories: (Category & { children: Category[] })[],
  ): Promise<(Category & { children: Category[] })[]> {
    return await Promise.all(
      categories.map(async (category) => {
        const totalCounts = await this.calculateTotalCounts(category.id);

        return {
          ...category,
          _count: {
            products: totalCounts.products,
            services: totalCounts.services,
          },
          children: category.children
            ? await this.applyRecursiveCounts(
                category.children as (Category & { children: Category[] })[],
              )
            : [],
        };
      }),
    );
  }

  /**
   * Получение списка категорий в виде дерева с локализацией и рекурсивными счетчиками
   * @param filterDto - фильтры для категорий
   * @returns дерево категорий с количеством продуктов и услуг (включая дочерние)
   */
  async findAll(
    filterDto: CategoryFiltersDto,
  ): Promise<BaseListResult<Category & { children: Category[] }>> {
    const { locale_id, parent_id, ...restFilters } = filterDto;

    const queryOptions = this.prisma.buildQuery(
      restFilters,
      "created",
      "created",
      this.customFilters,
    );

    // Получаем все категории для построения дерева
    const allCategories = await this.prisma.category.findMany({
      where: {
        ...queryOptions.where,
        is_excluded: false,
      },
      include: {
        parent: true,
        local_categories: locale_id ? { where: { locale_id } } : true,
        _count: {
          select: {
            products: { where: { is_excluded: false } },
            services: { where: { is_excluded: false } },
          },
        },
      },
      orderBy: queryOptions.orderBy,
    });

    // Применяем локализацию к каждой категории
    const localizedCategories = await Promise.all(
      allCategories.map(async (category) => {
        let localizedCategory = this.applyLocalization(category, locale_id);
        // Если локализация не найдена, пытаемся получить английскую
        if (
          locale_id &&
          (!category.local_categories || category.local_categories.length === 0)
        ) {
          const defaultLocalization = await this.getDefaultLocalization(
            category.id,
          );
          if (defaultLocalization) {
            localizedCategory = {
              ...localizedCategory,
              name: defaultLocalization.name,
              description: defaultLocalization.description,
            };
          }
        }

        return localizedCategory;
      }),
    );

    // Строим дерево категорий
    const categoryTree = this.buildCategoryTree(
      localizedCategories as unknown as (Category & { children: Category[] })[],
    );

    // Применяем рекурсивные счетчики
    const categoriesWithCounts = await this.applyRecursiveCounts(categoryTree);

    // Если указан parent_id, возвращаем только дочерние категории этого родителя
    let resultCategories = categoriesWithCounts;
    if (parent_id) {
      // Ищем родительскую категорию в дереве
      const findParentCategory = (
        categories: (Category & { children: Category[] })[],
        targetId: string,
      ): (Category & { children: Category[] })[] | null => {
        for (const category of categories) {
          if (category.id === targetId)
            return category.children as (Category & { children: Category[] })[];
          if (category.children?.length) {
            const found = findParentCategory(
              category.children as (Category & { children: Category[] })[],
              targetId,
            );
            if (found) return found;
          }
        }
        return null;
      };

      resultCategories =
        findParentCategory(categoriesWithCounts, parent_id) || [];
    }

    // Применяем пагинацию к результату
    const paginatedCategories = resultCategories.slice(
      queryOptions.skip,
      queryOptions.skip + queryOptions.take,
    );

    return {
      items: paginatedCategories,
      total: resultCategories.length,
      skip: queryOptions.skip,
      take: queryOptions.take,
    };
  }
}
