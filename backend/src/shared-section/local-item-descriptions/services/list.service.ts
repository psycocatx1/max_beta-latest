import { Injectable } from "@nestjs/common";
import {
  PrismaService,
  LocalItemDescription,
  Prisma,
  BaseListResult,
} from "@lib/prisma";
import { LocalItemDescriptionsFiltersDto } from "../dto";

/**
 * Сервис для получения списка описаний объектов
 */
@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly customFilters = (
    filters: LocalItemDescriptionsFiltersDto,
  ): Prisma.LocalItemDescriptionWhereInput => {
    const {
      local_product_id,
      local_service_id,
      type,
      is_excluded,
      product_id,
      service_id,
    } = filters;
    const where: Prisma.LocalItemDescriptionWhereInput = {};
    // Базовые фильтры
    if (local_product_id) where.local_product_id = local_product_id;
    if (local_service_id) where.local_service_id = local_service_id;
    if (type) where.type = type;
    if (is_excluded !== undefined) where.is_excluded = is_excluded;
    // Фильтры по связанным моделям
    if (product_id) where.local_product = { product_id: product_id };
    if (service_id) where.local_service = { service_id: service_id };
    return where;
  };

  /**
   * Получение списка описаний объектов с фильтрацией, сортировкой и пагинацией
   * @param filters - фильтры для поиска (LocalItemDescriptionFiltersDto)
   * @returns список описаний объектов (BaseListResult<LocalItemDescription>)
   */
  async getLocalItemDescriptions(
    filters: LocalItemDescriptionsFiltersDto,
  ): Promise<BaseListResult<LocalItemDescription>> {
    // Создаем копию фильтров без полей product_id и service_id
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { product_id, service_id, ...baseFilters } = filters;

    const query_options = this.prisma.buildQuery(
      baseFilters,
      "order",
      "created",
      this.customFilters,
    );

    const { items, count } =
      await this.prisma.findWithPagination<LocalItemDescription>(
        this.prisma.localItemDescription,
        query_options,
        {
          local_product: {
            include: {
              product: true,
            },
          },
          local_service: {
            include: {
              service: true,
            },
          },
        },
      );

    return {
      items,
      total: count,
      take: filters.take,
      skip: filters.skip,
    };
  }
}
