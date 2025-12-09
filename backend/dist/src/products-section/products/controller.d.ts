import { ProductFiltersDto } from "./dto/filters.dto";
import { CrudService } from "./services/crud.service";
import { ListService } from "./services/list.service";
import { CreateProductDto, UpdateProductDto } from "./dto";
export declare class ProductsController {
    private readonly listService;
    private readonly crudService;
    constructor(listService: ListService, crudService: CrudService);
    getProducts(filters: ProductFiltersDto): Promise<import("@lib/prisma").BaseListResult<import("./example.data").ExtendedProduct>>;
    getProduct(id: string, locale_id?: string): Promise<import("./example.data").ExtendedProduct>;
    getProductByLocale(id: string, locale_id?: string): Promise<import("./example.data").ExtendedProduct>;
    createProduct(data: CreateProductDto, file: Express.Multer.File): Promise<{
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
    updateProduct(id: string, data: UpdateProductDto, file: Express.Multer.File): Promise<{
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
    deleteProduct(id: string): Promise<{
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
