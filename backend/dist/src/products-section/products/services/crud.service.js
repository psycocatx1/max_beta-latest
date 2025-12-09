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
let CrudService = class CrudService {
    prisma;
    filesService;
    constructor(prisma, filesService) {
        this.prisma = prisma;
        this.filesService = filesService;
    }
    getInclude(locale_id) {
        return {
            images: true,
            category: true,
            local_products: {
                include: { local_item_descriptions: { orderBy: { order: "asc" }, where: { is_excluded: false } } },
                ...(locale_id && { where: { locale_id } }),
            },
        };
    }
    saveImage(data, file, existingProduct) {
        if (!this.filesService.isValidImage(file))
            throw new Error("Недопустимый формат файла. Разрешены только JPEG, PNG и WebP");
        if (!this.filesService.isValidSize(file, 5))
            throw new Error("Размер файла не должен превышать 5 МБ");
        if (existingProduct?.image)
            this.filesService.deleteImage(existingProduct.image);
        data.image = this.filesService.saveImage(file, allowed_models_data_1.images_paths.products);
    }
    async create(data, file) {
        if (await this.prisma.product.findUnique({ where: { name: data.name } }))
            throw new common_1.BadRequestException("Продукт с таким названием уже существует");
        if (file)
            this.saveImage(data, file);
        if (!data.image)
            throw new common_1.BadRequestException("Изображение обязательно");
        if (!data.category_id)
            throw new common_1.BadRequestException("Категория обязательна");
        const category = await this.prisma.category.findUnique({
            where: { id: data.category_id },
        });
        if (!category)
            throw new common_1.BadRequestException("Категория не найдена");
        if (category.type !== "PRODUCT")
            throw new common_1.BadRequestException("Категория должна быть типа PRODUCT");
        return await this.prisma.product.create({
            data: { ...data, image: data.image },
            include: this.getInclude(),
        });
    }
    async findOne(id, locale_id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: this.getInclude(locale_id),
        });
        if (!product)
            throw new common_1.NotFoundException("Product not found");
        return product;
    }
    async update(id, data, file) {
        const existingProduct = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!existingProduct)
            throw new common_1.NotFoundException("Product not found");
        if (file)
            this.saveImage(data, file, existingProduct);
        if (data.category_id) {
            const category = await this.prisma.category.findUnique({
                where: { id: data.category_id },
            });
            if (!category)
                throw new common_1.BadRequestException("Категория не найдена");
            if (category.type !== "PRODUCT")
                throw new common_1.BadRequestException("Категория должна быть типа PRODUCT");
        }
        return this.prisma.product.update({
            where: { id },
            data: { ...data, image: data.image },
            include: this.getInclude(),
        });
    }
    async delete(id) {
        return (await this.findOne(id)).is_excluded
            ? await this.prisma.product.delete({ where: { id } })
            : await this.update(id, { is_excluded: true });
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        files_service_1.FilesService])
], CrudService);
//# sourceMappingURL=crud.service.js.map