import { CrudService, ListService } from "./services";
import { CreateCategoryDto, UpdateCategoryDto, CategoryFiltersDto } from "./dto";
export declare class CategoriesController {
    private readonly crudService;
    private readonly listService;
    constructor(crudService: CrudService, listService: ListService);
    create(createCategoryDto: CreateCategoryDto, file?: Express.Multer.File): Promise<{
        local_categories: {
            is_excluded: boolean;
            description: string | null;
            created: Date;
            name: string;
            id: string;
            updated: Date;
            locale_id: string;
            category_id: string;
        }[];
        parent: {
            is_excluded: boolean;
            description: string | null;
            type: import(".prisma/client").$Enums.CategoryType;
            created: Date;
            name: string;
            id: string;
            image: string | null;
            updated: Date;
            parent_id: string | null;
        } | null;
        children: {
            is_excluded: boolean;
            description: string | null;
            type: import(".prisma/client").$Enums.CategoryType;
            created: Date;
            name: string;
            id: string;
            image: string | null;
            updated: Date;
            parent_id: string | null;
        }[];
    } & {
        is_excluded: boolean;
        description: string | null;
        type: import(".prisma/client").$Enums.CategoryType;
        created: Date;
        name: string;
        id: string;
        image: string | null;
        updated: Date;
        parent_id: string | null;
    }>;
    findAll(filterDto: CategoryFiltersDto): Promise<import("@lib/prisma").BaseListResult<{
        is_excluded: boolean;
        description: string | null;
        type: import(".prisma/client").$Enums.CategoryType;
        created: Date;
        name: string;
        id: string;
        image: string | null;
        updated: Date;
        parent_id: string | null;
    } & {
        children: import(".prisma/client").Category[];
    }>>;
    findOne(id: string, locale_id?: string): Promise<{
        ancestors: ({
            is_excluded: boolean;
            description: string | null;
            type: import(".prisma/client").$Enums.CategoryType;
            created: Date;
            name: string;
            id: string;
            image: string | null;
            updated: Date;
            parent_id: string | null;
        } & {
            children: import(".prisma/client").Category[];
        })[];
        children: ({
            is_excluded: boolean;
            description: string | null;
            type: import(".prisma/client").$Enums.CategoryType;
            created: Date;
            name: string;
            id: string;
            image: string | null;
            updated: Date;
            parent_id: string | null;
        } & {
            children: import(".prisma/client").Category[];
        })[];
        is_excluded: boolean;
        description: string | null;
        type: import(".prisma/client").$Enums.CategoryType;
        created: Date;
        name: string;
        id: string;
        image: string | null;
        updated: Date;
        parent_id: string | null;
        local_categories: import(".prisma/client").LocalCategory[];
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto, file?: Express.Multer.File): Promise<{
        local_categories: {
            is_excluded: boolean;
            description: string | null;
            created: Date;
            name: string;
            id: string;
            updated: Date;
            locale_id: string;
            category_id: string;
        }[];
        parent: {
            is_excluded: boolean;
            description: string | null;
            type: import(".prisma/client").$Enums.CategoryType;
            created: Date;
            name: string;
            id: string;
            image: string | null;
            updated: Date;
            parent_id: string | null;
        } | null;
        children: {
            is_excluded: boolean;
            description: string | null;
            type: import(".prisma/client").$Enums.CategoryType;
            created: Date;
            name: string;
            id: string;
            image: string | null;
            updated: Date;
            parent_id: string | null;
        }[];
    } & {
        is_excluded: boolean;
        description: string | null;
        type: import(".prisma/client").$Enums.CategoryType;
        created: Date;
        name: string;
        id: string;
        image: string | null;
        updated: Date;
        parent_id: string | null;
    }>;
    delete(id: string): Promise<{
        is_excluded: boolean;
        description: string | null;
        type: import(".prisma/client").$Enums.CategoryType;
        created: Date;
        name: string;
        id: string;
        image: string | null;
        updated: Date;
        parent_id: string | null;
    }>;
}
