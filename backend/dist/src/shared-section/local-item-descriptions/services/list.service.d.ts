import { PrismaService, LocalItemDescription, BaseListResult } from "@lib/prisma";
import { LocalItemDescriptionsFiltersDto } from "../dto";
export declare class ListService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly customFilters;
    getLocalItemDescriptions(filters: LocalItemDescriptionsFiltersDto): Promise<BaseListResult<LocalItemDescription>>;
}
