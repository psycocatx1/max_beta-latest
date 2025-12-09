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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("./services");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const example_data_1 = require("./example.data");
const common_2 = require("../../../libs/common/src");
const prisma_1 = require("../../../libs/prisma/src");
let CategoriesController = class CategoriesController {
    crudService;
    listService;
    constructor(crudService, listService) {
        this.crudService = crudService;
        this.listService = listService;
    }
    async create(createCategoryDto, file) {
        return await this.crudService.create(createCategoryDto, file);
    }
    async findAll(filterDto) {
        return await this.listService.findAll(filterDto);
    }
    async findOne(id, locale_id) {
        return await this.crudService.findOne(id, locale_id);
    }
    async update(id, updateCategoryDto, file) {
        return await this.crudService.update(id, updateCategoryDto, file);
    }
    async delete(id) {
        return await this.crudService.delete(id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiOperation)({ summary: "Создание категории" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Категория успешно создана",
        example: example_data_1.example_category,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Получение списка категорий в виде дерева с локализацией",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Дерево категорий успешно получено",
        example: example_data_1.example_categories_list_result,
    }),
    (0, swagger_1.ApiQuery)({
        name: "locale_id",
        required: false,
        description: "ID локализации",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CategoryFiltersDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Получение категории с деревом предков и потомков, продуктами и услугами",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Категория успешно получена",
        example: example_data_1.example_extended_category,
    }),
    (0, swagger_1.ApiQuery)({
        name: "locale_id",
        required: false,
        description: "ID локализации",
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)("locale_id", new common_1.ParseUUIDPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiOperation)({ summary: "Обновление категории" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Категория успешно обновлена",
        example: example_data_1.example_extended_category,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Отметить категорию как удаленную" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Категория отмечена как удаленная",
        example: example_data_1.example_category,
    }),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "delete", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)("Categories"),
    (0, common_1.Controller)("categories"),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Forbidden" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:paramtypes", [services_1.CrudService,
        services_1.ListService])
], CategoriesController);
//# sourceMappingURL=controller.js.map