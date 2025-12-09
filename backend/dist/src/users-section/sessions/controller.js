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
exports.SessionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("./service");
const jwt_auth_guard_1 = require("../../../libs/common/src/guards/jwt-auth.guard");
const prisma_1 = require("../../../libs/prisma/src");
const common_2 = require("../../../libs/common/src");
let SessionsController = class SessionsController {
    redisSessionService;
    constructor(redisSessionService) {
        this.redisSessionService = redisSessionService;
    }
    async getActiveSessions(req, userId) {
        if (userId && req.user.role !== prisma_1.Role.ADMIN)
            throw new common_1.ForbiddenException("Недостаточно прав для просмотра сессий других пользователей");
        const targetUserId = userId && req.user.role === prisma_1.Role.ADMIN ? userId : req.user.user_id;
        return this.redisSessionService.getActiveSessions(targetUserId);
    }
    async getSessionStats(req) {
        if (req.user.role !== prisma_1.Role.ADMIN)
            throw new common_1.ForbiddenException("Недостаточно прав для просмотра статистики");
        return this.redisSessionService.getSessionStats();
    }
    async healthCheck(req) {
        if (req.user.role !== prisma_1.Role.ADMIN)
            throw new common_1.ForbiddenException("Недостаточно прав для проверки состояния системы");
        return this.redisSessionService.healthCheck();
    }
    async refreshSession(id, req) {
        const sessionData = await this.redisSessionService.getSessionInfo(id);
        if (!sessionData || sessionData.user_id !== req.user.user_id)
            throw new common_1.ForbiddenException("Нет доступа к этой сессии");
        const success = await this.redisSessionService.refreshSession(id);
        if (success) {
            const ttl = await this.redisSessionService.getSessionTTL(id);
            return { success: true, ttl };
        }
        return { success: false };
    }
    async deleteSession(id, req) {
        const sessionData = await this.redisSessionService.getSessionInfo(id);
        if (!sessionData || sessionData.user_id !== req.user.user_id)
            throw new common_1.ForbiddenException("Нет доступа к этой сессии");
        await this.redisSessionService.delete(id);
        return { message: "Сессия успешно удалена" };
    }
    async deactivateAllOtherSessions(req) {
        return {
            deactivatedCount: await this.redisSessionService.deactivateAllOtherSessions(req.user.user_id, req.user.session_id),
        };
    }
    async getUserSessionCount(req) {
        return {
            count: await this.redisSessionService.countUserActiveSessions(req.user.user_id),
        };
    }
};
exports.SessionsController = SessionsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Получить активные сессии",
        description: "Возвращает список всех активных сессий пользователя",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Список активных сессий" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("user_id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getActiveSessions", null);
__decorate([
    (0, common_1.Get)("stats"),
    (0, swagger_1.ApiOperation)({
        summary: "Получить статистику сессий",
        description: "Возвращает статистику по сессиям",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Статистика сессий" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getSessionStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.Get)("health"),
    (0, swagger_1.ApiOperation)({
        summary: "Проверить состояние сессий",
        description: "Проверяет состояние системы сессий",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Статус состояния" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.Patch)(":id/refresh"),
    (0, swagger_1.ApiOperation)({
        summary: "Обновить время жизни сессии",
        description: "Продлевает время жизни указанной сессии",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Сессия успешно обновлена" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "refreshSession", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Удалить сессию",
        description: "Удаляет указанную сессию",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Сессия успешно удалена" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "deleteSession", null);
__decorate([
    (0, common_1.Delete)("user/all-other"),
    (0, swagger_1.ApiOperation)({
        summary: "Удалить все другие сессии",
        description: "Деактивирует все сессии пользователя кроме текущей",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Сессии успешно деактивированы" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "deactivateAllOtherSessions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.Get)("count"),
    (0, swagger_1.ApiOperation)({
        summary: "Получить количество активных сессий пользователя",
        description: "Возвращает количество активных сессий текущего пользователя",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Количество активных сессий" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getUserSessionCount", null);
exports.SessionsController = SessionsController = __decorate([
    (0, swagger_1.ApiTags)("Сессии"),
    (0, common_1.Controller)("sessions"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [service_1.RedisSessionService])
], SessionsController);
//# sourceMappingURL=controller.js.map