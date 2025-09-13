/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const schedule_1 = __webpack_require__(5);
const prisma_module_1 = __webpack_require__(6);
const redis_1 = __webpack_require__(13);
const products_section_1 = __webpack_require__(17);
const categories_section_1 = __webpack_require__(36);
const users_section_1 = __webpack_require__(107);
const files_module_1 = __webpack_require__(60);
const services_section_1 = __webpack_require__(154);
const shared_section_1 = __webpack_require__(178);
const locales_section_1 = __webpack_require__(147);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            redis_1.RedisModule,
            files_module_1.FilesModule,
            users_section_1.UsersSectionModule,
            products_section_1.ProductsSectionModule,
            categories_section_1.CategoriesSectionModule,
            services_section_1.ServiceSectionModule,
            shared_section_1.SharedSectionModule,
            locales_section_1.LocalesSectionModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(7);
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(3);
const base_filter_dto_1 = __webpack_require__(8);
const client_1 = __webpack_require__(12);
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super();
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    buildQuery(options, default_sort = "created", date_field = "created", custom_filters) {
        const { skip = 0, take = 10, sort, sort_direction = base_filter_dto_1.SortDirection.DESC, start_date, end_date, ...filters } = options;
        const skipValue = Number(skip);
        const takeValue = Number(take);
        if (filters.skip)
            delete filters.skip;
        if (filters.take)
            delete filters.take;
        const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, value]) => {
            if (value === undefined || value === null || value === "")
                return false;
            if (typeof value === "string" && value.trim() === "")
                return false;
            return true;
        }));
        let where = cleanFilters;
        if (custom_filters) {
            const custom_where = custom_filters(options);
            where = { ...where, ...custom_where };
        }
        if (start_date || end_date) {
            const dateFilters = {};
            if (start_date && end_date) {
                dateFilters[date_field] = { gte: start_date, lte: end_date };
            }
            else if (start_date) {
                dateFilters[date_field] = { gte: start_date };
            }
            else if (end_date) {
                dateFilters[date_field] = { lte: end_date };
            }
            where = { ...where, ...dateFilters };
        }
        let orderBy;
        if (sort) {
            if (sort.includes("_asc") || sort.includes("_desc")) {
                const [field, direction] = sort.split("_");
                orderBy = { [field]: direction };
            }
            else {
                orderBy = { [sort]: sort_direction };
            }
        }
        else {
            orderBy = { [default_sort]: "desc" };
        }
        return { skip: skipValue, take: takeValue, where, orderBy };
    }
    async findWithPagination(model, query_options, include = {}) {
        const { skip, take, where, orderBy } = query_options;
        if (where && typeof where === "object") {
            if ("skip" in where)
                delete where.skip;
            if ("take" in where)
                delete where.take;
            if ("search" in where)
                delete where.search;
        }
        const [items, count] = await Promise.all([
            model.findMany({
                skip,
                take,
                where,
                orderBy,
                include,
            }),
            model.count({ where }),
        ]);
        return {
            items: items,
            count,
        };
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseFilterDto = exports.SortDirection = void 0;
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "asc";
    SortDirection["DESC"] = "desc";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
class BaseFilterDto {
    skip = 0;
    take = 10;
    sort;
    sort_direction = SortDirection.DESC;
    start_date;
    end_date;
    is_excluded;
}
exports.BaseFilterDto = BaseFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Number of items to skip",
        required: false,
        default: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseFilterDto.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Number of items to take",
        required: false,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseFilterDto.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sort field", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFilterDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Sort direction",
        required: false,
        enum: SortDirection,
        default: SortDirection.DESC,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortDirection),
    __metadata("design:type", String)
], BaseFilterDto.prototype, "sort_direction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Start date", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseFilterDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "End date", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseFilterDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Is excluded item", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseFilterDto.prototype, "is_excluded", void 0);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(14), exports);
__exportStar(__webpack_require__(15), exports);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisModule = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const redis_service_1 = __webpack_require__(15);
const ioredis_1 = __webpack_require__(16);
let RedisModule = class RedisModule {
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: "REDIS_CONNECTION",
                useFactory: (configService) => {
                    const redis = new ioredis_1.Redis({
                        host: configService.get("REDIS_HOST", "localhost"),
                        port: configService.get("REDIS_PORT", 6379),
                        password: configService.get("REDIS_PASSWORD"),
                        db: configService.get("REDIS_DB", 0),
                        retryDelayOnFailover: 100,
                        maxRetriesPerRequest: 3,
                        lazyConnect: true,
                        keepAlive: 30000,
                        connectTimeout: 10000,
                        commandTimeout: 5000,
                        family: 4,
                    });
                    redis.on("connect", () => {
                        console.log("✅ Redis подключен успешно");
                    });
                    redis.on("error", (err) => {
                        console.error("❌ Ошибка подключения к Redis:", err.message);
                    });
                    redis.on("reconnecting", () => {
                        console.log("🔄 Переподключение к Redis...");
                    });
                    return redis;
                },
                inject: [config_1.ConfigService],
            },
            redis_service_1.RedisService,
        ],
        exports: ["REDIS_CONNECTION", redis_service_1.RedisService],
    })
], RedisModule);


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisService = void 0;
const common_1 = __webpack_require__(3);
const ioredis_1 = __webpack_require__(16);
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
    __metadata("design:paramtypes", [typeof (_a = typeof ioredis_1.Redis !== "undefined" && ioredis_1.Redis) === "function" ? _a : Object])
], RedisService);


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(21), exports);
__exportStar(__webpack_require__(95), exports);


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsSectionModule = void 0;
const prisma_1 = __webpack_require__(19);
const products_1 = __webpack_require__(21);
const common_1 = __webpack_require__(3);
const local_products_1 = __webpack_require__(95);
let ProductsSectionModule = class ProductsSectionModule {
};
exports.ProductsSectionModule = ProductsSectionModule;
exports.ProductsSectionModule = ProductsSectionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, products_1.ProductsModule, local_products_1.LocalProductsModule],
        exports: [products_1.ProductsModule, local_products_1.LocalProductsModule],
    })
], ProductsSectionModule);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(7), exports);
__exportStar(__webpack_require__(8), exports);
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(12), exports);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(22), exports);
__exportStar(__webpack_require__(92), exports);
__exportStar(__webpack_require__(32), exports);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsModule = void 0;
const prisma_1 = __webpack_require__(19);
const controller_1 = __webpack_require__(23);
const crud_service_1 = __webpack_require__(26);
const list_service_1 = __webpack_require__(31);
const common_1 = __webpack_require__(3);
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [controller_1.ProductsController],
        providers: [list_service_1.ListService, crud_service_1.CrudService],
        exports: [list_service_1.ListService, crud_service_1.CrudService],
    })
], ProductsModule);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsController = void 0;
const common_1 = __webpack_require__(3);
const filters_dto_1 = __webpack_require__(24);
const crud_service_1 = __webpack_require__(26);
const list_service_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(11);
const example_data_1 = __webpack_require__(32);
const dto_1 = __webpack_require__(92);
const common_2 = __webpack_require__(48);
const prisma_1 = __webpack_require__(19);
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
    __metadata("design:paramtypes", [typeof (_c = typeof filters_dto_1.ProductFiltersDto !== "undefined" && filters_dto_1.ProductFiltersDto) === "function" ? _c : Object]),
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
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateProductDto !== "undefined" && dto_1.CreateProductDto) === "function" ? _d : Object, typeof (_f = typeof Express !== "undefined" && (_e = Express.Multer) !== void 0 && _e.File) === "function" ? _f : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_g = typeof dto_1.UpdateProductDto !== "undefined" && dto_1.UpdateProductDto) === "function" ? _g : Object, typeof (_j = typeof Express !== "undefined" && (_h = Express.Multer) !== void 0 && _h.File) === "function" ? _j : Object]),
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
    __metadata("design:paramtypes", [typeof (_a = typeof list_service_1.ListService !== "undefined" && list_service_1.ListService) === "function" ? _a : Object, typeof (_b = typeof crud_service_1.CrudService !== "undefined" && crud_service_1.CrudService) === "function" ? _b : Object])
], ProductsController);


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductFiltersDto = void 0;
const class_validator_1 = __webpack_require__(10);
const base_filter_dto_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(9);
const swagger_1 = __webpack_require__(11);
class ProductFiltersDto extends base_filter_dto_1.BaseFilterDto {
    category_id;
    locale_id;
    name;
    description;
    min_price;
    max_price;
    is_discounted;
    is_excluded = false;
}
exports.ProductFiltersDto = ProductFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "ID категории",
        example: "123e4567-e89b-12d3-a456-426614174000",
        required: false,
    }),
    __metadata("design:type", String)
], ProductFiltersDto.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "ID локали",
        example: "123e4567-e89b-12d3-a456-426614174000",
        required: false,
    }),
    __metadata("design:type", String)
], ProductFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Название продукта",
        example: "Продукт 1",
        required: false,
    }),
    __metadata("design:type", String)
], ProductFiltersDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Описание продукта",
        example: "Описание продукта 1",
        required: false,
    }),
    __metadata("design:type", String)
], ProductFiltersDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Минимальная цена продукта",
        example: 1,
        required: false,
    }),
    __metadata("design:type", Number)
], ProductFiltersDto.prototype, "min_price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Максимальная цена продукта",
        example: 100000,
        required: false,
    }),
    __metadata("design:type", Number)
], ProductFiltersDto.prototype, "max_price", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли продукт со скидкой",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], ProductFiltersDto.prototype, "is_discounted", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли продукт исключенным",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], ProductFiltersDto.prototype, "is_excluded", void 0);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseFilterDto = exports.SortDirection = void 0;
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "asc";
    SortDirection["DESC"] = "desc";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
