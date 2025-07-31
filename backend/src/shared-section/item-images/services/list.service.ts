import { Injectable } from "@nestjs/common";
import { PrismaService, ItemImage, Prisma, BaseListResult } from "@lib/prisma";
import { ItemImagesFiltersDto } from "../dto/filters.dto";

/**
 * Сервис для получения списка картинок объектов
 */
@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  customFilters = (options: ItemImagesFiltersDto) => {
    const { product_id, service_id, is_excluded } = options;
    const where: Prisma.ItemImageWhereInput = {};
    if (product_id) where.product_id = product_id;
    if (service_id) where.service_id = service_id;
    if (is_excluded !== undefined) where.is_excluded = is_excluded;
    return where;
  };

  /**
   * Получение списка картинок объектов с фильтрацией, сортировкой и пагинацией
   * @param filters - фильтры для поиска (ItemImageFiltersDto)
   * @returns список картинок объектов (BaseListResult<ItemImage>)
   */
  async getItemImages(
    filters: ItemImagesFiltersDto,
  ): Promise<BaseListResult<ItemImage>> {
    const query_options = this.prisma.buildQuery(
      filters,
      "created",
      "created",
      this.customFilters,
    );
    const { items, count } = await this.prisma.findWithPagination<ItemImage>(
      this.prisma.itemImage,
      query_options,
      {
        product: true,
        service: true,
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
