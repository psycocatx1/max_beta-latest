import { ProductFiltersDto } from "../dto";
import { BaseListResult, PrismaService } from "@lib/prisma";
import { ExtendedProduct } from "../example.data";
export declare class ListService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProducts(filterDto: ProductFiltersDto): Promise<BaseListResult<ExtendedProduct>>;
}
