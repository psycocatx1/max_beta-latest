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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../../libs/common/src");
const client_1 = require("@prisma/client");
const services_1 = require("./services");
const dto_1 = require("./dto");
let TranslationsController = class TranslationsController {
    translationsService;
    constructor(translationsService) {
        this.translationsService = translationsService;
    }
    async getValidationStatus() {
        return this.translationsService.getValidationStatus();
    }
    async syncAllTranslations() {
        return this.translationsService.syncAllTranslations();
    }
    async createLocaleFiles(locale_symbol) {
        return this.translationsService.createLocaleFiles(locale_symbol);
    }
    async repairTranslationFile(locale_symbol, module) {
        const success = await this.translationsService.repairTranslationFile(locale_symbol, module);
        return {
            success,
            message: success
                ? "Файл успешно восстановлен"
                : "Ошибка восстановления файла",
        };
    }
    async getMessages(locale_symbol, modules) {
        const moduleList = modules
            ? modules.split(",")
            : ["common", "admin", "public"];
        return this.translationsService.getMessages(locale_symbol, moduleList);
    }
    async updateTranslations(locale_symbol, module, data) {
        return this.translationsService.updateTranslations(locale_symbol, module, data.translations);
    }
    async getTranslations(locale_symbol, module) {
        return this.translationsService.getTranslations(locale_symbol, module);
    }
};
exports.TranslationsController = TranslationsController;
__decorate([
    (0, common_1.Get)("validation/status"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Получить статус валидации всех файлов переводов" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Статус валидации получен" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "getValidationStatus", null);
__decorate([
    (0, common_1.Post)("sync/all"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Синхронизировать все файлы переводов с шаблонами" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Синхронизация завершена" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "syncAllTranslations", null);
__decorate([
    (0, common_1.Post)("sync/:locale_symbol"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Создать файлы переводов для локализации" }),
    (0, swagger_1.ApiParam)({ name: "locale_symbol", description: "Символ локализации" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Файлы переводов созданы" }),
    __param(0, (0, common_1.Param)("locale_symbol")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "createLocaleFiles", null);
__decorate([
    (0, common_1.Post)("repair/:locale_symbol/:module"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Восстановить структуру файла переводов" }),
    (0, swagger_1.ApiParam)({ name: "locale_symbol", description: "Символ локализации" }),
    (0, swagger_1.ApiParam)({ name: "module", description: "Модуль переводов" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Файл восстановлен" }),
    __param(0, (0, common_1.Param)("locale_symbol")),
    __param(1, (0, common_1.Param)("module")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "repairTranslationFile", null);
__decorate([
    (0, common_1.Get)("messages/:locale_symbol"),
    (0, swagger_1.ApiOperation)({ summary: "Получить переводы для использования в приложении" }),
    (0, swagger_1.ApiParam)({ name: "locale_symbol", description: "Символ локализации" }),
    (0, swagger_1.ApiQuery)({
        name: "modules",
        description: "Список модулей через запятую",
        required: false,
    }),
    __param(0, (0, common_1.Param)("locale_symbol")),
    __param(1, (0, common_1.Query)("modules")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "getMessages", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(client_1.Role.ADMIN),
    (0, common_1.Put)(":locale_symbol/:module"),
    (0, swagger_1.ApiOperation)({ summary: "Обновить переводы" }),
    (0, swagger_1.ApiParam)({ name: "locale_symbol", description: "Символ локализации" }),
    (0, swagger_1.ApiParam)({ name: "module", description: "Модуль переводов" }),
    __param(0, (0, common_1.Param)("locale_symbol")),
    __param(1, (0, common_1.Param)("module")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, dto_1.UpdateTranslationDto]),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "updateTranslations", null);
__decorate([
    (0, common_1.Get)(":locale_symbol/:module"),
    (0, swagger_1.ApiOperation)({ summary: "Получить переводы для редактирования" }),
    (0, swagger_1.ApiParam)({ name: "locale_symbol", description: "Символ локализации" }),
    (0, swagger_1.ApiParam)({ name: "module", description: "Модуль переводов" }),
    __param(0, (0, common_1.Param)("locale_symbol")),
    __param(1, (0, common_1.Param)("module")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "getTranslations", null);
exports.TranslationsController = TranslationsController = __decorate([
    (0, swagger_1.ApiTags)("Translations"),
    (0, common_1.Controller)("translations"),
    __metadata("design:paramtypes", [services_1.TranslationsService])
], TranslationsController);
//# sourceMappingURL=controller.js.map