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
exports.CreateLocaleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateLocaleDto {
    name;
    language;
    symbol;
    currency;
    currency_symbol;
    phone_code;
    image;
}
exports.CreateLocaleDto = CreateLocaleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)({
        name: "Название",
        description: "Название региона локализации",
        example: "Россия",
        maxLength: 512,
        minLength: 2,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)({
        name: "Язык",
        description: "Язык региона локализации",
        example: "Русский",
        maxLength: 512,
        minLength: 2,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(3),
    (0, class_validator_1.Matches)(/^[A-Z]{2,3}$/),
    (0, swagger_1.ApiProperty)({
        name: "Символ",
        description: "Символ региона локализации",
        example: "RU",
        maxLength: 3,
        minLength: 2,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "symbol", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)({
        name: "Валюта",
        description: "Валюта региона локализации",
        example: "Рубль",
        maxLength: 512,
        minLength: 2,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(4),
    (0, swagger_1.ApiProperty)({
        name: "Символ валюты",
        description: "Символ валюты региона локализации",
        example: "₽",
        maxLength: 4,
        minLength: 1,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "currency_symbol", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(5),
    (0, class_validator_1.Matches)(/^\+[0-9]{1,5}$/),
    (0, swagger_1.ApiProperty)({
        name: "Код телефона",
        description: "Код телефона региона локализации",
        example: "+7",
        maxLength: 5,
        minLength: 1,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "phone_code", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        name: "Изображение",
        description: "Изображение региона локализации",
        example: "https://example.com/image.png",
        required: false,
    }),
    __metadata("design:type", String)
], CreateLocaleDto.prototype, "image", void 0);
//# sourceMappingURL=create.dto.js.map