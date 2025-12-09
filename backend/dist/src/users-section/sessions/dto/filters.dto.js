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
exports.SessionFiltersDto = void 0;
const base_filter_dto_1 = require("../../../types/base-filter.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SessionFiltersDto extends base_filter_dto_1.BaseFilterDto {
    user_id;
    is_active;
    ip_address;
    user_agent;
}
exports.SessionFiltersDto = SessionFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Идентификатор пользователя",
        example: "cmbi2oevc0000twkoc0a3nofo",
    }),
    __metadata("design:type", String)
], SessionFiltersDto.prototype, "user_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Активна ли сессия",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], SessionFiltersDto.prototype, "is_active", void 0);
__decorate([
    (0, class_validator_1.IsIP)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: "IP адрес сессии", example: "192.168.1.1" }),
    __metadata("design:type", String)
], SessionFiltersDto.prototype, "ip_address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "User Agent браузерa",
        example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    }),
    __metadata("design:type", String)
], SessionFiltersDto.prototype, "user_agent", void 0);
//# sourceMappingURL=filters.dto.js.map