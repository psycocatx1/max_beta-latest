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
exports.CreateLocalItemDescriptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const example_data_1 = require("../example.data");
const prisma_1 = require("../../../../libs/prisma/src");
const class_transformer_1 = require("class-transformer");
class CreateLocalItemDescriptionDto {
    content;
    title;
    type;
    local_product_id;
    local_service_id;
    is_excluded;
}
exports.CreateLocalItemDescriptionDto = CreateLocalItemDescriptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Содержимое описания (текст или URL изображения)",
        example: example_data_1.example_local_item_description.content,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2048),
    __metadata("design:type", String)
], CreateLocalItemDescriptionDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Заголовок описания",
        required: false,
        example: example_data_1.example_local_item_description.title,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(256),
    __metadata("design:type", String)
], CreateLocalItemDescriptionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Тип описания",
        enum: prisma_1.LocalItemDescriptionType,
        required: false,
        example: example_data_1.example_local_item_description.type,
    }),
    (0, class_validator_1.IsEnum)(prisma_1.LocalItemDescriptionType),
    __metadata("design:type", String)
], CreateLocalItemDescriptionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID локального продукта (если описание принадлежит продукту)",
        required: false,
        example: example_data_1.example_local_item_description.local_product_id,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateLocalItemDescriptionDto.prototype, "local_product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID локального сервиса (если описание принадлежит сервису)",
        required: false,
        example: example_data_1.example_local_item_description.local_service_id,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateLocalItemDescriptionDto.prototype, "local_service_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: "Исключено ли описание из отображения",
        required: false,
        default: false,
        example: example_data_1.example_local_item_description.is_excluded,
    }),
    __metadata("design:type", Boolean)
], CreateLocalItemDescriptionDto.prototype, "is_excluded", void 0);
//# sourceMappingURL=create.dto.js.map