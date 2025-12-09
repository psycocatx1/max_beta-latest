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
exports.ValidationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../../libs/prisma/src");
const types_1 = require("../types");
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
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], ValidationService);
//# sourceMappingURL=validation.service.js.map