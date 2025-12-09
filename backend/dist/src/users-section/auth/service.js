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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const argon2 = require("argon2");
const prisma_1 = require("../../../libs/prisma/src");
const services_1 = require("../users/services");
const service_1 = require("../sessions/service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    usersCrudService;
    redisSessionService;
    constructor(prisma, jwtService, configService, usersCrudService, redisSessionService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.usersCrudService = usersCrudService;
        this.redisSessionService = redisSessionService;
    }
    async register(registerDto, ip_address, user_agent) {
        const { email, password } = registerDto;
        const userExists = await this.usersCrudService.findOne({ email }, true);
        if (userExists)
            throw new common_1.ConflictException("Пользователь с таким email уже существует");
        const hash = await argon2.hash(password);
        const user = await this.prisma.user.create({
            data: { email, hashed_password: hash },
        });
        const sessionResult = await this.redisSessionService.create({
            user_id: user.id,
            ip_address,
            user_agent,
        });
        const tokens = this.generateTokens({
            user_id: user.id,
            email: user.email,
            session_id: sessionResult.id,
        });
        const { hashed_password, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            tokens,
            session: sessionResult.session,
        };
    }
    async login(loginDto, ip_address, user_agent) {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new common_1.UnauthorizedException("Неверный email или пароль");
        const isPasswordValid = await this.comparePasswords(password, user.hashed_password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException("Неверный email или пароль");
        const sessionResult = await this.redisSessionService.create({
            user_id: user.id,
            ip_address,
            user_agent,
        });
        const tokens = this.generateTokens({
            user_id: user.id,
            email: user.email,
            session_id: sessionResult.id,
        });
        const { hashed_password, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            tokens,
            session: sessionResult.session,
        };
    }
    async refreshTokens(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get("REFRESH_TOKEN_SECRET") ||
                    "refresh-token-secret-key",
            });
            const sessionData = await this.redisSessionService.validateSession(payload.session_id);
            if (!sessionData)
                throw new common_1.UnauthorizedException("Сессия неактивна или удалена");
            const user = await this.prisma.user.findUnique({
                where: { id: payload.user_id },
            });
            if (!user)
                throw new common_1.UnauthorizedException("Пользователь не найден");
            if (user.is_banned)
                throw new common_1.UnauthorizedException("Аккаунт заблокирован");
            const tokens = this.generateTokens({
                user_id: user.id,
                email: user.email,
                session_id: payload.session_id,
            });
            const { hashed_password, ...userWithoutPassword } = user;
            return {
                user: userWithoutPassword,
                tokens,
                session: sessionData,
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException)
                throw error;
            throw new common_1.UnauthorizedException("Недействительный токен обновления");
        }
    }
    async logout(user_id, session_id) {
        if (session_id) {
            await this.redisSessionService.deactivateSession(session_id);
        }
        else {
            await this.redisSessionService.deactivateAllOtherSessions(user_id);
        }
        return { message: "Выход выполнен успешно" };
    }
    async validateUser(user_id) {
        const user = await this.prisma.user.findUnique({ where: { id: user_id } });
        if (!user)
            throw new common_1.UnauthorizedException("Пользователь не найден");
        if (user.is_banned)
            throw new common_1.UnauthorizedException("Аккаунт заблокирован");
        const { hashed_password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get("ACCESS_TOKEN_SECRET") ||
                "access-token-secret-key",
            expiresIn: this.configService.get("ACCESS_TOKEN_EXPIRES_IN") || "15m",
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get("REFRESH_TOKEN_SECRET") ||
                "refresh-token-secret-key",
            expiresIn: this.configService.get("REFRESH_TOKEN_EXPIRES_IN") || "7d",
        });
        return { accessToken, refreshToken };
    }
    async comparePasswords(plainTextPassword, hashedPassword) {
        return await argon2.verify(hashedPassword, plainTextPassword);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        services_1.UsersCrudService,
        service_1.RedisSessionService])
], AuthService);
//# sourceMappingURL=service.js.map