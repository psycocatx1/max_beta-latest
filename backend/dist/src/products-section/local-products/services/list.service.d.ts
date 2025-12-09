import { PrismaService, BaseListResult } from "@lib/prisma";
import { LocalProductFiltersDto } from "../dto";
import { ExtendedLocalProduct } from "../example.data";
import { Prisma } from "@prisma/client";
export declare class ListService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    customFilters: (options: LocalProductFiltersDto) => Prisma.LocalProductWhereInput;
    getList(filterDto: LocalProductFiltersDto): Promise<BaseListResult<ExtendedLocalProduct>>;
}
