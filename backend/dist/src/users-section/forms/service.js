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
exports.FormsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../libs/prisma/src");
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
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], FormsService);
//# sourceMappingURL=service.js.map