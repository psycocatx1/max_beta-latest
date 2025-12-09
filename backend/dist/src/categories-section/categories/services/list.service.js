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
exports.ListService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../../libs/prisma/src");
let ListService = class ListService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    customFilters = (options) => {
        const { search, type, parent_id, is_excluded } = options;
        const filters = {};
        if (search) {
            filters.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }
        if (type)
            filters.type = type;
        if (parent_id)
            filters.parent_id = parent_id;
        if (is_excluded !== undefined)
            filters.is_excluded = is_excluded;
        return filters;
    };
    async getDefaultLocalization(categoryId) {
        const defaultLocale = await this.prisma.locale.findFirst({
            where: { symbol: "US" },
        });
        if (!defaultLocale)
            return null;
        return await this.prisma.localCategory.findFirst({
            where: { category_id: categoryId, locale_id: defaultLocale.id },
        });
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
    buildCategoryTree(categories) {
        const categoryMap = new Map();
        const rootCategories = [];
        categories.forEach((category) => {
            categoryMap.set(category.id, { ...category, children: [] });
        });
        categories.forEach((category) => {
            if (category.parent_id) {
                const parent = categoryMap.get(category.parent_id);
                if (parent)
                    parent.children.push(categoryMap.get(category.id));
            }
            else {
                rootCategories.push(categoryMap.get(category.id));
            }
        });
        return rootCategories;
    }
    async calculateTotalCounts(categoryId) {
        const directCounts = await this.prisma.category.findUnique({
            where: { id: categoryId },
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
            where: { parent_id: categoryId, is_excluded: false },
            select: { id: true },
        });
        let totalProducts = directCounts?._count.products || 0;
        let totalServices = directCounts?._count.services || 0;
        if (children.length > 0) {
            const childrenCounts = await Promise.all(children.map((child) => this.calculateTotalCounts(child.id)));
            childrenCounts.forEach((counts) => {
                totalProducts += counts.products;
                totalServices += counts.services;
            });
        }
        return {
            products: totalProducts,
            services: totalServices,
        };
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
    async findAll(filterDto) {
        const { locale_id, parent_id, ...restFilters } = filterDto;
        const queryOptions = this.prisma.buildQuery(restFilters, "created", "created", this.customFilters);
        const allCategories = await this.prisma.category.findMany({
            where: {
                ...queryOptions.where,
                is_excluded: false,
            },
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
            orderBy: queryOptions.orderBy,
        });
        const localizedCategories = await Promise.all(allCategories.map(async (category) => {
            let localizedCategory = this.applyLocalization(category, locale_id);
            if (locale_id &&
                (!category.local_categories || category.local_categories.length === 0)) {
                const defaultLocalization = await this.getDefaultLocalization(category.id);
                if (defaultLocalization) {
                    localizedCategory = {
                        ...localizedCategory,
                        name: defaultLocalization.name,
                        description: defaultLocalization.description,
                    };
                }
            }
            return localizedCategory;
        }));
        const categoryTree = this.buildCategoryTree(localizedCategories);
        const categoriesWithCounts = await this.applyRecursiveCounts(categoryTree);
        let resultCategories = categoriesWithCounts;
        if (parent_id) {
            const findParentCategory = (categories, targetId) => {
                for (const category of categories) {
                    if (category.id === targetId)
                        return category.children;
                    if (category.children?.length) {
                        const found = findParentCategory(category.children, targetId);
                        if (found)
                            return found;
                    }
                }
                return null;
            };
            resultCategories =
                findParentCategory(categoriesWithCounts, parent_id) || [];
        }
        const paginatedCategories = resultCategories.slice(queryOptions.skip, queryOptions.skip + queryOptions.take);
        return {
            items: paginatedCategories,
            total: resultCategories.length,
            skip: queryOptions.skip,
            take: queryOptions.take,
        };
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], ListService);
//# sourceMappingURL=list.service.js.map