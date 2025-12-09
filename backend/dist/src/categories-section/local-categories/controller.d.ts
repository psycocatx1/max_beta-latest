import { CrudService, ListService } from "./services";
import { CreateLocalCategoryDto, UpdateLocalCategoryDto, LocalCategoryFiltersDto } from "./dto";
export declare class LocalCategoriesController {
    private readonly crudService;
    private readonly listService;
    constructor(crudService: CrudService, listService: ListService);
    create(createLocalCategoryDto: CreateLocalCategoryDto): Promise<{
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
    findAll(filterDto: LocalCategoryFiltersDto): Promise<import("@lib/prisma").BaseListResult<{
        is_excluded: boolean;
        description: string | null;
        created: Date;
        name: string;
        id: string;
        updated: Date;
        locale_id: string;
        category_id: string;
    }>>;
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
}
