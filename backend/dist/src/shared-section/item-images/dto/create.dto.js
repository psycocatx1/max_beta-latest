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
exports.CreateItemImageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const example_data_1 = require("../example.data");
const class_transformer_1 = require("class-transformer");
class CreateItemImageDto {
    image;
    product_id;
    service_id;
    is_excluded;
}
exports.CreateItemImageDto = CreateItemImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "URL изображения или путь к файлу",
        example: example_data_1.example_item_image.image,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemImageDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID продукта (если картинка принадлежит продукту)",
        required: false,
        example: example_data_1.example_item_image.product_id,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateItemImageDto.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "ID сервиса (если картинка принадлежит сервису)",
        required: false,
        example: example_data_1.example_item_image.service_id,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateItemImageDto.prototype, "service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Исключена ли картинка из отображения",
        required: false,
        default: false,
        example: example_data_1.example_item_image.is_excluded,
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateItemImageDto.prototype, "is_excluded", void 0);
//# sourceMappingURL=create.dto.js.map