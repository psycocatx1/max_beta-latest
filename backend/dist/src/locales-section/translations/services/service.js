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
exports.TranslationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../../libs/prisma/src");
const path = require("path");
const fs = require("fs");
const validation_service_1 = require("./validation.service");
const sync_service_1 = require("./sync.service");
let TranslationsService = class TranslationsService {
    prisma;
    validationService;
    syncService;
    translationsPath = path.join(process.cwd(), "translations");
    allowedModules = ["admin", "common", "public"];
    constructor(prisma, validationService, syncService) {
        this.prisma = prisma;
        this.validationService = validationService;
        this.syncService = syncService;
    }
    async getMessages(locale_symbol, modules) {
        await this.validateLocale(locale_symbol);
        const messages = {};
        for (const module of modules) {
            if (!this.allowedModules.includes(module))
                continue;
            try {
                const moduleTranslations = await this.getTranslations(locale_symbol, module);
                messages[module] = moduleTranslations;
            }
            catch (error) {
                console.warn(`Не удалось загрузить переводы для модуля ${module}: ${String(error)}`);
            }
        }
        return messages;
    }
    async getTranslations(locale_symbol, module) {
        await this.validateParams(locale_symbol, module);
        const filePath = this.getFilePath(locale_symbol, module);
        if (!fs.existsSync(filePath))
            throw new common_1.NotFoundException(`Файл переводов не найден: ${locale_symbol}/${module}`);
        try {
            return JSON.parse(fs.readFileSync(filePath, "utf8"));
        }
        catch (error) {
            throw new common_1.BadRequestException(`Ошибка чтения файла переводов: ${String(error)}`);
        }
    }
    async updateTranslations(locale_symbol, module, translations) {
        await this.validateParams(locale_symbol, module);
        const filePath = this.getFilePath(locale_symbol, module);
        try {
            if (fs.existsSync(filePath))
                fs.copyFileSync(filePath, `${filePath}.backup.${Date.now()}`);
            fs.writeFileSync(filePath, JSON.stringify(translations, null, 2), "utf8");
            return {
                success: true,
                message: `Переводы для ${locale_symbol}/${module} успешно обновлены`,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Ошибка записи файла переводов: ${String(error)}`);
        }
    }
    async validateParams(locale_symbol, module) {
        await this.validateLocale(locale_symbol);
        if (!this.allowedModules.includes(module))
            throw new common_1.BadRequestException(`Недопустимый модуль: ${module}. Разрешены: ${this.allowedModules.join(", ")}`);
    }
    async getValidationStatus() {
        try {
            const locales = await this.prisma.locale.findMany({
                select: { symbol: true },
                where: { is_excluded: false },
            });
            if (!locales || locales.length === 0) {
                console.warn("Нет активных локализаций для валидации");
                return {
                    locales: [],
                    template_files: {},
                    summary: {
                        total_locales: 0,
                        locales_with_issues: 0,
                        missing_files: 0,
                        total_missing_keys: 0,
                        total_empty_values: 0,
                    },
                };
            }
            const locale_symbols = locales.map((locale) => locale.symbol);
            return await this.validationService.validateAllLocales(locale_symbols);
        }
        catch (error) {
            console.error(`Ошибка при получении статуса валидации: ${String(error)}`);
            throw error;
        }
    }
    async createLocaleFiles(locale_symbol) {
        await this.validateLocale(locale_symbol);
        return this.syncService.createTranslationFiles(locale_symbol);
    }
    deleteLocaleFiles(locale_symbol) {
        return this.syncService.deleteTranslationFiles(locale_symbol);
    }
    async syncAllTranslations() {
        const locales = await this.prisma.locale.findMany({
            select: { symbol: true },
        });
        const locale_symbols = locales.map((locale) => locale.symbol.toLowerCase());
        return this.syncService.syncAllTranslations(locale_symbols);
    }
    async repairTranslationFile(locale_symbol, module) {
        await this.validateParams(locale_symbol, module);
        return this.syncService.repairTranslationFile(locale_symbol, module);
    }
    async getAvailableLocales() {
        const locales = await this.prisma.locale.findMany({
            select: { symbol: true },
        });
        return locales.map((locale) => locale.symbol.toLowerCase());
    }
    async validateLocale(locale_symbol) {
        if (locale_symbol.toLowerCase() === "main")
            return;
        const locale = await this.prisma.locale.findFirst({
            where: {
                symbol: {
                    equals: locale_symbol.toUpperCase(),
                    mode: "insensitive",
                },
                is_excluded: false,
            },
        });
        if (!locale)
            throw new common_1.BadRequestException(`Локаль не найдена в базе данных или исключена: ${locale_symbol}`);
    }
    getFilePath(locale_symbol, module) {
        const normalizedLocale = locale_symbol.toLowerCase();
        const fileName = `${module}.${normalizedLocale}.json`;
        return path.join(this.translationsPath, module, fileName);
    }
};
exports.TranslationsService = TranslationsService;
exports.TranslationsService = TranslationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        validation_service_1.ValidationService,
        sync_service_1.SyncService])
], TranslationsService);
//# sourceMappingURL=service.js.map