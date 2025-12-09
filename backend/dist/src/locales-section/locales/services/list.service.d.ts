import { BaseListResult, Locale, Prisma, PrismaService } from "@lib/prisma";
import { LocaleFiltersDto } from "../dto";
export declare class ListService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    customFilters: (options: LocaleFiltersDto) => Prisma.LocaleWhereInput;
    findAll(filters: LocaleFiltersDto): Promise<BaseListResult<Locale>>;
}
