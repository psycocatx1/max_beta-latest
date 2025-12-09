"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example_extended_local_service = exports.example_local_services_list_result = exports.example_local_service = void 0;
const example_data_1 = require("../services/example.data");
const example_data_2 = require("../../locales-section/locales/example.data");
const example_data_3 = require("../../shared-section/local-item-descriptions/example.data");
exports.example_local_service = {
    id: "UUID",
    name: "Service 1",
    description: "Description 1",
    price: 100,
    discount_price: 80,
    created: new Date(),
    updated: new Date(),
    service_id: "UUID",
    locale_id: "UUID",
    is_excluded: false,
};
exports.example_local_services_list_result = {
    items: [exports.example_local_service],
    total: 1,
    skip: 0,
    take: 10,
};
exports.example_extended_local_service = {
    ...exports.example_local_service,
    local_item_descriptions: [example_data_3.example_local_item_description],
    service: example_data_1.example_service,
    locale: example_data_2.example_locale,
};
//# sourceMappingURL=example.data.js.map