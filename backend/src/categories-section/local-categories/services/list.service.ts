import { Injectable } from "@nestjs/common";
import {
  PrismaService,
  BaseListResult,
  Prisma,
  LocalCategory,
} from "@lib/prisma";
import { LocalCategoryFiltersDto } from "../dto";

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Кастомные фильтры для локальных категорий
   */
  private readonly customFilters = (
    options: LocalCategoryFiltersDto,
  ): Prisma.LocalCategoryWhereInput => {
    const { search, category_id, locale_id, is_excluded } = options;
    const filters: Prisma.LocalCategoryWhereInput = {};
    if (search) {
      filters.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (category_id) filters.category_id = category_id;
    if (locale_id) filters.locale_id = locale_id;
    if (is_excluded !== undefined) filters.is_excluded = is_excluded;
    return filters;
  };

  /**
   * Получение списка локальных категорий
   * @param filterDto - фильтры для локальных категорий
   * @returns список локальных категорий
   */
  async findAll(
    filterDto: LocalCategoryFiltersDto,
  ): Promise<BaseListResult<LocalCategory>> {
    const queryOptions = this.prisma.buildQuery(
      filterDto,
      "created",
      "created",
      this.customFilters,
    );

    const { items, count } =
      await this.prisma.findWithPagination<LocalCategory>(
        this.prisma.localCategory,
        queryOptions,
        {
          category: true,
          locale: true,
        },
      );

    return {
      items,
      total: count,
      skip: queryOptions.skip,
      take: queryOptions.take,
    };
  }
}
