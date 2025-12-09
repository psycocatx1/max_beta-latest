import { CrudService, ListService } from "./services";
import { CreateLocalServiceDto, LocalServiceFiltersDto, UpdateLocalServiceDto } from "./dto";
export declare class LocalServicesController {
    private readonly listService;
    private readonly crudService;
    constructor(listService: ListService, crudService: CrudService);
    getList(filterDto: LocalServiceFiltersDto): Promise<import("@lib/prisma").BaseListResult<import("./example.data").ExtendedLocalService>>;
    getOne(id: string): Promise<import("./example.data").ExtendedLocalService>;
    create(createDto: CreateLocalServiceDto): Promise<import("./example.data").ExtendedLocalService>;
    update(id: string, updateDto: UpdateLocalServiceDto): Promise<import("./example.data").ExtendedLocalService>;
    delete(id: string): Promise<{
        is_excluded: boolean;
        description: string | null;
        created: Date;
        name: string;
        id: string;
        updated: Date;
        locale_id: string;
        price: number;
        discount_price: number | null;
        service_id: string;
    }>;
}
