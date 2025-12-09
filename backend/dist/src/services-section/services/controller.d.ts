import { ServiceFiltersDto } from "./dto/filters.dto";
import { CrudService } from "./services/crud.service";
import { ListService } from "./services/list.service";
import { CreateServiceDto, UpdateServiceDto } from "./dto";
export declare class ServicesController {
    private readonly listService;
    private readonly crudService;
    constructor(listService: ListService, crudService: CrudService);
    getServices(filters: ServiceFiltersDto): Promise<import("@lib/prisma").BaseListResult<import("./example.data").ExtendedService>>;
    getService(id: string, locale_id?: string): Promise<import("./example.data").ExtendedService>;
    getServiceByLocale(id: string, locale_id: string): Promise<import("./example.data").ExtendedService>;
    createService(data: CreateServiceDto, file: Express.Multer.File): Promise<{
        is_excluded: boolean;
        description: string | null;
        created: Date;
        name: string;
        id: string;
        image: string;
        updated: Date;
        price_USD: number;
        discount_price_USD: number | null;
        category_id: string;
    }>;
    updateService(id: string, data: UpdateServiceDto, file: Express.Multer.File): Promise<{
        is_excluded: boolean;
        description: string | null;
        created: Date;
        name: string;
        id: string;
        image: string;
        updated: Date;
        price_USD: number;
        discount_price_USD: number | null;
        category_id: string;
    }>;
    deleteService(id: string): Promise<{
        is_excluded: boolean;
        description: string | null;
        created: Date;
        name: string;
        id: string;
        image: string;
        updated: Date;
        price_USD: number;
        discount_price_USD: number | null;
        category_id: string;
    }>;
}
