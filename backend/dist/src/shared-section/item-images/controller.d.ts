import { ItemImagesFiltersDto } from "./dto/filters.dto";
import { CrudService } from "./services/crud.service";
import { ListService } from "./services/list.service";
import { CreateItemImageDto, UpdateItemImageDto } from "./dto";
export declare class ItemImagesController {
    private readonly listService;
    private readonly crudService;
    constructor(listService: ListService, crudService: CrudService);
    getItemImages(filters: ItemImagesFiltersDto): Promise<import("@lib/prisma").BaseListResult<{
        is_excluded: boolean;
        created: Date;
        id: string;
        image: string;
        updated: Date;
        product_id: string | null;
        service_id: string | null;
    }>>;
    getItemImage(id: string): Promise<{
        is_excluded: boolean;
        created: Date;
        id: string;
        image: string;
        updated: Date;
        product_id: string | null;
        service_id: string | null;
    }>;
    createItemImage(data: CreateItemImageDto, file: Express.Multer.File): Promise<{
        is_excluded: boolean;
        created: Date;
        id: string;
        image: string;
        updated: Date;
        product_id: string | null;
        service_id: string | null;
    }>;
    updateItemImage(id: string, data: UpdateItemImageDto, file: Express.Multer.File): Promise<{
        is_excluded: boolean;
        created: Date;
        id: string;
        image: string;
        updated: Date;
        product_id: string | null;
        service_id: string | null;
    }>;
    deleteItemImage(id: string): Promise<{
        is_excluded: boolean;
        created: Date;
        id: string;
        image: string;
        updated: Date;
        product_id: string | null;
        service_id: string | null;
    }>;
}
