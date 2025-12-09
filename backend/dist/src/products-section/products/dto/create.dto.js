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
exports.CreateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
class CreateProductDto {
    name;
    category_id;
    price_USD;
    discount_price_USD;
    description;
    image;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)({
        description: "Название продукта для администратора (на сайте будет отображаться локальное название)",
        example: "Продукт 1",
        maxLength: 512,
        minLength: 3,
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "Категория продукта",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Цена продукта в USD (будет отображаться с конвертацией по курсу валюты при отсутствии локальных цен)",
    }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price_USD", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value) {
            const number = Number(value);
            return number > 0 ? number : null;
        }
        return null;
    }),
    (0, swagger_1.ApiProperty)({
        description: "Скидочная цена продукта в USD (если не указана, то будет использоваться цена в USD)",
    }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "discount_price_USD", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(4096),
    (0, swagger_1.ApiProperty)({
        description: "Описание продукта для заметок администратора (на сайте будут отображаться локальные описания)",
        example: "Описание продукта 1",
        maxLength: 4096,
        minLength: 3,
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Главное изображение продукта",
        required: false,
        example: "https://example.com/image.jpg",
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "image", void 0);
//# sourceMappingURL=create.dto.js.map