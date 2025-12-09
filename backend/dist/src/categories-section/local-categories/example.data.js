"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example_local_categories_list_result = exports.example_extended_local_category = exports.example_local_category = void 0;
const example_data_1 = require("../../locales-section/locales/example.data");
const __1 = require("..");
exports.example_local_category = {
    description: "Локализованное описание категории",
    name: "Название категории",
    id: "123e4567-e89b-12d3-a456-426614174000",
    created: new Date(),
    updated: new Date(),
    category_id: "123e4567-e89b-12d3-a456-426614174000",
    locale_id: example_data_1.example_locale.id,
    is_excluded: false,
};
exports.example_extended_local_category = {
    ...exports.example_local_category,
    category: __1.example_category,
    locale: example_data_1.example_locale,
};
exports.example_local_categories_list_result = {
    items: [exports.example_local_category],
    total: 1,
    skip: 0,
    take: 10,
};
//# sourceMappingURL=example.data.js.map