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
const prisma_1 = require("../../../../libs/prisma/src");
const common_1 = require("@nestjs/common");
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
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], ListService);
//# sourceMappingURL=list.service.js.map