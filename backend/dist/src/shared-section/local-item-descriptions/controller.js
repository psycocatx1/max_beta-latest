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
exports.LocalItemDescriptionsController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("./services");
const swagger_1 = require("@nestjs/swagger");
const example_data_1 = require("./example.data");
const dto_1 = require("./dto");
const common_2 = require("../../../libs/common/src");
const prisma_1 = require("../../../libs/prisma/src");
let LocalItemDescriptionsController = class LocalItemDescriptionsController {
    listService;
    crudService;
    constructor(listService, crudService) {
        this.listService = listService;
        this.crudService = crudService;
    }
    async getLocalItemDescriptions(filters) {
        return this.listService.getLocalItemDescriptions(filters);
    }
    async getLocalItemDescription(id) {
        return this.crudService.findOne(id);
    }
    async createLocalItemDescription(data, file) {
        return this.crudService.create(data, file);
    }
    async updateLocalItemDescription(id, data, file) {
        return this.crudService.update(id, data, file);
    }
    async deleteLocalItemDescription(id) {
        return this.crudService.delete(id);
    }
    async reindexDescriptions(body) {
        await this.crudService.reindexDescriptions(body.local_product_id, body.local_service_id);
        return { message: "Описания успешно реиндексированы" };
    }
};
exports.LocalItemDescriptionsController = LocalItemDescriptionsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ type: dto_1.LocalItemDescriptionsFiltersDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Список описаний объектов успешно получен",
        example: example_data_1.example_local_item_descriptions_list_result,
    }),
    (0, swagger_1.ApiOperation)({
        summary: "Получение списка описаний объектов с пагинацией и сортировкой",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LocalItemDescriptionsFiltersDto]),
    __metadata("design:returntype", Promise)
], LocalItemDescriptionsController.prototype, "getLocalItemDescriptions", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Получение описания объекта по id" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Описание объекта успешно получено",
        example: example_data_1.example_local_item_description,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalItemDescriptionsController.prototype, "getLocalItemDescription", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiOperation)({ summary: "Создание описания объекта" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Описание объекта успешно создано",
        example: example_data_1.example_local_item_description,
    }),
    (0, swagger_1.ApiQuery)({
        description: "Данные для создания описания объекта",
        schema: {
            type: "object",
            properties: {
                content: { type: "string" },
                title: { type: "string" },
                type: { type: "string", enum: ["TEXT", "IMAGE"] },
                local_product_id: { type: "string" },
                local_service_id: { type: "string" },
                is_excluded: { type: "boolean" },
                file: { type: "string", format: "binary" },
            },
            required: ["title", "type"],
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateLocalItemDescriptionDto, Object]),
    __metadata("design:returntype", Promise)
], LocalItemDescriptionsController.prototype, "createLocalItemDescription", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiOperation)({ summary: "Обновление описания объекта" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Описание объекта успешно обновлено",
        example: example_data_1.example_local_item_description,
    }),
    (0, swagger_1.ApiQuery)({
        description: "Данные для обновления описания объекта",
        schema: {
            type: "object",
            properties: {
                content: { type: "string" },
                title: { type: "string" },
                type: { type: "string", enum: ["TEXT", "IMAGE"] },
                local_product_id: { type: "string" },
                local_service_id: { type: "string" },
                is_excluded: { type: "boolean" },
                file: { type: "string", format: "binary" },
            },
        },
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateLocalItemDescriptionDto, Object]),
    __metadata("design:returntype", Promise)
], LocalItemDescriptionsController.prototype, "updateLocalItemDescription", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Удаление описания объекта" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Описание объекта успешно удалено" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalItemDescriptionsController.prototype, "deleteLocalItemDescription", null);
__decorate([
    (0, common_1.Post)("reindex"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Реиндексация описаний объекта" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Описания успешно реиндексированы",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocalItemDescriptionsController.prototype, "reindexDescriptions", null);
exports.LocalItemDescriptionsController = LocalItemDescriptionsController = __decorate([
    (0, common_1.Controller)("local-item-descriptions"),
    __metadata("design:paramtypes", [services_1.ListService,
        services_1.CrudService])
], LocalItemDescriptionsController);
//# sourceMappingURL=controller.js.map