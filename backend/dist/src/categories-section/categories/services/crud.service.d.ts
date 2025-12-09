import { PrismaService, Category, LocalCategory } from "@lib/prisma";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto";
import { FilesService } from "src/files/files.service";
export declare class CrudService {
    private readonly prisma;
    private readonly filesService;
    constructor(prisma: PrismaService, filesService: FilesService);
    private saveImage;
    create(data: CreateCategoryDto, file?: Express.Multer.File): Promise<{
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
    private findOneInternal;
    update(id: string, data: UpdateCategoryDto, file?: Express.Multer.File): Promise<{
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
            children: Category[];
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
            children: Category[];
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
        local_categories: LocalCategory[];
    }>;
    private applyLocalization;
    private buildAncestorTree;
    private calculateTotalCounts;
    private applyRecursiveCounts;
}
