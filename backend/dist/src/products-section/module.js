"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsSectionModule = void 0;
const prisma_1 = require("../../libs/prisma/src");
const products_1 = require("./products");
const common_1 = require("@nestjs/common");
const local_products_1 = require("./local-products");
let ProductsSectionModule = class ProductsSectionModule {
};
exports.ProductsSectionModule = ProductsSectionModule;
exports.ProductsSectionModule = ProductsSectionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, products_1.ProductsModule, local_products_1.LocalProductsModule],
        exports: [products_1.ProductsModule, local_products_1.LocalProductsModule],
    })
], ProductsSectionModule);
//# sourceMappingURL=module.js.map