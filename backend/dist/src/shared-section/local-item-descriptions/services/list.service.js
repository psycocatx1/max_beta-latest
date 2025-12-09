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
exports.ListService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../../libs/prisma/src");
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
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], ListService);
//# sourceMappingURL=list.service.js.map