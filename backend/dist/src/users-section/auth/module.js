"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const controller_1 = require("./controller");
const service_1 = require("./service");
const module_1 = require("../sessions/module");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const module_2 = require("../users/module");
const services_1 = require("../users/services");
const service_2 = require("../sessions/service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get("ACCESS_TOKEN_SECRET") ||
                        "access-token-secret-key",
                    signOptions: {
                        expiresIn: configService.get("ACCESS_TOKEN_EXPIRES_IN") || "15m",
                    },
                }),
            }),
            module_2.UsersModule,
            module_1.SessionsModule,
        ],
        controllers: [controller_1.AuthController],
        providers: [service_1.AuthService, jwt_strategy_1.JwtStrategy, services_1.UsersCrudService, service_2.RedisSessionService],
        exports: [service_1.AuthService, jwt_1.JwtModule],
    })
], AuthModule);
//# sourceMappingURL=module.js.map