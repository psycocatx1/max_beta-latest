import { PrismaService, BaseListResult, LocalCategory } from "@lib/prisma";
import { LocalCategoryFiltersDto } from "../dto";
export declare class ListService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly customFilters;
    findAll(filterDto: LocalCategoryFiltersDto): Promise<BaseListResult<LocalCategory>>;
}
