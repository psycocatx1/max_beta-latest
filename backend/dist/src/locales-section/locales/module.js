"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalesModule = void 0;
const controller_1 = require("./controller");
const prisma_1 = require("../../../libs/prisma/src");
const services_1 = require("./services");
const common_1 = require("@nestjs/common");
const files_module_1 = require("../../files/files.module");
const module_1 = require("../translations/module");
let LocalesModule = class LocalesModule {
};
exports.LocalesModule = LocalesModule;
exports.LocalesModule = LocalesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, files_module_1.FilesModule, (0, common_1.forwardRef)(() => module_1.TranslationsModule)],
        controllers: [controller_1.LocalesController],
        providers: [services_1.CrudService, services_1.ListService, services_1.ValidationService],
        exports: [services_1.CrudService, services_1.ListService, services_1.ValidationService],
    })
], LocalesModule);
//# sourceMappingURL=module.js.map