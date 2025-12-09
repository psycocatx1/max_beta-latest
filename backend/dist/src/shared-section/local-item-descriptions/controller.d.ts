import { CrudService, ListService } from "./services";
import { LocalItemDescriptionsFiltersDto, CreateLocalItemDescriptionDto, UpdateLocalItemDescriptionDto } from "./dto";
export declare class LocalItemDescriptionsController {
    private readonly listService;
    private readonly crudService;
    constructor(listService: ListService, crudService: CrudService);
    getLocalItemDescriptions(filters: LocalItemDescriptionsFiltersDto): Promise<import("@lib/prisma").BaseListResult<{
        is_excluded: boolean;
        type: import(".prisma/client").$Enums.LocalItemDescriptionType;
        title: string | null;
        created: Date;
        id: string;
        updated: Date;
        content: string;
        local_product_id: string | null;
        order: number;
        local_service_id: string | null;
    }>>;
    getLocalItemDescription(id: string): Promise<{
        is_excluded: boolean;
        type: import(".prisma/client").$Enums.LocalItemDescriptionType;
        title: string | null;
        created: Date;
        id: string;
        updated: Date;
        content: string;
        local_product_id: string | null;
        order: number;
        local_service_id: string | null;
    }>;
    createLocalItemDescription(data: CreateLocalItemDescriptionDto, file: Express.Multer.File): Promise<{
        is_excluded: boolean;
        type: import(".prisma/client").$Enums.LocalItemDescriptionType;
        title: string | null;
        created: Date;
        id: string;
        updated: Date;
        content: string;
        local_product_id: string | null;
        order: number;
        local_service_id: string | null;
    }>;
    updateLocalItemDescription(id: string, data: UpdateLocalItemDescriptionDto, file: Express.Multer.File): Promise<{
        is_excluded: boolean;
        type: import(".prisma/client").$Enums.LocalItemDescriptionType;
        title: string | null;
        created: Date;
        id: string;
        updated: Date;
        content: string;
        local_product_id: string | null;
        order: number;
        local_service_id: string | null;
    }>;
    deleteLocalItemDescription(id: string): Promise<{
        is_excluded: boolean;
        type: import(".prisma/client").$Enums.LocalItemDescriptionType;
        title: string | null;
        created: Date;
        id: string;
        updated: Date;
        content: string;
        local_product_id: string | null;
        order: number;
        local_service_id: string | null;
    }>;
    reindexDescriptions(body: {
        local_product_id?: string;
        local_service_id?: string;
    }): Promise<{
        message: string;
    }>;
}
