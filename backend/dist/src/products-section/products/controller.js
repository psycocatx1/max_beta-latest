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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const filters_dto_1 = require("./dto/filters.dto");
const crud_service_1 = require("./services/crud.service");
const list_service_1 = require("./services/list.service");
const swagger_1 = require("@nestjs/swagger");
const example_data_1 = require("./example.data");
const dto_1 = require("./dto");
const common_2 = require("../../../libs/common/src");
const prisma_1 = require("../../../libs/prisma/src");
let ProductsController = class ProductsController {
    listService;
    crudService;
    constructor(listService, crudService) {
        this.listService = listService;
        this.crudService = crudService;
    }
    async getProducts(filters) {
        return this.listService.getProducts(filters);
    }
    async getProduct(id, locale_id) {
        return this.crudService.findOne(id, locale_id);
    }
    async getProductByLocale(id, locale_id) {
        return this.crudService.findOne(id, locale_id);
    }
    async createProduct(data, file) {
        return this.crudService.create(data, file);
    }
    async updateProduct(id, data, file) {
        return this.crudService.update(id, data, file);
    }
    async deleteProduct(id) {
        return this.crudService.delete(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Список продуктов успешно получен",
        example: example_data_1.example_product_list_result,
    }),
    (0, swagger_1.ApiOperation)({
        summary: "Получение списка продуктов с пагинацией и сортировкой",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.ProductFiltersDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Получение продукта по id" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Продукт успешно получен",
        example: example_data_1.example_product,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Продукт не найден" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректный id продукта" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)("locale_id", new common_1.ParseUUIDPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)(":id/:locale_id"),
    (0, swagger_1.ApiOperation)({
        summary: "Получение локализованного продукта по id и locale_id",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Продукт успешно получен",
        example: example_data_1.example_product,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Некорректный id или locale_id продукта",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Продукт не найден" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)("locale_id", new common_1.ParseUUIDPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductByLocale", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiOperation)({ summary: "Создание продукта" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Продукт успешно создан",
        example: example_data_1.example_product,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректные данные" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiQuery)({
        description: "Данные для создания продукта",
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
    __metadata("design:paramtypes", [dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiOperation)({ summary: "Обновление продукта" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Продукт успешно обновлен",
        example: example_data_1.example_product,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректные данные" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Продукт не найден" }),
    (0, swagger_1.ApiQuery)({
        description: "Данные для обновления продукта",
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
    __metadata("design:paramtypes", [String, dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Удаление продукта" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Продукт успешно удален" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректный id продукта" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Продукт не найден" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)("products"),
    __metadata("design:paramtypes", [list_service_1.ListService,
        crud_service_1.CrudService])
], ProductsController);
//# sourceMappingURL=controller.js.map