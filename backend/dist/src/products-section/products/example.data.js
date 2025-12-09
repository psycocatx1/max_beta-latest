"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example_product_list_result = exports.example_extended_product = exports.example_product = void 0;
const example_data_1 = require("../../categories-section/categories/example.data");
exports.example_product = {
    id: "UUID",
    name: "Example Product Name",
    description: "Description of the product for notes",
    price_USD: 100,
    discount_price_USD: 80,
    created: new Date(),
    updated: new Date(),
    category_id: "UUID",
    image: "https://example.com/image.jpg",
    is_excluded: false,
};
exports.example_extended_product = {
    ...exports.example_product,
    images: [],
    local_products: [],
    category: example_data_1.example_category,
};
exports.example_product_list_result = {
    items: [exports.example_extended_product],
    total: 1,
    skip: 0,
    take: 10,
};
//# sourceMappingURL=example.data.js.map