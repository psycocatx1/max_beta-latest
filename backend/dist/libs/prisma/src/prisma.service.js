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
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const base_filter_dto_1 = require("./types/base-filter.dto");
const client_1 = require("@prisma/client");
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
//# sourceMappingURL=prisma.service.js.map