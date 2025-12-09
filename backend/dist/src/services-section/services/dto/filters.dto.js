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
exports.ServiceFiltersDto = void 0;
const class_validator_1 = require("class-validator");
const base_filter_dto_1 = require("../../../types/base-filter.dto");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class ServiceFiltersDto extends base_filter_dto_1.BaseFilterDto {
    category_id;
    name;
    description;
    min_price;
    max_price;
    is_discounted;
    locale_id;
    is_excluded = false;
}
exports.ServiceFiltersDto = ServiceFiltersDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "Идентификатор категории услуги",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], ServiceFiltersDto.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "Название услуги", example: "Услуга 1" }),
    __metadata("design:type", String)
], ServiceFiltersDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "Описание услуги", example: "Описание услуги 1" }),
    __metadata("design:type", String)
], ServiceFiltersDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({ description: "Минимальная цена услуги", example: 0 }),
    __metadata("design:type", Number)
], ServiceFiltersDto.prototype, "min_price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({ description: "Максимальная цена услуги", example: 100000 }),
    __metadata("design:type", Number)
], ServiceFiltersDto.prototype, "max_price", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли услуга со скидкой",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], ServiceFiltersDto.prototype, "is_discounted", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: "Идентификатор локали",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], ServiceFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли услуга исключенной",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], ServiceFiltersDto.prototype, "is_excluded", void 0);
//# sourceMappingURL=filters.dto.js.map