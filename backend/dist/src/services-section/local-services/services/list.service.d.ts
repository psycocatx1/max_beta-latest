import { PrismaService, BaseListResult, Prisma } from "@lib/prisma";
import { LocalServiceFiltersDto } from "../dto";
import { ExtendedLocalService } from "../example.data";
export declare class ListService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    customFilters: (options: LocalServiceFiltersDto) => Prisma.LocalServiceWhereInput;
    getList(filterDto: LocalServiceFiltersDto): Promise<BaseListResult<ExtendedLocalService>>;
}
