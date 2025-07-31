import { PrismaService, BaseListResult } from "@lib/prisma";
import { Injectable } from "@nestjs/common";
import { LocalProductFiltersDto } from "../dto";
import { ExtendedLocalProduct } from "../example.data";
import { Prisma } from "@prisma/client";

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  customFilters = (options: LocalProductFiltersDto) => {
    const {
      product_id,
      locale_id,
      min_price,
      max_price,
      is_discounted,
      name,
      is_excluded,
    } = options;
    const filters: Prisma.LocalProductWhereInput = {};
    if (product_id) filters.product_id = product_id;
    if (locale_id) filters.locale_id = locale_id;
    if (min_price) filters.price = { gte: min_price };
    if (max_price) filters.price = { lte: max_price };
    if (is_discounted) {
      filters.discount_price = { not: null };
    }
    if (name) filters.name = { contains: name, mode: "insensitive" };
    if (is_excluded !== undefined)
      filters.is_excluded = { equals: is_excluded };
    return filters;
  };

  /**
   * Получение списка локализаций продукта
   * @param params - параметры для получения списка локализаций продукта
   * @returns список локализаций продукта
   */
  async getList(
    filterDto: LocalProductFiltersDto,
  ): Promise<BaseListResult<ExtendedLocalProduct>> {
    const { is_discounted, ...filters } = filterDto;
    const queryOptions = this.prisma.buildQuery(
      filters,
      "created",
      "created",
      this.customFilters,
    );

    const { items, count } = await this.prisma.findWithPagination(
      this.prisma.localProduct,
      queryOptions,
      {
        local_item_descriptions: true,
        product: true,
        locale: true,
      },
    );

    const typedItems = items as ExtendedLocalProduct[];
    return {
      items: typedItems.filter(
        (item) =>
          !is_discounted ||
          (item.discount_price && item.discount_price < item.price),
      ),
      total: count,
      skip: queryOptions.skip,
      take: queryOptions.take,
    };
  }
}
