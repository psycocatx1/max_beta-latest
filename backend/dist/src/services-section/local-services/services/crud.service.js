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
const crud_service_1 = require("../../services/services/crud.service");
const crud_service_2 = require("../../../locales-section/locales/services/crud.service");
let CrudService = class CrudService {
    prisma;
    serviceService;
    localeService;
    constructor(prisma, serviceService, localeService) {
        this.prisma = prisma;
        this.serviceService = serviceService;
        this.localeService = localeService;
    }
    async create(dto) {
        await Promise.all([
            this.serviceService.findOne(dto.service_id),
            this.localeService.findOne({ id: dto.locale_id }),
        ]);
        return this.prisma.localService.create({
            data: dto,
            include: {
                service: true,
                locale: true,
                local_item_descriptions: true,
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return await this.prisma.localService.update({
            where: { id },
            data: dto,
            include: {
                service: true,
                locale: true,
                local_item_descriptions: true,
            },
        });
    }
    async delete(id) {
        await this.findOne(id);
        return this.update(id, { is_excluded: true });
    }
    async findOne(id) {
        const local_service = await this.prisma.localService.findUnique({
            where: { id },
            include: {
                service: true,
                locale: true,
                local_item_descriptions: true,
            },
        });
        if (!local_service)
            throw new common_1.NotFoundException("Локализация услуги не найдена");
        return local_service;
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