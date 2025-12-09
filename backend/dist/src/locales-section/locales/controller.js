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
exports.LocalesController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("./services");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const prisma_1 = require("../../../libs/prisma/src");
const common_2 = require("../../../libs/common/src");
const example_data_1 = require("./example.data");
let LocalesController = class LocalesController {
    crudService;
    listService;
    validationService;
    constructor(crudService, listService, validationService) {
        this.crudService = crudService;
        this.listService = listService;
        this.validationService = validationService;
    }
    async create(data, file) {
        return await this.crudService.create(data, file);
    }
    async find(id) {
        return this.crudService.findOne({ id });
    }
    async findAll(dto) {
        return this.listService.findAll(dto);
    }
    async update(id, data, file) {
        return await this.crudService.update({ id }, data, file);
    }
    async delete(id) {
        return await this.crudService.delete({ id });
    }
    async validateEntities() {
        return await this.validationService.validateAllEntities();
    }
};
exports.LocalesController = LocalesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiOperation)({ summary: "Создание локализации" }),
    (0, swagger_1.ApiBody)({
        description: "Данные локализации с изображением",
        schema: {
            type: "object",
            properties: {
                name: { type: "string" },
                language: { type: "string" },
                symbol: { type: "string" },
                currency: { type: "string" },
                currency_symbol: { type: "string" },
                phone_code: { type: "string" },
                image: { type: "string" },
                file: { type: "string", format: "binary" },
            },
            required: [
                "name",
                "language",
                "symbol",
                "currency",
                "currency_symbol",
                "phone_code",
            ],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Локализация успешно создана",
        example: example_data_1.example_locale,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateLocaleDto, Object]),
    __metadata("design:returntype", Promise)
], LocalesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Получение локализации по id" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация",
        example: example_data_1.example_locale,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalesController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Получение всех локализаций" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Список локализаций",
        example: example_data_1.example_locales_list_result,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LocaleFiltersDto]),
    __metadata("design:returntype", Promise)
], LocalesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiOperation)({ summary: "Обновление локализации" }),
    (0, swagger_1.ApiBody)({
        description: "Данные локализации с файлом иконки или URL",
        schema: {
            type: "object",
            properties: {
                name: { type: "string" },
                language: { type: "string" },
                symbol: { type: "string" },
                currency: { type: "string" },
                currency_symbol: { type: "string" },
                phone_code: { type: "string" },
                image: { type: "string" },
                file: { type: "string", format: "binary" },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация обновлена",
        example: example_data_1.example_locale,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateLocaleDto, Object]),
    __metadata("design:returntype", Promise)
], LocalesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Удаление локализации" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация удалена",
        example: example_data_1.example_locale,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalesController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("validation/entities"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Проверка всех локализаций" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalesController.prototype, "validateEntities", null);
exports.LocalesController = LocalesController = __decorate([
    (0, swagger_1.ApiTags)("Locales"),
    (0, common_1.Controller)("locales"),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Forbidden" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal Server Error" }),
    __metadata("design:paramtypes", [services_1.CrudService,
        services_1.ListService,
        services_1.ValidationService])
], LocalesController);
//# sourceMappingURL=controller.js.map