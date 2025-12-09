"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example_forms_list_result = exports.example_extended_form = void 0;
const locales_section_1 = require("../../locales-section");
const example_form = {
    id: "1",
    sender_name: "John Doe",
    company_name: "Acme Inc.",
    phone_number: "+1234567890",
    email: "john.doe@example.com",
    message: "Hello, world!",
    ip_address: "127.0.0.1",
    is_read: false,
    is_answered: false,
    created: new Date(),
    updated: new Date(),
    locale_id: "1",
};
exports.example_extended_form = {
    ...example_form,
    locale: locales_section_1.example_locale,
};
exports.example_forms_list_result = {
    items: [exports.example_extended_form],
    total: 1,
    skip: 0,
    take: 10,
};
//# sourceMappingURL=example.data.js.map