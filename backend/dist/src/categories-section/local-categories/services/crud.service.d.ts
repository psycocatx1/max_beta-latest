import { PrismaService } from "@lib/prisma";
import { CreateLocalCategoryDto, UpdateLocalCategoryDto } from "../dto";
import { CrudService as CategoriesCrudService } from "src/categories-section/categories/services";
import { CrudService as LocalesCrudService } from "src/locales-section/locales/services";
export declare class CrudService {
    private readonly prisma;
    private readonly categoryService;
    private readonly localeService;
    constructor(prisma: PrismaService, categoryService: CategoriesCrudService, localeService: LocalesCrudService);
    create(data: CreateLocalCategoryDto): Promise<{
        locale: {
            symbol: string;
            is_excluded: boolean;
            created: Date;
            name: string;
            id: string;
            image: string;
            updated: Date;
            language: string;
            currency: string;
            currency_symbol: string;
            phone_code: string;
        };
        category: {
            is_excluded: boolean;
            description: string | null;
            type: import(".prisma/client").$Enums.CategoryType;
            created: Date;
            name: string;
            id: string;
            image: string | null;
            updated: Date;
            parent_id: string | null;
        };
    } & {
        is_excluded: boolean;
        description: string | null;
        created: Date;
        name: string;
        id: string;
        updated: Date;
        locale_id: string;
        category_id: string;
    }>;
    update(id: string, data: UpdateLocalCategoryDto): Promise<{
        locale: {
            symbol: string;
            is_excluded: boolean;
            created: Date;
            name: string;
            id: string;
            image: string;
            updated: Date;
            language: string;
            currency: string;
            currency_symbol: string;
            phone_code: string;
        };
        category: {
            is_excluded: boolean;
            description: string | null;
            type: import(".prisma/client").$Enums.CategoryType;
            created: Date;
            name: string;
            id: string;
            image: string | null;
            updated: Date;
            parent_id: string | null;
        };
    } & {
        is_excluded: boolean;
        description: string | null;
        created: Date;
        name: string;
        id: string;
        updated: Date;
        locale_id: string;
        category_id: string;
    }>;
    delete(id: string): Promise<{
        is_excluded: boolean;
        description: string | null;
        created: Date;
        name: string;
        id: string;
        updated: Date;
        locale_id: string;
        category_id: string;
    }>;
    findOne(id: string): Promise<{
        locale: {
            symbol: string;
            is_excluded: boolean;
            created: Date;
            name: string;
            id: string;
            image: string;
            updated: Date;
            language: string;
            currency: string;
            currency_symbol: string;
            phone_code: string;
        };
        category: {
            is_excluded: boolean;
            description: string | null;
            type: import(".prisma/client").$Enums.CategoryType;
            created: Date;
            name: string;
            id: string;
            image: string | null;
            updated: Date;
            parent_id: string | null;
        };
    } & {
        is_excluded: boolean;
        description: string | null;
        created: Date;
        name: string;
        id: string;
        updated: Date;
        locale_id: string;
        category_id: string;
    }>;
}
