import { Injectable } from "@nestjs/common";
import { ServiceFiltersDto } from "../dto";
import { BaseListResult, PrismaService, Prisma } from "@lib/prisma";
import { ExtendedService } from "../example.data";

/**
 * Сервис для получения списка продуктов по фильтрам с пагинацией и сортировкой
 * @returns список продуктов с изображениями и локальными данными
 */
@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) { }

  async getServices(
    filterDto: ServiceFiltersDto,
  ): Promise<BaseListResult<ExtendedService>> {
    const {
      category_id,
      name,
      description,
      min_price,
      max_price,
      is_discounted,
      is_excluded,
      skip = 0,
      take = 10,
      locale_id,
      sort = "created",
      sort_direction = "desc",
    } = filterDto;
    let where: Prisma.ServiceWhereInput = {};
    if (category_id) {
      where = {
        OR: [{ category_id }, { category: { parent_id: category_id } }],
      };
    }
    if (name) where.name = { contains: name, mode: "insensitive" };
    if (description)
      where.description = { contains: description, mode: "insensitive" };
    if (min_price) where.price_USD = { gte: min_price };
    if (max_price) where.price_USD = { lte: max_price };
    if (is_discounted !== undefined) where.discount_price_USD = { not: null };
    if (is_excluded) where.is_excluded = is_excluded;
    const items = await this.prisma.service.findMany({
      where,
      skip,
      take,
      orderBy: { [sort]: sort_direction },
      include: {
        images: true,
        category: true,
        local_services: locale_id
          ? {
            where: locale_id ? { locale_id } : undefined,
            include: {
              local_item_descriptions: { orderBy: { order: "asc" } },
            },
          }
          : false,
      },
    });

    const total = await this.prisma.service.count({ where });

    return {
      items: items as ExtendedService[],
      total,
      skip,
      take,
    };
  }
}
