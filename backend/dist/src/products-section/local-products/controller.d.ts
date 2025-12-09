import { CrudService } from "./services";
import { ListService } from "./services";
import { CreateLocalProductDto, LocalProductFiltersDto, UpdateLocalProductDto } from "./dto";
export declare class LocalProductsController {
    private readonly listService;
    private readonly crudService;
    constructor(listService: ListService, crudService: CrudService);
    getList(filterDto: LocalProductFiltersDto): Promise<import("@lib/prisma").BaseListResult<import("./example.data").ExtendedLocalProduct>>;
    getOne(id: string): Promise<import("./example.data").ExtendedLocalProduct>;
    create(createDto: CreateLocalProductDto): Promise<import("./example.data").ExtendedLocalProduct>;
    update(id: string, updateDto: UpdateLocalProductDto): Promise<import("./example.data").ExtendedLocalProduct>;
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
        product_id: string;
    }>;
}
