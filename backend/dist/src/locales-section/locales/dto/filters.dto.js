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
exports.LocaleFiltersDto = void 0;
const base_filter_dto_1 = require("../../../types/base-filter.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class LocaleFiltersDto extends base_filter_dto_1.BaseFilterDto {
    search;
    symbol;
    is_excluded;
}
exports.LocaleFiltersDto = LocaleFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        name: "Поиск",
        description: "Поиск по названию, языку, символу, валюте, символу валюты, коду телефона",
        example: "Россия",
        required: false,
    }),
    __metadata("design:type", String)
], LocaleFiltersDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        name: "Язык",
        description: "Язык",
        example: "RU",
        required: false,
    }),
    __metadata("design:type", String)
], LocaleFiltersDto.prototype, "symbol", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value == "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли локаль исключенной",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], LocaleFiltersDto.prototype, "is_excluded", void 0);
//# sourceMappingURL=filters.dto.js.map