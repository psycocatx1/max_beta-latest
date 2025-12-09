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
exports.AdminUpdateUserDto = exports.UpdateUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
class UpdateUserDto {
    password;
    first_name;
    last_name;
    phone_number;
    image;
    locale_id;
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "newpassword123",
        description: "Новый пароль пользователя",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "Пароль должен быть строкой" }),
    (0, class_validator_1.MinLength)(8, { message: "Пароль должен содержать минимум 8 символов" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Пароль не может быть пустым" }),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Иван",
        description: "Имя пользователя",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "Имя должно быть строкой" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Иванов",
        description: "Фамилия пользователя",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "Фамилия должна быть строкой" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "+79001234567",
        description: "Номер телефона пользователя",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "Номер телефона должен быть строкой" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://example.com/avatar.jpg",
        description: "URL изображения профиля",
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: "URL изображения должен быть строкой" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "123e4567-e89b-12d3-a456-426614174000",
        description: "ID локали пользователя",
        required: false,
    }),
    (0, class_validator_1.IsUUID)("all", { message: "ID локали должен быть UUID" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "locale_id", void 0);
class AdminUpdateUserDto extends UpdateUserDto {
    email;
    role;
    is_banned;
}
exports.AdminUpdateUserDto = AdminUpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "user@example.com",
        description: "Email пользователя",
        required: false,
    }),
    (0, class_validator_1.IsEmail)({}, { message: "Введите корректный email" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminUpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "ADMIN",
        description: "Роль пользователя",
        required: false,
        enum: client_1.Role,
    }),
    (0, class_validator_1.IsEnum)(client_1.Role),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminUpdateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: "Блокировка пользователя",
        required: false,
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AdminUpdateUserDto.prototype, "is_banned", void 0);
//# sourceMappingURL=update.dto.js.map