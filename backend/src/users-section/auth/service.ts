import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as argon2 from "argon2";
import { PrismaService } from "@lib/prisma";
import { LoginDto, RegisterDto } from "./dto";
import { UsersCrudService } from "../users/services";
import { RedisSessionService } from "../sessions/service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersCrudService: UsersCrudService,
    private readonly redisSessionService: RedisSessionService,
  ) {}

  async register(
    registerDto: RegisterDto,
    ip_address: string,
    user_agent: string,
  ) {
    const { email, password } = registerDto;

    // Проверяем, существует ли пользователь с таким email
    const userExists = await this.usersCrudService.findOne({ email }, true);
    if (userExists)
      throw new ConflictException("Пользователь с таким email уже существует");

    // Хешируем пароль
    const hash = await argon2.hash(password);

    // Создаем нового пользователя
    const user = await this.prisma.user.create({
      data: { email, hashed_password: hash },
    });

    // Создаем сессию для пользователя в Redis
    const sessionResult = await this.redisSessionService.create({
      user_id: user.id,
      ip_address,
      user_agent,
    });

    // Создаем токены
    const tokens = this.generateTokens({
      user_id: user.id,
      email: user.email,
      session_id: sessionResult.id,
    });

    // Возвращаем пользователя без пароля
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashed_password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      tokens,
      session: sessionResult.session,
    };
  }

  async login(loginDto: LoginDto, ip_address: string, user_agent: string) {
    const { email, password } = loginDto;

    // Ищем пользователя по email
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException("Неверный email или пароль");

    // Проверяем пароль
    const isPasswordValid = await this.comparePasswords(
      password,
      user.hashed_password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException("Неверный email или пароль");

    // Создаем сессию для пользователя в Redis
    const sessionResult = await this.redisSessionService.create({
      user_id: user.id,
      ip_address,
      user_agent,
    });

    // Создаем токены
    const tokens = this.generateTokens({
      user_id: user.id,
      email: user.email,
      session_id: sessionResult.id,
    });

    // Возвращаем пользователя без пароля
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashed_password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      tokens,
      session: sessionResult.session,
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      // Верифицируем refresh token
      const payload = this.jwtService.verify<{
        user_id: string;
        session_id: string;
        email: string;
      }>(refreshToken, {
        secret:
          this.configService.get<string>("REFRESH_TOKEN_SECRET") ||
          "refresh-token-secret-key",
      });

      // КРИТИЧЕСКИ ВАЖНО: Проверяем сессию в Redis
      const sessionData = await this.redisSessionService.validateSession(
        payload.session_id,
      );

      if (!sessionData)
        throw new UnauthorizedException("Сессия неактивна или удалена");

      // Ищем пользователя
      const user = await this.prisma.user.findUnique({
        where: { id: payload.user_id },
      });

      if (!user) throw new UnauthorizedException("Пользователь не найден");

      if (user.is_banned)
        throw new UnauthorizedException("Аккаунт заблокирован");

      // Создаем новые токены
      const tokens = this.generateTokens({
        user_id: user.id,
        email: user.email,
        session_id: payload.session_id,
      });

      // Возвращаем пользователя без пароля
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hashed_password, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        tokens,
        session: sessionData,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException("Недействительный токен обновления");
    }
  }

  async logout(user_id: string, session_id?: string) {
    if (session_id) {
      // Деактивируем конкретную сессию в Redis
      await this.redisSessionService.deactivateSession(session_id);
    } else {
      // Деактивируем все сессии пользователя в Redis
      await this.redisSessionService.deactivateAllOtherSessions(user_id);
    }

    return { message: "Выход выполнен успешно" };
  }

  async validateUser(user_id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: user_id } });

    if (!user) throw new UnauthorizedException("Пользователь не найден");

    if (user.is_banned) throw new UnauthorizedException("Аккаунт заблокирован");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashed_password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private generateTokens(payload: {
    user_id: string;
    email: string;
    session_id: string;
  }) {
    const accessToken = this.jwtService.sign(payload, {
      secret:
        this.configService.get<string>("ACCESS_TOKEN_SECRET") ||
        "access-token-secret-key",
      expiresIn:
        this.configService.get<string>("ACCESS_TOKEN_EXPIRES_IN") || "15m",
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret:
        this.configService.get<string>("REFRESH_TOKEN_SECRET") ||
        "refresh-token-secret-key",
      expiresIn:
        this.configService.get<string>("REFRESH_TOKEN_EXPIRES_IN") || "7d",
    });

    return { accessToken, refreshToken };
  }

  private async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, plainTextPassword);
  }
}
