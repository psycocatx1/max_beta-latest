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
const allowed_models_data_1 = require("../../../files/allowed-models.data");
const files_service_1 = require("../../../files/files.service");
let CrudService = class CrudService {
    prisma;
    filesService;
    constructor(prisma, filesService) {
        this.prisma = prisma;
        this.filesService = filesService;
    }
    saveImage(data, file) {
        if (!this.filesService.isValidImage(file))
            throw new common_1.BadRequestException("Недопустимый формат файла. Разрешены только JPEG, PNG и WebP");
        if (!this.filesService.isValidSize(file, 5))
            throw new common_1.BadRequestException("Размер файла не должен превышать 5 МБ");
        data.image = this.filesService.saveImage(file, allowed_models_data_1.images_paths.categories);
    }
    async create(data, file) {
        if (file)
            this.saveImage(data, file);
        if (!data.image)
            throw new common_1.BadRequestException("Изображение обязательно");
        if (data.parent_id) {
            const parentCategory = await this.prisma.category.findUnique({
                where: { id: data.parent_id, is_excluded: false },
            });
            if (!parentCategory)
                throw new common_1.NotFoundException("Родительская категория не найдена или удалена");
            if (parentCategory.type !== data.type)
                throw new common_1.BadRequestException("Тип категории должен совпадать с типом родительской категории");
        }
        return await this.prisma.category.create({
            data: { ...data, parent_id: data.parent_id?.length && data.parent_id.length > 0 ? data.parent_id : null },
            include: {
                parent: true,
                children: true,
                local_categories: true,
            },
        });
    }
    async findOneInternal(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                parent: true,
                children: true,
                local_categories: true,
                products: true,
                services: true,
            },
        });
        if (!category)
            throw new common_1.NotFoundException("Категория не найдена");
        return category;
    }
    async update(id, data, file) {
        if (file)
            this.saveImage(data, file);
        if (!data.image)
            throw new common_1.BadRequestException("Изображение обязательно");
        const existingCategory = await this.findOneInternal(id);
        if (data.parent_id) {
            const parentCategory = await this.prisma.category.findUnique({
                where: { id: data.parent_id, is_excluded: false },
            });
            if (!parentCategory)
                throw new common_1.NotFoundException("Родительская категория не найдена или удалена");
            const categoryType = data.type || existingCategory.type;
            if (parentCategory.type !== categoryType)
                throw new common_1.BadRequestException("Тип категории должен совпадать с типом родительской категории");
            if (data.parent_id === id)
                throw new common_1.BadRequestException("Категория не может быть родительской для самой себя");
        }
        return await this.prisma.category.update({
            where: { id },
            data,
            include: {
                parent: true,
                children: true,
                local_categories: true,
            },
        });
    }
    async delete(id) {
        const category = await this.findOneInternal(id);
        if (category.children.length > 0)
            throw new common_1.BadRequestException("Нельзя удалить категорию, у которой есть дочерние категории");
        return await this.prisma.category.update({
            where: { id },
            data: { is_excluded: true },
        });
    }
    async findOne(id, locale_id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                parent: true,
                children: {
                    where: { is_excluded: false },
                    include: {
                        local_categories: locale_id ? { where: { locale_id } } : true,
                        _count: {
                            select: {
                                products: { where: { is_excluded: false } },
                                services: { where: { is_excluded: false } },
                            },
                        },
                    },
                },
                local_categories: locale_id ? { where: { locale_id } } : true,
                products: {
                    where: { is_excluded: false },
                    include: {
                        local_products: locale_id ? { where: { locale_id } } : true,
                        images: true,
                    },
                },
                services: {
                    where: { is_excluded: false },
                    include: {
                        local_services: locale_id ? { where: { locale_id } } : true,
                        images: true,
                    },
                },
            },
        });
        if (!category)
            throw new common_1.NotFoundException("Категория не найдена");
        const ancestors = await this.buildAncestorTree(category.parent_id, locale_id);
        const localizedCategory = this.applyLocalization(category, locale_id);
        const childrenWithRecursiveCounts = await this.applyRecursiveCounts(category.children.map((child) => this.applyLocalization(child, locale_id)));
        return {
            ...localizedCategory,
            ancestors,
            children: childrenWithRecursiveCounts,
        };
    }
    applyLocalization(category, locale_id) {
        if (!locale_id ||
            !category.local_categories ||
            category.local_categories.length === 0)
            return category;
        const localization = category.local_categories[0];
        return {
            ...category,
            name: localization?.name || category.name,
            description: localization?.description || category.description,
        };
    }
    async buildAncestorTree(parentId, locale_id) {
        if (!parentId)
            return [];
        const parent = await this.prisma.category.findUnique({
            where: { id: parentId, is_excluded: false },
            include: {
                parent: true,
                local_categories: locale_id ? { where: { locale_id } } : true,
                _count: {
                    select: {
                        products: { where: { is_excluded: false } },
                        services: { where: { is_excluded: false } },
                    },
                },
            },
        });
        if (!parent)
            return [];
        const ancestors = await this.buildAncestorTree(parent.parent_id, locale_id);
        const localizedParent = this.applyLocalization(parent, locale_id);
        return [...ancestors, localizedParent];
    }
    async calculateTotalCounts(id) {
        const directCounts = await this.prisma.category.findUnique({
            where: { id },
            select: {
                _count: {
                    select: {
                        products: { where: { is_excluded: false } },
                        services: { where: { is_excluded: false } },
                    },
                },
            },
        });
        const children = await this.prisma.category.findMany({
            where: {
                parent_id: id,
                is_excluded: false,
            },
            select: { id: true },
        });
        let totalProducts = directCounts?._count.products || 0;
        let totalServices = directCounts?._count.services || 0;
        for (const child of children) {
            const childCounts = await this.calculateTotalCounts(child.id);
            totalProducts += childCounts.products;
            totalServices += childCounts.services;
        }
        return { products: totalProducts, services: totalServices };
    }
    async applyRecursiveCounts(categories) {
        return await Promise.all(categories.map(async (category) => {
            const totalCounts = await this.calculateTotalCounts(category.id);
            return {
                ...category,
                _count: {
                    products: totalCounts.products,
                    services: totalCounts.services,
                },
                children: category.children
                    ? await this.applyRecursiveCounts(category.children)
                    : [],
            };
        }));
    }
};
exports.CrudService = CrudService;
exports.CrudService = CrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        files_service_1.FilesService])
], CrudService);
//# sourceMappingURL=crud.service.js.map