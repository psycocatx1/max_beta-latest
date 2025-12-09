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
exports.UserFiltersDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const base_filter_dto_1 = require("../../../types/base-filter.dto");
const class_transformer_1 = require("class-transformer");
class UserFiltersDto extends base_filter_dto_1.BaseFilterDto {
    role;
    email;
    search;
    phone_number;
    locale_id;
    is_banned = false;
}
exports.UserFiltersDto = UserFiltersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(client_1.Role),
    (0, swagger_1.ApiProperty)({
        enum: client_1.Role,
        enumName: "Role",
        description: "Фильтрация по роли пользователя",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserFiltersDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Фильтрация по совпадению email",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserFiltersDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Фильтрация по совпадению имени или фамилии",
        required: false,
    }),
    __metadata("design:type", String)
], UserFiltersDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Фильтрация по совпадению номера телефона",
        required: false,
    }),
    __metadata("design:type", String)
], UserFiltersDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Фильтрация по ID региона",
        required: false,
    }),
    __metadata("design:type", String)
], UserFiltersDto.prototype, "locale_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Является ли пользователь исключенным",
        example: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], UserFiltersDto.prototype, "is_banned", void 0);
//# sourceMappingURL=filters.dto.js.map