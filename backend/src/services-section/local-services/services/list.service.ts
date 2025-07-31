import { PrismaService, BaseListResult, Prisma } from "@lib/prisma";
import { Injectable } from "@nestjs/common";
import { LocalServiceFiltersDto } from "../dto";
import { ExtendedLocalService } from "../example.data";

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  customFilters = (options: LocalServiceFiltersDto) => {
    const {
      service_id,
      locale_id,
      min_price,
      max_price,
      is_discounted,
      name,
      is_excluded,
    } = options;
    const filters: Prisma.LocalServiceWhereInput = {};
    if (service_id) filters.service_id = service_id;
    if (locale_id) filters.locale_id = locale_id;
    if (min_price) filters.price = { gte: min_price };
    if (max_price) filters.price = { lte: max_price };
    if (is_discounted) filters.discount_price = { not: null };
    if (name) filters.name = { contains: name, mode: "insensitive" };
    if (is_excluded !== undefined) filters.is_excluded = is_excluded;
    return filters;
  };

  /**
   * Получение списка локализаций услуги
   * @param params - параметры для получения списка локализаций услуги
   * @returns список локализаций услуги
   */
  async getList(
    filterDto: LocalServiceFiltersDto,
  ): Promise<BaseListResult<ExtendedLocalService>> {
    const queryOptions = this.prisma.buildQuery(
      filterDto,
      "created",
      "created",
      this.customFilters,
    );
    const { items, count } = await this.prisma.findWithPagination(
      this.prisma.localService,
      queryOptions,
      {
        local_item_descriptions: true,
        service: true,
        locale: true,
      },
    );

    return {
      items: items as ExtendedLocalService[],
      total: count,
      skip: queryOptions.skip,
      take: queryOptions.take,
    };
  }
}
