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
exports.LocalProductsController = void 0;
const services_1 = require("./services");
const common_1 = require("@nestjs/common");
const services_2 = require("./services");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const example_data_1 = require("./example.data");
const common_2 = require("../../../libs/common/src");
const prisma_1 = require("../../../libs/prisma/src");
let LocalProductsController = class LocalProductsController {
    listService;
    crudService;
    constructor(listService, crudService) {
        this.listService = listService;
        this.crudService = crudService;
    }
    async getList(filterDto) {
        return this.listService.getList(filterDto);
    }
    async getOne(id) {
        return this.crudService.findOne(id);
    }
    async create(createDto) {
        return this.crudService.create(createDto);
    }
    async update(id, updateDto) {
        return this.crudService.update(id, updateDto);
    }
    async delete(id) {
        return this.crudService.delete(id);
    }
};
exports.LocalProductsController = LocalProductsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Получение списка локализаций продукта" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Список локализаций продукта",
        example: example_data_1.example_local_products_list_result,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LocalProductFiltersDto]),
    __metadata("design:returntype", Promise)
], LocalProductsController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Получение локализации продукта по id" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация продукта",
        example: example_data_1.example_extended_local_product,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalProductsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Создание локализации продукта" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Локализация продукта создана",
        example: example_data_1.example_extended_local_product,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateLocalProductDto]),
    __metadata("design:returntype", Promise)
], LocalProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Обновление локализации продукта" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация продукта обновлена",
        example: example_data_1.example_extended_local_product,
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateLocalProductDto]),
    __metadata("design:returntype", Promise)
], LocalProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Удаление локализации продукта" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Локализация продукта удалена" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalProductsController.prototype, "delete", null);
exports.LocalProductsController = LocalProductsController = __decorate([
    (0, swagger_1.ApiTags)("Local Products"),
    (0, common_1.Controller)("local-products"),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:paramtypes", [services_2.ListService,
        services_1.CrudService])
], LocalProductsController);
//# sourceMappingURL=controller.js.map