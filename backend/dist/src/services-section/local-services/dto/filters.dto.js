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
exports.LocalServiceFiltersDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const base_filter_dto_1 = require("../../../types/base-filter.dto");
const class_transformer_1 = require("class-transformer");
class LocalServiceFiltersDto extends base_filter_dto_1.BaseFilterDto {
    service_id;
    locale_id;
    min_price;
    max_price;
    is_discounted;
    name;
    is_excluded = false;
}
exports.LocalServiceFiltersDto = LocalServiceFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({ description: "ID услуги", required: false }),
    __metadata("design:type", String)
], LocalServiceFiltersDto.prototype, "service_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({ description: "ID локализации", required: false }),
    __metadata("design:type", String)
], LocalServiceFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Минимальная цена локализованной услуги",
        required: false,
    }),
    __metadata("design:type", Number)
], LocalServiceFiltersDto.prototype, "min_price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: "Максимальная цена локализованной услуги",
        required: false,
    }),
    __metadata("design:type", Number)
], LocalServiceFiltersDto.prototype, "max_price", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли локализованная услуга со скидкой",
        required: false,
    }),
    __metadata("design:type", Boolean)
], LocalServiceFiltersDto.prototype, "is_discounted", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Название локализованной услуги",
        required: false,
    }),
    __metadata("design:type", String)
], LocalServiceFiltersDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли локализованная услуга исключенной",
        required: false,
    }),
    __metadata("design:type", Boolean)
], LocalServiceFiltersDto.prototype, "is_excluded", void 0);
//# sourceMappingURL=filters.dto.js.map