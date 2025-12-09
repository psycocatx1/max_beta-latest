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
const crud_service_1 = require("../../../products-section/products/services/crud.service");
const crud_service_2 = require("../../../services-section/services/services/crud.service");
let CrudService = class CrudService {
    prisma;
    filesService;
    productsService;
    servicesService;
    constructor(prisma, filesService, productsService, servicesService) {
        this.prisma = prisma;
        this.filesService = filesService;
        this.productsService = productsService;
        this.servicesService = servicesService;
    }
    saveImage(data, file, existingItemImage) {
        if (!this.filesService.isValidImage(file))
            throw new Error("Недопустимый формат файла. Разрешены только JPEG, PNG и WebP");
        if (!this.filesService.isValidSize(file, 5))
            throw new Error("Размер файла не должен превышать 5 МБ");
        if (existingItemImage?.image)
            this.filesService.deleteImage(existingItemImage.image);
        data.image = this.filesService.saveImage(file, allowed_models_data_1.images_paths.item_images);
    }
    async create(data, file) {
        if (file)
            this.saveImage(data, file);
        if (!data.image)
            throw new common_1.BadRequestException("Изображение обязательно");
        if (!data.product_id && !data.service_id)
            throw new common_1.BadRequestException("Необходимо указать либо product_id, либо service_id");
        if (data.product_id && data.service_id)
            throw new common_1.BadRequestException("Нельзя указывать одновременно product_id и service_id");
        if (data.product_id)
            await this.productsService.findOne(data.product_id);
        if (data.service_id)
            await this.servicesService.findOne(data.service_id);
        return await this.prisma.itemImage.create({
            data: { ...data, image: data.image },
        });
    }
    async findOne(id) {
        const itemImage = await this.prisma.itemImage.findUnique({
            where: { id },
            include: {
                product: true,
                service: true,
            },
        });
        if (!itemImage)
            throw new common_1.NotFoundException("ItemImage not found");
        return itemImage;
    }
    async update(id, data, file) {
        const existingItemImage = await this.findOne(id);
        if (file)
            this.saveImage(data, file, existingItemImage);
        if (data.product_id && data.service_id)
            throw new common_1.BadRequestException("Нельзя указывать одновременно product_id и service_id");
        if (data.product_id)
            await this.productsService.findOne(data.product_id);
        if (data.service_id)
            await this.servicesService.findOne(data.service_id);
        return await this.prisma.itemImage.update({
            where: { id },
            data: { ...data, ...existingItemImage },
        });
    }
    async delete(id) {
        return !(await this.findOne(id)).is_excluded
            ? await this.prisma.itemImage.update({ where: { id }, data: { is_excluded: true } })
            : await this.prisma.itemImage.delete({ where: { id } });
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        files_service_1.FilesService,
        crud_service_1.CrudService,
        crud_service_2.CrudService])
], CrudService);
//# sourceMappingURL=crud.service.js.map