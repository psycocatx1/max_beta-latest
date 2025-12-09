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
exports.LocalItemDescriptionsFiltersDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const base_filter_dto_1 = require("../../../types/base-filter.dto");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
class LocalItemDescriptionsFiltersDto extends base_filter_dto_1.BaseFilterDto {
    local_product_id;
    local_service_id;
    product_id;
    service_id;
    type;
    is_excluded = false;
}
exports.LocalItemDescriptionsFiltersDto = LocalItemDescriptionsFiltersDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID локального продукта для фильтрации",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LocalItemDescriptionsFiltersDto.prototype, "local_product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID локального сервиса для фильтрации",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LocalItemDescriptionsFiltersDto.prototype, "local_service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID продукта для фильтрации", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LocalItemDescriptionsFiltersDto.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID сервиса для фильтрации", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LocalItemDescriptionsFiltersDto.prototype, "service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Тип описания",
        required: false,
        enum: client_1.LocalItemDescriptionType,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.LocalItemDescriptionType),
    __metadata("design:type", String)
], LocalItemDescriptionsFiltersDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Исключены ли описания",
        required: false,
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LocalItemDescriptionsFiltersDto.prototype, "is_excluded", void 0);
//# sourceMappingURL=filters.dto.js.map