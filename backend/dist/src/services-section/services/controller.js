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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const filters_dto_1 = require("./dto/filters.dto");
const crud_service_1 = require("./services/crud.service");
const list_service_1 = require("./services/list.service");
const swagger_1 = require("@nestjs/swagger");
const example_data_1 = require("./example.data");
const dto_1 = require("./dto");
const common_2 = require("../../../libs/common/src");
const prisma_1 = require("../../../libs/prisma/src");
let ServicesController = class ServicesController {
    listService;
    crudService;
    constructor(listService, crudService) {
        this.listService = listService;
        this.crudService = crudService;
    }
    async getServices(filters) {
        return this.listService.getServices(filters);
    }
    async getService(id, locale_id) {
        return this.crudService.findOne(id, locale_id);
    }
    async getServiceByLocale(id, locale_id) {
        return this.crudService.findOne(id, locale_id);
    }
    async createService(data, file) {
        return this.crudService.create(data, file);
    }
    async updateService(id, data, file) {
        return this.crudService.update(id, data, file);
    }
    async deleteService(id) {
        return this.crudService.delete(id);
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ type: filters_dto_1.ServiceFiltersDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Список услуг успешно получен",
        example: example_data_1.example_extended_services_list_result,
    }),
    (0, swagger_1.ApiOperation)({
        summary: "Получение списка услуг с пагинацией и сортировкой",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.ServiceFiltersDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getServices", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Получение услуги по id" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Услуга успешно получена",
        example: example_data_1.example_extended_service,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Услуга не найдена" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректный id услуги" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)("locale_id", new common_1.ParseUUIDPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getService", null);
__decorate([
    (0, common_1.Get)(":id/:locale_id"),
    (0, swagger_1.ApiOperation)({
        summary: "Получение локализованной услуги по id и locale_id",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Услуга успешно получена",
        example: example_data_1.example_extended_service,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Некорректный id или locale_id услуги",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Услуга не найдена" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)("locale_id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getServiceByLocale", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiOperation)({ summary: "Создание услуги" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Услуга успешно создана",
        example: example_data_1.example_extended_service,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректные данные" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiQuery)({
        description: "Данные для создания услуги",
        schema: {
            type: "object",
            properties: {
                name: { type: "string" },
                description: { type: "string" },
                image: { type: "string" },
                file: { type: "string", format: "binary" },
                category_id: { type: "string" },
                price_USD: { type: "number" },
                discount_price_USD: { type: "number" },
            },
            required: [
                "name",
                "description",
                "category_id",
                "price_USD",
                "discount_price_USD",
            ],
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateServiceDto, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "createService", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiOperation)({ summary: "Обновление услуги" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Услуга успешно обновлена",
        example: example_data_1.example_extended_service,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректные данные" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Услуга не найдена" }),
    (0, swagger_1.ApiQuery)({
        description: "Данные для обновления услуги",
        schema: {
            type: "object",
            properties: {
                name: { type: "string" },
                description: { type: "string" },
                image: { type: "string" },
                file: { type: "string", format: "binary" },
                category_id: { type: "string" },
                price_USD: { type: "number" },
                discount_price_USD: { type: "number" },
            },
        },
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateServiceDto, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "updateService", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Удаление услуги" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Услуга успешно удалена" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректный id услуги" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Услуга не найдена" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "deleteService", null);
exports.ServicesController = ServicesController = __decorate([
    (0, swagger_1.ApiTags)("Services"),
    (0, common_1.Controller)("services"),
    __metadata("design:paramtypes", [list_service_1.ListService,
        crud_service_1.CrudService])
], ServicesController);
//# sourceMappingURL=controller.js.map