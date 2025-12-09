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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSessionService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("../../../libs/redis/src");
const uuid_1 = require("uuid");
let RedisSessionService = class RedisSessionService {
    redisService;
    constructor(redisService) {
        this.redisService = redisService;
    }
    async create(createSessionDto) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        const sessionData = {
            user_id: createSessionDto.user_id,
            ip_address: createSessionDto.ip_address,
            user_agent: createSessionDto.user_agent,
            created_at: now.toISOString(),
            expires_at: expiresAt.toISOString(),
            is_active: true,
        };
        const ttlSeconds = 7 * 24 * 60 * 60;
        await this.redisService.createSession(id, sessionData, ttlSeconds);
        return { id, session: sessionData };
    }
    async validateSession(id) {
        const sessionData = await this.redisService.getSession(id);
        if (!sessionData || !sessionData.is_active)
            return null;
        await this.refreshSession(id);
        return sessionData;
    }
    async refreshSession(id, ttlSeconds = 7 * 24 * 60 * 60) {
        return await this.redisService.refreshSession(id, ttlSeconds);
    }
    async deactivateSession(id) {
        await this.redisService.deactivateSession(id);
    }
    async delete(sessionId) {
        await this.redisService.deleteSession(sessionId);
    }
    async deactivateAllOtherSessions(user_id, current_session_id) {
        return await this.redisService.deactivateAllOtherSessions(user_id, current_session_id);
    }
    async getActiveSessions(userId) {
        const sessions = await this.redisService.getUserActiveSessions(userId);
        await this.redisService.cleanupExpiredUserSessions(userId);
        return sessions;
    }
    async getSessionStats() {
        return await this.redisService.getRedisInfo();
    }
    async healthCheck() {
        let redisHealthy = false;
        try {
            const pong = await this.redisService.ping();
            redisHealthy = pong === "PONG";
        }
        catch (error) {
            console.error("Redis health check failed:", error);
        }
        return redisHealthy;
    }
    async countUserActiveSessions(user_id) {
        return (await this.getActiveSessions(user_id)).length;
    }
    async getSessionInfo(id) {
        return await this.redisService.getSession(id);
    }
    async sessionExists(id) {
        return await this.redisService.sessionExists(id);
    }
    async getSessionTTL(id) {
        return await this.redisService.getSessionTTL(id);
    }
};
exports.RedisSessionService = RedisSessionService;
exports.RedisSessionService = RedisSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_1.RedisService])
], RedisSessionService);
//# sourceMappingURL=service.js.map