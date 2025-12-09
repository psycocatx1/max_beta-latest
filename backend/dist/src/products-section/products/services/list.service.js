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
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], ListService);
//# sourceMappingURL=list.service.js.map