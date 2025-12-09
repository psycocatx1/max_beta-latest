"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example_extended_services_list_result = exports.example_extended_service = exports.example_service = void 0;
const example_data_1 = require("../../shared-section/item-images/example.data");
const example_data_2 = require("../local-services/example.data");
const example_data_3 = require("../../categories-section/categories/example.data");
exports.example_service = {
    id: "UUID",
    name: "Example Service Name",
    description: "Description of the service for notes",
    price_USD: 100,
    discount_price_USD: 80,
    created: new Date(),
    updated: new Date(),
    category_id: "UUID",
    is_excluded: false,
    image: "https://example.com/image.jpg",
};
exports.example_extended_service = {
    ...exports.example_service,
    category: example_data_3.example_category,
    images: [example_data_1.example_item_image],
    local_services: [example_data_2.example_extended_local_service],
};
exports.example_extended_services_list_result = {
    items: [exports.example_extended_service],
    total: 1,
    skip: 0,
    take: 10,
};
//# sourceMappingURL=example.data.js.map