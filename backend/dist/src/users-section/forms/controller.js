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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const service_1 = require("./service");
const common_2 = require("../../../libs/common/src");
const example_data_1 = require("./example.data");
let FormsController = class FormsController {
    formsService;
    constructor(formsService) {
        this.formsService = formsService;
    }
    async create(dto, req, locale) {
        return this.formsService.create(dto, req, locale);
    }
    async findAll(filters) {
        return this.formsService.findAll(filters);
    }
    async findOne(id) {
        return this.formsService.findOne(id);
    }
    async answer(id) {
        return this.formsService.answer(id);
    }
    async delete(id) {
        return this.formsService.delete(id);
    }
};
exports.FormsController = FormsController;
__decorate([
    (0, common_1.Post)(":locale"),
    (0, swagger_1.ApiOperation)({ summary: "Create form" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Form created",
        example: example_data_1.example_extended_form,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)("locale")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateFormDto,
        Request, String]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_2.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: "Get forms" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Forms found",
        example: example_data_1.example_forms_list_result,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FormsFiltersDto]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_2.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: "Get form" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Form found",
        example: example_data_1.example_extended_form,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_2.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: "Answer form" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Form answered",
        example: example_data_1.example_extended_form,
    }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "answer", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_2.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: "Delete form" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Form deleted" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "delete", null);
exports.FormsController = FormsController = __decorate([
    (0, common_1.Controller)("forms"),
    (0, swagger_1.ApiTags)("Forms"),
    __metadata("design:paramtypes", [service_1.FormsService])
], FormsController);
//# sourceMappingURL=controller.js.map