import { CrudService, ListService, ValidationService } from "./services";
import { CreateLocaleDto, LocaleFiltersDto, UpdateLocaleDto } from "./dto";
import { BaseListResult, Locale } from "@lib/prisma";
export declare class LocalesController {
    private readonly crudService;
    private readonly listService;
    private readonly validationService;
    constructor(crudService: CrudService, listService: ListService, validationService: ValidationService);
    create(data: CreateLocaleDto, file?: Express.Multer.File): Promise<Locale>;
    find(id: string): Promise<Locale>;
    findAll(dto: LocaleFiltersDto): Promise<BaseListResult<Locale>>;
    update(id: string, data: UpdateLocaleDto, file?: Express.Multer.File): Promise<Locale>;
    delete(id: string): Promise<Locale>;
    validateEntities(): Promise<import("./types").EntitiesValidationResult>;
}
