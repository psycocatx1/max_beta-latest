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
const files_service_1 = require("../../../files/files.service");
const allowed_models_data_1 = require("../../../files/allowed-models.data");
const services_1 = require("../../../products-section/local-products/services");
const services_2 = require("../../../services-section/local-services/services");
let CrudService = class CrudService {
    prisma;
    filesService;
    localProductService;
    localServiceService;
    constructor(prisma, filesService, localProductService, localServiceService) {
        this.prisma = prisma;
        this.filesService = filesService;
        this.localProductService = localProductService;
        this.localServiceService = localServiceService;
    }
    REINDEX_THRESHOLD = 0.001;
    saveImage(data, file, existingDescription) {
        if (!this.filesService.isValidImage(file))
            throw new Error("Недопустимый формат файла. Разрешены только JPEG, PNG и WebP");
        if (!this.filesService.isValidSize(file, 5))
            throw new Error("Размер файла не должен превышать 5 МБ");
        if (existingDescription?.content && existingDescription.type === "IMAGE") {
            this.filesService.deleteImage(existingDescription.content);
        }
        data.content = this.filesService.saveImage(file, allowed_models_data_1.images_paths.local_item_descriptions);
    }
    async getMaxOrder(local_product_id, local_service_id) {
        const maxOrderResult = await this.prisma.localItemDescription.findFirst({
            where: {
                local_product_id,
                local_service_id,
                is_excluded: false,
            },
            orderBy: { order: "desc" },
            select: { order: true },
        });
        return maxOrderResult?.order || 0;
    }
    async calculateNewOrderForUpdate(currentId, targetOrder, local_product_id, local_service_id) {
        const allDescriptions = await this.prisma.localItemDescription.findMany({
            where: {
                local_product_id: local_product_id || undefined,
                local_service_id: local_service_id || undefined,
                is_excluded: false,
                id: { not: currentId },
            },
            orderBy: { order: "asc" },
            select: { id: true, order: true },
        });
        if (allDescriptions.length === 0) {
            return targetOrder;
        }
        if (targetOrder < allDescriptions[0].order) {
            return allDescriptions[0].order - 1.0;
        }
        if (targetOrder > allDescriptions[allDescriptions.length - 1].order) {
            return allDescriptions[allDescriptions.length - 1].order + 1.0;
        }
        for (let i = 0; i < allDescriptions.length - 1; i++) {
            const currentOrder = allDescriptions[i].order;
            const nextOrder = allDescriptions[i + 1].order;
            if (targetOrder >= currentOrder && targetOrder <= nextOrder) {
                return (currentOrder + nextOrder) / 2;
            }
        }
        return targetOrder;
    }
    async checkNeedsReindexing(local_product_id, local_service_id) {
        const descriptions = await this.prisma.localItemDescription.findMany({
            where: {
                local_product_id,
                local_service_id,
                is_excluded: false,
            },
            orderBy: { order: "asc" },
            select: { order: true },
        });
        if (descriptions.length < 2)
            return false;
        for (let i = 1; i < descriptions.length; i++) {
            const diff = descriptions[i].order - descriptions[i - 1].order;
            if (diff < this.REINDEX_THRESHOLD) {
                return true;
            }
        }
        return false;
    }
    async reindexDescriptions(local_product_id, local_service_id) {
        if (!local_product_id && !local_service_id) {
            throw new common_1.BadRequestException("Необходимо указать либо local_product_id, либо local_service_id");
        }
        const descriptions = await this.prisma.localItemDescription.findMany({
            where: {
                local_product_id,
                local_service_id,
                is_excluded: false,
            },
            orderBy: { order: "asc" },
        });
        const updatePromises = descriptions.map((description, index) => this.prisma.localItemDescription.update({
            where: { id: description.id },
            data: { order: (index + 1) * 1.0 },
        }));
        await Promise.all(updatePromises);
    }
    async create(data, file) {
        if (!data.local_product_id && !data.local_service_id)
            throw new common_1.BadRequestException("Необходимо указать либо local_product_id, либо local_service_id");
        if (data.local_product_id && data.local_service_id)
            throw new common_1.BadRequestException("Нельзя указывать одновременно local_product_id и local_service_id");
        if (data.type === "IMAGE") {
            if (file) {
                this.saveImage(data, file);
            }
            else if (!data.content) {
                throw new common_1.BadRequestException("Для типа IMAGE необходимо загрузить файл изображения или указать URL");
            }
        }
        else if (data.type === "TEXT" && !data.content) {
            throw new common_1.BadRequestException("Для типа TEXT необходимо указать content");
        }
        if (data.local_product_id)
            await this.localProductService.findOne(data.local_product_id);
        if (data.local_service_id)
            await this.localServiceService.findOne(data.local_service_id);
        const maxOrder = await this.getMaxOrder(data.local_product_id, data.local_service_id);
        return await this.prisma.localItemDescription.create({
            data: { ...data, content: data.content, order: maxOrder + 1.0 },
        });
    }
    async findOne(id) {
        const description = await this.prisma.localItemDescription.findUnique({
            where: { id },
            include: {
                local_product: {
                    include: {
                        product: true,
                        locale: true,
                    },
                },
                local_service: {
                    include: {
                        service: true,
                        locale: true,
                    },
                },
            },
        });
        if (!description)
            throw new common_1.NotFoundException("LocalItemDescription not found");
        return description;
    }
    async update(id, data, file) {
        const existingDescription = await this.findOne(id);
        if (data.local_product_id && data.local_service_id) {
            throw new common_1.BadRequestException("Нельзя указывать одновременно local_product_id и local_service_id");
        }
        if (data.type === "IMAGE" && file)
            this.saveImage(data, file, existingDescription);
        if (data.local_product_id)
            await this.localProductService.findOne(data.local_product_id);
        if (data.local_service_id)
            await this.localServiceService.findOne(data.local_service_id);
        let finalOrder = existingDescription.order;
        if (data.order !== undefined && data.order !== existingDescription.order) {
            finalOrder = await this.calculateNewOrderForUpdate(id, data.order, existingDescription.local_product_id, existingDescription.local_service_id);
        }
        const updateData = {};
        if (data.content !== undefined)
            updateData.content = data.content;
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.type !== undefined)
            updateData.type = data.type;
        if (data.local_product_id !== undefined)
            updateData.local_product = { connect: { id: data.local_product_id } };
        if (data.local_service_id !== undefined)
            updateData.local_service = { connect: { id: data.local_service_id } };
        if (data.is_excluded !== undefined)
            updateData.is_excluded = data.is_excluded;
        updateData.order = finalOrder;
        const updatedDescription = await this.prisma.localItemDescription.update({
            where: { id },
            data: updateData,
            include: {
                local_product: {
                    include: {
                        product: true,
                        locale: true,
                    },
                },
                local_service: {
                    include: {
                        service: true,
                        locale: true,
                    },
                },
            },
        });
        if (data.order !== undefined && data.order !== existingDescription.order) {
            const needsReindexing = await this.checkNeedsReindexing(existingDescription.local_product_id || undefined, existingDescription.local_service_id || undefined);
            if (needsReindexing) {
                await this.reindexDescriptions(existingDescription.local_product_id || undefined, existingDescription.local_service_id || undefined);
                return this.findOne(id);
            }
        }
        return updatedDescription;
    }
    async delete(id) {
        return !(await this.findOne(id)).is_excluded
            ? await this.prisma.localItemDescription.update({ where: { id }, data: { is_excluded: true } })
            : await this.prisma.localItemDescription.delete({ where: { id } });
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        files_service_1.FilesService,
        services_1.CrudService,
        services_2.CrudService])
], CrudService);
//# sourceMappingURL=crud.service.js.map