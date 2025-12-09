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
exports.LocalCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("./services");
const dto_1 = require("./dto");
const common_2 = require("../../../libs/common/src");
const prisma_1 = require("../../../libs/prisma/src");
const swagger_1 = require("@nestjs/swagger");
const example_data_1 = require("./example.data");
let LocalCategoriesController = class LocalCategoriesController {
    crudService;
    listService;
    constructor(crudService, listService) {
        this.crudService = crudService;
        this.listService = listService;
    }
    async create(createLocalCategoryDto) {
        return await this.crudService.create(createLocalCategoryDto);
    }
    async findAll(filterDto) {
        return await this.listService.findAll(filterDto);
    }
    async findOne(id) {
        return await this.crudService.findOne(id);
    }
    async update(id, data) {
        return await this.crudService.update(id, data);
    }
    async delete(id) {
        return await this.crudService.delete(id);
    }
};
exports.LocalCategoriesController = LocalCategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Создание локализации категории" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Локализация категории успешно создана",
        example: example_data_1.example_local_category,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateLocalCategoryDto]),
    __metadata("design:returntype", Promise)
], LocalCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализации категорий успешно получены",
        example: example_data_1.example_local_categories_list_result,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LocalCategoryFiltersDto]),
    __metadata("design:returntype", Promise)
], LocalCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация категории успешно получена",
        example: example_data_1.example_local_category,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация категории успешно обновлена",
        example: example_data_1.example_local_category,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateLocalCategoryDto]),
    __metadata("design:returntype", Promise)
], LocalCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация категории успешно удалена",
        example: example_data_1.example_local_category,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalCategoriesController.prototype, "delete", null);
exports.LocalCategoriesController = LocalCategoriesController = __decorate([
    (0, swagger_1.ApiTags)("Local Categories"),
    (0, common_1.Controller)("local-categories"),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Forbidden" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:paramtypes", [services_1.CrudService,
        services_1.ListService])
], LocalCategoriesController);
//# sourceMappingURL=controller.js.map