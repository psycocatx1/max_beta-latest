import { PrismaService, LocalService } from "@lib/prisma";
import { CreateLocalServiceDto, UpdateLocalServiceDto } from "../dto";
import { CrudService as ServiceCrudService } from "../../services/services/crud.service";
import { CrudService as LocaleCrudService } from "../../../locales-section/locales/services/crud.service";
import { ExtendedLocalService } from "../example.data";
export declare class CrudService {
    private readonly prisma;
    private readonly serviceService;
    private readonly localeService;
    constructor(prisma: PrismaService, serviceService: ServiceCrudService, localeService: LocaleCrudService);
    create(dto: CreateLocalServiceDto): Promise<ExtendedLocalService>;
    update(id: string, dto: UpdateLocalServiceDto): Promise<ExtendedLocalService>;
    delete(id: string): Promise<LocalService>;
    findOne(id: string): Promise<ExtendedLocalService>;
}
