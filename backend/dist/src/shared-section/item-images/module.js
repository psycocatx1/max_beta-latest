"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemImagesModule = void 0;
const prisma_1 = require("../../../libs/prisma/src");
const controller_1 = require("./controller");
const crud_service_1 = require("./services/crud.service");
const list_service_1 = require("./services/list.service");
const common_1 = require("@nestjs/common");
const files_module_1 = require("../../files/files.module");
const module_1 = require("../../products-section/products/module");
const module_2 = require("../../services-section/services/module");
let ItemImagesModule = class ItemImagesModule {
};
exports.ItemImagesModule = ItemImagesModule;
exports.ItemImagesModule = ItemImagesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, files_module_1.FilesModule, module_1.ProductsModule, module_2.ServicesModule],
        controllers: [controller_1.ItemImagesController],
        providers: [list_service_1.ListService, crud_service_1.CrudService],
        exports: [list_service_1.ListService, crud_service_1.CrudService],
    })
], ItemImagesModule);
//# sourceMappingURL=module.js.map