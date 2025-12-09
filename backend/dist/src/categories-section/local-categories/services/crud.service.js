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
exports.CrudService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../../libs/prisma/src");
const services_1 = require("../../categories/services");
const services_2 = require("../../../locales-section/locales/services");
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
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        services_1.CrudService,
        services_2.CrudService])
], CrudService);
//# sourceMappingURL=crud.service.js.map