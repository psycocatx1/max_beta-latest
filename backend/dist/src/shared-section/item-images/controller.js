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
exports.ItemImagesController = void 0;
const common_1 = require("@nestjs/common");
const filters_dto_1 = require("./dto/filters.dto");
const crud_service_1 = require("./services/crud.service");
const list_service_1 = require("./services/list.service");
const swagger_1 = require("@nestjs/swagger");
const example_data_1 = require("./example.data");
const dto_1 = require("./dto");
const common_2 = require("../../../libs/common/src");
const prisma_1 = require("../../../libs/prisma/src");
let ItemImagesController = class ItemImagesController {
    listService;
    crudService;
    constructor(listService, crudService) {
        this.listService = listService;
        this.crudService = crudService;
    }
    async getItemImages(filters) {
        return this.listService.getItemImages(filters);
    }
    async getItemImage(id) {
        return this.crudService.findOne(id);
    }
    async createItemImage(data, file) {
        return this.crudService.create(data, file);
    }
    async updateItemImage(id, data, file) {
        return this.crudService.update(id, data, file);
    }
    async deleteItemImage(id) {
        return this.crudService.delete(id);
    }
};
exports.ItemImagesController = ItemImagesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Список картинок объектов успешно получен",
        example: example_data_1.example_item_images_list_result,
    }),
    (0, swagger_1.ApiOperation)({
        summary: "Получение списка картинок объектов с пагинацией и сортировкой",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.ItemImagesFiltersDto]),
    __metadata("design:returntype", Promise)
], ItemImagesController.prototype, "getItemImages", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Получение картинки объекта по id" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Картинка объекта успешно получена",
        example: example_data_1.example_item_image,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemImagesController.prototype, "getItemImage", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiOperation)({ summary: "Создание картинки объекта" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Картинка объекта успешно создана",
        example: example_data_1.example_item_image,
    }),
    (0, swagger_1.ApiQuery)({
        description: "Данные для создания картинки объекта",
        schema: {
            type: "object",
            properties: {
                image: { type: "string" },
                file: { type: "string", format: "binary" },
                product_id: { type: "string" },
                service_id: { type: "string" },
                is_excluded: { type: "boolean" },
            },
            required: ["image"],
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateItemImageDto, Object]),
    __metadata("design:returntype", Promise)
], ItemImagesController.prototype, "createItemImage", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiOperation)({ summary: "Обновление картинки объекта" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Картинка объекта успешно обновлена",
        example: example_data_1.example_item_image,
    }),
    (0, swagger_1.ApiQuery)({
        description: "Данные для обновления картинки объекта",
        schema: {
            type: "object",
            properties: {
                image: { type: "string" },
                file: { type: "string", format: "binary" },
                product_id: { type: "string" },
                service_id: { type: "string" },
                is_excluded: { type: "boolean" },
            },
        },
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateItemImageDto, Object]),
    __metadata("design:returntype", Promise)
], ItemImagesController.prototype, "updateItemImage", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Удаление картинки объекта" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Картинка объекта успешно удалена" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemImagesController.prototype, "deleteItemImage", null);
exports.ItemImagesController = ItemImagesController = __decorate([
    (0, swagger_1.ApiTags)("Картинки объектов"),
    (0, common_1.Controller)("item-images"),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректные данные" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Неавторизованный пользователь" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Картинка объекта не найдена" }),
    __metadata("design:paramtypes", [list_service_1.ListService,
        crud_service_1.CrudService])
], ItemImagesController);
//# sourceMappingURL=controller.js.map