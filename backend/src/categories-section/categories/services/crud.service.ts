import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService, Category, LocalCategory } from "@lib/prisma";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto";
import { images_paths } from "src/files/allowed-models.data";
import { FilesService } from "src/files/files.service";

@Injectable()
export class CrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesService: FilesService,
  ) { }
  /**
   * Сохраняет изображение продукта
   * @param data - данные для создания или обновления продукта
   * @param file - файл изображения
   * @param existingProduct - существующий продукт
   */
  private saveImage(
    data: CreateCategoryDto | UpdateCategoryDto,
    file: Express.Multer.File,
  ) {
    if (!this.filesService.isValidImage(file))
      throw new BadRequestException(
        "Недопустимый формат файла. Разрешены только JPEG, PNG и WebP",
      );
    if (!this.filesService.isValidSize(file, 5))
      throw new BadRequestException("Размер файла не должен превышать 5 МБ");
    data.image = this.filesService.saveImage(file, images_paths.categories);
  }
  /**
   * Создание категории
   * @param data - данные для создания категории
   * @returns созданную категорию
   */
  async create(data: CreateCategoryDto, file?: Express.Multer.File) {
    if (file) this.saveImage(data, file);
    if (!data.image) throw new BadRequestException("Изображение обязательно");

    // Проверяем, что родительская категория существует и того же типа
    if (data.parent_id) {
      const parentCategory = await this.prisma.category.findUnique({
        where: { id: data.parent_id, is_excluded: false },
      });
      if (!parentCategory)
        throw new NotFoundException("Родительская категория не найдена или удалена");
      if (parentCategory.type !== data.type)
        throw new BadRequestException(
          "Тип категории должен совпадать с типом родительской категории",
        );
    }
    return await this.prisma.category.create({
      data: { ...data, parent_id: data.parent_id?.length && data.parent_id.length > 0 ? data.parent_id : null },
      include: {
        parent: true,
        children: true,
        local_categories: true,
      },
    });
  }

  /**
   * Получение категории по ID без локализации (для внутреннего использования)
   * @param id - ID категории
   * @returns категорию
   */
  private async findOneInternal(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        local_categories: true,
        products: true,
        services: true,
      },
    });
    if (!category) throw new NotFoundException("Категория не найдена");
    return category;
  }

  /**
   * Обновление категории
   * @param id - ID категории
   * @param data - данные для обновления категории
   * @returns обновленную категорию
   */
  async update(
    id: string,
    data: UpdateCategoryDto,
    file?: Express.Multer.File,
  ) {
    if (file) this.saveImage(data, file);
    if (!data.image) throw new BadRequestException("Изображение обязательно");
    const existingCategory = await this.findOneInternal(id);
    // Проверяем, что родительская категория существует и того же типа
    if (data.parent_id) {
      const parentCategory = await this.prisma.category.findUnique({
        where: { id: data.parent_id, is_excluded: false },
      });
      if (!parentCategory)
        throw new NotFoundException("Родительская категория не найдена или удалена");
      const categoryType = data.type || existingCategory.type;
      if (parentCategory.type !== categoryType)
        throw new BadRequestException(
          "Тип категории должен совпадать с типом родительской категории",
        );
      // Проверяем, что не создается циклическая ссылка
      if (data.parent_id === id)
        throw new BadRequestException(
          "Категория не может быть родительской для самой себя",
        );
    }

    return await this.prisma.category.update({
      where: { id },
      data,
      include: {
        parent: true,
        children: true,
        local_categories: true,
      },
    });
  }

  /**
   * Помечает категорию как удаленную
   * @param id - ID категории
   * @returns удаленную категорию
   */
  async delete(id: string) {
    const category = await this.findOneInternal(id);
    if (category.children.length > 0)
      throw new BadRequestException(
        "Нельзя удалить категорию, у которой есть дочерние категории",
      );
    return await this.prisma.category.update({
      where: { id },
      data: { is_excluded: true },
    });
  }

  /**
   * Получение категории по ID с построением дерева и локализацией
   * @param id - ID категории
   * @param locale_id - ID локализации (опционально)
   * @returns категорию с деревом родителей и детей, продуктами и услугами
   */
  async findOne(id: string, locale_id?: string) {
    // Сначала получаем корневую категорию с базовой информацией
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: {
          where: { is_excluded: false },
          include: {
            local_categories: locale_id ? { where: { locale_id } } : true,
            _count: {
              select: {
                products: { where: { is_excluded: false } },
                services: { where: { is_excluded: false } },
              },
            },
          },
        },
        local_categories: locale_id ? { where: { locale_id } } : true,
        products: {
          where: { is_excluded: false },
          include: {
            local_products: locale_id ? { where: { locale_id } } : true,
            images: true,
          },
        },
        services: {
          where: { is_excluded: false },
          include: {
            local_services: locale_id ? { where: { locale_id } } : true,
            images: true,
          },
        },
      },
    });
    if (!category) throw new NotFoundException("Категория не найдена");
    // Строим полное дерево предков
    const ancestors = await this.buildAncestorTree(
      category.parent_id,
      locale_id,
    );
    // Применяем локализацию
    const localizedCategory = this.applyLocalization(category, locale_id);
    // Применяем рекурсивные счетчики к дочерним категориям
    const childrenWithRecursiveCounts = await this.applyRecursiveCounts(
      category.children.map((child) =>
        this.applyLocalization(child, locale_id),
      ) as unknown as (Category & { children: Category[] })[],
    );

    return {
      ...localizedCategory,
      ancestors,
      children: childrenWithRecursiveCounts,
    };
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
   * Построение дерева предков
   */
  private async buildAncestorTree(
    parentId: string | null,
    locale_id?: string,
  ): Promise<(Category & { children: Category[] })[]> {
    if (!parentId) return [];

    const parent = await this.prisma.category.findUnique({
      where: { id: parentId, is_excluded: false },
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
    });

    if (!parent) return [];
    const ancestors = await this.buildAncestorTree(parent.parent_id, locale_id);
    const localizedParent = this.applyLocalization(parent, locale_id);
    return [...ancestors, localizedParent] as (Category & {
      children: Category[];
    })[];
  }

  /**
   * Рекурсивный подсчет продуктов и услуг для категории с учетом всех потомков
   * @param id - ID категории
   * @returns объект с количеством продуктов и услуг
   */
  private async calculateTotalCounts(
    id: string,
  ): Promise<{ products: number; services: number }> {
    // Получаем прямые продукты и услуги категории
    const directCounts = await this.prisma.category.findUnique({
      where: { id },
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
      where: {
        parent_id: id,
        is_excluded: false,
      },
      select: { id: true },
    });

    // Рекурсивно считаем для всех детей
    let totalProducts = directCounts?._count.products || 0;
    let totalServices = directCounts?._count.services || 0;

    for (const child of children) {
      const childCounts = await this.calculateTotalCounts(child.id);
      totalProducts += childCounts.products;
      totalServices += childCounts.services;
    }

    return { products: totalProducts, services: totalServices };
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
}