class BaseFilterDto {
    skip = 0;
    take = 10;
    sort;
    sort_direction = SortDirection.DESC;
    start_date;
    end_date;
}
exports.BaseFilterDto = BaseFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Number of items to skip",
        required: false,
        default: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseFilterDto.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Number of items to take",
        required: false,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseFilterDto.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sort field", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFilterDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Sort direction",
        required: false,
        enum: SortDirection,
        default: SortDirection.DESC,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortDirection),
    __metadata("design:type", String)
], BaseFilterDto.prototype, "sort_direction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Start date", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseFilterDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "End date", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseFilterDto.prototype, "end_date", void 0);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CrudService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const files_service_1 = __webpack_require__(27);
const allowed_models_data_1 = __webpack_require__(30);
let CrudService = class CrudService {
    prisma;
    filesService;
    constructor(prisma, filesService) {
        this.prisma = prisma;
        this.filesService = filesService;
    }
    getInclude(locale_id) {
        return {
            images: true,
            category: true,
            local_products: {
                include: { local_item_descriptions: { orderBy: { order: "asc" }, where: { is_excluded: false } } },
                ...(locale_id && { where: { locale_id } }),
            },
        };
    }
    saveImage(data, file, existingProduct) {
        if (!this.filesService.isValidImage(file))
            throw new Error("Недопустимый формат файла. Разрешены только JPEG, PNG и WebP");
        if (!this.filesService.isValidSize(file, 5))
            throw new Error("Размер файла не должен превышать 5 МБ");
        if (existingProduct?.image)
            this.filesService.deleteImage(existingProduct.image);
        data.image = this.filesService.saveImage(file, allowed_models_data_1.images_paths.products);
    }
    async create(data, file) {
        if (await this.prisma.product.findUnique({ where: { name: data.name } }))
            throw new common_1.BadRequestException("Продукт с таким названием уже существует");
        if (file)
            this.saveImage(data, file);
        if (!data.image)
            throw new common_1.BadRequestException("Изображение обязательно");
        if (!data.category_id)
            throw new common_1.BadRequestException("Категория обязательна");
        const category = await this.prisma.category.findUnique({
            where: { id: data.category_id },
        });
        if (!category)
            throw new common_1.BadRequestException("Категория не найдена");
        if (category.type !== "PRODUCT")
            throw new common_1.BadRequestException("Категория должна быть типа PRODUCT");
        return await this.prisma.product.create({
            data: { ...data, image: data.image },
            include: this.getInclude(),
        });
    }
    async findOne(id, locale_id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: this.getInclude(locale_id),
        });
        if (!product)
            throw new common_1.NotFoundException("Product not found");
        return product;
    }
    async update(id, data, file) {
        const existingProduct = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!existingProduct)
            throw new common_1.NotFoundException("Product not found");
        if (file)
            this.saveImage(data, file, existingProduct);
        if (data.category_id) {
            const category = await this.prisma.category.findUnique({
                where: { id: data.category_id },
            });
            if (!category)
                throw new common_1.BadRequestException("Категория не найдена");
            if (category.type !== "PRODUCT")
                throw new common_1.BadRequestException("Категория должна быть типа PRODUCT");
        }
        return this.prisma.product.update({
            where: { id },
            data: { ...data, image: data.image },
            include: this.getInclude(),
        });
    }
    async delete(id) {
        return (await this.findOne(id)).is_excluded
            ? await this.prisma.product.delete({ where: { id } })
            : await this.update(id, { is_excluded: true });
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof files_service_1.FilesService !== "undefined" && files_service_1.FilesService) === "function" ? _b : Object])
], CrudService);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesService = void 0;
const common_1 = __webpack_require__(3);
const path = __webpack_require__(28);
const fs = __webpack_require__(29);
const allowed_models_data_1 = __webpack_require__(30);
let FilesService = class FilesService {
    uploadPath = "uploads";
    constructor() {
        this.ensureUploadDir();
    }
    ensureUploadDir() {
        if (!fs.existsSync(this.uploadPath)) {
            fs.mkdirSync(this.uploadPath, { recursive: true });
        }
        const modelDirectories = Object.values(allowed_models_data_1.images_paths);
        modelDirectories.forEach((dir) => {
            const modelDir = path.join(this.uploadPath, dir);
            if (!fs.existsSync(modelDir)) {
                fs.mkdirSync(modelDir, { recursive: true });
            }
        });
    }
    saveImage(file, model_name) {
        if (!allowed_models_data_1.images_paths[model_name]) {
            throw new Error(`Недопустимая модель: ${model_name}`);
        }
        const cleanOriginalName = file.originalname
            .replace(/[^a-zA-Z0-9.-]/g, "_")
            .replace(/_+/g, "_")
            .replace(/^_|_$/g, "");
        const singularModel = model_name.endsWith("s")
            ? model_name.slice(0, -1)
            : model_name;
        const fileName = `${singularModel}_${Date.now()}_${cleanOriginalName}`;
        const filePath = path.join(this.uploadPath, model_name, fileName);
        fs.writeFileSync(filePath, file.buffer);
        return `/static/${allowed_models_data_1.images_paths[model_name]}/${fileName}`;
    }
    deleteImage(imagePath) {
        if (!imagePath || !imagePath.startsWith("/static/")) {
            return;
        }
        const filePath = path.join(this.uploadPath, imagePath.replace("/static/", ""));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    isValidImage(file) {
        const allowedMimeTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];
        return allowedMimeTypes.includes(file.mimetype);
    }
    isValidSize(file, maxSizeInMB = 5) {
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        return file.size <= maxSizeInBytes;
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FilesService);


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.images_paths = void 0;
var images_paths;
(function (images_paths) {
    images_paths["categories"] = "categories";
    images_paths["locales"] = "locales";
    images_paths["products"] = "products";
    images_paths["users"] = "users";
    images_paths["item_images"] = "item_images";
    images_paths["local_item_descriptions"] = "local_item_descriptions";
    images_paths["services"] = "services";
})(images_paths || (exports.images_paths = images_paths = {}));


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
let ListService = class ListService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProducts(filterDto) {
        const { category_id, name, description, min_price, max_price, is_discounted, is_excluded, skip = 0, take = 10, locale_id, sort = "created", sort_direction = "desc", } = filterDto;
        let where = {};
        if (category_id) {
            where = {
                OR: [{ category_id }, { category: { parent_id: category_id } }],
            };
        }
        if (name)
            where.name = { contains: name, mode: "insensitive" };
        if (description)
            where.description = { contains: description, mode: "insensitive" };
        if (min_price)
            where.price_USD = { gte: min_price };
        if (max_price)
            where.price_USD = { lte: max_price };
        if (is_discounted !== undefined)
            where.discount_price_USD = { not: null };
        if (is_excluded)
            where.is_excluded = is_excluded;
        const items = await this.prisma.product.findMany({
            where,
            skip,
            take,
            orderBy: { [sort]: sort_direction },
            include: {
                images: true,
                category: true,
                local_products: locale_id
                    ? {
                        where: locale_id ? { locale_id } : undefined,
                        include: {
                            local_item_descriptions: { orderBy: { order: "asc" } },
                        },
                    }
                    : false,
            },
        });
        const total = await this.prisma.product.count({ where });
        return {
            items: items,
            total,
            skip,
            take,
        };
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ListService);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.example_product_list_result = exports.example_extended_product = exports.example_product = void 0;
const example_data_1 = __webpack_require__(33);
exports.example_product = {
    id: "UUID",
    name: "Example Product Name",
    description: "Description of the product for notes",
    price_USD: 100,
    discount_price_USD: 80,
    created: new Date(),
    updated: new Date(),
    category_id: "UUID",
    image: "https://example.com/image.jpg",
    is_excluded: false,
};
exports.example_extended_product = {
    ...exports.example_product,
    images: [],
    local_products: [],
    category: example_data_1.example_category,
};
exports.example_product_list_result = {
    items: [exports.example_extended_product],
    total: 1,
    skip: 0,
    take: 10,
};


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.example_categories_list_result = exports.example_extended_category = exports.example_category = void 0;
const prisma_1 = __webpack_require__(19);
const example_data_1 = __webpack_require__(32);
const example_data_2 = __webpack_require__(34);
exports.example_category = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Название категории",
    description: "Описание категории",
    image: "https://example.com/image.jpg",
    type: prisma_1.CategoryType.PRODUCT,
    created: new Date(),
    updated: new Date(),
    is_excluded: false,
    parent_id: null,
};
exports.example_extended_category = {
    ...exports.example_category,
    parent: null,
    ancestors: [],
    children: [
        {
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "Подкатегория 1",
            description: "Описание подкатегории",
            image: "https://example.com/subcategory1.jpg",
            type: prisma_1.CategoryType.PRODUCT,
            created: new Date(),
            updated: new Date(),
            is_excluded: false,
            parent_id: "123e4567-e89b-12d3-a456-426614174000",
            _count: {
                products: 5,
                services: 0,
            },
        },
    ],
    products: [example_data_1.example_product],
    services: [],
    local_categories: [example_data_2.example_local_category],
};
exports.example_categories_list_result = {
    items: [
        {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Категория 1",
            description: "Описание категории 1",
            image: "https://example.com/category1.jpg",
            type: prisma_1.CategoryType.PRODUCT,
            created: new Date(),
            updated: new Date(),
            is_excluded: false,
            parent_id: null,
            _count: {
                products: 10,
                services: 0,
            },
            children: [
                {
                    id: "123e4567-e89b-12d3-a456-426614174001",
                    name: "Подкатегория 1.1",
                    description: "Описание подкатегории 1.1",
                    image: "https://example.com/subcategory1_1.jpg",
                    type: prisma_1.CategoryType.PRODUCT,
                    created: new Date(),
                    updated: new Date(),
                    is_excluded: false,
                    parent_id: "123e4567-e89b-12d3-a456-426614174000",
                    _count: {
                        products: 5,
                        services: 0,
                    },
                },
            ],
        },
        {
            id: "123e4567-e89b-12d3-a456-426614174002",
            name: "Категория 2",
            description: "Описание категории 2",
            image: "https://example.com/category2.jpg",
            type: prisma_1.CategoryType.SERVICE,
            created: new Date(),
            updated: new Date(),
            is_excluded: false,
            parent_id: null,
            _count: {
                products: 0,
                services: 8,
            },
            children: [],
        },
    ],
    total: 2,
    skip: 0,
    take: 10,
};


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.example_local_categories_list_result = exports.example_extended_local_category = exports.example_local_category = void 0;
const example_data_1 = __webpack_require__(35);
const __1 = __webpack_require__(36);
exports.example_local_category = {
    description: "Локализованное описание категории",
    name: "Название категории",
    id: "123e4567-e89b-12d3-a456-426614174000",
    created: new Date(),
    updated: new Date(),
    category_id: "123e4567-e89b-12d3-a456-426614174000",
    locale_id: example_data_1.example_locale.id,
    is_excluded: false,
};
exports.example_extended_local_category = {
    ...exports.example_local_category,
    category: __1.example_category,
    locale: example_data_1.example_locale,
};
exports.example_local_categories_list_result = {
    items: [exports.example_local_category],
    total: 1,
    skip: 0,
    take: 10,
};


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.example_locales_list_result = exports.example_locale = void 0;
exports.example_locale = {
    id: "UUID",
    name: "Россия",
    language: "Русский",
    symbol: "RU",
    currency: "Рубль",
    currency_symbol: "₽",
    phone_code: "+7",
    image: "https://example.com/icon.png",
    is_excluded: false,
    created: new Date(),
    updated: new Date(),
};
exports.example_locales_list_result = {
    items: [exports.example_locale],
    total: 1,
    take: 10,
    skip: 0,
};


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(37), exports);
__exportStar(__webpack_require__(61), exports);
__exportStar(__webpack_require__(91), exports);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(38), exports);
__exportStar(__webpack_require__(43), exports);
__exportStar(__webpack_require__(33), exports);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesModule = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const services_1 = __webpack_require__(39);
const controller_1 = __webpack_require__(42);
const files_module_1 = __webpack_require__(60);
let CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, files_module_1.FilesModule],
        providers: [services_1.CrudService, services_1.ListService],
        controllers: [controller_1.CategoriesController],
        exports: [services_1.CrudService, services_1.ListService],
    })
], CategoriesModule);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListService = exports.CrudService = void 0;
var crud_service_1 = __webpack_require__(40);
Object.defineProperty(exports, "CrudService", ({ enumerable: true, get: function () { return crud_service_1.CrudService; } }));
var list_service_1 = __webpack_require__(41);
Object.defineProperty(exports, "ListService", ({ enumerable: true, get: function () { return list_service_1.ListService; } }));


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CrudService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const allowed_models_data_1 = __webpack_require__(30);
const files_service_1 = __webpack_require__(27);
let CrudService = class CrudService {
    prisma;
    filesService;
    constructor(prisma, filesService) {
        this.prisma = prisma;
        this.filesService = filesService;
    }
    saveImage(data, file) {
        if (!this.filesService.isValidImage(file))
            throw new common_1.BadRequestException("Недопустимый формат файла. Разрешены только JPEG, PNG и WebP");
        if (!this.filesService.isValidSize(file, 5))
            throw new common_1.BadRequestException("Размер файла не должен превышать 5 МБ");
        data.image = this.filesService.saveImage(file, allowed_models_data_1.images_paths.categories);
    }
    async create(data, file) {
        if (file)
            this.saveImage(data, file);
        if (!data.image)
            throw new common_1.BadRequestException("Изображение обязательно");
        if (data.parent_id) {
            const parentCategory = await this.prisma.category.findUnique({
                where: { id: data.parent_id, is_excluded: false },
            });
            if (!parentCategory)
                throw new common_1.NotFoundException("Родительская категория не найдена или удалена");
            if (parentCategory.type !== data.type)
                throw new common_1.BadRequestException("Тип категории должен совпадать с типом родительской категории");
        }
        return await this.prisma.category.create({
            data: { ...data, parent_id: data.parent_id?.length && data.parent_id.length > 0 ? data.parent_id : null },
            include: {
                parent: true,
                children: true,
                local_categories: true,
            },
        });
    }
    async findOneInternal(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                parent: true,
                children: true,
                local_categories: true,
                products: true,
                services: true,
            },
        });
        if (!category)
            throw new common_1.NotFoundException("Категория не найдена");
        return category;
    }
    async update(id, data, file) {
        if (file)
            this.saveImage(data, file);
        if (!data.image)
            throw new common_1.BadRequestException("Изображение обязательно");
        const existingCategory = await this.findOneInternal(id);
        if (data.parent_id) {
            const parentCategory = await this.prisma.category.findUnique({
                where: { id: data.parent_id, is_excluded: false },
            });
            if (!parentCategory)
                throw new common_1.NotFoundException("Родительская категория не найдена или удалена");
            const categoryType = data.type || existingCategory.type;
            if (parentCategory.type !== categoryType)
                throw new common_1.BadRequestException("Тип категории должен совпадать с типом родительской категории");
            if (data.parent_id === id)
                throw new common_1.BadRequestException("Категория не может быть родительской для самой себя");
        }
        return await this.prisma.category.update({
            where: { id },
            data,
            include: {
                parent: true,
                children: true,
                local_categories: true,
            },
        });
    }
    async delete(id) {
        const category = await this.findOneInternal(id);
        if (category.children.length > 0)
            throw new common_1.BadRequestException("Нельзя удалить категорию, у которой есть дочерние категории");
        return await this.prisma.category.update({
            where: { id },
            data: { is_excluded: true },
        });
    }
    async findOne(id, locale_id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                parent: true,
                children: {
                    where: { is_excluded: false },
                    include: {
                        local_categories: locale_id ? { where: { locale_id } } : true,
                        _count: {
                            select: {
                                products: { where: { is_excluded: false } },
                                services: { where: { is_excluded: false } },
                            },
                        },
                    },
                },
                local_categories: locale_id ? { where: { locale_id } } : true,
                products: {
                    where: { is_excluded: false },
                    include: {
                        local_products: locale_id ? { where: { locale_id } } : true,
                        images: true,
                    },
                },
                services: {
                    where: { is_excluded: false },
                    include: {
                        local_services: locale_id ? { where: { locale_id } } : true,
                        images: true,
                    },
                },
            },
        });
        if (!category)
            throw new common_1.NotFoundException("Категория не найдена");
        const ancestors = await this.buildAncestorTree(category.parent_id, locale_id);
        const localizedCategory = this.applyLocalization(category, locale_id);
        const childrenWithRecursiveCounts = await this.applyRecursiveCounts(category.children.map((child) => this.applyLocalization(child, locale_id)));
        return {
            ...localizedCategory,
            ancestors,
            children: childrenWithRecursiveCounts,
        };
    }
    applyLocalization(category, locale_id) {
        if (!locale_id ||
            !category.local_categories ||
            category.local_categories.length === 0)
            return category;
        const localization = category.local_categories[0];
        return {
            ...category,
            name: localization?.name || category.name,
            description: localization?.description || category.description,
        };
    }
    async buildAncestorTree(parentId, locale_id) {
        if (!parentId)
            return [];
        const parent = await this.prisma.category.findUnique({
            where: { id: parentId, is_excluded: false },
            include: {
                parent: true,
                local_categories: locale_id ? { where: { locale_id } } : true,
                _count: {
                    select: {
                        products: { where: { is_excluded: false } },
                        services: { where: { is_excluded: false } },
                    },
                },
            },
        });
        if (!parent)
            return [];
        const ancestors = await this.buildAncestorTree(parent.parent_id, locale_id);
        const localizedParent = this.applyLocalization(parent, locale_id);
        return [...ancestors, localizedParent];
    }
    async calculateTotalCounts(id) {
        const directCounts = await this.prisma.category.findUnique({
            where: { id },
            select: {
                _count: {
                    select: {
                        products: { where: { is_excluded: false } },
                        services: { where: { is_excluded: false } },
                    },
                },
            },
        });
        const children = await this.prisma.category.findMany({
            where: {
                parent_id: id,
                is_excluded: false,
            },
            select: { id: true },
        });
        let totalProducts = directCounts?._count.products || 0;
        let totalServices = directCounts?._count.services || 0;
        for (const child of children) {
            const childCounts = await this.calculateTotalCounts(child.id);
            totalProducts += childCounts.products;
            totalServices += childCounts.services;
        }
        return { products: totalProducts, services: totalServices };
    }
    async applyRecursiveCounts(categories) {
        return await Promise.all(categories.map(async (category) => {
            const totalCounts = await this.calculateTotalCounts(category.id);
            return {
                ...category,
                _count: {
                    products: totalCounts.products,
                    services: totalCounts.services,
                },
                children: category.children
                    ? await this.applyRecursiveCounts(category.children)
                    : [],
            };
        }));
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof files_service_1.FilesService !== "undefined" && files_service_1.FilesService) === "function" ? _b : Object])
], CrudService);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
let ListService = class ListService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    customFilters = (options) => {
        const { search, type, parent_id, is_excluded } = options;
        const filters = {};
        if (search) {
            filters.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }
        if (type)
            filters.type = type;
        if (parent_id)
            filters.parent_id = parent_id;
        if (is_excluded !== undefined)
            filters.is_excluded = is_excluded;
        return filters;
    };
    async getDefaultLocalization(categoryId) {
        const defaultLocale = await this.prisma.locale.findFirst({
            where: { symbol: "US" },
        });
        if (!defaultLocale)
            return null;
        return await this.prisma.localCategory.findFirst({
            where: { category_id: categoryId, locale_id: defaultLocale.id },
        });
    }
    applyLocalization(category, locale_id) {
        if (!locale_id ||
            !category.local_categories ||
            category.local_categories.length === 0)
            return category;
        const localization = category.local_categories[0];
        return {
            ...category,
            name: localization?.name || category.name,
            description: localization?.description || category.description,
        };
    }
    buildCategoryTree(categories) {
        const categoryMap = new Map();
        const rootCategories = [];
        categories.forEach((category) => {
            categoryMap.set(category.id, { ...category, children: [] });
        });
        categories.forEach((category) => {
            if (category.parent_id) {
                const parent = categoryMap.get(category.parent_id);
                if (parent)
                    parent.children.push(categoryMap.get(category.id));
            }
            else {
                rootCategories.push(categoryMap.get(category.id));
            }
        });
        return rootCategories;
    }
    async calculateTotalCounts(categoryId) {
        const directCounts = await this.prisma.category.findUnique({
            where: { id: categoryId },
            select: {
                _count: {
                    select: {
                        products: { where: { is_excluded: false } },
                        services: { where: { is_excluded: false } },
                    },
                },
            },
        });
        const children = await this.prisma.category.findMany({
            where: { parent_id: categoryId, is_excluded: false },
            select: { id: true },
        });
        let totalProducts = directCounts?._count.products || 0;
        let totalServices = directCounts?._count.services || 0;
        if (children.length > 0) {
            const childrenCounts = await Promise.all(children.map((child) => this.calculateTotalCounts(child.id)));
            childrenCounts.forEach((counts) => {
                totalProducts += counts.products;
                totalServices += counts.services;
            });
        }
        return {
            products: totalProducts,
            services: totalServices,
        };
    }
    async applyRecursiveCounts(categories) {
        return await Promise.all(categories.map(async (category) => {
            const totalCounts = await this.calculateTotalCounts(category.id);
            return {
                ...category,
                _count: {
                    products: totalCounts.products,
                    services: totalCounts.services,
                },
                children: category.children
                    ? await this.applyRecursiveCounts(category.children)
                    : [],
            };
        }));
    }
    async findAll(filterDto) {
        const { locale_id, parent_id, ...restFilters } = filterDto;
        const queryOptions = this.prisma.buildQuery(restFilters, "created", "created", this.customFilters);
        const allCategories = await this.prisma.category.findMany({
            where: {
                ...queryOptions.where,
                is_excluded: false,
            },
            include: {
                parent: true,
                local_categories: locale_id ? { where: { locale_id } } : true,
                _count: {
                    select: {
                        products: { where: { is_excluded: false } },
                        services: { where: { is_excluded: false } },
                    },
                },
            },
            orderBy: queryOptions.orderBy,
        });
        const localizedCategories = await Promise.all(allCategories.map(async (category) => {
            let localizedCategory = this.applyLocalization(category, locale_id);
            if (locale_id &&
                (!category.local_categories || category.local_categories.length === 0)) {
                const defaultLocalization = await this.getDefaultLocalization(category.id);
                if (defaultLocalization) {
                    localizedCategory = {
                        ...localizedCategory,
                        name: defaultLocalization.name,
                        description: defaultLocalization.description,
                    };
                }
            }
            return localizedCategory;
        }));
        const categoryTree = this.buildCategoryTree(localizedCategories);
        const categoriesWithCounts = await this.applyRecursiveCounts(categoryTree);
        let resultCategories = categoriesWithCounts;
        if (parent_id) {
            const findParentCategory = (categories, targetId) => {
                for (const category of categories) {
                    if (category.id === targetId)
                        return category.children;
                    if (category.children?.length) {
                        const found = findParentCategory(category.children, targetId);
                        if (found)
                            return found;
                    }
                }
                return null;
            };
            resultCategories =
                findParentCategory(categoriesWithCounts, parent_id) || [];
        }
        const paginatedCategories = resultCategories.slice(queryOptions.skip, queryOptions.skip + queryOptions.take);
        return {
            items: paginatedCategories,
            total: resultCategories.length,
            skip: queryOptions.skip,
            take: queryOptions.take,
        };
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ListService);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesController = void 0;
const common_1 = __webpack_require__(3);
const services_1 = __webpack_require__(39);
const dto_1 = __webpack_require__(43);
const swagger_1 = __webpack_require__(11);
const example_data_1 = __webpack_require__(33);
const common_2 = __webpack_require__(48);
const prisma_1 = __webpack_require__(19);
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
    __metadata("design:paramtypes", [typeof (_c = typeof dto_1.CreateCategoryDto !== "undefined" && dto_1.CreateCategoryDto) === "function" ? _c : Object, typeof (_e = typeof Express !== "undefined" && (_d = Express.Multer) !== void 0 && _d.File) === "function" ? _e : Object]),
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
    __metadata("design:paramtypes", [typeof (_f = typeof dto_1.CategoryFiltersDto !== "undefined" && dto_1.CategoryFiltersDto) === "function" ? _f : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_g = typeof dto_1.UpdateCategoryDto !== "undefined" && dto_1.UpdateCategoryDto) === "function" ? _g : Object, typeof (_j = typeof Express !== "undefined" && (_h = Express.Multer) !== void 0 && _h.File) === "function" ? _j : Object]),
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
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.CrudService !== "undefined" && services_1.CrudService) === "function" ? _a : Object, typeof (_b = typeof services_1.ListService !== "undefined" && services_1.ListService) === "function" ? _b : Object])
], CategoriesController);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(44), exports);
__exportStar(__webpack_require__(45), exports);
__exportStar(__webpack_require__(47), exports);


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCategoryDto = void 0;
const class_validator_1 = __webpack_require__(10);
const prisma_1 = __webpack_require__(19);
const swagger_1 = __webpack_require__(11);
class CreateCategoryDto {
    name;
    description;
    image;
    type;
    parent_id;
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)({
        description: "Название категории",
        example: "Категория 1",
        maxLength: 512,
        minLength: 3,
    }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(4096),
    (0, swagger_1.ApiProperty)({
        description: "Описание категории",
        example: "Описание категории 1",
        required: false,
        maxLength: 4096,
        minLength: 3,
    }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Ссылка на изображение категории",
        example: "https://example.com/image.jpg",
        required: false,
    }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(prisma_1.CategoryType),
    (0, swagger_1.ApiProperty)({
        description: "Тип категории",
        enum: prisma_1.CategoryType,
        default: prisma_1.CategoryType.PRODUCT,
    }),
    __metadata("design:type", typeof (_a = typeof prisma_1.CategoryType !== "undefined" && prisma_1.CategoryType) === "function" ? _a : Object)
], CreateCategoryDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "ID родительской категории", required: false }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "parent_id", void 0);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCategoryDto = void 0;
const create_dto_1 = __webpack_require__(44);
const mapped_types_1 = __webpack_require__(46);
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
class UpdateCategoryDto extends (0, mapped_types_1.PartialType)(create_dto_1.CreateCategoryDto) {
    is_excluded;
}
exports.UpdateCategoryDto = UpdateCategoryDto;
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({
        description: "Исключена ли категория",
        required: false,
        example: false,
    }),
    __metadata("design:type", Boolean)
], UpdateCategoryDto.prototype, "is_excluded", void 0);


