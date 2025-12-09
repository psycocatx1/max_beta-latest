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
exports.UsersListService = void 0;
const prisma_1 = require("../../../../libs/prisma/src");
const common_1 = require("@nestjs/common");
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
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], UsersListService);
//# sourceMappingURL=list.service.js.map