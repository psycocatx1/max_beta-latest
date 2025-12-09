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
exports.CreateFormDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFormDto {
    sender_name;
    company_name;
    phone_number;
    email;
    message;
}
exports.CreateFormDto = CreateFormDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 1024),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "Имя отправителя",
        minLength: 2,
        maxLength: 1024,
    }),
    __metadata("design:type", String)
], CreateFormDto.prototype, "sender_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 1024),
    (0, swagger_1.ApiProperty)({
        description: "Название компании",
        minLength: 2,
        maxLength: 1024,
    }),
    __metadata("design:type", String)
], CreateFormDto.prototype, "company_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)(),
    (0, class_validator_1.Length)(2, 16),
    (0, swagger_1.ApiProperty)({ description: "Номер телефона", minLength: 2, maxLength: 16 }),
    __metadata("design:type", String)
], CreateFormDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(2, 256),
    (0, swagger_1.ApiProperty)({ description: "Email", minLength: 2, maxLength: 256 }),
    __metadata("design:type", String)
], CreateFormDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 8192),
    (0, swagger_1.ApiProperty)({ description: "Сообщение", minLength: 2, maxLength: 8192 }),
    __metadata("design:type", String)
], CreateFormDto.prototype, "message", void 0);
//# sourceMappingURL=create.dto.js.map