/***/ }),
/* 46 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryFiltersDto = void 0;
const class_validator_1 = __webpack_require__(10);
const prisma_1 = __webpack_require__(19);
const base_filter_dto_1 = __webpack_require__(25);
const swagger_1 = __webpack_require__(11);
const class_transformer_1 = __webpack_require__(9);
class CategoryFiltersDto extends base_filter_dto_1.BaseFilterDto {
    search;
    type;
    parent_id;
    locale_id;
    is_excluded = false;
}
exports.CategoryFiltersDto = CategoryFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Название категории", required: false }),
    __metadata("design:type", String)
], CategoryFiltersDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(prisma_1.CategoryType),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Тип категории",
        enum: prisma_1.CategoryType,
        required: false,
        default: prisma_1.CategoryType.PRODUCT,
    }),
    __metadata("design:type", typeof (_a = typeof prisma_1.CategoryType !== "undefined" && prisma_1.CategoryType) === "function" ? _a : Object)
], CategoryFiltersDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "ID родительской категории", required: false }),
    __metadata("design:type", String)
], CategoryFiltersDto.prototype, "parent_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({ description: "ID локализации", required: false }),
    __metadata("design:type", String)
], CategoryFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли категория исключенной",
        example: false,
    }),
    __metadata("design:type", Boolean)
], CategoryFiltersDto.prototype, "is_excluded", void 0);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(49), exports);
__exportStar(__webpack_require__(54), exports);
__exportStar(__webpack_require__(57), exports);


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(50), exports);
__exportStar(__webpack_require__(52), exports);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(51);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)("jwt") {
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user) {
        if (err || !user)
            throw (err ||
                new common_1.UnauthorizedException("Доступ запрещен. Пожалуйста, авторизуйтесь."));
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 51 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const roles_decorator_1 = __webpack_require__(53);
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles)
            return true;
        const { user } = context
            .switchToHttp()
            .getRequest();
        if (!user)
            throw new common_1.ForbiddenException("Доступ запрещен");
        const hasRole = requiredRoles.some((role) => user.role === role);
        if (!hasRole)
            throw new common_1.ForbiddenException("У вас нет прав для выполнения этого действия");
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.ROLES_KEY = "roles";
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth = exports.AdminOnly = exports.ROLES_KEY = exports.Roles = void 0;
var roles_decorator_1 = __webpack_require__(53);
Object.defineProperty(exports, "Roles", ({ enumerable: true, get: function () { return roles_decorator_1.Roles; } }));
Object.defineProperty(exports, "ROLES_KEY", ({ enumerable: true, get: function () { return roles_decorator_1.ROLES_KEY; } }));
var admin_only_decorator_1 = __webpack_require__(55);
Object.defineProperty(exports, "AdminOnly", ({ enumerable: true, get: function () { return admin_only_decorator_1.AdminOnly; } }));
var auth_decorator_1 = __webpack_require__(56);
Object.defineProperty(exports, "Auth", ({ enumerable: true, get: function () { return auth_decorator_1.Auth; } }));


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminOnly = AdminOnly;
const common_1 = __webpack_require__(3);
const guards_1 = __webpack_require__(49);
const roles_decorator_1 = __webpack_require__(53);
const client_1 = __webpack_require__(12);
function AdminOnly() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN));
}


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth = void 0;
const common_1 = __webpack_require__(3);
exports.Auth = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
});


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(58), exports);


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageUploadInterceptor = void 0;
exports.createImageUploadInterceptor = createImageUploadInterceptor;
const common_1 = __webpack_require__(3);
const platform_express_1 = __webpack_require__(59);
function createImageUploadInterceptor(fieldName = "file", config = {}) {
    const { maxFileSize = 5 * 1024 * 1024, allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"], } = config;
    return (0, platform_express_1.FileInterceptor)(fieldName, {
        limits: {
            fileSize: maxFileSize,
        },
        fileFilter: (req, file, callback) => {
            if (allowedMimeTypes.includes(file.mimetype)) {
                callback(null, true);
            }
            else {
                const allowedFormats = allowedMimeTypes
                    .map((type) => type.replace("image/", "").toUpperCase())
                    .join(", ");
                callback(new common_1.BadRequestException(`Недопустимый формат файла. Разрешены только: ${allowedFormats}`), false);
            }
        },
    });
}
exports.ImageUploadInterceptor = createImageUploadInterceptor();


/***/ }),
/* 59 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesModule = void 0;
const common_1 = __webpack_require__(3);
const files_service_1 = __webpack_require__(27);
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [files_service_1.FilesService],
        exports: [files_service_1.FilesService],
    })
], FilesModule);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalCategoriesModule = void 0;
var module_1 = __webpack_require__(62);
Object.defineProperty(exports, "LocalCategoriesModule", ({ enumerable: true, get: function () { return module_1.LocalCategoriesModule; } }));
__exportStar(__webpack_require__(77), exports);
__exportStar(__webpack_require__(34), exports);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalCategoriesModule = void 0;
const common_1 = __webpack_require__(3);
const controller_1 = __webpack_require__(63);
const services_1 = __webpack_require__(64);
const prisma_1 = __webpack_require__(19);
const module_1 = __webpack_require__(38);
const module_2 = __webpack_require__(81);
let LocalCategoriesModule = class LocalCategoriesModule {
};
exports.LocalCategoriesModule = LocalCategoriesModule;
exports.LocalCategoriesModule = LocalCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, module_1.CategoriesModule, module_2.LocalesModule],
        providers: [services_1.CrudService, services_1.ListService],
        controllers: [controller_1.LocalCategoriesController],
        exports: [services_1.CrudService, services_1.ListService],
    })
], LocalCategoriesModule);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalCategoriesController = void 0;
const common_1 = __webpack_require__(3);
const services_1 = __webpack_require__(64);
const dto_1 = __webpack_require__(77);
const common_2 = __webpack_require__(48);
const prisma_1 = __webpack_require__(19);
const swagger_1 = __webpack_require__(11);
const example_data_1 = __webpack_require__(34);
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
    __metadata("design:paramtypes", [typeof (_c = typeof dto_1.CreateLocalCategoryDto !== "undefined" && dto_1.CreateLocalCategoryDto) === "function" ? _c : Object]),
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
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.LocalCategoryFiltersDto !== "undefined" && dto_1.LocalCategoryFiltersDto) === "function" ? _d : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_e = typeof dto_1.UpdateLocalCategoryDto !== "undefined" && dto_1.UpdateLocalCategoryDto) === "function" ? _e : Object]),
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
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.CrudService !== "undefined" && services_1.CrudService) === "function" ? _a : Object, typeof (_b = typeof services_1.ListService !== "undefined" && services_1.ListService) === "function" ? _b : Object])
], LocalCategoriesController);


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListService = exports.CrudService = void 0;
var crud_service_1 = __webpack_require__(65);
Object.defineProperty(exports, "CrudService", ({ enumerable: true, get: function () { return crud_service_1.CrudService; } }));
var list_service_1 = __webpack_require__(76);
Object.defineProperty(exports, "ListService", ({ enumerable: true, get: function () { return list_service_1.ListService; } }));


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CrudService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const services_1 = __webpack_require__(39);
const services_2 = __webpack_require__(66);
let CrudService = class CrudService {
    prisma;
    categoryService;
    localeService;
    constructor(prisma, categoryService, localeService) {
        this.prisma = prisma;
        this.categoryService = categoryService;
        this.localeService = localeService;
    }
    async create(data) {
        await Promise.all([
            this.categoryService.findOne(data.category_id),
            this.localeService.findOne({ id: data.locale_id }),
        ]);
        return await this.prisma.localCategory.create({
            data,
            include: {
                category: true,
                locale: true,
            },
        });
    }
    async update(id, data) {
        const local_category = await this.findOne(id);
        return await this.prisma.localCategory.update({
            where: { id: local_category.id },
            data,
            include: {
                category: true,
                locale: true,
            },
        });
    }
    async delete(id) {
        const local_category = await this.findOne(id);
        return await this.prisma.localCategory.update({
            where: { id: local_category.id },
            data: { is_excluded: true },
        });
    }
    async findOne(id) {
        const local_category = await this.prisma.localCategory.findUnique({
            where: { id },
            include: {
                category: true,
                locale: true,
            },
        });
        if (!local_category)
            throw new common_1.NotFoundException("Локальная категория не найдена");
        return local_category;
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof services_1.CrudService !== "undefined" && services_1.CrudService) === "function" ? _b : Object, typeof (_c = typeof services_2.CrudService !== "undefined" && services_2.CrudService) === "function" ? _c : Object])
], CrudService);


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(67), exports);
__exportStar(__webpack_require__(72), exports);
__exportStar(__webpack_require__(73), exports);


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CrudService = void 0;
const prisma_1 = __webpack_require__(19);
const common_1 = __webpack_require__(3);
const files_service_1 = __webpack_require__(27);
const services_1 = __webpack_require__(68);
let CrudService = class CrudService {
    prisma;
    filesService;
    translationsService;
    constructor(prisma, filesService, translationsService) {
        this.prisma = prisma;
        this.filesService = filesService;
        this.translationsService = translationsService;
    }
    saveImage(data, file) {
        if (!this.filesService.isValidImage(file))
            throw new common_1.BadRequestException("Недопустимый формат файла. Разрешены только JPEG, PNG и WebP");
        if (!this.filesService.isValidSize(file, 5))
            throw new common_1.BadRequestException("Размер файла не должен превышать 5 МБ");
        data.image = this.filesService.saveImage(file, "locales");
    }
    async create(data, file) {
        if (file)
            this.saveImage(data, file);
        if (!data.image)
            throw new common_1.BadRequestException("Изображение обязательно");
        const locale = await this.prisma.locale.create({
            data: { ...data, image: data.image },
        });
        try {
            console.log(`Создание файлов переводов для локализации ${locale.symbol}`);
            const syncResult = await this.translationsService.createLocaleFiles(locale.symbol);
            if (!syncResult.success)
                console.error(`Ошибки при создании файлов переводов для локализации ${locale.symbol}: ${syncResult.errors.join(", ")}`);
        }
        catch (error) {
            console.error(`Ошибка создания файлов переводов для локализации ${locale.symbol}: ${String(error)}`);
        }
        return locale;
    }
    async findOne(where) {
        const locale = await this.prisma.locale.findUnique({ where });
        if (!locale)
            throw new common_1.NotFoundException("Locale not found");
        return locale;
    }
    async update(where, data, file) {
        await this.findOne(where);
        if (file)
            this.saveImage(data, file);
        return this.prisma.locale.update({ where, data });
    }
    async delete(where) {
        return await this.update(where, { is_excluded: true });
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof files_service_1.FilesService !== "undefined" && files_service_1.FilesService) === "function" ? _b : Object, typeof (_c = typeof services_1.TranslationsService !== "undefined" && services_1.TranslationsService) === "function" ? _c : Object])
], CrudService);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(69), exports);
__exportStar(__webpack_require__(70), exports);
__exportStar(__webpack_require__(71), exports);


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SyncService = void 0;
const common_1 = __webpack_require__(3);
const path = __webpack_require__(28);
const fs = __webpack_require__(29);
let SyncService = class SyncService {
    translationsPath = path.join(process.cwd(), "translations");
    templateModules = ["admin", "common", "public"];
    createEmptyTemplate(template) {
        if (typeof template !== "object" ||
            template === null ||
            Array.isArray(template))
            return {};
        const result = {};
        for (const key in template) {
            if (Object.prototype.hasOwnProperty.call(template, key)) {
                const value = template[key];
                result[key] =
                    typeof value === "object"
                        ? this.createEmptyTemplate(value)
                        : `#!restored "${value}"`;
            }
        }
        return result;
    }
    loadTemplateFile(module) {
        const templatePath = path.join(this.translationsPath, module, `${module}.main.json`);
        if (!fs.existsSync(templatePath))
            return null;
        try {
            const content = fs.readFileSync(templatePath, "utf8");
            return JSON.parse(content);
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    saveTranslationFile(locale_symbol, module, data) {
        const filePath = path.join(this.translationsPath, module, `${module}.${locale_symbol.toLowerCase()}.json`);
        const dirPath = path.dirname(filePath);
        try {
            if (!fs.existsSync(dirPath))
                fs.mkdirSync(dirPath, { recursive: true });
            if (fs.existsSync(filePath))
                fs.copyFileSync(filePath, `${filePath}.backup.${Date.now()}`);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    mergeWithTemplate(existing, template) {
        const result = {};
        for (const key in template) {
            if (Object.prototype.hasOwnProperty.call(template, key)) {
                const templateValue = template[key];
                const existingValue = existing?.[key];
                if (typeof templateValue === "object" && templateValue !== null) {
                    result[key] = this.mergeWithTemplate(existingValue, templateValue);
                }
                else {
                    result[key] = typeof existingValue === "string"
                        ? existingValue
                        : `#!restored "${templateValue}"`;
                }
            }
        }
        if (existing && typeof existing === "object") {
            for (const key in existing) {
                if (Object.prototype.hasOwnProperty.call(existing, key) &&
                    !Object.prototype.hasOwnProperty.call(template, key))
                    result[key] = existing[key];
            }
        }
        return result;
    }
    createTranslationFiles(locale_symbol) {
        const normalizedLocale = locale_symbol.toLowerCase();
        const result = {
            locale_symbol: normalizedLocale,
            created_files: [],
            updated_files: [],
            errors: [],
            success: true,
        };
        for (const module of this.templateModules) {
            try {
                const template = this.loadTemplateFile(module);
                if (!template) {
                    const error = `Не удалось загрузить шаблон для модуля ${module}`;
                    result.errors.push(error);
                    result.success = false;
                    continue;
                }
                const filePath = path.join(this.translationsPath, module, `${module}.${normalizedLocale}.json`);
                let translations;
                if (fs.existsSync(filePath)) {
                    try {
                        const existingContent = fs.readFileSync(filePath, "utf8");
                        const existingTranslations = JSON.parse(existingContent);
                        translations = this.mergeWithTemplate(existingTranslations, template);
                        result.updated_files.push(filePath);
                    }
                    catch (error) {
                        console.error(error);
                        translations = this.createEmptyTemplate(template);
                        result.created_files.push(filePath);
                    }
                }
                else {
                    translations = this.createEmptyTemplate(template);
                    result.created_files.push(filePath);
                }
                const saved = this.saveTranslationFile(normalizedLocale, module, translations);
                if (!saved) {
                    const error = `Не удалось сохранить файл для модуля ${module}`;
                    result.errors.push(error);
                    result.success = false;
                }
            }
            catch (error) {
                const errorMsg = `Ошибка создания файла для модуля ${module}: ${error instanceof Error ? error.message : String(error)}`;
                result.errors.push(errorMsg);
                result.success = false;
                console.error(errorMsg);
            }
        }
        if (!result.success)
            console.error(`Ошибки при создании файлов переводов для локализации ${normalizedLocale}`);
        return result;
    }
    syncAllTranslations(locale_symbols) {
        const results = [];
        for (const locale_symbol of locale_symbols) {
            results.push(this.createTranslationFiles(locale_symbol));
        }
        return results;
    }
    deleteTranslationFiles(locale_symbol) {
        const deleted_files = [];
        const errors = [];
        for (const module of this.templateModules) {
            const filePath = path.join(this.translationsPath, module, `${module}.${locale_symbol.toLowerCase()}.json`);
            if (fs.existsSync(filePath)) {
                try {
                    const backupPath = `${filePath}.deleted.${Date.now()}`;
                    fs.copyFileSync(filePath, backupPath);
                    fs.unlinkSync(filePath);
                    deleted_files.push(filePath);
                }
                catch (error) {
                    const errorMsg = `Ошибка удаления файла ${filePath}: ${error instanceof Error ? error.message : String(error)}`;
                    errors.push(errorMsg);
                    console.error(errorMsg);
                }
            }
        }
        return { deleted_files, errors };
    }
    repairTranslationFile(locale_symbol, module) {
        try {
            const template = this.loadTemplateFile(module);
            if (!template)
                return false;
            const filePath = path.join(this.translationsPath, module, `${module}.${locale_symbol.toLowerCase()}.json`);
            let existing = {};
            if (fs.existsSync(filePath)) {
                try {
                    const content = fs.readFileSync(filePath, "utf8");
                    existing = JSON.parse(content);
                }
                catch (error) {
                    console.error(`Не удалось прочитать существующий файл ${filePath}, создаем новый`, error instanceof Error ? error.message : String(error));
                }
            }
            const repaired = this.mergeWithTemplate(existing, template);
            return this.saveTranslationFile(locale_symbol.toLowerCase(), module, repaired);
        }
        catch (error) {
            console.error(`Ошибка восстановления файла ${locale_symbol}/${module}: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
};
exports.SyncService = SyncService;
exports.SyncService = SyncService = __decorate([
    (0, common_1.Injectable)()
], SyncService);


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationService = void 0;
const common_1 = __webpack_require__(3);
const path = __webpack_require__(28);
const fs = __webpack_require__(29);
const prisma_1 = __webpack_require__(19);
let ValidationService = class ValidationService {
    prisma;
    translationsPath = path.join(process.cwd(), "translations");
    templateModules = ["admin", "common", "public"];
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAllKeys(obj, prefix = "") {
        const keys = [];
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const fullKey = prefix ? `${prefix}.${key}` : key;
                const value = obj[key];
                if (value && typeof value === "object" && !Array.isArray(value)) {
                    keys.push(...this.getAllKeys(value, fullKey));
                }
                else {
                    keys.push(fullKey);
                }
            }
        }
        return keys;
    }
    getValueByPath(obj, keyPath) {
        return keyPath
            .split(".")
            .reduce((current, key) => {
            if (current && typeof current === "object") {
                const currentObj = current;
                const value = currentObj[key];
                if (typeof value === "string" || value === undefined) {
                    return value;
                }
                return value;
            }
            return undefined;
        }, obj);
    }
    isEmptyValue(value) {
        return value === "" || value === null || value === undefined;
    }
    loadTemplateFile(module) {
        const templatePath = path.join(this.translationsPath, module, `${module}.main.json`);
        try {
            return JSON.parse(fs.readFileSync(templatePath, "utf8"));
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    loadTranslationFile(locale_symbol, module) {
        const filePath = path.join(this.translationsPath, module, `${module}.${locale_symbol.toLowerCase()}.json`);
        try {
            return JSON.parse(fs.readFileSync(filePath, "utf8"));
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    validateTranslationFile(locale_symbol, module) {
        const filePath = path.join(this.translationsPath, module, `${module}.${locale_symbol.toLowerCase()}.json`);
        const exists = fs.existsSync(filePath);
        const result = {
            file_path: filePath,
            exists,
            missing_keys: [],
            empty_values: [],
            extra_keys: [],
            is_valid: true,
        };
        if (!exists) {
            result.is_valid = false;
            return result;
        }
        const template = this.loadTemplateFile(module);
        const translation = this.loadTranslationFile(locale_symbol, module);
        if (!template || !translation) {
            result.is_valid = false;
            return result;
        }
        const templateKeys = this.getAllKeys(template);
        const translationKeys = this.getAllKeys(translation);
        for (const key of templateKeys) {
            if (!translationKeys.includes(key))
                result.missing_keys.push(key);
        }
        for (const key of templateKeys) {
            const value = this.getValueByPath(translation, key);
            if (this.isEmptyValue(value))
                result.empty_values.push(key);
        }
        for (const key of translationKeys) {
            if (!templateKeys.includes(key))
                result.extra_keys.push(key);
        }
        result.is_valid = result.missing_keys.length === 0;
        return result;
    }
    async validateLocale(locale_symbol) {
        const locale = await this.prisma.locale.findFirst({
            where: {
                symbol: {
                    equals: locale_symbol,
                    mode: "insensitive",
                },
                is_excluded: false,
            },
        });
        if (!locale)
            throw new common_1.NotFoundException(`Locale not found or excluded: ${locale_symbol}`);
        const status = {
            locale: locale,
            modules: {},
            total_issues: 0,
            is_valid: true,
        };
        for (const module of this.templateModules) {
            const moduleResult = this.validateTranslationFile(locale_symbol, module);
            status.modules[module] = moduleResult;
            const moduleIssues = moduleResult.missing_keys.length +
                moduleResult.empty_values.length +
                (moduleResult.exists ? 0 : 1);
            status.total_issues += moduleIssues;
            if (!moduleResult.is_valid) {
                status.is_valid = false;
            }
        }
        return status;
    }
    async validateAllLocales(locale_symbols) {
        const activeLocales = await this.prisma.locale.findMany({
            where: {
                symbol: {
                    in: locale_symbols,
                    mode: "insensitive",
                },
                is_excluded: false,
            },
            select: { symbol: true },
        });
        const activeSymbols = activeLocales.map((locale) => locale.symbol);
        const status = {
            locales: [],
            template_files: {},
            summary: {
                total_locales: activeSymbols.length,
                locales_with_issues: 0,
                missing_files: 0,
                total_missing_keys: 0,
                total_empty_values: 0,
            },
        };
        for (const module of this.templateModules) {
            const template = this.loadTemplateFile(module);
            status.template_files[module] = {
                exists: template !== null,
                keys_count: template ? this.getAllKeys(template).length : 0,
            };
        }
        for (const locale_symbol of activeSymbols) {
            try {
                const localeStatus = await this.validateLocale(locale_symbol);
                status.locales.push(localeStatus);
                if (!localeStatus.is_valid)
                    status.summary.locales_with_issues++;
                for (const moduleResult of Object.values(localeStatus.modules)) {
                    if (!moduleResult.exists)
                        status.summary.missing_files++;
                    status.summary.total_missing_keys += moduleResult.missing_keys.length;
                    status.summary.total_empty_values += moduleResult.empty_values.length;
                }
            }
            catch (error) {
                console.error(error);
                status.summary.total_locales--;
            }
        }
        return status;
    }
    getAvailableLocales() {
        const locales = new Set();
        for (const module of this.templateModules) {
            const modulePath = path.join(this.translationsPath, module);
            if (fs.existsSync(modulePath)) {
                const files = fs.readdirSync(modulePath);
                for (const file of files) {
                    const match = file.match(/^[^.]+\.([^.]+)\.json$/);
                    if (match && match[1] !== "main") {
                        locales.add(match[1]);
                    }
                }
            }
        }
        return Array.from(locales);
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ValidationService);


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationsService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const path = __webpack_require__(28);
const fs = __webpack_require__(29);
const validation_service_1 = __webpack_require__(70);
const sync_service_1 = __webpack_require__(69);
let TranslationsService = class TranslationsService {
    prisma;
    validationService;
    syncService;
    translationsPath = path.join(process.cwd(), "translations");
    allowedModules = ["admin", "common", "public"];
    constructor(prisma, validationService, syncService) {
        this.prisma = prisma;
        this.validationService = validationService;
        this.syncService = syncService;
    }
    async getMessages(locale_symbol, modules) {
        await this.validateLocale(locale_symbol);
        const messages = {};
        for (const module of modules) {
            if (!this.allowedModules.includes(module))
                continue;
            try {
                const moduleTranslations = await this.getTranslations(locale_symbol, module);
                messages[module] = moduleTranslations;
            }
            catch (error) {
                console.warn(`Не удалось загрузить переводы для модуля ${module}: ${String(error)}`);
            }
        }
        return messages;
    }
    async getTranslations(locale_symbol, module) {
        await this.validateParams(locale_symbol, module);
        const filePath = this.getFilePath(locale_symbol, module);
        if (!fs.existsSync(filePath))
            throw new common_1.NotFoundException(`Файл переводов не найден: ${locale_symbol}/${module}`);
        try {
            return JSON.parse(fs.readFileSync(filePath, "utf8"));
        }
        catch (error) {
            throw new common_1.BadRequestException(`Ошибка чтения файла переводов: ${String(error)}`);
        }
    }
    async updateTranslations(locale_symbol, module, translations) {
        await this.validateParams(locale_symbol, module);
        const filePath = this.getFilePath(locale_symbol, module);
        try {
            if (fs.existsSync(filePath))
                fs.copyFileSync(filePath, `${filePath}.backup.${Date.now()}`);
            fs.writeFileSync(filePath, JSON.stringify(translations, null, 2), "utf8");
            return {
                success: true,
                message: `Переводы для ${locale_symbol}/${module} успешно обновлены`,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Ошибка записи файла переводов: ${String(error)}`);
        }
    }
    async validateParams(locale_symbol, module) {
        await this.validateLocale(locale_symbol);
        if (!this.allowedModules.includes(module))
            throw new common_1.BadRequestException(`Недопустимый модуль: ${module}. Разрешены: ${this.allowedModules.join(", ")}`);
    }
    async getValidationStatus() {
        try {
            const locales = await this.prisma.locale.findMany({
                select: { symbol: true },
                where: { is_excluded: false },
            });
            if (!locales || locales.length === 0) {
                console.warn("Нет активных локализаций для валидации");
                return {
                    locales: [],
                    template_files: {},
                    summary: {
                        total_locales: 0,
                        locales_with_issues: 0,
                        missing_files: 0,
                        total_missing_keys: 0,
                        total_empty_values: 0,
                    },
                };
            }
            const locale_symbols = locales.map((locale) => locale.symbol);
            return await this.validationService.validateAllLocales(locale_symbols);
        }
        catch (error) {
            console.error(`Ошибка при получении статуса валидации: ${String(error)}`);
            throw error;
        }
    }
    async createLocaleFiles(locale_symbol) {
        await this.validateLocale(locale_symbol);
        return this.syncService.createTranslationFiles(locale_symbol);
    }
    deleteLocaleFiles(locale_symbol) {
        return this.syncService.deleteTranslationFiles(locale_symbol);
    }
    async syncAllTranslations() {
        const locales = await this.prisma.locale.findMany({
            select: { symbol: true },
        });
        const locale_symbols = locales.map((locale) => locale.symbol.toLowerCase());
        return this.syncService.syncAllTranslations(locale_symbols);
    }
    async repairTranslationFile(locale_symbol, module) {
        await this.validateParams(locale_symbol, module);
        return this.syncService.repairTranslationFile(locale_symbol, module);
    }
    async getAvailableLocales() {
        const locales = await this.prisma.locale.findMany({
            select: { symbol: true },
        });
        return locales.map((locale) => locale.symbol.toLowerCase());
    }
    async validateLocale(locale_symbol) {
        if (locale_symbol.toLowerCase() === "main")
            return;
        const locale = await this.prisma.locale.findFirst({
            where: {
                symbol: {
                    equals: locale_symbol.toUpperCase(),
                    mode: "insensitive",
                },
                is_excluded: false,
            },
        });
        if (!locale)
            throw new common_1.BadRequestException(`Локаль не найдена в базе данных или исключена: ${locale_symbol}`);
    }
    getFilePath(locale_symbol, module) {
        const normalizedLocale = locale_symbol.toLowerCase();
        const fileName = `${module}.${normalizedLocale}.json`;
        return path.join(this.translationsPath, module, fileName);
    }
};
exports.TranslationsService = TranslationsService;
exports.TranslationsService = TranslationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof validation_service_1.ValidationService !== "undefined" && validation_service_1.ValidationService) === "function" ? _b : Object, typeof (_c = typeof sync_service_1.SyncService !== "undefined" && sync_service_1.SyncService) === "function" ? _c : Object])
], TranslationsService);


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListService = void 0;
const prisma_1 = __webpack_require__(19);
const common_1 = __webpack_require__(3);
let ListService = class ListService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    customFilters = (options) => {
        const { search, is_excluded, symbol } = options;
        const filters = {};
        if (search) {
            filters.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { language: { contains: search, mode: "insensitive" } },
                { symbol: { contains: search, mode: "insensitive" } },
                { currency: { contains: search, mode: "insensitive" } },
                { currency_symbol: { contains: search, mode: "insensitive" } },
                { phone_code: { contains: search, mode: "insensitive" } },
            ];
        }
        if (is_excluded !== undefined)
            filters.is_excluded = is_excluded;
        if (symbol)
            filters.symbol = symbol;
        return filters;
    };
    async findAll(filters) {
        const queryOptions = this.prisma.buildQuery(filters, "created", "created", this.customFilters);
        const { items, count } = await this.prisma.findWithPagination(this.prisma.locale, queryOptions);
        return {
            items: items,
            total: count,
            take: filters.take,
            skip: filters.skip,
        };
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ListService);


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const types_1 = __webpack_require__(74);
let ValidationService = class ValidationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validateEntity(entityType) {
        const relationField = {
            [types_1.EntityType.Product]: "local_products",
            [types_1.EntityType.Service]: "local_services",
            [types_1.EntityType.Category]: "local_categories",
        }[entityType];
        const entities = await this.prisma[entityType].findMany({
            where: { is_excluded: false },
            select: {
                id: true,
                name: true,
                image: true,
                description: true,
                is_excluded: true,
                ...(entityType === types_1.EntityType.Category ? { type: true } : {}),
                [relationField]: {
                    select: {
                        id: true,
                        locale_id: true,
                        is_excluded: true,
                    },
                },
            },
        });
        const locales = await this.prisma.locale.findMany({
            where: { is_excluded: false },
        });
        const itemsWithIssues = entities
            .map((entity) => {
            const translations = entity[relationField];
            const activeTranslationLocaleIds = translations
                .filter((trans) => !trans.is_excluded)
                .map((trans) => trans.locale_id);
            const missing_locales = locales.filter((locale) => !activeTranslationLocaleIds.includes(locale.id));
            return { ...entity, missing_locales };
        })
            .filter((item) => item.missing_locales.length > 0);
        return {
            total_items: entities.length,
            missing_translations: itemsWithIssues.length,
            items_with_issues: itemsWithIssues,
        };
    }
    async validateAllEntities() {
        const [products, services, categories] = await Promise.all([
            this.validateEntity(types_1.EntityType.Product),
            this.validateEntity(types_1.EntityType.Service),
            this.validateEntity(types_1.EntityType.Category),
        ]);
        return {
            products,
            services,
            categories,
        };
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ValidationService);


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(75), exports);


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalType = exports.EntityType = void 0;
exports.EntityType = {
    Product: "Product",
    Service: "Service",
    Category: "Category",
};
exports.LocalType = {
    LocalProduct: "LocalProduct",
    LocalService: "LocalService",
    LocalCategory: "LocalCategory",
};


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
let ListService = class ListService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    customFilters = (options) => {
        const { search, category_id, locale_id, is_excluded } = options;
        const filters = {};
        if (search) {
            filters.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }
        if (category_id)
            filters.category_id = category_id;
        if (locale_id)
            filters.locale_id = locale_id;
        if (is_excluded !== undefined)
            filters.is_excluded = is_excluded;
        return filters;
    };
    async findAll(filterDto) {
        const queryOptions = this.prisma.buildQuery(filterDto, "created", "created", this.customFilters);
        const { items, count } = await this.prisma.findWithPagination(this.prisma.localCategory, queryOptions, {
            category: true,
            locale: true,
        });
        return {
            items,
            total: count,
            skip: queryOptions.skip,
            take: queryOptions.take,
        };
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ListService);


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(78), exports);
__exportStar(__webpack_require__(79), exports);
__exportStar(__webpack_require__(80), exports);


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLocalCategoryDto = void 0;
const swagger_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(10);
class CreateLocalCategoryDto {
    name;
    description;
    category_id;
    locale_id;
}
exports.CreateLocalCategoryDto = CreateLocalCategoryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(255),
    (0, swagger_1.ApiProperty)({
        description: "Перевод категории",
        example: "Перевод категории 1",
    }),
    __metadata("design:type", String)
], CreateLocalCategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Описание категории",
        example: "Описание категории 1",
        required: false,
    }),
    __metadata("design:type", String)
], CreateLocalCategoryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "ID категории",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], CreateLocalCategoryDto.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "ID локализации",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], CreateLocalCategoryDto.prototype, "locale_id", void 0);


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateLocalCategoryDto = void 0;
const categories_1 = __webpack_require__(37);
const swagger_1 = __webpack_require__(11);
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
const swagger_2 = __webpack_require__(11);
class UpdateLocalCategoryDto extends (0, swagger_1.PartialType)(categories_1.CreateCategoryDto) {
    is_excluded;
}
exports.UpdateLocalCategoryDto = UpdateLocalCategoryDto;
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_2.ApiProperty)({
        description: "Исключена ли категория",
        required: false,
        example: false,
    }),
    __metadata("design:type", Boolean)
], UpdateLocalCategoryDto.prototype, "is_excluded", void 0);


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalCategoryFiltersDto = void 0;
const class_validator_1 = __webpack_require__(10);
const base_filter_dto_1 = __webpack_require__(25);
const swagger_1 = __webpack_require__(11);
const class_transformer_1 = __webpack_require__(9);
class LocalCategoryFiltersDto extends base_filter_dto_1.BaseFilterDto {
    search;
    category_id;
    locale_id;
    is_excluded = false;
}
exports.LocalCategoryFiltersDto = LocalCategoryFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Поиск по названию",
        example: "Перевод категории 1",
    }),
    __metadata("design:type", String)
], LocalCategoryFiltersDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)("all", { each: false, always: false }),
    (0, swagger_1.ApiProperty)({
        description: "ID категории",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], LocalCategoryFiltersDto.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)("all", { each: false, always: false }),
    (0, swagger_1.ApiProperty)({
        description: "ID локализации",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], LocalCategoryFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли перевод категории исключенным",
        example: false,
    }),
    __metadata("design:type", Boolean)
], LocalCategoryFiltersDto.prototype, "is_excluded", void 0);


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalesModule = void 0;
const controller_1 = __webpack_require__(82);
const prisma_1 = __webpack_require__(19);
const services_1 = __webpack_require__(66);
const common_1 = __webpack_require__(3);
const files_module_1 = __webpack_require__(60);
const module_1 = __webpack_require__(87);
let LocalesModule = class LocalesModule {
};
exports.LocalesModule = LocalesModule;
exports.LocalesModule = LocalesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, files_module_1.FilesModule, (0, common_1.forwardRef)(() => module_1.TranslationsModule)],
        controllers: [controller_1.LocalesController],
        providers: [services_1.CrudService, services_1.ListService, services_1.ValidationService],
        exports: [services_1.CrudService, services_1.ListService, services_1.ValidationService],
    })
], LocalesModule);


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalesController = void 0;
const common_1 = __webpack_require__(3);
const services_1 = __webpack_require__(66);
const swagger_1 = __webpack_require__(11);
const dto_1 = __webpack_require__(83);
const prisma_1 = __webpack_require__(19);
const common_2 = __webpack_require__(48);
const example_data_1 = __webpack_require__(35);
let LocalesController = class LocalesController {
    crudService;
    listService;
    validationService;
    constructor(crudService, listService, validationService) {
        this.crudService = crudService;
        this.listService = listService;
        this.validationService = validationService;
    }
    async create(data, file) {
        return await this.crudService.create(data, file);
    }
    async find(id) {
        return this.crudService.findOne({ id });
    }
    async findAll(dto) {
        return this.listService.findAll(dto);
    }
    async update(id, data, file) {
        return await this.crudService.update({ id }, data, file);
    }
    async delete(id) {
        return await this.crudService.delete({ id });
    }
    async validateEntities() {
        return await this.validationService.validateAllEntities();
    }
};
exports.LocalesController = LocalesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiOperation)({ summary: "Создание локализации" }),
    (0, swagger_1.ApiBody)({
        description: "Данные локализации с изображением",
        schema: {
            type: "object",
            properties: {
                name: { type: "string" },
                language: { type: "string" },
                symbol: { type: "string" },
                currency: { type: "string" },
                currency_symbol: { type: "string" },
                phone_code: { type: "string" },
                image: { type: "string" },
                file: { type: "string", format: "binary" },
            },
            required: [
                "name",
                "language",
                "symbol",
                "currency",
                "currency_symbol",
                "phone_code",
            ],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Локализация успешно создана",
        example: example_data_1.example_locale,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateLocaleDto !== "undefined" && dto_1.CreateLocaleDto) === "function" ? _d : Object, typeof (_f = typeof Express !== "undefined" && (_e = Express.Multer) !== void 0 && _e.File) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], LocalesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Получение локализации по id" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация",
        example: example_data_1.example_locale,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], LocalesController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Получение всех локализаций" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Список локализаций",
        example: example_data_1.example_locales_list_result,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof dto_1.LocaleFiltersDto !== "undefined" && dto_1.LocaleFiltersDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], LocalesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiOperation)({ summary: "Обновление локализации" }),
    (0, swagger_1.ApiBody)({
        description: "Данные локализации с файлом иконки или URL",
        schema: {
            type: "object",
            properties: {
                name: { type: "string" },
                language: { type: "string" },
                symbol: { type: "string" },
                currency: { type: "string" },
                currency_symbol: { type: "string" },
                phone_code: { type: "string" },
                image: { type: "string" },
                file: { type: "string", format: "binary" },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация обновлена",
        example: example_data_1.example_locale,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_l = typeof dto_1.UpdateLocaleDto !== "undefined" && dto_1.UpdateLocaleDto) === "function" ? _l : Object, typeof (_o = typeof Express !== "undefined" && (_m = Express.Multer) !== void 0 && _m.File) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], LocalesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Удаление локализации" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация удалена",
        example: example_data_1.example_locale,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], LocalesController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("validation/entities"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Проверка всех локализаций" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalesController.prototype, "validateEntities", null);
exports.LocalesController = LocalesController = __decorate([
    (0, swagger_1.ApiTags)("Locales"),
    (0, common_1.Controller)("locales"),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Forbidden" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal Server Error" }),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.CrudService !== "undefined" && services_1.CrudService) === "function" ? _a : Object, typeof (_b = typeof services_1.ListService !== "undefined" && services_1.ListService) === "function" ? _b : Object, typeof (_c = typeof services_1.ValidationService !== "undefined" && services_1.ValidationService) === "function" ? _c : Object])
], LocalesController);


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(84), exports);
__exportStar(__webpack_require__(85), exports);
__exportStar(__webpack_require__(86), exports);


/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLocaleDto = void 0;
const swagger_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(10);
class CreateLocaleDto {
    name;
    language;
    symbol;
    currency;
    currency_symbol;
    phone_code;
    image;
}
exports.CreateLocaleDto = CreateLocaleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)({
        name: "Название",
        description: "Название региона локализации",
        example: "Россия",
        maxLength: 512,
        minLength: 2,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)({
        name: "Язык",
        description: "Язык региона локализации",
        example: "Русский",
        maxLength: 512,
        minLength: 2,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(3),
    (0, class_validator_1.Matches)(/^[A-Z]{2,3}$/),
    (0, swagger_1.ApiProperty)({
        name: "Символ",
        description: "Символ региона локализации",
        example: "RU",
        maxLength: 3,
        minLength: 2,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "symbol", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)({
        name: "Валюта",
        description: "Валюта региона локализации",
        example: "Рубль",
        maxLength: 512,
        minLength: 2,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(4),
    (0, swagger_1.ApiProperty)({
        name: "Символ валюты",
        description: "Символ валюты региона локализации",
        example: "₽",
        maxLength: 4,
        minLength: 1,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "currency_symbol", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(5),
    (0, class_validator_1.Matches)(/^\+[0-9]{1,5}$/),
    (0, swagger_1.ApiProperty)({
        name: "Код телефона",
        description: "Код телефона региона локализации",
        example: "+7",
        maxLength: 5,
        minLength: 1,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "phone_code", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        name: "Изображение",
        description: "Изображение региона локализации",
        example: "https://example.com/image.png",
        required: false,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "image", void 0);


/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateLocaleDto = void 0;
const mapped_types_1 = __webpack_require__(46);
const create_dto_1 = __webpack_require__(84);
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
class UpdateLocaleDto extends (0, mapped_types_1.PartialType)(create_dto_1.CreateLocaleDto) {
    is_excluded;
}
exports.UpdateLocaleDto = UpdateLocaleDto;
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({
        description: "Исключена ли локализация",
        required: false,
        example: false,
    }),
    __metadata("design:type", Boolean)
], UpdateLocaleDto.prototype, "is_excluded", void 0);


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocaleFiltersDto = void 0;
const base_filter_dto_1 = __webpack_require__(25);
const swagger_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(10);
const class_transformer_1 = __webpack_require__(9);
class LocaleFiltersDto extends base_filter_dto_1.BaseFilterDto {
    search;
    symbol;
    is_excluded;
}
exports.LocaleFiltersDto = LocaleFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        name: "Поиск",
        description: "Поиск по названию, языку, символу, валюте, символу валюты, коду телефона",
        example: "Россия",
        required: false,
    }),
    __metadata("design:type", String)
], LocaleFiltersDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        name: "Язык",
        description: "Язык",
        example: "RU",
        required: false,
    }),
    __metadata("design:type", String)
], LocaleFiltersDto.prototype, "symbol", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value == "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли локаль исключенной",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], LocaleFiltersDto.prototype, "is_excluded", void 0);


/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationsModule = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const controller_1 = __webpack_require__(88);
const services_1 = __webpack_require__(68);
let TranslationsModule = class TranslationsModule {
};
exports.TranslationsModule = TranslationsModule;
exports.TranslationsModule = TranslationsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [controller_1.TranslationsController],
        providers: [services_1.TranslationsService, services_1.ValidationService, services_1.SyncService],
        exports: [services_1.TranslationsService, services_1.ValidationService, services_1.SyncService],
    })
], TranslationsModule);


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationsController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(11);
const common_2 = __webpack_require__(48);
const client_1 = __webpack_require__(12);
const services_1 = __webpack_require__(68);
const dto_1 = __webpack_require__(89);
let TranslationsController = class TranslationsController {
    translationsService;
    constructor(translationsService) {
        this.translationsService = translationsService;
    }
    async getValidationStatus() {
        return this.translationsService.getValidationStatus();
    }
    async syncAllTranslations() {
        return this.translationsService.syncAllTranslations();
    }
    async createLocaleFiles(locale_symbol) {
        return this.translationsService.createLocaleFiles(locale_symbol);
    }
    async repairTranslationFile(locale_symbol, module) {
        const success = await this.translationsService.repairTranslationFile(locale_symbol, module);
        return {
            success,
            message: success
                ? "Файл успешно восстановлен"
                : "Ошибка восстановления файла",
        };
    }
    async getMessages(locale_symbol, modules) {
        const moduleList = modules
            ? modules.split(",")
            : ["common", "admin", "public"];
        return this.translationsService.getMessages(locale_symbol, moduleList);
    }
    async updateTranslations(locale_symbol, module, data) {
        return this.translationsService.updateTranslations(locale_symbol, module, data.translations);
    }
    async getTranslations(locale_symbol, module) {
        return this.translationsService.getTranslations(locale_symbol, module);
    }
};
exports.TranslationsController = TranslationsController;
__decorate([
    (0, common_1.Get)("validation/status"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Получить статус валидации всех файлов переводов" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Статус валидации получен" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "getValidationStatus", null);
__decorate([
    (0, common_1.Post)("sync/all"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Синхронизировать все файлы переводов с шаблонами" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Синхронизация завершена" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "syncAllTranslations", null);
__decorate([
    (0, common_1.Post)("sync/:locale_symbol"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Создать файлы переводов для локализации" }),
    (0, swagger_1.ApiParam)({ name: "locale_symbol", description: "Символ локализации" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Файлы переводов созданы" }),
    __param(0, (0, common_1.Param)("locale_symbol")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "createLocaleFiles", null);
__decorate([
    (0, common_1.Post)("repair/:locale_symbol/:module"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Восстановить структуру файла переводов" }),
    (0, swagger_1.ApiParam)({ name: "locale_symbol", description: "Символ локализации" }),
    (0, swagger_1.ApiParam)({ name: "module", description: "Модуль переводов" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Файл восстановлен" }),
    __param(0, (0, common_1.Param)("locale_symbol")),
    __param(1, (0, common_1.Param)("module")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "repairTranslationFile", null);
__decorate([
    (0, common_1.Get)("messages/:locale_symbol"),
    (0, swagger_1.ApiOperation)({ summary: "Получить переводы для использования в приложении" }),
    (0, swagger_1.ApiParam)({ name: "locale_symbol", description: "Символ локализации" }),
    (0, swagger_1.ApiQuery)({
        name: "modules",
        description: "Список модулей через запятую",
        required: false,
    }),
    __param(0, (0, common_1.Param)("locale_symbol")),
    __param(1, (0, common_1.Query)("modules")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "getMessages", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(client_1.Role.ADMIN),
    (0, common_1.Put)(":locale_symbol/:module"),
    (0, swagger_1.ApiOperation)({ summary: "Обновить переводы" }),
    (0, swagger_1.ApiParam)({ name: "locale_symbol", description: "Символ локализации" }),
    (0, swagger_1.ApiParam)({ name: "module", description: "Модуль переводов" }),
    __param(0, (0, common_1.Param)("locale_symbol")),
    __param(1, (0, common_1.Param)("module")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_b = typeof dto_1.UpdateTranslationDto !== "undefined" && dto_1.UpdateTranslationDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "updateTranslations", null);
__decorate([
    (0, common_1.Get)(":locale_symbol/:module"),
    (0, swagger_1.ApiOperation)({ summary: "Получить переводы для редактирования" }),
    (0, swagger_1.ApiParam)({ name: "locale_symbol", description: "Символ локализации" }),
    (0, swagger_1.ApiParam)({ name: "module", description: "Модуль переводов" }),
    __param(0, (0, common_1.Param)("locale_symbol")),
    __param(1, (0, common_1.Param)("module")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TranslationsController.prototype, "getTranslations", null);
exports.TranslationsController = TranslationsController = __decorate([
    (0, swagger_1.ApiTags)("Translations"),
    (0, common_1.Controller)("translations"),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.TranslationsService !== "undefined" && services_1.TranslationsService) === "function" ? _a : Object])
], TranslationsController);


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(90), exports);


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTranslationDto = void 0;
const class_validator_1 = __webpack_require__(10);
class UpdateTranslationDto {
    translations;
}
exports.UpdateTranslationDto = UpdateTranslationDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], UpdateTranslationDto.prototype, "translations", void 0);


/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesSectionModule = void 0;
const common_1 = __webpack_require__(3);
const categories_1 = __webpack_require__(37);
const local_categories_1 = __webpack_require__(61);
let CategoriesSectionModule = class CategoriesSectionModule {
};
exports.CategoriesSectionModule = CategoriesSectionModule;
exports.CategoriesSectionModule = CategoriesSectionModule = __decorate([
    (0, common_1.Module)({
        imports: [categories_1.CategoriesModule, local_categories_1.LocalCategoriesModule],
        exports: [categories_1.CategoriesModule, local_categories_1.LocalCategoriesModule],
    })
], CategoriesSectionModule);


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(93), exports);
__exportStar(__webpack_require__(94), exports);
__exportStar(__webpack_require__(24), exports);


/***/ }),
/* 93 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProductDto = void 0;
const swagger_1 = __webpack_require__(11);
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
const class_validator_2 = __webpack_require__(10);
class CreateProductDto {
    name;
    category_id;
    price_USD;
    discount_price_USD;
    description;
    image;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)({
        description: "Название продукта для администратора (на сайте будет отображаться локальное название)",
        example: "Продукт 1",
        maxLength: 512,
        minLength: 3,
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "Категория продукта",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Цена продукта в USD (будет отображаться с конвертацией по курсу валюты при отсутствии локальных цен)",
    }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price_USD", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value) {
            const number = Number(value);
            return number > 0 ? number : null;
        }
        return null;
    }),
    (0, swagger_1.ApiProperty)({
        description: "Скидочная цена продукта в USD (если не указана, то будет использоваться цена в USD)",
    }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "discount_price_USD", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(4096),
    (0, swagger_1.ApiProperty)({
        description: "Описание продукта для заметок администратора (на сайте будут отображаться локальные описания)",
        example: "Описание продукта 1",
        maxLength: 4096,
        minLength: 3,
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Главное изображение продукта",
        required: false,
        example: "https://example.com/image.jpg",
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "image", void 0);


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProductDto = void 0;
const create_dto_1 = __webpack_require__(93);
const mapped_types_1 = __webpack_require__(46);
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
class UpdateProductDto extends (0, mapped_types_1.PartialType)(create_dto_1.CreateProductDto) {
    is_excluded;
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value == "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Исключен ли продукт",
        required: false,
        example: false,
    }),
    __metadata("design:type", Boolean)
], UpdateProductDto.prototype, "is_excluded", void 0);


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalProductsModule = void 0;
var module_1 = __webpack_require__(96);
Object.defineProperty(exports, "LocalProductsModule", ({ enumerable: true, get: function () { return module_1.LocalProductsModule; } }));
__exportStar(__webpack_require__(101), exports);
__exportStar(__webpack_require__(105), exports);


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalProductsModule = void 0;
const controller_1 = __webpack_require__(97);
const services_1 = __webpack_require__(98);
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const module_1 = __webpack_require__(22);
const module_2 = __webpack_require__(81);
let LocalProductsModule = class LocalProductsModule {
};
exports.LocalProductsModule = LocalProductsModule;
exports.LocalProductsModule = LocalProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, module_1.ProductsModule, module_2.LocalesModule],
        controllers: [controller_1.LocalProductsController],
        providers: [services_1.ListService, services_1.CrudService],
        exports: [services_1.CrudService, services_1.ListService],
    })
], LocalProductsModule);


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalProductsController = void 0;
const services_1 = __webpack_require__(98);
const common_1 = __webpack_require__(3);
const services_2 = __webpack_require__(98);
const dto_1 = __webpack_require__(101);
const swagger_1 = __webpack_require__(11);
const example_data_1 = __webpack_require__(105);
const common_2 = __webpack_require__(48);
const prisma_1 = __webpack_require__(19);
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
    __metadata("design:paramtypes", [typeof (_c = typeof dto_1.LocalProductFiltersDto !== "undefined" && dto_1.LocalProductFiltersDto) === "function" ? _c : Object]),
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
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateLocalProductDto !== "undefined" && dto_1.CreateLocalProductDto) === "function" ? _d : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_e = typeof dto_1.UpdateLocalProductDto !== "undefined" && dto_1.UpdateLocalProductDto) === "function" ? _e : Object]),
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
    __metadata("design:paramtypes", [typeof (_a = typeof services_2.ListService !== "undefined" && services_2.ListService) === "function" ? _a : Object, typeof (_b = typeof services_1.CrudService !== "undefined" && services_1.CrudService) === "function" ? _b : Object])
], LocalProductsController);


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(99), exports);
__exportStar(__webpack_require__(100), exports);


/***/ }),
/* 99 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListService = void 0;
const prisma_1 = __webpack_require__(19);
const common_1 = __webpack_require__(3);
let ListService = class ListService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    customFilters = (options) => {
        const { product_id, locale_id, min_price, max_price, is_discounted, name, is_excluded, } = options;
        const filters = {};
        if (product_id)
            filters.product_id = product_id;
        if (locale_id)
            filters.locale_id = locale_id;
        if (min_price)
            filters.price = { gte: min_price };
        if (max_price)
            filters.price = { lte: max_price };
        if (is_discounted) {
            filters.discount_price = { not: null };
        }
        if (name)
            filters.name = { contains: name, mode: "insensitive" };
        if (is_excluded !== undefined)
            filters.is_excluded = { equals: is_excluded };
        return filters;
    };
    async getList(filterDto) {
        const { is_discounted, ...filters } = filterDto;
        const queryOptions = this.prisma.buildQuery(filters, "created", "created", this.customFilters);
        const { items, count } = await this.prisma.findWithPagination(this.prisma.localProduct, queryOptions, {
            local_item_descriptions: true,
            product: true,
            locale: true,
        });
        const typedItems = items;
        return {
            items: typedItems.filter((item) => !is_discounted ||
                (item.discount_price && item.discount_price < item.price)),
            total: count,
            skip: queryOptions.skip,
            take: queryOptions.take,
        };
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ListService);


/***/ }),
/* 100 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CrudService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const crud_service_1 = __webpack_require__(26);
const crud_service_2 = __webpack_require__(67);
let CrudService = class CrudService {
    prisma;
    productService;
    localeService;
    constructor(prisma, productService, localeService) {
        this.prisma = prisma;
        this.productService = productService;
        this.localeService = localeService;
    }
    async create(dto) {
        await this.productService.findOne(dto.product_id);
        await this.localeService.findOne({ id: dto.locale_id });
        return this.prisma.localProduct.create({
            data: dto,
            include: {
                product: true,
                locale: true,
                local_item_descriptions: true,
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return await this.prisma.localProduct.update({
            where: { id },
            data: dto,
            include: {
                product: true,
                locale: true,
                local_item_descriptions: true,
            },
        });
    }
    async delete(id) {
        const local_product = await this.findOne(id);
        return this.prisma.localProduct.update({
            where: { id: local_product.id },
            data: { is_excluded: true },
        });
    }
    async findOne(id) {
        const local_product = await this.prisma.localProduct.findUnique({
            where: { id },
            include: {
                product: true,
                locale: true,
                local_item_descriptions: true,
            },
        });
        if (!local_product)
            throw new common_1.NotFoundException("Локализация продукта не найдена");
        return local_product;
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof crud_service_1.CrudService !== "undefined" && crud_service_1.CrudService) === "function" ? _b : Object, typeof (_c = typeof crud_service_2.CrudService !== "undefined" && crud_service_2.CrudService) === "function" ? _c : Object])
], CrudService);


/***/ }),
/* 101 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalProductFiltersDto = void 0;
__exportStar(__webpack_require__(102), exports);
var filters_dto_1 = __webpack_require__(103);
Object.defineProperty(exports, "LocalProductFiltersDto", ({ enumerable: true, get: function () { return filters_dto_1.LocalProductFiltersDto; } }));
__exportStar(__webpack_require__(104), exports);


/***/ }),
/* 102 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLocalProductDto = void 0;
const class_validator_1 = __webpack_require__(10);
const class_validator_2 = __webpack_require__(10);
const class_validator_3 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
const class_transformer_1 = __webpack_require__(9);
const example_data_1 = __webpack_require__(32);
const example_data_2 = __webpack_require__(35);
class CreateLocalProductDto {
    product_id;
    name;
    description;
    price;
    discount_price;
    locale_id;
}
exports.CreateLocalProductDto = CreateLocalProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_3.IsNotEmpty)(),
    (0, class_validator_2.IsUUID)(),
    (0, swagger_1.ApiProperty)({ description: "ID продукта", example: example_data_1.example_product.id }),
    __metadata("design:type", String)
], CreateLocalProductDto.prototype, "product_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_3.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(255),
    (0, swagger_1.ApiProperty)({
        description: "Название продукта",
        example: example_data_1.example_product.name,
    }),
    __metadata("design:type", String)
], CreateLocalProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(2048),
    (0, swagger_1.ApiProperty)({
        description: "Описание продукта",
        example: example_data_1.example_product.description,
    }),
    __metadata("design:type", String)
], CreateLocalProductDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_3.IsNotEmpty)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Цена продукта",
        example: example_data_1.example_product.price_USD,
    }),
    __metadata("design:type", Number)
], CreateLocalProductDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Цена продукта",
        example: example_data_1.example_product.discount_price_USD,
    }),
    __metadata("design:type", Number)
], CreateLocalProductDto.prototype, "discount_price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_3.IsNotEmpty)(),
    (0, class_validator_2.IsUUID)(),
    (0, swagger_1.ApiProperty)({ description: "ID локализации", example: example_data_2.example_locale.id }),
    __metadata("design:type", String)
], CreateLocalProductDto.prototype, "locale_id", void 0);


/***/ }),
/* 103 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalProductFiltersDto = void 0;
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
const base_filter_dto_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(9);
const example_data_1 = __webpack_require__(32);
const example_data_2 = __webpack_require__(35);
class LocalProductFiltersDto extends base_filter_dto_1.BaseFilterDto {
    product_id;
    locale_id;
    min_price;
    max_price;
    is_discounted;
    name;
    is_excluded = false;
}
exports.LocalProductFiltersDto = LocalProductFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({ description: "ID продукта", example: example_data_1.example_product.id }),
    __metadata("design:type", String)
], LocalProductFiltersDto.prototype, "product_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({ description: "ID локали", example: example_data_2.example_locale.id }),
    __metadata("design:type", String)
], LocalProductFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({ description: "Минимальная цена продукта", example: 0 }),
    __metadata("design:type", Number)
], LocalProductFiltersDto.prototype, "min_price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({ description: "Максимальная цена продукта", example: 100000 }),
    __metadata("design:type", Number)
], LocalProductFiltersDto.prototype, "max_price", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value == "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли продукт со скидкой",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], LocalProductFiltersDto.prototype, "is_discounted", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Название продукта",
        example: example_data_1.example_product.name,
    }),
    __metadata("design:type", String)
], LocalProductFiltersDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value == "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли продукт исключенным",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], LocalProductFiltersDto.prototype, "is_excluded", void 0);


/***/ }),
/* 104 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateLocalProductDto = void 0;
const swagger_1 = __webpack_require__(11);
const create_dto_1 = __webpack_require__(102);
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
const swagger_2 = __webpack_require__(11);
class UpdateLocalProductDto extends (0, swagger_1.PartialType)(create_dto_1.CreateLocalProductDto) {
    is_excluded;
}
exports.UpdateLocalProductDto = UpdateLocalProductDto;
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_2.ApiProperty)({
        description: "Исключено ли локальное описание",
        required: false,
        example: false,
    }),
    __metadata("design:type", Boolean)
], UpdateLocalProductDto.prototype, "is_excluded", void 0);


/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.example_extended_local_product = exports.example_local_products_list_result = exports.example_local_product = void 0;
const example_data_1 = __webpack_require__(32);
const example_data_2 = __webpack_require__(35);
const example_data_3 = __webpack_require__(106);
exports.example_local_product = {
    id: "UUID",
    name: "Product 1",
    description: "Description 1",
    price: 100,
    discount_price: 80,
    created: new Date(),
    updated: new Date(),
    product_id: example_data_1.example_product.id,
    locale_id: example_data_2.example_locale.id,
    is_excluded: false,
};
exports.example_local_products_list_result = {
    items: [exports.example_local_product],
    total: 1,
    skip: 0,
    take: 10,
};
exports.example_extended_local_product = {
    ...exports.example_local_product,
    local_item_descriptions: [example_data_3.example_local_item_description],
    product: example_data_1.example_product,
    locale: example_data_2.example_locale,
};


/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.example_local_item_descriptions_list_result = exports.example_local_item_description = void 0;
exports.example_local_item_description = {
    id: "UUID",
    content: "Example local item description content",
    title: "Example Title",
    type: "TEXT",
    created: new Date(),
    order: 1,
    updated: new Date(),
    local_product_id: "UUID",
    local_service_id: "UUID",
    is_excluded: false,
};
exports.example_local_item_descriptions_list_result = {
    items: [exports.example_local_item_description],
    total: 1,
    skip: 0,
    take: 10,
};


/***/ }),
/* 107 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(108), exports);
__exportStar(__webpack_require__(118), exports);
__exportStar(__webpack_require__(119), exports);
__exportStar(__webpack_require__(135), exports);


/***/ }),
/* 108 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(109), exports);
__exportStar(__webpack_require__(117), exports);


/***/ }),
/* 109 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(3);
const controller_1 = __webpack_require__(110);
const services_1 = __webpack_require__(113);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [controller_1.UsersController],
        providers: [services_1.UsersListService, services_1.UsersCrudService],
        exports: [services_1.UsersListService, services_1.UsersCrudService],
    })
], UsersModule);


/***/ }),
/* 110 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(11);
const common_2 = __webpack_require__(48);
const update_dto_1 = __webpack_require__(111);
const filters_dto_1 = __webpack_require__(112);
const prisma_1 = __webpack_require__(19);
const services_1 = __webpack_require__(113);
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
    __metadata("design:paramtypes", [typeof (_c = typeof prisma_1.Prisma !== "undefined" && prisma_1.Prisma.UserWhereUniqueInput) === "function" ? _c : Object]),
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
    __metadata("design:paramtypes", [typeof (_d = typeof filters_dto_1.UserFiltersDto !== "undefined" && filters_dto_1.UserFiltersDto) === "function" ? _d : Object]),
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
    __metadata("design:paramtypes", [typeof (_f = typeof prisma_1.Prisma !== "undefined" && prisma_1.Prisma.UserWhereUniqueInput) === "function" ? _f : Object, typeof (_g = typeof update_dto_1.UpdateUserDto !== "undefined" && update_dto_1.UpdateUserDto) === "function" ? _g : Object]),
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
    __metadata("design:paramtypes", [typeof (_h = typeof prisma_1.Prisma !== "undefined" && prisma_1.Prisma.UserWhereUniqueInput) === "function" ? _h : Object, typeof (_j = typeof update_dto_1.AdminUpdateUserDto !== "undefined" && update_dto_1.AdminUpdateUserDto) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "adminUpdate", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)("users"),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.UsersListService !== "undefined" && services_1.UsersListService) === "function" ? _a : Object, typeof (_b = typeof services_1.UsersCrudService !== "undefined" && services_1.UsersCrudService) === "function" ? _b : Object])
], UsersController);


/***/ }),
/* 111 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminUpdateUserDto = exports.UpdateUserDto = void 0;
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
const client_1 = __webpack_require__(12);
const class_transformer_1 = __webpack_require__(9);
class UpdateUserDto {
    password;
    first_name;
    last_name;
    phone_number;
    image;
    locale_id;
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "newpassword123",
        description: "Новый пароль пользователя",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "Пароль должен быть строкой" }),
    (0, class_validator_1.MinLength)(8, { message: "Пароль должен содержать минимум 8 символов" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Пароль не может быть пустым" }),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Иван",
        description: "Имя пользователя",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "Имя должно быть строкой" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Иванов",
        description: "Фамилия пользователя",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "Фамилия должна быть строкой" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "+79001234567",
        description: "Номер телефона пользователя",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "Номер телефона должен быть строкой" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://example.com/avatar.jpg",
        description: "URL изображения профиля",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "URL изображения должен быть строкой" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "123e4567-e89b-12d3-a456-426614174000",
        description: "ID локали пользователя",
        required: false,
    }),
    (0, class_validator_1.IsUUID)("all", { message: "ID локали должен быть UUID" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "locale_id", void 0);
class AdminUpdateUserDto extends UpdateUserDto {
    email;
    role;
    is_banned;
}
exports.AdminUpdateUserDto = AdminUpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "user@example.com",
        description: "Email пользователя",
        required: false,
    }),
    (0, class_validator_1.IsEmail)({}, { message: "Введите корректный email" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminUpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "ADMIN",
        description: "Роль пользователя",
        required: false,
        enum: client_1.Role,
    }),
    (0, class_validator_1.IsEnum)(client_1.Role),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof client_1.Role !== "undefined" && client_1.Role) === "function" ? _a : Object)
], AdminUpdateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: "Блокировка пользователя",
        required: false,
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AdminUpdateUserDto.prototype, "is_banned", void 0);


/***/ }),
/* 112 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserFiltersDto = void 0;
const swagger_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(10);
const client_1 = __webpack_require__(12);
const base_filter_dto_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(9);
class UserFiltersDto extends base_filter_dto_1.BaseFilterDto {
    role;
    email;
    search;
    phone_number;
    locale_id;
    is_banned = false;
}
exports.UserFiltersDto = UserFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(client_1.Role),
    (0, swagger_1.ApiProperty)({
        enum: client_1.Role,
        enumName: "Role",
        description: "Фильтрация по роли пользователя",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof client_1.Role !== "undefined" && client_1.Role) === "function" ? _a : Object)
], UserFiltersDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Фильтрация по совпадению email",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserFiltersDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Фильтрация по совпадению имени или фамилии",
        required: false,
    }),
    __metadata("design:type", String)
], UserFiltersDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Фильтрация по совпадению номера телефона",
        required: false,
    }),
    __metadata("design:type", String)
], UserFiltersDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Фильтрация по ID региона",
        required: false,
    }),
    __metadata("design:type", String)
], UserFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли пользователь исключенным",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], UserFiltersDto.prototype, "is_banned", void 0);


/***/ }),
/* 113 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(114), exports);
__exportStar(__webpack_require__(115), exports);


/***/ }),
/* 114 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersListService = void 0;
const prisma_1 = __webpack_require__(19);
const common_1 = __webpack_require__(3);
let UsersListService = class UsersListService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    customFilters = (options) => {
        const { role, is_banned, email, search, phone_number, locale_id } = options;
        const filters = {};
        if (role)
            filters.role = role;
        if (is_banned !== undefined && is_banned !== null)
            filters.is_banned = is_banned;
        if (email && email.trim().length > 0)
            filters.email = { contains: email.trim(), mode: "insensitive" };
        if (locale_id && locale_id.trim().length > 0)
            filters.locale_id = locale_id;
        if (search && search.trim().length > 0) {
            filters.OR = [
                { first_name: { contains: search.trim(), mode: "insensitive" } },
                { last_name: { contains: search.trim(), mode: "insensitive" } },
                { email: { contains: search.trim(), mode: "insensitive" } },
                { phone_number: { contains: search.trim(), mode: "insensitive" } },
            ];
        }
        if (phone_number && phone_number.trim().length > 0)
            filters.phone_number = phone_number;
        return filters;
    };
    async findAll(filters) {
        const queryOptions = this.prisma.buildQuery(filters, "created", "created", this.customFilters);
        const { items, count } = await this.prisma.findWithPagination(this.prisma.user, queryOptions, { locale: true });
        return {
            items: items.map((item) => {
                const { hashed_password, ...user } = item;
                return user;
            }),
            total: count,
            skip: filters.skip,
            take: filters.take,
        };
    }
};
exports.UsersListService = UsersListService;
exports.UsersListService = UsersListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], UsersListService);


/***/ }),
/* 115 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersCrudService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const argon2 = __webpack_require__(116);
let UsersCrudService = class UsersCrudService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(where, check_only = false) {
        const user = await this.prisma.user.findUnique({
            where,
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                phone_number: true,
                image: true,
                created: true,
                updated: true,
                role: true,
                is_banned: true,
                locale_id: true,
                locale: {
                    select: {
                        name: true,
                        symbol: true,
                    },
                },
            },
        });
        if (!user && !check_only) {
            throw new common_1.NotFoundException("Пользователь не найден");
        }
        return user;
    }
    async update(where, updateUserDto) {
        if (!where || Object.keys(where).length === 0) {
            throw new common_1.BadRequestException("Не указаны параметры поиска пользователя для обновления");
        }
        await this.findOne(where);
        const data = { ...updateUserDto };
        if (data.password) {
            data.hashed_password = await this.hashPassword(data.password);
            delete data.password;
        }
        if ("email" in data && data.email) {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existingUser && existingUser.id !== where.id) {
                throw new common_1.BadRequestException("Этот email уже занят");
            }
        }
        const updatedUser = await this.prisma.user.update({
            where,
            data,
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                phone_number: true,
                image: true,
                created: true,
                updated: true,
                role: true,
                is_banned: true,
                locale_id: true,
                locale: {
                    select: {
                        name: true,
                        symbol: true,
                    },
                },
            },
        });
        return updatedUser;
    }
    async hashPassword(password) {
        return await argon2.hash(password);
    }
};
exports.UsersCrudService = UsersCrudService;
exports.UsersCrudService = UsersCrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], UsersCrudService);


/***/ }),
/* 116 */
/***/ ((module) => {

module.exports = require("argon2");

/***/ }),
/* 117 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(111), exports);
__exportStar(__webpack_require__(112), exports);


/***/ }),
/* 118 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersSectionModule = void 0;
const users_1 = __webpack_require__(108);
const common_1 = __webpack_require__(3);
const auth_1 = __webpack_require__(119);
const sessions_1 = __webpack_require__(135);
const forms_1 = __webpack_require__(139);
let UsersSectionModule = class UsersSectionModule {
};
exports.UsersSectionModule = UsersSectionModule;
exports.UsersSectionModule = UsersSectionModule = __decorate([
    (0, common_1.Module)({
        imports: [users_1.UsersModule, auth_1.AuthModule, sessions_1.SessionsModule, forms_1.FormsModule],
        exports: [users_1.UsersModule, auth_1.AuthModule, sessions_1.SessionsModule, forms_1.FormsModule],
    })
], UsersSectionModule);


/***/ }),
/* 119 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticatedRequest = exports.RequestWithCookies = exports.RegisterDto = exports.LoginDto = void 0;
__exportStar(__webpack_require__(120), exports);
var dto_1 = __webpack_require__(127);
Object.defineProperty(exports, "LoginDto", ({ enumerable: true, get: function () { return dto_1.LoginDto; } }));
Object.defineProperty(exports, "RegisterDto", ({ enumerable: true, get: function () { return dto_1.RegisterDto; } }));
var request_interface_1 = __webpack_require__(130);
Object.defineProperty(exports, "RequestWithCookies", ({ enumerable: true, get: function () { return request_interface_1.RequestWithCookies; } }));
Object.defineProperty(exports, "AuthenticatedRequest", ({ enumerable: true, get: function () { return request_interface_1.AuthenticatedRequest; } }));


/***/ }),
/* 120 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(121);
const config_1 = __webpack_require__(4);
const passport_1 = __webpack_require__(51);
const controller_1 = __webpack_require__(122);
const service_1 = __webpack_require__(124);
const module_1 = __webpack_require__(131);
const jwt_strategy_1 = __webpack_require__(133);
const module_2 = __webpack_require__(109);
const services_1 = __webpack_require__(113);
const service_2 = __webpack_require__(125);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get("ACCESS_TOKEN_SECRET") ||
                        "access-token-secret-key",
                    signOptions: {
                        expiresIn: configService.get("ACCESS_TOKEN_EXPIRES_IN") || "15m",
                    },
                }),
            }),
            module_2.UsersModule,
            module_1.SessionsModule,
        ],
        controllers: [controller_1.AuthController],
        providers: [service_1.AuthService, jwt_strategy_1.JwtStrategy, services_1.UsersCrudService, service_2.RedisSessionService],
        exports: [service_1.AuthService, jwt_1.JwtModule],
    })
], AuthModule);


/***/ }),
/* 121 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 122 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(3);
const express_1 = __webpack_require__(123);
const swagger_1 = __webpack_require__(11);
const service_1 = __webpack_require__(124);
const dto_1 = __webpack_require__(127);
const common_2 = __webpack_require__(48);
const services_1 = __webpack_require__(113);
const request_interface_1 = __webpack_require__(130);
let AuthController = class AuthController {
    authService;
    usersCrudService;
    constructor(authService, usersCrudService) {
        this.authService = authService;
        this.usersCrudService = usersCrudService;
    }
    async register(registerDto, req, res) {
        const ip_address = this.getClientIp(req);
        const user_agent = req.get("User-Agent") || "Unknown";
        const { user, tokens, session } = await this.authService.register(registerDto, ip_address, user_agent);
        this.setTokenCookies(res, tokens);
        return res
            .status(201)
            .json({ user, session, message: "Регистрация успешна" });
    }
    async login(loginDto, req, res) {
        const ip_address = this.getClientIp(req);
        const user_agent = req.get("User-Agent") || "Unknown";
        const { user, tokens, session } = await this.authService.login(loginDto, ip_address, user_agent);
        this.setTokenCookies(res, tokens);
        return res
            .status(200)
            .json({ user, session, message: "Вход выполнен успешно" });
    }
    async logout(req, res) {
        const user_id = req.user?.user_id;
        const session_id = req.user?.session_id;
        if (user_id)
            await this.authService.logout(user_id, session_id);
        this.clearTokenCookies(res);
        return res.status(200).json({ message: "Выход выполнен успешно" });
    }
    async refresh(req, res) {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken)
            return res
                .status(401)
                .json({ message: "Токен обновления не предоставлен" });
        const { user, tokens, session } = await this.authService.refreshTokens(refreshToken);
        this.setTokenCookies(res, tokens);
        return res.status(200).json({ user, session });
    }
    async getProfile(req) {
        return await this.usersCrudService.findOne({ id: req.user.user_id });
    }
    getClientIp(req) {
        const forwarded = req.headers["x-forwarded-for"];
        const realIp = req.headers["x-real-ip"];
        const clientIp = req.headers["cf-connecting-ip"];
        let ip = req.ip ||
            (forwarded ? forwarded.split(",")[0].trim() : null) ||
            realIp ||
            clientIp ||
            "127.0.0.1";
        if (ip === "::1" || ip === "::ffff:127.0.0.1")
            ip = "127.0.0.1";
        return ip;
    }
    setTokenCookies(res, tokens) {
        res.cookie("access_token", tokens.accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        });
        res.cookie("refresh_token", tokens.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
    clearTokenCookies(res) {
        res.cookie("access_token", "", { httpOnly: true, maxAge: 0 });
        res.cookie("refresh_token", "", { httpOnly: true, maxAge: 0 });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiOperation)({ summary: "Регистрация нового пользователя" }),
    (0, swagger_1.ApiBody)({ type: dto_1.RegisterDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Пользователь успешно зарегистрирован",
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Неверные данные" }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: "Пользователь с таким email уже существует",
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof dto_1.RegisterDto !== "undefined" && dto_1.RegisterDto) === "function" ? _c : Object, typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, swagger_1.ApiOperation)({ summary: "Вход в систему" }),
    (0, swagger_1.ApiBody)({ type: dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Вход выполнен успешно" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Неверный email или пароль" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof dto_1.LoginDto !== "undefined" && dto_1.LoginDto) === "function" ? _f : Object, typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Выход из системы" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Выход выполнен успешно" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof request_interface_1.AuthenticatedRequest !== "undefined" && request_interface_1.AuthenticatedRequest) === "function" ? _j : Object, typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)("refresh"),
    (0, swagger_1.ApiOperation)({ summary: "Обновление токенов" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Токены успешно обновлены" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Невалидный refresh токен" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof request_interface_1.RequestWithCookies !== "undefined" && request_interface_1.RequestWithCookies) === "function" ? _l : Object, typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Получение данных текущего пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Данные пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Неавторизован" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof request_interface_1.AuthenticatedRequest !== "undefined" && request_interface_1.AuthenticatedRequest) === "function" ? _o : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [typeof (_a = typeof service_1.AuthService !== "undefined" && service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof services_1.UsersCrudService !== "undefined" && services_1.UsersCrudService) === "function" ? _b : Object])
], AuthController);


/***/ }),
/* 123 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 124 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(121);
const config_1 = __webpack_require__(4);
const argon2 = __webpack_require__(116);
const prisma_1 = __webpack_require__(19);
const services_1 = __webpack_require__(113);
const service_1 = __webpack_require__(125);
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    usersCrudService;
    redisSessionService;
    constructor(prisma, jwtService, configService, usersCrudService, redisSessionService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.usersCrudService = usersCrudService;
        this.redisSessionService = redisSessionService;
    }
    async register(registerDto, ip_address, user_agent) {
        const { email, password } = registerDto;
        const userExists = await this.usersCrudService.findOne({ email }, true);
        if (userExists)
            throw new common_1.ConflictException("Пользователь с таким email уже существует");
        const hash = await argon2.hash(password);
        const user = await this.prisma.user.create({
            data: { email, hashed_password: hash },
        });
        const sessionResult = await this.redisSessionService.create({
            user_id: user.id,
            ip_address,
            user_agent,
        });
        const tokens = this.generateTokens({
            user_id: user.id,
            email: user.email,
            session_id: sessionResult.id,
        });
        const { hashed_password, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            tokens,
            session: sessionResult.session,
        };
    }
    async login(loginDto, ip_address, user_agent) {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new common_1.UnauthorizedException("Неверный email или пароль");
        const isPasswordValid = await this.comparePasswords(password, user.hashed_password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException("Неверный email или пароль");
        const sessionResult = await this.redisSessionService.create({
            user_id: user.id,
            ip_address,
            user_agent,
        });
        const tokens = this.generateTokens({
            user_id: user.id,
            email: user.email,
            session_id: sessionResult.id,
        });
        const { hashed_password, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            tokens,
            session: sessionResult.session,
        };
    }
    async refreshTokens(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get("REFRESH_TOKEN_SECRET") ||
                    "refresh-token-secret-key",
            });
            const sessionData = await this.redisSessionService.validateSession(payload.session_id);
            if (!sessionData)
                throw new common_1.UnauthorizedException("Сессия неактивна или удалена");
            const user = await this.prisma.user.findUnique({
                where: { id: payload.user_id },
            });
            if (!user)
                throw new common_1.UnauthorizedException("Пользователь не найден");
            if (user.is_banned)
                throw new common_1.UnauthorizedException("Аккаунт заблокирован");
            const tokens = this.generateTokens({
                user_id: user.id,
                email: user.email,
                session_id: payload.session_id,
            });
            const { hashed_password, ...userWithoutPassword } = user;
            return {
                user: userWithoutPassword,
                tokens,
                session: sessionData,
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException)
                throw error;
            throw new common_1.UnauthorizedException("Недействительный токен обновления");
        }
    }
    async logout(user_id, session_id) {
        if (session_id) {
            await this.redisSessionService.deactivateSession(session_id);
        }
        else {
            await this.redisSessionService.deactivateAllOtherSessions(user_id);
        }
        return { message: "Выход выполнен успешно" };
    }
    async validateUser(user_id) {
        const user = await this.prisma.user.findUnique({ where: { id: user_id } });
        if (!user)
            throw new common_1.UnauthorizedException("Пользователь не найден");
        if (user.is_banned)
            throw new common_1.UnauthorizedException("Аккаунт заблокирован");
        const { hashed_password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get("ACCESS_TOKEN_SECRET") ||
                "access-token-secret-key",
            expiresIn: this.configService.get("ACCESS_TOKEN_EXPIRES_IN") || "15m",
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get("REFRESH_TOKEN_SECRET") ||
                "refresh-token-secret-key",
            expiresIn: this.configService.get("REFRESH_TOKEN_EXPIRES_IN") || "7d",
        });
        return { accessToken, refreshToken };
    }
    async comparePasswords(plainTextPassword, hashedPassword) {
        return await argon2.verify(hashedPassword, plainTextPassword);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object, typeof (_d = typeof services_1.UsersCrudService !== "undefined" && services_1.UsersCrudService) === "function" ? _d : Object, typeof (_e = typeof service_1.RedisSessionService !== "undefined" && service_1.RedisSessionService) === "function" ? _e : Object])
], AuthService);


/***/ }),
/* 125 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisSessionService = void 0;
const common_1 = __webpack_require__(3);
const redis_1 = __webpack_require__(13);
const uuid_1 = __webpack_require__(126);
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
    __metadata("design:paramtypes", [typeof (_a = typeof redis_1.RedisService !== "undefined" && redis_1.RedisService) === "function" ? _a : Object])
], RedisSessionService);


/***/ }),
/* 126 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 127 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(128), exports);
__exportStar(__webpack_require__(129), exports);


/***/ }),
/* 128 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "user@example.com",
        description: "Email пользователя",
    }),
    (0, class_validator_1.IsEmail)({}, { message: "Введите корректный email" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Email обязателен" }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "password123",
        description: "Пароль пользователя",
    }),
    (0, class_validator_1.IsString)({ message: "Пароль должен быть строкой" }),
    (0, class_validator_1.MinLength)(6, { message: "Пароль должен содержать минимум 6 символов" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Пароль обязателен" }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),
/* 129 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
class RegisterDto {
    email;
    password;
    first_name;
    last_name;
    phone_number;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "user@example.com",
        description: "Email пользователя",
    }),
    (0, class_validator_1.IsEmail)({}, { message: "Введите корректный email" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Email обязателен" }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "password123",
        description: "Пароль пользователя",
    }),
    (0, class_validator_1.IsString)({ message: "Пароль должен быть строкой" }),
    (0, class_validator_1.MinLength)(6, { message: "Пароль должен содержать минимум 6 символов" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Пароль обязателен" }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Иван",
        description: "Имя пользователя",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "Имя должно быть строкой" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Иванов",
        description: "Фамилия пользователя",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "Фамилия должна быть строкой" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "+79001234567",
        description: "Номер телефона пользователя",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "Номер телефона должен быть строкой" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "phone_number", void 0);


/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 131 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionsModule = void 0;
const common_1 = __webpack_require__(3);
const redis_1 = __webpack_require__(13);
const controller_1 = __webpack_require__(132);
const service_1 = __webpack_require__(125);
let SessionsModule = class SessionsModule {
};
exports.SessionsModule = SessionsModule;
exports.SessionsModule = SessionsModule = __decorate([
    (0, common_1.Module)({
        imports: [redis_1.RedisModule],
        controllers: [controller_1.SessionsController],
        providers: [service_1.RedisSessionService],
        exports: [service_1.RedisSessionService],
    })
], SessionsModule);


/***/ }),
/* 132 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionsController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(11);
const service_1 = __webpack_require__(125);
const jwt_auth_guard_1 = __webpack_require__(50);
const prisma_1 = __webpack_require__(19);
const common_2 = __webpack_require__(48);
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
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
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
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
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
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
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
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
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
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
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
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
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
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], SessionsController.prototype, "getUserSessionCount", null);
exports.SessionsController = SessionsController = __decorate([
    (0, swagger_1.ApiTags)("Сессии"),
    (0, common_1.Controller)("sessions"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof service_1.RedisSessionService !== "undefined" && service_1.RedisSessionService) === "function" ? _a : Object])
], SessionsController);


/***/ }),
/* 133 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(51);
const passport_jwt_1 = __webpack_require__(134);
const service_1 = __webpack_require__(124);
const service_2 = __webpack_require__(125);
const config_1 = __webpack_require__(4);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    authService;
    redisSessionService;
    configService;
    constructor(authService, redisSessionService, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    const token = request?.cookies?.access_token;
                    return token || null;
                },
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get("ACCESS_TOKEN_SECRET") ||
                "access-token-secret-key",
        });
        this.authService = authService;
        this.redisSessionService = redisSessionService;
        this.configService = configService;
    }
    async validate(payload) {
        try {
            const user = await this.authService.validateUser(payload.user_id);
            const sessionData = await this.redisSessionService.validateSession(payload.session_id);
            if (!sessionData)
                throw new common_1.UnauthorizedException("Сессия неактивна или удалена. Пожалуйста, войдите заново.");
            return {
                ...user,
                user_id: payload.user_id,
                session_id: payload.session_id,
                email: payload.email,
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException)
                throw error;
            throw new common_1.UnauthorizedException("Пользователь не авторизован");
        }
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof service_1.AuthService !== "undefined" && service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof service_2.RedisSessionService !== "undefined" && service_2.RedisSessionService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], JwtStrategy);


/***/ }),
/* 134 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 135 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(131), exports);
__exportStar(__webpack_require__(136), exports);
__exportStar(__webpack_require__(132), exports);


/***/ }),
/* 136 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(137), exports);
__exportStar(__webpack_require__(138), exports);


/***/ }),
/* 137 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionFiltersDto = void 0;
const base_filter_dto_1 = __webpack_require__(25);
const swagger_1 = __webpack_require__(11);
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
class SessionFiltersDto extends base_filter_dto_1.BaseFilterDto {
    user_id;
    is_active;
    ip_address;
    user_agent;
}
exports.SessionFiltersDto = SessionFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Идентификатор пользователя",
        example: "cmbi2oevc0000twkoc0a3nofo",
    }),
    __metadata("design:type", String)
], SessionFiltersDto.prototype, "user_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Активна ли сессия",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], SessionFiltersDto.prototype, "is_active", void 0);
__decorate([
    (0, class_validator_1.IsIP)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "IP адрес сессии", example: "192.168.1.1" }),
    __metadata("design:type", String)
], SessionFiltersDto.prototype, "ip_address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "User Agent браузерa",
        example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    }),
    __metadata("design:type", String)
], SessionFiltersDto.prototype, "user_agent", void 0);


/***/ }),
/* 138 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSessionDto = void 0;
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
class CreateSessionDto {
    ip_address;
    user_agent;
    user_id;
}
exports.CreateSessionDto = CreateSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "IP адрес пользователя", example: "192.168.1.1" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "ip_address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User Agent браузера/устройства",
        example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "user_agent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID пользователя", example: "uuid" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "user_id", void 0);


/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormsFiltersDto = exports.CreateFormDto = exports.example_forms_list_result = exports.example_extended_form = exports.ExtendedForm = exports.FormsModule = void 0;
var module_1 = __webpack_require__(140);
Object.defineProperty(exports, "FormsModule", ({ enumerable: true, get: function () { return module_1.FormsModule; } }));
var example_data_1 = __webpack_require__(146);
Object.defineProperty(exports, "ExtendedForm", ({ enumerable: true, get: function () { return example_data_1.ExtendedForm; } }));
Object.defineProperty(exports, "example_extended_form", ({ enumerable: true, get: function () { return example_data_1.example_extended_form; } }));
Object.defineProperty(exports, "example_forms_list_result", ({ enumerable: true, get: function () { return example_data_1.example_forms_list_result; } }));
var dto_1 = __webpack_require__(142);
Object.defineProperty(exports, "CreateFormDto", ({ enumerable: true, get: function () { return dto_1.CreateFormDto; } }));
Object.defineProperty(exports, "FormsFiltersDto", ({ enumerable: true, get: function () { return dto_1.FormsFiltersDto; } }));


/***/ }),
/* 140 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormsModule = void 0;
const common_1 = __webpack_require__(3);
const controller_1 = __webpack_require__(141);
const service_1 = __webpack_require__(145);
const prisma_1 = __webpack_require__(19);
let FormsModule = class FormsModule {
};
exports.FormsModule = FormsModule;
exports.FormsModule = FormsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [controller_1.FormsController],
        providers: [service_1.FormsService],
        exports: [service_1.FormsService],
    })
], FormsModule);


/***/ }),
/* 141 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormsController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(11);
const dto_1 = __webpack_require__(142);
const service_1 = __webpack_require__(145);
const common_2 = __webpack_require__(48);
const example_data_1 = __webpack_require__(146);
let FormsController = class FormsController {
    formsService;
    constructor(formsService) {
        this.formsService = formsService;
    }
    async create(dto, req, locale) {
        return this.formsService.create(dto, req, locale);
    }
    async findAll(filters) {
        return this.formsService.findAll(filters);
    }
    async findOne(id) {
        return this.formsService.findOne(id);
    }
    async answer(id) {
        return this.formsService.answer(id);
    }
    async delete(id) {
        return this.formsService.delete(id);
    }
};
exports.FormsController = FormsController;
__decorate([
    (0, common_1.Post)(":locale"),
    (0, swagger_1.ApiOperation)({ summary: "Create form" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Form created",
        example: example_data_1.example_extended_form,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)("locale")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dto_1.CreateFormDto !== "undefined" && dto_1.CreateFormDto) === "function" ? _b : Object, typeof (_c = typeof Request !== "undefined" && Request) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_2.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: "Get forms" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Forms found",
        example: example_data_1.example_forms_list_result,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.FormsFiltersDto !== "undefined" && dto_1.FormsFiltersDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_2.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: "Get form" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Form found",
        example: example_data_1.example_extended_form,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_2.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: "Answer form" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Form answered",
        example: example_data_1.example_extended_form,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "answer", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_2.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: "Delete form" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Form deleted" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "delete", null);
exports.FormsController = FormsController = __decorate([
    (0, common_1.Controller)("forms"),
    (0, swagger_1.ApiTags)("Forms"),
    __metadata("design:paramtypes", [typeof (_a = typeof service_1.FormsService !== "undefined" && service_1.FormsService) === "function" ? _a : Object])
], FormsController);


/***/ }),
/* 142 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormsFiltersDto = exports.CreateFormDto = void 0;
var create_dto_1 = __webpack_require__(143);
Object.defineProperty(exports, "CreateFormDto", ({ enumerable: true, get: function () { return create_dto_1.CreateFormDto; } }));
var filters_dto_1 = __webpack_require__(144);
Object.defineProperty(exports, "FormsFiltersDto", ({ enumerable: true, get: function () { return filters_dto_1.FormsFiltersDto; } }));


/***/ }),
/* 143 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateFormDto = void 0;
const swagger_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(10);
class CreateFormDto {
    sender_name;
    company_name;
    phone_number;
    email;
    message;
}
exports.CreateFormDto = CreateFormDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 1024),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "Имя отправителя",
        minLength: 2,
        maxLength: 1024,
    }),
    __metadata("design:type", String)
], CreateFormDto.prototype, "sender_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 1024),
    (0, swagger_1.ApiProperty)({
        description: "Название компании",
        minLength: 2,
        maxLength: 1024,
    }),
    __metadata("design:type", String)
], CreateFormDto.prototype, "company_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)(),
    (0, class_validator_1.Length)(2, 16),
    (0, swagger_1.ApiProperty)({ description: "Номер телефона", minLength: 2, maxLength: 16 }),
    __metadata("design:type", String)
], CreateFormDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(2, 256),
    (0, swagger_1.ApiProperty)({ description: "Email", minLength: 2, maxLength: 256 }),
    __metadata("design:type", String)
], CreateFormDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 8192),
    (0, swagger_1.ApiProperty)({ description: "Сообщение", minLength: 2, maxLength: 8192 }),
    __metadata("design:type", String)
], CreateFormDto.prototype, "message", void 0);


/***/ }),
/* 144 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormsFiltersDto = void 0;
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
const class_transformer_1 = __webpack_require__(9);
const base_filter_dto_1 = __webpack_require__(25);
class FormsFiltersDto extends base_filter_dto_1.BaseFilterDto {
    search;
    is_read;
    is_answered;
}
exports.FormsFiltersDto = FormsFiltersDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 1024),
    (0, swagger_1.ApiProperty)({ description: "Поиск", required: false }),
    __metadata("design:type", String)
], FormsFiltersDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ description: "Прочитано", required: false }),
    __metadata("design:type", Boolean)
], FormsFiltersDto.prototype, "is_read", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ description: "Отвечено", required: false }),
    __metadata("design:type", Boolean)
], FormsFiltersDto.prototype, "is_answered", void 0);


/***/ }),
/* 145 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormsService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
let FormsService = class FormsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, req, locale_symbol) {
        const ip_address = this.getClientIp(req);
        await this.checkIpLimit(ip_address);
        const locale = await this.prisma.locale.findUnique({
            where: { symbol: locale_symbol.toUpperCase() },
        });
        if (!locale)
            throw new common_1.BadRequestException(`Locale with symbol '${locale_symbol}' not found`);
        const form_data = {
            ...dto,
            ip_address,
            locale_id: locale.id,
        };
        return await this.prisma.form.create({ data: form_data });
    }
    getClientIp(req) {
        const forwarded = req.headers["x-forwarded-for"];
        const realIp = req.headers["x-real-ip"];
        const clientIp = req.headers["cf-connecting-ip"];
        let ip = (forwarded ? forwarded.split(",")[0].trim() : null) ||
            realIp ||
            clientIp ||
            "127.0.0.1";
        if (ip === "::1" || ip === "::ffff:127.0.0.1")
            ip = "127.0.0.1";
        return ip;
    }
    async checkIpLimit(ip_address) {
        const today_start = new Date();
        today_start.setHours(0, 0, 0, 0);
        const today_end = new Date();
        today_end.setHours(23, 59, 59, 999);
        const forms_count = await this.prisma.form.count({
            where: {
                ip_address,
                created: {
                    gte: today_start,
                    lte: today_end,
                },
            },
        });
        if (forms_count >= 3)
            throw new common_1.BadRequestException("Daily form submission limit exceeded for this IP address");
    }
    async findOne(id) {
        const form = await this.prisma.form.findUnique({ where: { id } });
        if (!form)
            throw new common_1.NotFoundException("Form not found");
        await this.prisma.form.update({ where: { id }, data: { is_read: true } });
        return form;
    }
    customFilters = (options) => {
        const { search, is_read, is_answered } = options;
        const filters = {};
        if (search) {
            filters.OR = [
                { sender_name: { contains: search, mode: "insensitive" } },
                { company_name: { contains: search, mode: "insensitive" } },
                { phone_number: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { message: { contains: search, mode: "insensitive" } },
            ];
        }
        if (is_read !== undefined)
            filters.is_read = is_read;
        if (is_answered !== undefined)
            filters.is_answered = is_answered;
        return filters;
    };
    async findAll(filters) {
        const query_options = this.prisma.buildQuery(filters, "created", "created", (filters) => this.customFilters(filters));
        const { items, count } = await this.prisma.findWithPagination(this.prisma.form, query_options);
        return {
            items,
            total: count,
            skip: filters.skip,
            take: filters.take,
        };
    }
    async answer(id) {
        await this.findOne(id);
        return await this.prisma.form.update({
            where: { id },
            data: { is_answered: true },
        });
    }
    async delete(id) {
        await this.findOne(id);
        return await this.prisma.form.delete({ where: { id } });
    }
};
exports.FormsService = FormsService;
exports.FormsService = FormsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], FormsService);


/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.example_forms_list_result = exports.example_extended_form = void 0;
const locales_section_1 = __webpack_require__(147);
const example_form = {
    id: "1",
    sender_name: "John Doe",
    company_name: "Acme Inc.",
    phone_number: "+1234567890",
    email: "john.doe@example.com",
    message: "Hello, world!",
    ip_address: "127.0.0.1",
    is_read: false,
    is_answered: false,
    created: new Date(),
    updated: new Date(),
    locale_id: "1",
};
exports.example_extended_form = {
    ...example_form,
    locale: locales_section_1.example_locale,
};
exports.example_forms_list_result = {
    items: [exports.example_extended_form],
    total: 1,
    skip: 0,
    take: 10,
};


/***/ }),
/* 147 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(148), exports);
__exportStar(__webpack_require__(149), exports);
__exportStar(__webpack_require__(153), exports);


/***/ }),
/* 148 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(81), exports);
__exportStar(__webpack_require__(83), exports);
__exportStar(__webpack_require__(35), exports);
__exportStar(__webpack_require__(74), exports);


/***/ }),
/* 149 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(89), exports);
__exportStar(__webpack_require__(87), exports);
__exportStar(__webpack_require__(150), exports);


/***/ }),
/* 150 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(151), exports);
__exportStar(__webpack_require__(152), exports);


/***/ }),
/* 151 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 152 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 153 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalesSectionModule = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const services_1 = __webpack_require__(66);
const module_1 = __webpack_require__(87);
const files_module_1 = __webpack_require__(60);
let LocalesSectionModule = class LocalesSectionModule {
};
exports.LocalesSectionModule = LocalesSectionModule;
exports.LocalesSectionModule = LocalesSectionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, module_1.TranslationsModule, files_module_1.FilesModule],
        providers: [services_1.CrudService, services_1.ListService, services_1.ValidationService],
        exports: [services_1.CrudService, services_1.ListService, services_1.ValidationService],
    })
], LocalesSectionModule);


/***/ }),
/* 154 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(155), exports);
__exportStar(__webpack_require__(156), exports);
__exportStar(__webpack_require__(168), exports);


/***/ }),
/* 155 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceSectionModule = void 0;
const prisma_1 = __webpack_require__(19);
const services_1 = __webpack_require__(156);
const common_1 = __webpack_require__(3);
const local_services_1 = __webpack_require__(168);
let ServiceSectionModule = class ServiceSectionModule {
};
exports.ServiceSectionModule = ServiceSectionModule;
exports.ServiceSectionModule = ServiceSectionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, services_1.ServicesModule, local_services_1.LocalServicesModule],
        exports: [services_1.ServicesModule, local_services_1.LocalServicesModule],
    })
], ServiceSectionModule);


/***/ }),
/* 156 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtendedService = exports.example_extended_services_list_result = exports.example_extended_service = exports.example_service = void 0;
__exportStar(__webpack_require__(157), exports);
__exportStar(__webpack_require__(165), exports);
var example_data_1 = __webpack_require__(162);
Object.defineProperty(exports, "example_service", ({ enumerable: true, get: function () { return example_data_1.example_service; } }));
Object.defineProperty(exports, "example_extended_service", ({ enumerable: true, get: function () { return example_data_1.example_extended_service; } }));
Object.defineProperty(exports, "example_extended_services_list_result", ({ enumerable: true, get: function () { return example_data_1.example_extended_services_list_result; } }));
Object.defineProperty(exports, "ExtendedService", ({ enumerable: true, get: function () { return example_data_1.ExtendedService; } }));


/***/ }),
/* 157 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicesModule = void 0;
const prisma_1 = __webpack_require__(19);
const controller_1 = __webpack_require__(158);
const crud_service_1 = __webpack_require__(160);
const list_service_1 = __webpack_require__(161);
const common_1 = __webpack_require__(3);
const files_module_1 = __webpack_require__(60);
const categories_section_1 = __webpack_require__(36);
let ServicesModule = class ServicesModule {
};
exports.ServicesModule = ServicesModule;
exports.ServicesModule = ServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, files_module_1.FilesModule, categories_section_1.CategoriesModule],
        controllers: [controller_1.ServicesController],
        providers: [list_service_1.ListService, crud_service_1.CrudService],
        exports: [list_service_1.ListService, crud_service_1.CrudService],
    })
], ServicesModule);


/***/ }),
/* 158 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicesController = void 0;
const common_1 = __webpack_require__(3);
const filters_dto_1 = __webpack_require__(159);
const crud_service_1 = __webpack_require__(160);
const list_service_1 = __webpack_require__(161);
const swagger_1 = __webpack_require__(11);
const example_data_1 = __webpack_require__(162);
const dto_1 = __webpack_require__(165);
const common_2 = __webpack_require__(48);
const prisma_1 = __webpack_require__(19);
let ServicesController = class ServicesController {
    listService;
    crudService;
    constructor(listService, crudService) {
        this.listService = listService;
        this.crudService = crudService;
    }
    async getServices(filters) {
        return this.listService.getServices(filters);
    }
    async getService(id, locale_id) {
        return this.crudService.findOne(id, locale_id);
    }
    async getServiceByLocale(id, locale_id) {
        return this.crudService.findOne(id, locale_id);
    }
    async createService(data, file) {
        return this.crudService.create(data, file);
    }
    async updateService(id, data, file) {
        return this.crudService.update(id, data, file);
    }
    async deleteService(id) {
        return this.crudService.delete(id);
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ type: filters_dto_1.ServiceFiltersDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Список услуг успешно получен",
        example: example_data_1.example_extended_services_list_result,
    }),
    (0, swagger_1.ApiOperation)({
        summary: "Получение списка услуг с пагинацией и сортировкой",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof filters_dto_1.ServiceFiltersDto !== "undefined" && filters_dto_1.ServiceFiltersDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getServices", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Получение услуги по id" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Услуга успешно получена",
        example: example_data_1.example_extended_service,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Услуга не найдена" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректный id услуги" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)("locale_id", new common_1.ParseUUIDPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getService", null);
__decorate([
    (0, common_1.Get)(":id/:locale_id"),
    (0, swagger_1.ApiOperation)({
        summary: "Получение локализованной услуги по id и locale_id",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Услуга успешно получена",
        example: example_data_1.example_extended_service,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Некорректный id или locale_id услуги",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Услуга не найдена" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)("locale_id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getServiceByLocale", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiOperation)({ summary: "Создание услуги" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Услуга успешно создана",
        example: example_data_1.example_extended_service,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректные данные" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiQuery)({
        description: "Данные для создания услуги",
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
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateServiceDto !== "undefined" && dto_1.CreateServiceDto) === "function" ? _d : Object, typeof (_f = typeof Express !== "undefined" && (_e = Express.Multer) !== void 0 && _e.File) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "createService", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, common_1.UseInterceptors)(common_2.ImageUploadInterceptor),
    (0, swagger_1.ApiOperation)({ summary: "Обновление услуги" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Услуга успешно обновлена",
        example: example_data_1.example_extended_service,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректные данные" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Услуга не найдена" }),
    (0, swagger_1.ApiQuery)({
        description: "Данные для обновления услуги",
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
    __metadata("design:paramtypes", [String, typeof (_g = typeof dto_1.UpdateServiceDto !== "undefined" && dto_1.UpdateServiceDto) === "function" ? _g : Object, typeof (_j = typeof Express !== "undefined" && (_h = Express.Multer) !== void 0 && _h.File) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "updateService", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Удаление услуги" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Услуга успешно удалена" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Некорректный id услуги" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Услуга не найдена" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "deleteService", null);
exports.ServicesController = ServicesController = __decorate([
    (0, swagger_1.ApiTags)("Services"),
    (0, common_1.Controller)("services"),
    __metadata("design:paramtypes", [typeof (_a = typeof list_service_1.ListService !== "undefined" && list_service_1.ListService) === "function" ? _a : Object, typeof (_b = typeof crud_service_1.CrudService !== "undefined" && crud_service_1.CrudService) === "function" ? _b : Object])
], ServicesController);


/***/ }),
/* 159 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceFiltersDto = void 0;
const class_validator_1 = __webpack_require__(10);
const base_filter_dto_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(9);
const swagger_1 = __webpack_require__(11);
class ServiceFiltersDto extends base_filter_dto_1.BaseFilterDto {
    category_id;
    name;
    description;
    min_price;
    max_price;
    is_discounted;
    locale_id;
    is_excluded = false;
}
exports.ServiceFiltersDto = ServiceFiltersDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "Идентификатор категории услуги",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], ServiceFiltersDto.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "Название услуги", example: "Услуга 1" }),
    __metadata("design:type", String)
], ServiceFiltersDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "Описание услуги", example: "Описание услуги 1" }),
    __metadata("design:type", String)
], ServiceFiltersDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({ description: "Минимальная цена услуги", example: 0 }),
    __metadata("design:type", Number)
], ServiceFiltersDto.prototype, "min_price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({ description: "Максимальная цена услуги", example: 100000 }),
    __metadata("design:type", Number)
], ServiceFiltersDto.prototype, "max_price", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли услуга со скидкой",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], ServiceFiltersDto.prototype, "is_discounted", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "Идентификатор локали",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], ServiceFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли услуга исключенной",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], ServiceFiltersDto.prototype, "is_excluded", void 0);


/***/ }),
/* 160 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CrudService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const files_service_1 = __webpack_require__(27);
const allowed_models_data_1 = __webpack_require__(30);
const crud_service_1 = __webpack_require__(40);
let CrudService = class CrudService {
    prisma;
    filesService;
    categoryService;
    constructor(prisma, filesService, categoryService) {
        this.prisma = prisma;
        this.filesService = filesService;
        this.categoryService = categoryService;
    }
    getInclude(locale_id) {
        return {
            images: true,
            category: true,
            local_services: {
                include: { local_item_descriptions: { orderBy: { order: "asc" }, where: { is_excluded: false } } },
                ...(locale_id && { where: { locale_id } }),
            },
        };
    }
    saveImage(data, file) {
        if (!this.filesService.isValidImage(file))
            throw new Error("Недопустимый формат файла. Разрешены только JPEG, PNG и WebP");
        if (!this.filesService.isValidSize(file, 5))
            throw new Error("Размер файла не должен превышать 5 МБ");
        data.image = this.filesService.saveImage(file, allowed_models_data_1.images_paths.services);
    }
    async create(data, file) {
        if (await this.prisma.service.findUnique({ where: { name: data.name } }))
            throw new common_1.BadRequestException("Услуга с таким названием уже существует");
        if (file)
            this.saveImage(data, file);
        if (!data.image)
            throw new common_1.BadRequestException("Изображение обязательно");
        if (!data.category_id)
            throw new common_1.BadRequestException("Категория обязательна");
        const category = await this.categoryService.findOne(data.category_id);
        if (!category)
            throw new common_1.BadRequestException("Категория не найдена");
        if (category.type !== "SERVICE")
            throw new common_1.BadRequestException("Категория должна быть типа SERVICE");
        return await this.prisma.service.create({
            data: { ...data, image: data.image },
            include: this.getInclude(),
        });
    }
    async findOne(id, locale_id) {
        const service = await this.prisma.service.findUnique({
            where: { id },
            include: this.getInclude(locale_id),
        });
        if (!service)
            throw new common_1.NotFoundException("Service not found");
        return service;
    }
    async update(id, data, file) {
        await this.findOne(id);
        if (file)
            this.saveImage(data, file);
        if (data.category_id) {
            const category = await this.categoryService.findOne(data.category_id);
            if (category.type !== "SERVICE")
                throw new common_1.BadRequestException("Категория должна быть типа SERVICE");
        }
        return this.prisma.service.update({ where: { id }, data, include: this.getInclude() });
    }
    async delete(id) {
        return (await this.findOne(id)).is_excluded
            ? await this.prisma.service.delete({ where: { id } })
            : await this.update(id, { is_excluded: true });
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof files_service_1.FilesService !== "undefined" && files_service_1.FilesService) === "function" ? _b : Object, typeof (_c = typeof crud_service_1.CrudService !== "undefined" && crud_service_1.CrudService) === "function" ? _c : Object])
], CrudService);


/***/ }),
/* 161 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
let ListService = class ListService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getServices(filterDto) {
        const { category_id, name, description, min_price, max_price, is_discounted, is_excluded, skip = 0, take = 10, locale_id, sort = "created", sort_direction = "desc", } = filterDto;
        let where = {};
        if (category_id) {
            where = {
                OR: [{ category_id }, { category: { parent_id: category_id } }],
            };
        }
        if (name)
            where.name = { contains: name, mode: "insensitive" };
        if (description)
            where.description = { contains: description, mode: "insensitive" };
        if (min_price)
            where.price_USD = { gte: min_price };
        if (max_price)
            where.price_USD = { lte: max_price };
        if (is_discounted !== undefined)
            where.discount_price_USD = { not: null };
        if (is_excluded)
            where.is_excluded = is_excluded;
        const items = await this.prisma.service.findMany({
            where,
            skip,
            take,
            orderBy: { [sort]: sort_direction },
            include: {
                images: true,
                category: true,
                local_services: locale_id
                    ? {
                        where: locale_id ? { locale_id } : undefined,
                        include: {
                            local_item_descriptions: { orderBy: { order: "asc" } },
                        },
                    }
                    : false,
            },
        });
        const total = await this.prisma.service.count({ where });
        return {
            items: items,
            total,
            skip,
            take,
        };
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ListService);


/***/ }),
/* 162 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.example_extended_services_list_result = exports.example_extended_service = exports.example_service = void 0;
const example_data_1 = __webpack_require__(163);
const example_data_2 = __webpack_require__(164);
const example_data_3 = __webpack_require__(33);
exports.example_service = {
    id: "UUID",
    name: "Example Service Name",
    description: "Description of the service for notes",
    price_USD: 100,
    discount_price_USD: 80,
    created: new Date(),
    updated: new Date(),
    category_id: "UUID",
    is_excluded: false,
    image: "https://example.com/image.jpg",
};
exports.example_extended_service = {
    ...exports.example_service,
    category: example_data_3.example_category,
    images: [example_data_1.example_item_image],
    local_services: [example_data_2.example_extended_local_service],
};
exports.example_extended_services_list_result = {
    items: [exports.example_extended_service],
    total: 1,
    skip: 0,
    take: 10,
};


/***/ }),
/* 163 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.example_item_images_list_result = exports.example_item_image = void 0;
exports.example_item_image = {
    id: "UUID",
    image: "https://example.com/image.jpg",
    is_excluded: false,
    created: new Date(),
    updated: new Date(),
    product_id: "UUID",
    service_id: "UUID",
};
exports.example_item_images_list_result = {
    items: [exports.example_item_image],
    total: 1,
    take: 10,
    skip: 0,
};


/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.example_extended_local_service = exports.example_local_services_list_result = exports.example_local_service = void 0;
const example_data_1 = __webpack_require__(162);
const example_data_2 = __webpack_require__(35);
const example_data_3 = __webpack_require__(106);
exports.example_local_service = {
    id: "UUID",
    name: "Service 1",
    description: "Description 1",
    price: 100,
    discount_price: 80,
    created: new Date(),
    updated: new Date(),
    service_id: "UUID",
    locale_id: "UUID",
    is_excluded: false,
};
exports.example_local_services_list_result = {
    items: [exports.example_local_service],
    total: 1,
    skip: 0,
    take: 10,
};
exports.example_extended_local_service = {
    ...exports.example_local_service,
    local_item_descriptions: [example_data_3.example_local_item_description],
    service: example_data_1.example_service,
    locale: example_data_2.example_locale,
};


/***/ }),
/* 165 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(166), exports);
__exportStar(__webpack_require__(167), exports);
__exportStar(__webpack_require__(159), exports);


/***/ }),
/* 166 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateServiceDto = void 0;
const swagger_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(10);
const class_transformer_1 = __webpack_require__(9);
class CreateServiceDto {
    name;
    category_id;
    price_USD;
    discount_price_USD;
    description;
    image;
}
exports.CreateServiceDto = CreateServiceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)({
        description: "Название услуги для администратора (на сайте будет отображаться локальное название)",
        example: "Услуга 1",
        minLength: 3,
        maxLength: 512,
    }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "Категория услуги",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "category_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Цена услуги в USD (будет отображаться с конвертацией по курсу валюты при отсутствии локальных цен)",
        example: 100,
    }),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "price_USD", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Скидочная цена услуги в USD (если не указана, то будет использоваться цена в USD)",
        example: 90,
    }),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "discount_price_USD", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(4096),
    (0, swagger_1.ApiProperty)({
        description: "Описание услуги для заметок администратора (на сайте будут отображаться локальные описания)",
        example: "Описание услуги 1",
        minLength: 3,
        maxLength: 4096,
    }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Главное изображение услуги",
        example: "https://example.com/image.jpg",
    }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "image", void 0);


/***/ }),
/* 167 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateServiceDto = void 0;
const create_dto_1 = __webpack_require__(166);
const mapped_types_1 = __webpack_require__(46);
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
class UpdateServiceDto extends (0, mapped_types_1.PartialType)(create_dto_1.CreateServiceDto) {
    is_excluded;
}
exports.UpdateServiceDto = UpdateServiceDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value == "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Исключена ли услуга",
        required: false,
        example: false,
    }),
    __metadata("design:type", Boolean)
], UpdateServiceDto.prototype, "is_excluded", void 0);


/***/ }),
/* 168 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtendedLocalService = exports.example_local_service = exports.UpdateLocalServiceDto = exports.CreateLocalServiceDto = exports.LocalServiceFiltersDto = exports.LocalServicesModule = void 0;
var module_1 = __webpack_require__(169);
Object.defineProperty(exports, "LocalServicesModule", ({ enumerable: true, get: function () { return module_1.LocalServicesModule; } }));
var dto_1 = __webpack_require__(174);
Object.defineProperty(exports, "LocalServiceFiltersDto", ({ enumerable: true, get: function () { return dto_1.LocalServiceFiltersDto; } }));
Object.defineProperty(exports, "CreateLocalServiceDto", ({ enumerable: true, get: function () { return dto_1.CreateLocalServiceDto; } }));
Object.defineProperty(exports, "UpdateLocalServiceDto", ({ enumerable: true, get: function () { return dto_1.UpdateLocalServiceDto; } }));
var example_data_1 = __webpack_require__(164);
Object.defineProperty(exports, "example_local_service", ({ enumerable: true, get: function () { return example_data_1.example_local_service; } }));
Object.defineProperty(exports, "ExtendedLocalService", ({ enumerable: true, get: function () { return example_data_1.ExtendedLocalService; } }));


/***/ }),
/* 169 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalServicesModule = void 0;
const controller_1 = __webpack_require__(170);
const services_1 = __webpack_require__(171);
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const module_1 = __webpack_require__(157);
const module_2 = __webpack_require__(81);
let LocalServicesModule = class LocalServicesModule {
};
exports.LocalServicesModule = LocalServicesModule;
exports.LocalServicesModule = LocalServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, module_1.ServicesModule, module_2.LocalesModule],
        controllers: [controller_1.LocalServicesController],
        providers: [services_1.ListService, services_1.CrudService],
        exports: [services_1.CrudService, services_1.ListService],
    })
], LocalServicesModule);


/***/ }),
/* 170 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalServicesController = void 0;
const services_1 = __webpack_require__(171);
const common_1 = __webpack_require__(3);
const dto_1 = __webpack_require__(174);
const swagger_1 = __webpack_require__(11);
const example_data_1 = __webpack_require__(164);
const common_2 = __webpack_require__(48);
const prisma_1 = __webpack_require__(19);
let LocalServicesController = class LocalServicesController {
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
exports.LocalServicesController = LocalServicesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Получение списка локализаций услуги" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Список локализаций услуги",
        example: example_data_1.example_local_services_list_result,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof dto_1.LocalServiceFiltersDto !== "undefined" && dto_1.LocalServiceFiltersDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], LocalServicesController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Получение локализации услуги по id" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация услуги",
        example: example_data_1.example_extended_local_service,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalServicesController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Создание локализации услуги" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Локализация услуги создана",
        example: example_data_1.example_extended_local_service,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateLocalServiceDto !== "undefined" && dto_1.CreateLocalServiceDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], LocalServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Обновление локализации услуги" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Локализация услуги обновлена",
        example: example_data_1.example_extended_local_service,
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof dto_1.UpdateLocalServiceDto !== "undefined" && dto_1.UpdateLocalServiceDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], LocalServicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)(prisma_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Удаление локализации услуги" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Локализация услуги удалена" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalServicesController.prototype, "delete", null);
exports.LocalServicesController = LocalServicesController = __decorate([
    (0, swagger_1.ApiTags)("Local Services"),
    (0, common_1.Controller)("local-services"),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.ListService !== "undefined" && services_1.ListService) === "function" ? _a : Object, typeof (_b = typeof services_1.CrudService !== "undefined" && services_1.CrudService) === "function" ? _b : Object])
], LocalServicesController);


/***/ }),
/* 171 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(172), exports);
__exportStar(__webpack_require__(173), exports);


/***/ }),
/* 172 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListService = void 0;
const prisma_1 = __webpack_require__(19);
const common_1 = __webpack_require__(3);
let ListService = class ListService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    customFilters = (options) => {
        const { service_id, locale_id, min_price, max_price, is_discounted, name, is_excluded, } = options;
        const filters = {};
        if (service_id)
            filters.service_id = service_id;
        if (locale_id)
            filters.locale_id = locale_id;
        if (min_price)
            filters.price = { gte: min_price };
        if (max_price)
            filters.price = { lte: max_price };
        if (is_discounted)
            filters.discount_price = { not: null };
        if (name)
            filters.name = { contains: name, mode: "insensitive" };
        if (is_excluded !== undefined)
            filters.is_excluded = is_excluded;
        return filters;
    };
    async getList(filterDto) {
        const queryOptions = this.prisma.buildQuery(filterDto, "created", "created", this.customFilters);
        const { items, count } = await this.prisma.findWithPagination(this.prisma.localService, queryOptions, {
            local_item_descriptions: true,
            service: true,
            locale: true,
        });
        return {
            items: items,
            total: count,
            skip: queryOptions.skip,
            take: queryOptions.take,
        };
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ListService);


/***/ }),
/* 173 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CrudService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const crud_service_1 = __webpack_require__(160);
const crud_service_2 = __webpack_require__(67);
let CrudService = class CrudService {
    prisma;
    serviceService;
    localeService;
    constructor(prisma, serviceService, localeService) {
        this.prisma = prisma;
        this.serviceService = serviceService;
        this.localeService = localeService;
    }
    async create(dto) {
        await Promise.all([
            this.serviceService.findOne(dto.service_id),
            this.localeService.findOne({ id: dto.locale_id }),
        ]);
        return this.prisma.localService.create({
            data: dto,
            include: {
                service: true,
                locale: true,
                local_item_descriptions: true,
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return await this.prisma.localService.update({
            where: { id },
            data: dto,
            include: {
                service: true,
                locale: true,
                local_item_descriptions: true,
            },
        });
    }
    async delete(id) {
        await this.findOne(id);
        return this.update(id, { is_excluded: true });
    }
    async findOne(id) {
        const local_service = await this.prisma.localService.findUnique({
            where: { id },
            include: {
                service: true,
                locale: true,
                local_item_descriptions: true,
            },
        });
        if (!local_service)
            throw new common_1.NotFoundException("Локализация услуги не найдена");
        return local_service;
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof crud_service_1.CrudService !== "undefined" && crud_service_1.CrudService) === "function" ? _b : Object, typeof (_c = typeof crud_service_2.CrudService !== "undefined" && crud_service_2.CrudService) === "function" ? _c : Object])
], CrudService);


/***/ }),
/* 174 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(175), exports);
__exportStar(__webpack_require__(176), exports);
__exportStar(__webpack_require__(177), exports);


/***/ }),
/* 175 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLocalServiceDto = void 0;
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
const class_transformer_1 = __webpack_require__(9);
class CreateLocalServiceDto {
    name;
    description;
    price;
    discount_price;
    locale_id;
    service_id;
}
exports.CreateLocalServiceDto = CreateLocalServiceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)({
        description: "Название услуги",
        example: "Услуга 1",
        maxLength: 512,
        minLength: 3,
    }),
    __metadata("design:type", String)
], CreateLocalServiceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(4096),
    (0, swagger_1.ApiProperty)({
        description: "Описание услуги",
        example: "Описание услуги 1",
        maxLength: 4096,
        minLength: 3,
    }),
    __metadata("design:type", String)
], CreateLocalServiceDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({ description: "Цена услуги", example: 100 }),
    __metadata("design:type", Number)
], CreateLocalServiceDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Цена услуги с учетом скидки",
        example: 90,
        required: false,
    }),
    __metadata("design:type", Number)
], CreateLocalServiceDto.prototype, "discount_price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "ID локализации",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], CreateLocalServiceDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "ID услуги",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], CreateLocalServiceDto.prototype, "service_id", void 0);


/***/ }),
/* 176 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalServiceFiltersDto = void 0;
const class_validator_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(11);
const base_filter_dto_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(9);
class LocalServiceFiltersDto extends base_filter_dto_1.BaseFilterDto {
    service_id;
    locale_id;
    min_price;
    max_price;
    is_discounted;
    name;
    is_excluded = false;
}
exports.LocalServiceFiltersDto = LocalServiceFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({ description: "ID услуги", required: false }),
    __metadata("design:type", String)
], LocalServiceFiltersDto.prototype, "service_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({ description: "ID локализации", required: false }),
    __metadata("design:type", String)
], LocalServiceFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Минимальная цена локализованной услуги",
        required: false,
    }),
    __metadata("design:type", Number)
], LocalServiceFiltersDto.prototype, "min_price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Максимальная цена локализованной услуги",
        required: false,
    }),
    __metadata("design:type", Number)
], LocalServiceFiltersDto.prototype, "max_price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли локализованная услуга со скидкой",
        required: false,
    }),
    __metadata("design:type", Boolean)
], LocalServiceFiltersDto.prototype, "is_discounted", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Название локализованной услуги",
        required: false,
    }),
    __metadata("design:type", String)
], LocalServiceFiltersDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли локализованная услуга исключенной",
        required: false,
    }),
    __metadata("design:type", Boolean)
], LocalServiceFiltersDto.prototype, "is_excluded", void 0);


/***/ }),
/* 177 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateLocalServiceDto = void 0;
const swagger_1 = __webpack_require__(11);
const create_dto_1 = __webpack_require__(175);
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
const swagger_2 = __webpack_require__(11);
class UpdateLocalServiceDto extends (0, swagger_1.PartialType)(create_dto_1.CreateLocalServiceDto) {
    is_excluded;
}
exports.UpdateLocalServiceDto = UpdateLocalServiceDto;
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_2.ApiProperty)({
        description: "Исключена ли услуга",
        required: false,
        example: false,
    }),
    __metadata("design:type", Boolean)
], UpdateLocalServiceDto.prototype, "is_excluded", void 0);


/***/ }),
/* 178 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(179), exports);


/***/ }),
/* 179 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedSectionModule = void 0;
const common_1 = __webpack_require__(3);
const module_1 = __webpack_require__(180);
const module_2 = __webpack_require__(189);
let SharedSectionModule = class SharedSectionModule {
};
exports.SharedSectionModule = SharedSectionModule;
exports.SharedSectionModule = SharedSectionModule = __decorate([
    (0, common_1.Module)({
        imports: [module_1.LocalItemDescriptionsModule, module_2.ItemImagesModule],
        exports: [module_1.LocalItemDescriptionsModule, module_2.ItemImagesModule],
    })
], SharedSectionModule);


/***/ }),
/* 180 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalItemDescriptionsModule = void 0;
const prisma_1 = __webpack_require__(19);
const services_1 = __webpack_require__(181);
const common_1 = __webpack_require__(3);
const controller_1 = __webpack_require__(184);
const files_module_1 = __webpack_require__(60);
const module_1 = __webpack_require__(96);
const module_2 = __webpack_require__(169);
let LocalItemDescriptionsModule = class LocalItemDescriptionsModule {
};
exports.LocalItemDescriptionsModule = LocalItemDescriptionsModule;
exports.LocalItemDescriptionsModule = LocalItemDescriptionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_1.PrismaModule,
            files_module_1.FilesModule,
            module_1.LocalProductsModule,
            module_2.LocalServicesModule,
        ],
        controllers: [controller_1.LocalItemDescriptionsController],
        providers: [services_1.ListService, services_1.CrudService],
        exports: [services_1.ListService, services_1.CrudService],
    })
], LocalItemDescriptionsModule);


/***/ }),
/* 181 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(182), exports);
__exportStar(__webpack_require__(183), exports);


/***/ }),
/* 182 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CrudService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const files_service_1 = __webpack_require__(27);
const allowed_models_data_1 = __webpack_require__(30);
const services_1 = __webpack_require__(98);
const services_2 = __webpack_require__(171);
let CrudService = class CrudService {
    prisma;
    filesService;
    localProductService;
    localServiceService;
    constructor(prisma, filesService, localProductService, localServiceService) {
        this.prisma = prisma;
        this.filesService = filesService;
        this.localProductService = localProductService;
        this.localServiceService = localServiceService;
    }
    REINDEX_THRESHOLD = 0.001;
    saveImage(data, file, existingDescription) {
        if (!this.filesService.isValidImage(file))
            throw new Error("Недопустимый формат файла. Разрешены только JPEG, PNG и WebP");
        if (!this.filesService.isValidSize(file, 5))
            throw new Error("Размер файла не должен превышать 5 МБ");
        if (existingDescription?.content && existingDescription.type === "IMAGE") {
            this.filesService.deleteImage(existingDescription.content);
        }
        data.content = this.filesService.saveImage(file, allowed_models_data_1.images_paths.local_item_descriptions);
    }
    async getMaxOrder(local_product_id, local_service_id) {
        const maxOrderResult = await this.prisma.localItemDescription.findFirst({
            where: {
                local_product_id,
                local_service_id,
                is_excluded: false,
            },
            orderBy: { order: "desc" },
            select: { order: true },
        });
        return maxOrderResult?.order || 0;
    }
    async calculateNewOrderForUpdate(currentId, targetOrder, local_product_id, local_service_id) {
        const allDescriptions = await this.prisma.localItemDescription.findMany({
            where: {
                local_product_id: local_product_id || undefined,
                local_service_id: local_service_id || undefined,
                is_excluded: false,
                id: { not: currentId },
            },
            orderBy: { order: "asc" },
            select: { id: true, order: true },
        });
        if (allDescriptions.length === 0) {
            return targetOrder;
        }
        if (targetOrder < allDescriptions[0].order) {
            return allDescriptions[0].order - 1.0;
        }
        if (targetOrder > allDescriptions[allDescriptions.length - 1].order) {
            return allDescriptions[allDescriptions.length - 1].order + 1.0;
        }
        for (let i = 0; i < allDescriptions.length - 1; i++) {
            const currentOrder = allDescriptions[i].order;
            const nextOrder = allDescriptions[i + 1].order;
            if (targetOrder >= currentOrder && targetOrder <= nextOrder) {
                return (currentOrder + nextOrder) / 2;
            }
        }
        return targetOrder;
    }
    async checkNeedsReindexing(local_product_id, local_service_id) {
        const descriptions = await this.prisma.localItemDescription.findMany({
            where: {
                local_product_id,
                local_service_id,
                is_excluded: false,
            },
            orderBy: { order: "asc" },
            select: { order: true },
        });
        if (descriptions.length < 2)
            return false;
        for (let i = 1; i < descriptions.length; i++) {
            const diff = descriptions[i].order - descriptions[i - 1].order;
            if (diff < this.REINDEX_THRESHOLD) {
                return true;
            }
        }
        return false;
    }
    async reindexDescriptions(local_product_id, local_service_id) {
        if (!local_product_id && !local_service_id) {
            throw new common_1.BadRequestException("Необходимо указать либо local_product_id, либо local_service_id");
        }
        const descriptions = await this.prisma.localItemDescription.findMany({
            where: {
                local_product_id,
                local_service_id,
                is_excluded: false,
            },
            orderBy: { order: "asc" },
        });
        const updatePromises = descriptions.map((description, index) => this.prisma.localItemDescription.update({
            where: { id: description.id },
            data: { order: (index + 1) * 1.0 },
        }));
        await Promise.all(updatePromises);
    }
    async create(data, file) {
        if (!data.local_product_id && !data.local_service_id)
            throw new common_1.BadRequestException("Необходимо указать либо local_product_id, либо local_service_id");
        if (data.local_product_id && data.local_service_id)
            throw new common_1.BadRequestException("Нельзя указывать одновременно local_product_id и local_service_id");
        if (data.type === "IMAGE") {
            if (file) {
                this.saveImage(data, file);
            }
            else if (!data.content) {
                throw new common_1.BadRequestException("Для типа IMAGE необходимо загрузить файл изображения или указать URL");
            }
        }
        else if (data.type === "TEXT" && !data.content) {
            throw new common_1.BadRequestException("Для типа TEXT необходимо указать content");
        }
        if (data.local_product_id)
            await this.localProductService.findOne(data.local_product_id);
        if (data.local_service_id)
            await this.localServiceService.findOne(data.local_service_id);
        const maxOrder = await this.getMaxOrder(data.local_product_id, data.local_service_id);
        return await this.prisma.localItemDescription.create({
            data: { ...data, content: data.content, order: maxOrder + 1.0 },
        });
    }
    async findOne(id) {
        const description = await this.prisma.localItemDescription.findUnique({
            where: { id },
            include: {
                local_product: {
                    include: {
                        product: true,
                        locale: true,
                    },
                },
                local_service: {
                    include: {
                        service: true,
                        locale: true,
                    },
                },
            },
        });
        if (!description)
            throw new common_1.NotFoundException("LocalItemDescription not found");
        return description;
    }
    async update(id, data, file) {
        const existingDescription = await this.findOne(id);
        if (data.local_product_id && data.local_service_id) {
            throw new common_1.BadRequestException("Нельзя указывать одновременно local_product_id и local_service_id");
        }
        if (data.type === "IMAGE" && file)
            this.saveImage(data, file, existingDescription);
        if (data.local_product_id)
            await this.localProductService.findOne(data.local_product_id);
        if (data.local_service_id)
            await this.localServiceService.findOne(data.local_service_id);
        let finalOrder = existingDescription.order;
        if (data.order !== undefined && data.order !== existingDescription.order) {
            finalOrder = await this.calculateNewOrderForUpdate(id, data.order, existingDescription.local_product_id, existingDescription.local_service_id);
        }
        const updateData = {};
        if (data.content !== undefined)
            updateData.content = data.content;
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.type !== undefined)
            updateData.type = data.type;
        if (data.local_product_id !== undefined)
            updateData.local_product = { connect: { id: data.local_product_id } };
        if (data.local_service_id !== undefined)
            updateData.local_service = { connect: { id: data.local_service_id } };
        if (data.is_excluded !== undefined)
            updateData.is_excluded = data.is_excluded;
        updateData.order = finalOrder;
        const updatedDescription = await this.prisma.localItemDescription.update({
            where: { id },
            data: updateData,
            include: {
                local_product: {
                    include: {
                        product: true,
                        locale: true,
                    },
                },
                local_service: {
                    include: {
                        service: true,
                        locale: true,
                    },
                },
            },
        });
        if (data.order !== undefined && data.order !== existingDescription.order) {
            const needsReindexing = await this.checkNeedsReindexing(existingDescription.local_product_id || undefined, existingDescription.local_service_id || undefined);
            if (needsReindexing) {
                await this.reindexDescriptions(existingDescription.local_product_id || undefined, existingDescription.local_service_id || undefined);
                return this.findOne(id);
            }
        }
        return updatedDescription;
    }
    async delete(id) {
        return !(await this.findOne(id)).is_excluded
            ? await this.prisma.localItemDescription.update({ where: { id }, data: { is_excluded: true } })
            : await this.prisma.localItemDescription.delete({ where: { id } });
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof files_service_1.FilesService !== "undefined" && files_service_1.FilesService) === "function" ? _b : Object, typeof (_c = typeof services_1.CrudService !== "undefined" && services_1.CrudService) === "function" ? _c : Object, typeof (_d = typeof services_2.CrudService !== "undefined" && services_2.CrudService) === "function" ? _d : Object])
], CrudService);


/***/ }),
/* 183 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
let ListService = class ListService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    customFilters = (filters) => {
        const { local_product_id, local_service_id, type, is_excluded, product_id, service_id, } = filters;
        const where = {};
        if (local_product_id)
            where.local_product_id = local_product_id;
        if (local_service_id)
            where.local_service_id = local_service_id;
        if (type)
            where.type = type;
        if (is_excluded !== undefined)
            where.is_excluded = is_excluded;
        if (product_id)
            where.local_product = { product_id: product_id };
        if (service_id)
            where.local_service = { service_id: service_id };
        return where;
    };
    async getLocalItemDescriptions(filters) {
        const { product_id, service_id, ...baseFilters } = filters;
        const query_options = this.prisma.buildQuery(baseFilters, "order", "created", this.customFilters);
        const { items, count } = await this.prisma.findWithPagination(this.prisma.localItemDescription, query_options, {
            local_product: {
                include: {
                    product: true,
                },
            },
            local_service: {
                include: {
                    service: true,
                },
            },
        });
        return {
            items,
            total: count,
            take: filters.take,
            skip: filters.skip,
        };
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ListService);


/***/ }),
/* 184 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalItemDescriptionsController = void 0;
const common_1 = __webpack_require__(3);
const services_1 = __webpack_require__(181);
const swagger_1 = __webpack_require__(11);
const example_data_1 = __webpack_require__(106);
const dto_1 = __webpack_require__(185);
const common_2 = __webpack_require__(48);
const prisma_1 = __webpack_require__(19);
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
    __metadata("design:paramtypes", [typeof (_c = typeof dto_1.LocalItemDescriptionsFiltersDto !== "undefined" && dto_1.LocalItemDescriptionsFiltersDto) === "function" ? _c : Object]),
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
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateLocalItemDescriptionDto !== "undefined" && dto_1.CreateLocalItemDescriptionDto) === "function" ? _d : Object, typeof (_f = typeof Express !== "undefined" && (_e = Express.Multer) !== void 0 && _e.File) === "function" ? _f : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_g = typeof dto_1.UpdateLocalItemDescriptionDto !== "undefined" && dto_1.UpdateLocalItemDescriptionDto) === "function" ? _g : Object, typeof (_j = typeof Express !== "undefined" && (_h = Express.Multer) !== void 0 && _h.File) === "function" ? _j : Object]),
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
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.ListService !== "undefined" && services_1.ListService) === "function" ? _a : Object, typeof (_b = typeof services_1.CrudService !== "undefined" && services_1.CrudService) === "function" ? _b : Object])
], LocalItemDescriptionsController);


/***/ }),
/* 185 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(186), exports);
__exportStar(__webpack_require__(187), exports);
__exportStar(__webpack_require__(188), exports);


/***/ }),
/* 186 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLocalItemDescriptionDto = void 0;
const swagger_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(10);
const example_data_1 = __webpack_require__(106);
const prisma_1 = __webpack_require__(19);
const class_transformer_1 = __webpack_require__(9);
class CreateLocalItemDescriptionDto {
    content;
    title;
    type;
    local_product_id;
    local_service_id;
    is_excluded;
}
exports.CreateLocalItemDescriptionDto = CreateLocalItemDescriptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Содержимое описания (текст или URL изображения)",
        example: example_data_1.example_local_item_description.content,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2048),
    __metadata("design:type", String)
], CreateLocalItemDescriptionDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Заголовок описания",
        required: false,
        example: example_data_1.example_local_item_description.title,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(256),
    __metadata("design:type", String)
], CreateLocalItemDescriptionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Тип описания",
        enum: prisma_1.LocalItemDescriptionType,
        required: false,
        example: example_data_1.example_local_item_description.type,
    }),
    (0, class_validator_1.IsEnum)(prisma_1.LocalItemDescriptionType),
    __metadata("design:type", typeof (_a = typeof prisma_1.LocalItemDescriptionType !== "undefined" && prisma_1.LocalItemDescriptionType) === "function" ? _a : Object)
], CreateLocalItemDescriptionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID локального продукта (если описание принадлежит продукту)",
        required: false,
        example: example_data_1.example_local_item_description.local_product_id,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateLocalItemDescriptionDto.prototype, "local_product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID локального сервиса (если описание принадлежит сервису)",
        required: false,
        example: example_data_1.example_local_item_description.local_service_id,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateLocalItemDescriptionDto.prototype, "local_service_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Исключено ли описание из отображения",
        required: false,
        default: false,
        example: example_data_1.example_local_item_description.is_excluded,
    }),
    __metadata("design:type", Boolean)
], CreateLocalItemDescriptionDto.prototype, "is_excluded", void 0);


/***/ }),
/* 187 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateLocalItemDescriptionDto = void 0;
const swagger_1 = __webpack_require__(11);
const create_dto_1 = __webpack_require__(186);
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
const swagger_2 = __webpack_require__(11);
class UpdateLocalItemDescriptionDto extends (0, swagger_1.PartialType)(create_dto_1.CreateLocalItemDescriptionDto) {
    is_excluded;
    order;
}
exports.UpdateLocalItemDescriptionDto = UpdateLocalItemDescriptionDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value == "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_2.ApiProperty)({
        description: "Исключено ли описание",
        required: false,
        example: false,
    }),
    __metadata("design:type", Boolean)
], UpdateLocalItemDescriptionDto.prototype, "is_excluded", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        description: "Порядок описания",
        required: false,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateLocalItemDescriptionDto.prototype, "order", void 0);


/***/ }),
/* 188 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalItemDescriptionsFiltersDto = void 0;
const swagger_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(10);
const base_filter_dto_1 = __webpack_require__(25);
const client_1 = __webpack_require__(12);
const class_transformer_1 = __webpack_require__(9);
class LocalItemDescriptionsFiltersDto extends base_filter_dto_1.BaseFilterDto {
    local_product_id;
    local_service_id;
    product_id;
    service_id;
    type;
    is_excluded = false;
}
exports.LocalItemDescriptionsFiltersDto = LocalItemDescriptionsFiltersDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID локального продукта для фильтрации",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LocalItemDescriptionsFiltersDto.prototype, "local_product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID локального сервиса для фильтрации",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LocalItemDescriptionsFiltersDto.prototype, "local_service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID продукта для фильтрации", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LocalItemDescriptionsFiltersDto.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID сервиса для фильтрации", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LocalItemDescriptionsFiltersDto.prototype, "service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Тип описания",
        required: false,
        enum: client_1.LocalItemDescriptionType,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.LocalItemDescriptionType),
    __metadata("design:type", typeof (_a = typeof client_1.LocalItemDescriptionType !== "undefined" && client_1.LocalItemDescriptionType) === "function" ? _a : Object)
], LocalItemDescriptionsFiltersDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Исключены ли описания",
        required: false,
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LocalItemDescriptionsFiltersDto.prototype, "is_excluded", void 0);


/***/ }),
/* 189 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemImagesModule = void 0;
const prisma_1 = __webpack_require__(19);
const controller_1 = __webpack_require__(190);
const crud_service_1 = __webpack_require__(192);
const list_service_1 = __webpack_require__(193);
const common_1 = __webpack_require__(3);
const files_module_1 = __webpack_require__(60);
const module_1 = __webpack_require__(22);
const module_2 = __webpack_require__(157);
let ItemImagesModule = class ItemImagesModule {
};
exports.ItemImagesModule = ItemImagesModule;
exports.ItemImagesModule = ItemImagesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, files_module_1.FilesModule, module_1.ProductsModule, module_2.ServicesModule],
        controllers: [controller_1.ItemImagesController],
        providers: [list_service_1.ListService, crud_service_1.CrudService],
        exports: [list_service_1.ListService, crud_service_1.CrudService],
    })
], ItemImagesModule);


/***/ }),
/* 190 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemImagesController = void 0;
const common_1 = __webpack_require__(3);
const filters_dto_1 = __webpack_require__(191);
const crud_service_1 = __webpack_require__(192);
const list_service_1 = __webpack_require__(193);
const swagger_1 = __webpack_require__(11);
const example_data_1 = __webpack_require__(163);
const dto_1 = __webpack_require__(194);
const common_2 = __webpack_require__(48);
const prisma_1 = __webpack_require__(19);
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
    __metadata("design:paramtypes", [typeof (_c = typeof filters_dto_1.ItemImagesFiltersDto !== "undefined" && filters_dto_1.ItemImagesFiltersDto) === "function" ? _c : Object]),
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
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateItemImageDto !== "undefined" && dto_1.CreateItemImageDto) === "function" ? _d : Object, typeof (_f = typeof Express !== "undefined" && (_e = Express.Multer) !== void 0 && _e.File) === "function" ? _f : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_g = typeof dto_1.UpdateItemImageDto !== "undefined" && dto_1.UpdateItemImageDto) === "function" ? _g : Object, typeof (_j = typeof Express !== "undefined" && (_h = Express.Multer) !== void 0 && _h.File) === "function" ? _j : Object]),
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
    __metadata("design:paramtypes", [typeof (_a = typeof list_service_1.ListService !== "undefined" && list_service_1.ListService) === "function" ? _a : Object, typeof (_b = typeof crud_service_1.CrudService !== "undefined" && crud_service_1.CrudService) === "function" ? _b : Object])
], ItemImagesController);


/***/ }),
/* 191 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemImagesFiltersDto = void 0;
const swagger_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(10);
const example_data_1 = __webpack_require__(163);
const base_filter_dto_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(9);
class ItemImagesFiltersDto extends base_filter_dto_1.BaseFilterDto {
    product_id;
    service_id;
    is_excluded;
}
exports.ItemImagesFiltersDto = ItemImagesFiltersDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID продукта для фильтрации",
        required: false,
        example: example_data_1.example_item_image.product_id,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ItemImagesFiltersDto.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID сервиса для фильтрации",
        required: false,
        example: example_data_1.example_item_image.service_id,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ItemImagesFiltersDto.prototype, "service_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({
        description: "Удаленные картинки",
        required: false,
        example: false,
    }),
    __metadata("design:type", Boolean)
], ItemImagesFiltersDto.prototype, "is_excluded", void 0);


/***/ }),
/* 192 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CrudService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
const files_service_1 = __webpack_require__(27);
const allowed_models_data_1 = __webpack_require__(30);
const crud_service_1 = __webpack_require__(26);
const crud_service_2 = __webpack_require__(160);
let CrudService = class CrudService {
    prisma;
    filesService;
    productsService;
    servicesService;
    constructor(prisma, filesService, productsService, servicesService) {
        this.prisma = prisma;
        this.filesService = filesService;
        this.productsService = productsService;
        this.servicesService = servicesService;
    }
    saveImage(data, file, existingItemImage) {
        if (!this.filesService.isValidImage(file))
            throw new Error("Недопустимый формат файла. Разрешены только JPEG, PNG и WebP");
        if (!this.filesService.isValidSize(file, 5))
            throw new Error("Размер файла не должен превышать 5 МБ");
        if (existingItemImage?.image)
            this.filesService.deleteImage(existingItemImage.image);
        data.image = this.filesService.saveImage(file, allowed_models_data_1.images_paths.item_images);
    }
    async create(data, file) {
        if (file)
            this.saveImage(data, file);
        if (!data.image)
            throw new common_1.BadRequestException("Изображение обязательно");
        if (!data.product_id && !data.service_id)
            throw new common_1.BadRequestException("Необходимо указать либо product_id, либо service_id");
        if (data.product_id && data.service_id)
            throw new common_1.BadRequestException("Нельзя указывать одновременно product_id и service_id");
        if (data.product_id)
            await this.productsService.findOne(data.product_id);
        if (data.service_id)
            await this.servicesService.findOne(data.service_id);
        return await this.prisma.itemImage.create({
            data: { ...data, image: data.image },
        });
    }
    async findOne(id) {
        const itemImage = await this.prisma.itemImage.findUnique({
            where: { id },
            include: {
                product: true,
                service: true,
            },
        });
        if (!itemImage)
            throw new common_1.NotFoundException("ItemImage not found");
        return itemImage;
    }
    async update(id, data, file) {
        const existingItemImage = await this.findOne(id);
        if (file)
            this.saveImage(data, file, existingItemImage);
        if (data.product_id && data.service_id)
            throw new common_1.BadRequestException("Нельзя указывать одновременно product_id и service_id");
        if (data.product_id)
            await this.productsService.findOne(data.product_id);
        if (data.service_id)
            await this.servicesService.findOne(data.service_id);
        return await this.prisma.itemImage.update({
            where: { id },
            data: { ...data, ...existingItemImage },
        });
    }
    async delete(id) {
        return !(await this.findOne(id)).is_excluded
            ? await this.prisma.itemImage.update({ where: { id }, data: { is_excluded: true } })
            : await this.prisma.itemImage.delete({ where: { id } });
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof files_service_1.FilesService !== "undefined" && files_service_1.FilesService) === "function" ? _b : Object, typeof (_c = typeof crud_service_1.CrudService !== "undefined" && crud_service_1.CrudService) === "function" ? _c : Object, typeof (_d = typeof crud_service_2.CrudService !== "undefined" && crud_service_2.CrudService) === "function" ? _d : Object])
], CrudService);


/***/ }),
/* 193 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListService = void 0;
const common_1 = __webpack_require__(3);
const prisma_1 = __webpack_require__(19);
let ListService = class ListService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    customFilters = (options) => {
        const { product_id, service_id, is_excluded } = options;
        const where = {};
        if (product_id)
            where.product_id = product_id;
        if (service_id)
            where.service_id = service_id;
        if (is_excluded !== undefined)
            where.is_excluded = is_excluded;
        return where;
    };
    async getItemImages(filters) {
        const query_options = this.prisma.buildQuery(filters, "created", "created", this.customFilters);
        const { items, count } = await this.prisma.findWithPagination(this.prisma.itemImage, query_options, {
            product: true,
            service: true,
        });
        return {
            items,
            total: count,
            take: filters.take,
            skip: filters.skip,
        };
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], ListService);


/***/ }),
/* 194 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(195), exports);
__exportStar(__webpack_require__(196), exports);
__exportStar(__webpack_require__(191), exports);


/***/ }),
/* 195 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateItemImageDto = void 0;
const swagger_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(10);
const example_data_1 = __webpack_require__(163);
const class_transformer_1 = __webpack_require__(9);
class CreateItemImageDto {
    image;
    product_id;
    service_id;
    is_excluded;
}
exports.CreateItemImageDto = CreateItemImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "URL изображения или путь к файлу",
        example: example_data_1.example_item_image.image,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemImageDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID продукта (если картинка принадлежит продукту)",
        required: false,
        example: example_data_1.example_item_image.product_id,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateItemImageDto.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID сервиса (если картинка принадлежит сервису)",
        required: false,
        example: example_data_1.example_item_image.service_id,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateItemImageDto.prototype, "service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Исключена ли картинка из отображения",
        required: false,
        default: false,
        example: example_data_1.example_item_image.is_excluded,
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateItemImageDto.prototype, "is_excluded", void 0);


/***/ }),
/* 196 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateItemImageDto = void 0;
const swagger_1 = __webpack_require__(11);
const create_dto_1 = __webpack_require__(195);
const class_transformer_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(10);
const swagger_2 = __webpack_require__(11);
class UpdateItemImageDto extends (0, swagger_1.PartialType)(create_dto_1.CreateItemImageDto) {
    is_excluded;
}
exports.UpdateItemImageDto = UpdateItemImageDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value == "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_2.ApiProperty)({
        description: "Исключена ли картинка",
        required: false,
        example: false,
    }),
    __metadata("design:type", Boolean)
], UpdateItemImageDto.prototype, "is_excluded", void 0);


/***/ }),
/* 197 */
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(11);
const cookieParser = __webpack_require__(197);
const path_1 = __webpack_require__(28);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.getHttpAdapter().getInstance().set("trust proxy", true);
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "uploads"), {
        prefix: "/static/",
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    app.use(cookieParser());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.setGlobalPrefix("api");
    const config = new swagger_1.DocumentBuilder()
        .setTitle("E-Commerce API")
        .setDescription("API для электронной коммерции")
        .setVersion("1.0")
        .addTag("auth")
        .addTag("users")
        .addTag("products")
        .addTag("orders")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Приложение запущено на порту ${port}`);
    console.log(`Статические файлы доступны по адресу http://localhost:${port}/static/`);
}
void bootstrap().catch((error) => {
    console.error("Ошибка при запуске приложения:", error);
    process.exit(1);
});

})();

/******/ })()
;