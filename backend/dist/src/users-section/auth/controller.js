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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("./service");
const dto_1 = require("./dto");
const common_2 = require("../../../libs/common/src");
const services_1 = require("../users/services");
let AuthController = class AuthController {
    authService;
    usersCrudService;
    constructor(authService, usersCrudService) {
        this.authService = authService;
        this.usersCrudService = usersCrudService;
    }
    async register(registerDto, req, res) {
        const ip_address = this.getClientIp(req);
        const user_agent = req.get("User-Agent") || "Unknown";
        const { user, tokens, session } = await this.authService.register(registerDto, ip_address, user_agent);
        this.setTokenCookies(res, tokens);
        return res
            .status(201)
            .json({ user, session, message: "Регистрация успешна" });
    }
    async login(loginDto, req, res) {
        const ip_address = this.getClientIp(req);
        const user_agent = req.get("User-Agent") || "Unknown";
        const { user, tokens, session } = await this.authService.login(loginDto, ip_address, user_agent);
        this.setTokenCookies(res, tokens);
        return res
            .status(200)
            .json({ user, session, message: "Вход выполнен успешно" });
    }
    async logout(req, res) {
        const user_id = req.user?.user_id;
        const session_id = req.user?.session_id;
        if (user_id)
            await this.authService.logout(user_id, session_id);
        this.clearTokenCookies(res);
        return res.status(200).json({ message: "Выход выполнен успешно" });
    }
    async refresh(req, res) {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken)
            return res
                .status(401)
                .json({ message: "Токен обновления не предоставлен" });
        const { user, tokens, session } = await this.authService.refreshTokens(refreshToken);
        this.setTokenCookies(res, tokens);
        return res.status(200).json({ user, session });
    }
    async getProfile(req) {
        return await this.usersCrudService.findOne({ id: req.user.user_id });
    }
    getClientIp(req) {
        const forwarded = req.headers["x-forwarded-for"];
        const realIp = req.headers["x-real-ip"];
        const clientIp = req.headers["cf-connecting-ip"];
        let ip = req.ip ||
            (forwarded ? forwarded.split(",")[0].trim() : null) ||
            realIp ||
            clientIp ||
            "127.0.0.1";
        if (ip === "::1" || ip === "::ffff:127.0.0.1")
            ip = "127.0.0.1";
        return ip;
    }
    setTokenCookies(res, tokens) {
        res.cookie("access_token", tokens.accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        });
        res.cookie("refresh_token", tokens.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
    clearTokenCookies(res) {
        res.cookie("access_token", "", { httpOnly: true, maxAge: 0 });
        res.cookie("refresh_token", "", { httpOnly: true, maxAge: 0 });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiOperation)({ summary: "Регистрация нового пользователя" }),
    (0, swagger_1.ApiBody)({ type: dto_1.RegisterDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Пользователь успешно зарегистрирован",
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Неверные данные" }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: "Пользователь с таким email уже существует",
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, swagger_1.ApiOperation)({ summary: "Вход в систему" }),
    (0, swagger_1.ApiBody)({ type: dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Вход выполнен успешно" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Неверный email или пароль" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Выход из системы" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Выход выполнен успешно" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)("refresh"),
    (0, swagger_1.ApiOperation)({ summary: "Обновление токенов" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Токены успешно обновлены" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Невалидный refresh токен" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Получение данных текущего пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Данные пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Неавторизован" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [service_1.AuthService,
        services_1.UsersCrudService])
], AuthController);
//# sourceMappingURL=controller.js.map