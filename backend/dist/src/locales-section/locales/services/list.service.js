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
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], ListService);
//# sourceMappingURL=list.service.js.map