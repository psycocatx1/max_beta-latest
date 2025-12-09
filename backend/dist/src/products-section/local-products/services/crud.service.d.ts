import { PrismaService, LocalProduct } from "@lib/prisma";
import { CreateLocalProductDto, UpdateLocalProductDto } from "../dto";
import { CrudService as ProductCrudService } from "../../products/services/crud.service";
import { CrudService as LocaleCrudService } from "../../../locales-section/locales/services/crud.service";
import { ExtendedLocalProduct } from "../example.data";
export declare class CrudService {
    private readonly prisma;
    private readonly productService;
    private readonly localeService;
    constructor(prisma: PrismaService, productService: ProductCrudService, localeService: LocaleCrudService);
    create(dto: CreateLocalProductDto): Promise<ExtendedLocalProduct>;
    update(id: string, dto: UpdateLocalProductDto): Promise<ExtendedLocalProduct>;
    delete(id: string): Promise<LocalProduct>;
    findOne(id: string): Promise<ExtendedLocalProduct>;
}
