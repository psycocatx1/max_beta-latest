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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../../libs/common/src");
const update_dto_1 = require("./dto/update.dto");
const filters_dto_1 = require("./dto/filters.dto");
const prisma_1 = require("../../../libs/prisma/src");
const services_1 = require("./services");
let UsersController = class UsersController {
    usersListService;
    usersCrudService;
    constructor(usersListService, usersCrudService) {
        this.usersListService = usersListService;
        this.usersCrudService = usersCrudService;
    }
    async findOne(where) {
        return this.usersCrudService.findOne(where);
    }
    async findAll(filters) {
        return this.usersListService.findAll(filters);
    }
    async me(req) {
        return this.usersCrudService.findOne({ id: req.user.id });
    }
    async update(where, updateUserDto) {
        return this.usersCrudService.update(where, updateUserDto);
    }
    async adminUpdate(where, updateUserDto) {
        return this.usersCrudService.update(where, updateUserDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)("find"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Получить пользователя по ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Данные пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Пользователь не найден" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: "Получить всех пользователей (только для администраторов)",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Список пользователей" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.UserFiltersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Получить данные текущего пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Данные пользователя" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "me", null);
__decorate([
    (0, common_1.Patch)(""),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Обновить данные пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Пользователь обновлен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Пользователь не найден" }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(""),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Обновить данные пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Пользователь обновлен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Пользователь не найден" }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_dto_1.AdminUpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "adminUpdate", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)("users"),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [services_1.UsersListService,
        services_1.UsersCrudService])
], UsersController);
//# sourceMappingURL=controller.js.map