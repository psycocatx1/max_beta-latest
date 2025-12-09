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
exports.ProductFiltersDto = void 0;
const class_validator_1 = require("class-validator");
const base_filter_dto_1 = require("../../../types/base-filter.dto");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class ProductFiltersDto extends base_filter_dto_1.BaseFilterDto {
    category_id;
    locale_id;
    name;
    description;
    min_price;
    max_price;
    is_discounted;
    is_excluded = false;
}
exports.ProductFiltersDto = ProductFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "ID категории",
        example: "123e4567-e89b-12d3-a456-426614174000",
        required: false,
    }),
    __metadata("design:type", String)
], ProductFiltersDto.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "ID локали",
        example: "123e4567-e89b-12d3-a456-426614174000",
        required: false,
    }),
    __metadata("design:type", String)
], ProductFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Название продукта",
        example: "Продукт 1",
        required: false,
    }),
    __metadata("design:type", String)
], ProductFiltersDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Описание продукта",
        example: "Описание продукта 1",
        required: false,
    }),
    __metadata("design:type", String)
], ProductFiltersDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Минимальная цена продукта",
        example: 1,
        required: false,
    }),
    __metadata("design:type", Number)
], ProductFiltersDto.prototype, "min_price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Максимальная цена продукта",
        example: 100000,
        required: false,
    }),
    __metadata("design:type", Number)
], ProductFiltersDto.prototype, "max_price", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли продукт со скидкой",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], ProductFiltersDto.prototype, "is_discounted", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли продукт исключенным",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], ProductFiltersDto.prototype, "is_excluded", void 0);
//# sourceMappingURL=filters.dto.js.map