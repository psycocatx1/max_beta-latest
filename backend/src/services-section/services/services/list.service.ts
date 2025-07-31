import { Injectable } from "@nestjs/common";
import { BaseListResult, PrismaService, Prisma } from "@lib/prisma";
import { ExtendedService } from "../../services/example.data";
import { ServiceFiltersDto } from "../../services/dto";

/**
 * Сервис для получения списка услуг по фильтрам с пагинацией и сортировкой
 * @returns список услуг с локальными данными
 */
@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) { }

  async getList(
    filterDto: ServiceFiltersDto,
  ): Promise<BaseListResult<ExtendedService>> {
    const {
      name,
      min_price,
      max_price,
      category_id,
      is_discounted,
      description,
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
    if (is_discounted) where.discount_price_USD = { not: null };
    if (is_excluded !== undefined) where.is_excluded = is_excluded;

    const items = await this.prisma.service.findMany({
      where,
      skip,
      take,
      orderBy: { [sort]: sort_direction },
      include: {
        images: true,
        category: true,
        local_services: {
          where: locale_id ? { locale_id } : undefined,
          include: {
            local_item_descriptions: { orderBy: { order: "asc" } },
          },
        },
      },
    });

    return {
      items: items as ExtendedService[],
      total: items.length,
      skip,
      take,
    };
  }
}
