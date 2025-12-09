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
const crud_service_1 = require("../../products/services/crud.service");
const crud_service_2 = require("../../../locales-section/locales/services/crud.service");
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
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        crud_service_1.CrudService,
        crud_service_2.CrudService])
], CrudService);
//# sourceMappingURL=crud.service.js.map