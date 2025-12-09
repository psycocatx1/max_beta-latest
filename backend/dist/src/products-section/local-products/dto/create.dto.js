"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLocalProductDto = void 0;
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const class_validator_3 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const example_data_1 = require("../../products/example.data");
const example_data_2 = require("../../../locales-section/locales/example.data");
class CreateLocalProductDto {
    product_id;
    name;
    description;
    price;
    discount_price;
    locale_id;
}
exports.CreateLocalProductDto = CreateLocalProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_3.IsNotEmpty)(),
    (0, class_validator_2.IsUUID)(),
    (0, swagger_1.ApiProperty)({ description: "ID продукта", example: example_data_1.example_product.id }),
    __metadata("design:type", String)
], CreateLocalProductDto.prototype, "product_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_3.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(255),
    (0, swagger_1.ApiProperty)({
        description: "Название продукта",
        example: example_data_1.example_product.name,
    }),
    __metadata("design:type", String)
], CreateLocalProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(2048),
    (0, swagger_1.ApiProperty)({
        description: "Описание продукта",
        example: example_data_1.example_product.description,
    }),
    __metadata("design:type", String)
], CreateLocalProductDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_3.IsNotEmpty)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Цена продукта",
        example: example_data_1.example_product.price_USD,
    }),
    __metadata("design:type", Number)
], CreateLocalProductDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Цена продукта",
        example: example_data_1.example_product.discount_price_USD,
    }),
    __metadata("design:type", Number)
], CreateLocalProductDto.prototype, "discount_price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_3.IsNotEmpty)(),
    (0, class_validator_2.IsUUID)(),
    (0, swagger_1.ApiProperty)({ description: "ID локализации", example: example_data_2.example_locale.id }),
    __metadata("design:type", String)
], CreateLocalProductDto.prototype, "locale_id", void 0);
//# sourceMappingURL=create.dto.js.map