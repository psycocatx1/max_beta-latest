import { PrismaService, Service } from "@lib/prisma";
import { CreateServiceDto, UpdateServiceDto } from "../dto";
import { ExtendedService } from "../example.data";
import { FilesService } from "src/files/files.service";
import { CrudService as CategoryCrudService } from "src/categories-section/categories/services/crud.service";
export declare class CrudService {
    private readonly prisma;
    private readonly filesService;
    private readonly categoryService;
    constructor(prisma: PrismaService, filesService: FilesService, categoryService: CategoryCrudService);
    private getInclude;
    private saveImage;
    create(data: CreateServiceDto, file?: Express.Multer.File): Promise<Service>;
    findOne(id: string, locale_id?: string): Promise<ExtendedService>;
    update(id: string, data: UpdateServiceDto, file?: Express.Multer.File): Promise<Service>;
    delete(id: string): Promise<Service>;
}
