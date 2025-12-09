import { PrismaService, Product } from "@lib/prisma";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { ExtendedProduct } from "../example.data";
import { FilesService } from "src/files/files.service";
export declare class CrudService {
    private readonly prisma;
    private readonly filesService;
    constructor(prisma: PrismaService, filesService: FilesService);
    private getInclude;
    private saveImage;
    create(data: CreateProductDto, file?: Express.Multer.File): Promise<Product>;
    findOne(id: string, locale_id?: string): Promise<ExtendedProduct>;
    update(id: string, data: UpdateProductDto, file?: Express.Multer.File): Promise<Product>;
    delete(id: string): Promise<Product>;
}
