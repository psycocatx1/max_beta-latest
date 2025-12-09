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
exports.CreateServiceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateServiceDto {
    name;
    category_id;
    price_USD;
    discount_price_USD;
    description;
    image;
}
exports.CreateServiceDto = CreateServiceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)({
        description: "Название услуги для администратора (на сайте будет отображаться локальное название)",
        example: "Услуга 1",
        minLength: 3,
        maxLength: 512,
    }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "Категория услуги",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "category_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Цена услуги в USD (будет отображаться с конвертацией по курсу валюты при отсутствии локальных цен)",
        example: 100,
    }),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "price_USD", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Скидочная цена услуги в USD (если не указана, то будет использоваться цена в USD)",
        example: 90,
    }),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "discount_price_USD", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(4096),
    (0, swagger_1.ApiProperty)({
        description: "Описание услуги для заметок администратора (на сайте будут отображаться локальные описания)",
        example: "Описание услуги 1",
        minLength: 3,
        maxLength: 4096,
    }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Главное изображение услуги",
        example: "https://example.com/image.jpg",
    }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "image", void 0);
//# sourceMappingURL=create.dto.js.map