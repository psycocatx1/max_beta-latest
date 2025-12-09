"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudService = void 0;
const prisma_1 = require("../../../../libs/prisma/src");
const common_1 = require("@nestjs/common");
const files_service_1 = require("../../../files/files.service");
const services_1 = require("../../translations/services");
let CrudService = class CrudService {
    prisma;
    filesService;
    translationsService;
    constructor(prisma, filesService, translationsService) {
        this.prisma = prisma;
        this.filesService = filesService;
        this.translationsService = translationsService;
    }
    saveImage(data, file) {
        if (!this.filesService.isValidImage(file))
            throw new common_1.BadRequestException("Недопустимый формат файла. Разрешены только JPEG, PNG и WebP");
        if (!this.filesService.isValidSize(file, 5))
            throw new common_1.BadRequestException("Размер файла не должен превышать 5 МБ");
        data.image = this.filesService.saveImage(file, "locales");
    }
    async create(data, file) {
        if (file)
            this.saveImage(data, file);
        if (!data.image)
            throw new common_1.BadRequestException("Изображение обязательно");
        const locale = await this.prisma.locale.create({
            data: { ...data, image: data.image },
        });
        try {
            console.log(`Создание файлов переводов для локализации ${locale.symbol}`);
            const syncResult = await this.translationsService.createLocaleFiles(locale.symbol);
            if (!syncResult.success)
                console.error(`Ошибки при создании файлов переводов для локализации ${locale.symbol}: ${syncResult.errors.join(", ")}`);
        }
        catch (error) {
            console.error(`Ошибка создания файлов переводов для локализации ${locale.symbol}: ${String(error)}`);
        }
        return locale;
    }
    async findOne(where) {
        const locale = await this.prisma.locale.findUnique({ where });
        if (!locale)
            throw new common_1.NotFoundException("Locale not found");
        return locale;
    }
    async update(where, data, file) {
        await this.findOne(where);
        if (file)
            this.saveImage(data, file);
        return this.prisma.locale.update({ where, data });
    }
    async delete(where) {
        return await this.update(where, { is_excluded: true });
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        files_service_1.FilesService,
        services_1.TranslationsService])
], CrudService);
//# sourceMappingURL=crud.service.js.map