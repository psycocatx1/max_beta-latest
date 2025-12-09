"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSectionModule = void 0;
const users_1 = require("./users");
const common_1 = require("@nestjs/common");
const auth_1 = require("./auth");
const sessions_1 = require("./sessions");
const forms_1 = require("./forms");
let UsersSectionModule = class UsersSectionModule {
};
exports.UsersSectionModule = UsersSectionModule;
exports.UsersSectionModule = UsersSectionModule = __decorate([
    (0, common_1.Module)({
        imports: [users_1.UsersModule, auth_1.AuthModule, sessions_1.SessionsModule, forms_1.FormsModule],
        exports: [users_1.UsersModule, auth_1.AuthModule, sessions_1.SessionsModule, forms_1.FormsModule],
    })
], UsersSectionModule);
//# sourceMappingURL=module.js.map