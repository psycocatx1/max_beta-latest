import { PrismaService, ItemImage } from "@lib/prisma";
import { CreateItemImageDto, UpdateItemImageDto } from "../dto";
import { FilesService } from "src/files/files.service";
import { CrudService as ProductsCrudService } from "src/products-section/products/services/crud.service";
import { CrudService as ServicesCrudService } from "src/services-section/services/services/crud.service";
export declare class CrudService {
    private readonly prisma;
    private readonly filesService;
    private readonly productsService;
    private readonly servicesService;
    constructor(prisma: PrismaService, filesService: FilesService, productsService: ProductsCrudService, servicesService: ServicesCrudService);
    private saveImage;
    create(data: CreateItemImageDto, file?: Express.Multer.File): Promise<ItemImage>;
    findOne(id: string): Promise<ItemImage>;
    update(id: string, data: UpdateItemImageDto, file?: Express.Multer.File): Promise<ItemImage>;
    delete(id: string): Promise<ItemImage>;
}
