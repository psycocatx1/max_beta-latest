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
exports.BaseFilterDto = exports.SortDirection = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "asc";
    SortDirection["DESC"] = "desc";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
class BaseFilterDto {
    skip = 0;
    take = 10;
    sort;
    sort_direction = SortDirection.DESC;
    start_date;
    end_date;
    is_excluded;
}
exports.BaseFilterDto = BaseFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Number of items to skip",
        required: false,
        default: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseFilterDto.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Number of items to take",
        required: false,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseFilterDto.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sort field", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFilterDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Sort direction",
        required: false,
        enum: SortDirection,
        default: SortDirection.DESC,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortDirection),
    __metadata("design:type", String)
], BaseFilterDto.prototype, "sort_direction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Start date", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], BaseFilterDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "End date", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], BaseFilterDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Is excluded item", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseFilterDto.prototype, "is_excluded", void 0);
//# sourceMappingURL=base-filter.dto.js.map