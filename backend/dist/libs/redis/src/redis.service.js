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
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = class RedisService {
    redis;
    constructor(redis) {
        this.redis = redis;
    }
    async onModuleDestroy() {
        await this.redis.quit();
    }
    async createSession(sessionId, sessionData, ttlSeconds = 7 * 24 * 60 * 60) {
        const key = this.getSessionKey(sessionId);
        const userSessionsKey = this.getUserSessionsKey(sessionData.user_id);
        await Promise.all([
            this.redis.setex(key, ttlSeconds, JSON.stringify(sessionData)),
            this.redis.sadd(userSessionsKey, sessionId),
            this.redis.expire(userSessionsKey, ttlSeconds),
        ]);
    }
    async getSession(sessionId) {
        const key = this.getSessionKey(sessionId);
        const data = await this.redis.get(key);
        if (!data)
            return null;
        try {
            const sessionData = JSON.parse(data);
            if (new Date(sessionData.expires_at) < new Date()) {
                await this.deleteSession(sessionId);
                return null;
            }
            return sessionData;
        }
        catch (error) {
            console.error("Ошибка парсинга данных сессии:", error);
            await this.deleteSession(sessionId);
            return null;
        }
    }
    async refreshSession(sessionId, ttlSeconds = 7 * 24 * 60 * 60) {
        const key = this.getSessionKey(sessionId);
        const exists = await this.redis.exists(key);
        if (!exists)
            return false;
        await this.redis.expire(key, ttlSeconds);
        const sessionData = await this.getSession(sessionId);
        if (sessionData) {
            const newExpiresAt = new Date();
            newExpiresAt.setSeconds(newExpiresAt.getSeconds() + ttlSeconds);
            sessionData.expires_at = newExpiresAt.toISOString();
            await this.redis.setex(key, ttlSeconds, JSON.stringify(sessionData));
        }
        return true;
    }
    async deleteSession(sessionId) {
        const sessionData = await this.getSession(sessionId);
        const key = this.getSessionKey(sessionId);
        await this.redis.del(key);
        if (sessionData) {
            const userSessionsKey = this.getUserSessionsKey(sessionData.user_id);
            await this.redis.srem(userSessionsKey, sessionId);
        }
    }
    async deactivateSession(sessionId) {
        const sessionData = await this.getSession(sessionId);
        if (!sessionData)
            return;
        sessionData.is_active = false;
        const key = this.getSessionKey(sessionId);
        const ttl = await this.redis.ttl(key);
        if (ttl > 0)
            await this.redis.setex(key, ttl, JSON.stringify(sessionData));
    }
    async getUserActiveSessions(userId) {
        const userSessionsKey = this.getUserSessionsKey(userId);
        const sessionIds = await this.redis.smembers(userSessionsKey);
        const sessions = [];
        for (const sessionId of sessionIds) {
            const sessionData = await this.getSession(sessionId);
            if (sessionData && sessionData.is_active) {
                sessions.push({ sessionId, data: sessionData });
            }
            else {
                await this.redis.srem(userSessionsKey, sessionId);
            }
        }
        return sessions;
    }
    async deactivateAllOtherSessions(userId, currentSessionId) {
        const userSessionsKey = this.getUserSessionsKey(userId);
        const sessionIds = await this.redis.smembers(userSessionsKey);
        let deactivatedCount = 0;
        for (const sessionId of sessionIds) {
            if (sessionId !== currentSessionId) {
                await this.deactivateSession(sessionId);
                deactivatedCount++;
            }
        }
        return deactivatedCount;
    }
    async cleanupExpiredUserSessions(userId) {
        const userSessionsKey = this.getUserSessionsKey(userId);
        const sessionIds = await this.redis.smembers(userSessionsKey);
        let cleanedCount = 0;
        for (const sessionId of sessionIds) {
            const sessionData = await this.getSession(sessionId);
            if (!sessionData) {
                await this.redis.srem(userSessionsKey, sessionId);
                cleanedCount++;
            }
        }
        return cleanedCount;
    }
    async sessionExists(sessionId) {
        const key = this.getSessionKey(sessionId);
        return (await this.redis.exists(key)) === 1;
    }
    async getSessionTTL(sessionId) {
        const key = this.getSessionKey(sessionId);
        return await this.redis.ttl(key);
    }
    getSessionKey(sessionId) {
        return `session:${sessionId}`;
    }
    getUserSessionsKey(userId) {
        return `user:${userId}:sessions`;
    }
    async getRedisInfo() {
        return await this.redis.info();
    }
    async ping() {
        return await this.redis.ping();
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("REDIS_CONNECTION")),
    __metadata("design:paramtypes", [ioredis_1.Redis])
], RedisService);
//# sourceMappingURL=redis.service.js.map