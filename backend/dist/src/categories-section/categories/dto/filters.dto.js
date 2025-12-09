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
exports.CategoryFiltersDto = void 0;
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../../../libs/prisma/src");
const base_filter_dto_1 = require("../../../types/base-filter.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CategoryFiltersDto extends base_filter_dto_1.BaseFilterDto {
    search;
    type;
    parent_id;
    locale_id;
    is_excluded = false;
}
exports.CategoryFiltersDto = CategoryFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "Название категории", required: false }),
    __metadata("design:type", String)
], CategoryFiltersDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(prisma_1.CategoryType),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Тип категории",
        enum: prisma_1.CategoryType,
        required: false,
        default: prisma_1.CategoryType.PRODUCT,
    }),
    __metadata("design:type", String)
], CategoryFiltersDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "ID родительской категории", required: false }),
    __metadata("design:type", String)
], CategoryFiltersDto.prototype, "parent_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({ description: "ID локализации", required: false }),
    __metadata("design:type", String)
], CategoryFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли категория исключенной",
        example: false,
    }),
    __metadata("design:type", Boolean)
], CategoryFiltersDto.prototype, "is_excluded", void 0);
//# sourceMappingURL=filters.dto.js.map