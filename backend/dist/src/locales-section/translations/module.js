"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../libs/prisma/src");
const controller_1 = require("./controller");
const services_1 = require("./services");
let TranslationsModule = class TranslationsModule {
};
exports.TranslationsModule = TranslationsModule;
exports.TranslationsModule = TranslationsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule],
        controllers: [controller_1.TranslationsController],
        providers: [services_1.TranslationsService, services_1.ValidationService, services_1.SyncService],
        exports: [services_1.TranslationsService, services_1.ValidationService, services_1.SyncService],
    })
], TranslationsModule);
//# sourceMappingURL=module.js.map