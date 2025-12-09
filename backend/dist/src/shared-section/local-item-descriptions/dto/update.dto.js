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
exports.UpdateLocalItemDescriptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_dto_1 = require("./create.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_2 = require("@nestjs/swagger");
class UpdateLocalItemDescriptionDto extends (0, swagger_1.PartialType)(create_dto_1.CreateLocalItemDescriptionDto) {
    is_excluded;
    order;
}
exports.UpdateLocalItemDescriptionDto = UpdateLocalItemDescriptionDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value == "true"),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_2.ApiProperty)({
        description: "Исключено ли описание",
        required: false,
        example: false,
    }),
    __metadata("design:type", Boolean)
], UpdateLocalItemDescriptionDto.prototype, "is_excluded", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        description: "Порядок описания",
        required: false,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateLocalItemDescriptionDto.prototype, "order", void 0);
//# sourceMappingURL=update.dto.js.map