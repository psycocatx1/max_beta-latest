import { PrismaService, Locale } from "@lib/prisma";
import { CreateLocaleDto, UpdateLocaleDto } from "../dto";
import { FilesService } from "../../../files/files.service";
import { TranslationsService } from "../../translations/services";
import { Prisma } from "@prisma/client";
export declare class CrudService {
    private readonly prisma;
    private readonly filesService;
    private readonly translationsService;
    constructor(prisma: PrismaService, filesService: FilesService, translationsService: TranslationsService);
    private saveImage;
    create(data: CreateLocaleDto, file?: Express.Multer.File): Promise<Locale>;
    findOne(where: Prisma.LocaleWhereUniqueInput): Promise<Locale>;
    update(where: Prisma.LocaleWhereUniqueInput, data: UpdateLocaleDto, file?: Express.Multer.File): Promise<Locale>;
    delete(where: Prisma.LocaleWhereUniqueInput): Promise<Locale>;
}
