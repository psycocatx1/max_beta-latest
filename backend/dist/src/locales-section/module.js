"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalesSectionModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../libs/prisma/src");
const services_1 = require("./locales/services");
const module_1 = require("./translations/module");
const files_module_1 = require("../files/files.module");
let LocalesSectionModule = class LocalesSectionModule {
};
exports.LocalesSectionModule = LocalesSectionModule;
exports.LocalesSectionModule = LocalesSectionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, module_1.TranslationsModule, files_module_1.FilesModule],
        providers: [services_1.CrudService, services_1.ListService, services_1.ValidationService],
        exports: [services_1.CrudService, services_1.ListService, services_1.ValidationService],
    })
], LocalesSectionModule);
//# sourceMappingURL=module.js.map