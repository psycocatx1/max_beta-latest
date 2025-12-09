"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example_categories_list_result = exports.example_extended_category = exports.example_category = void 0;
const prisma_1 = require("../../../libs/prisma/src");
const example_data_1 = require("../../products-section/products/example.data");
const example_data_2 = require("../local-categories/example.data");
exports.example_category = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Название категории",
    description: "Описание категории",
    image: "https://example.com/image.jpg",
    type: prisma_1.CategoryType.PRODUCT,
    created: new Date(),
    updated: new Date(),
    is_excluded: false,
    parent_id: null,
};
exports.example_extended_category = {
    ...exports.example_category,
    parent: null,
    ancestors: [],
    children: [
        {
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "Подкатегория 1",
            description: "Описание подкатегории",
            image: "https://example.com/subcategory1.jpg",
            type: prisma_1.CategoryType.PRODUCT,
            created: new Date(),
            updated: new Date(),
            is_excluded: false,
            parent_id: "123e4567-e89b-12d3-a456-426614174000",
            _count: {
                products: 5,
                services: 0,
            },
        },
    ],
    products: [example_data_1.example_product],
    services: [],
    local_categories: [example_data_2.example_local_category],
};
exports.example_categories_list_result = {
    items: [
        {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Категория 1",
            description: "Описание категории 1",
            image: "https://example.com/category1.jpg",
            type: prisma_1.CategoryType.PRODUCT,
            created: new Date(),
            updated: new Date(),
            is_excluded: false,
            parent_id: null,
            _count: {
                products: 10,
                services: 0,
            },
            children: [
                {
                    id: "123e4567-e89b-12d3-a456-426614174001",
                    name: "Подкатегория 1.1",
                    description: "Описание подкатегории 1.1",
                    image: "https://example.com/subcategory1_1.jpg",
                    type: prisma_1.CategoryType.PRODUCT,
                    created: new Date(),
                    updated: new Date(),
                    is_excluded: false,
                    parent_id: "123e4567-e89b-12d3-a456-426614174000",
                    _count: {
                        products: 5,
                        services: 0,
                    },
                },
            ],
        },
        {
            id: "123e4567-e89b-12d3-a456-426614174002",
            name: "Категория 2",
            description: "Описание категории 2",
            image: "https://example.com/category2.jpg",
            type: prisma_1.CategoryType.SERVICE,
            created: new Date(),
            updated: new Date(),
            is_excluded: false,
            parent_id: null,
            _count: {
                products: 0,
                services: 8,
            },
            children: [],
        },
    ],
    total: 2,
    skip: 0,
    take: 10,
};
//# sourceMappingURL=example.data.js.map