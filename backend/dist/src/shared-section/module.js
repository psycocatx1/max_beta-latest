"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedSectionModule = void 0;
const common_1 = require("@nestjs/common");
const module_1 = require("./local-item-descriptions/module");
const module_2 = require("./item-images/module");
let SharedSectionModule = class SharedSectionModule {
};
exports.SharedSectionModule = SharedSectionModule;
exports.SharedSectionModule = SharedSectionModule = __decorate([
    (0, common_1.Module)({
        imports: [module_1.LocalItemDescriptionsModule, module_2.ItemImagesModule],
        exports: [module_1.LocalItemDescriptionsModule, module_2.ItemImagesModule],
    })
], SharedSectionModule);
//# sourceMappingURL=module.js.map