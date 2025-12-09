import { PrismaService, BaseListResult, Category } from "@lib/prisma";
import { CategoryFiltersDto } from "../dto";
export declare class ListService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly customFilters;
    private getDefaultLocalization;
    private applyLocalization;
    private buildCategoryTree;
    private calculateTotalCounts;
    private applyRecursiveCounts;
    findAll(filterDto: CategoryFiltersDto): Promise<BaseListResult<Category & {
        children: Category[];
    }>>;
}
