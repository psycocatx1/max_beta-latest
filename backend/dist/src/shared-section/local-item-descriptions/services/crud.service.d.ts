import { PrismaService, LocalItemDescription } from "@lib/prisma";
import { CreateLocalItemDescriptionDto, UpdateLocalItemDescriptionDto } from "../dto";
import { FilesService } from "src/files/files.service";
import { CrudService as LocalProductCrudService } from "src/products-section/local-products/services";
import { CrudService as LocalServiceCrudService } from "src/services-section/local-services/services";
export declare class CrudService {
    private readonly prisma;
    private readonly filesService;
    private readonly localProductService;
    private readonly localServiceService;
    constructor(prisma: PrismaService, filesService: FilesService, localProductService: LocalProductCrudService, localServiceService: LocalServiceCrudService);
    private readonly REINDEX_THRESHOLD;
    private saveImage;
    private getMaxOrder;
    private calculateNewOrderForUpdate;
    private checkNeedsReindexing;
    reindexDescriptions(local_product_id?: string, local_service_id?: string): Promise<void>;
    create(data: CreateLocalItemDescriptionDto, file?: Express.Multer.File): Promise<LocalItemDescription>;
    findOne(id: string): Promise<LocalItemDescription>;
    update(id: string, data: UpdateLocalItemDescriptionDto, file?: Express.Multer.File): Promise<LocalItemDescription>;
    delete(id: string): Promise<LocalItemDescription>;
}
