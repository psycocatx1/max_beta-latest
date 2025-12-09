"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example_extended_local_product = exports.example_local_products_list_result = exports.example_local_product = void 0;
const example_data_1 = require("../products/example.data");
const example_data_2 = require("../../locales-section/locales/example.data");
const example_data_3 = require("../../shared-section/local-item-descriptions/example.data");
exports.example_local_product = {
    id: "UUID",
    name: "Product 1",
    description: "Description 1",
    price: 100,
    discount_price: 80,
    created: new Date(),
    updated: new Date(),
    product_id: example_data_1.example_product.id,
    locale_id: example_data_2.example_locale.id,
    is_excluded: false,
};
exports.example_local_products_list_result = {
    items: [exports.example_local_product],
    total: 1,
    skip: 0,
    take: 10,
};
exports.example_extended_local_product = {
    ...exports.example_local_product,
    local_item_descriptions: [example_data_3.example_local_item_description],
    product: example_data_1.example_product,
    locale: example_data_2.example_locale,
};
//# sourceMappingURL=example.data.js.map