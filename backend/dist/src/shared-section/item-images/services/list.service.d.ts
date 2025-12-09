import { PrismaService, ItemImage, Prisma, BaseListResult } from "@lib/prisma";
import { ItemImagesFiltersDto } from "../dto/filters.dto";
export declare class ListService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    customFilters: (options: ItemImagesFiltersDto) => Prisma.ItemImageWhereInput;
    getItemImages(filters: ItemImagesFiltersDto): Promise<BaseListResult<ItemImage>>;
}
