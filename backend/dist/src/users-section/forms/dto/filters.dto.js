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
exports.FormsFiltersDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const base_filter_dto_1 = require("../../../types/base-filter.dto");
class FormsFiltersDto extends base_filter_dto_1.BaseFilterDto {
    search;
    is_read;
    is_answered;
}
exports.FormsFiltersDto = FormsFiltersDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 1024),
    (0, swagger_1.ApiProperty)({ description: "Поиск", required: false }),
    __metadata("design:type", String)
], FormsFiltersDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ description: "Прочитано", required: false }),
    __metadata("design:type", Boolean)
], FormsFiltersDto.prototype, "is_read", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ description: "Отвечено", required: false }),
    __metadata("design:type", Boolean)
], FormsFiltersDto.prototype, "is_answered", void 0);
//# sourceMappingURL=filters.dto.js.map