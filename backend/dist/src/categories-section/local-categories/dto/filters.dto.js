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
exports.LocalCategoryFiltersDto = void 0;
const class_validator_1 = require("class-validator");
const base_filter_dto_1 = require("../../../types/base-filter.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class LocalCategoryFiltersDto extends base_filter_dto_1.BaseFilterDto {
    search;
    category_id;
    locale_id;
    is_excluded = false;
}
exports.LocalCategoryFiltersDto = LocalCategoryFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Поиск по названию",
        example: "Перевод категории 1",
    }),
    __metadata("design:type", String)
], LocalCategoryFiltersDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)("all", { each: false, always: false }),
    (0, swagger_1.ApiProperty)({
        description: "ID категории",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], LocalCategoryFiltersDto.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)("all", { each: false, always: false }),
    (0, swagger_1.ApiProperty)({
        description: "ID локализации",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], LocalCategoryFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли перевод категории исключенным",
        example: false,
    }),
    __metadata("design:type", Boolean)
], LocalCategoryFiltersDto.prototype, "is_excluded", void 0);
//# sourceMappingURL=filters.dto.js.map