import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "@lib/prisma";
import { LoginDto, RegisterDto } from "./dto";
import { UsersCrudService } from "../users/services";
import { RedisSessionService } from "../sessions/service";
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    private readonly usersCrudService;
    private readonly redisSessionService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService, usersCrudService: UsersCrudService, redisSessionService: RedisSessionService);
    register(registerDto: RegisterDto, ip_address: string, user_agent: string): Promise<{
        user: {
            created: Date;
            email: string;
            first_name: string | null;
            last_name: string | null;
            phone_number: string | null;
            id: string;
            image: string | null;
            updated: Date;
            role: import(".prisma/client").$Enums.Role;
            is_banned: boolean;
            locale_id: string | null;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        session: import("../../../libs/redis/src").SessionData;
    }>;
    login(loginDto: LoginDto, ip_address: string, user_agent: string): Promise<{
        user: {
            created: Date;
            email: string;
            first_name: string | null;
            last_name: string | null;
            phone_number: string | null;
            id: string;
            image: string | null;
            updated: Date;
            role: import(".prisma/client").$Enums.Role;
            is_banned: boolean;
            locale_id: string | null;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        session: import("../../../libs/redis/src").SessionData;
    }>;
    refreshTokens(refreshToken: string): Promise<{
        user: {
            created: Date;
            email: string;
            first_name: string | null;
            last_name: string | null;
            phone_number: string | null;
            id: string;
            image: string | null;
            updated: Date;
            role: import(".prisma/client").$Enums.Role;
            is_banned: boolean;
            locale_id: string | null;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        session: import("../../../libs/redis/src").SessionData;
    }>;
    logout(user_id: string, session_id?: string): Promise<{
        message: string;
    }>;
    validateUser(user_id: string): Promise<{
        created: Date;
        email: string;
        first_name: string | null;
        last_name: string | null;
        phone_number: string | null;
        id: string;
        image: string | null;
        updated: Date;
        role: import(".prisma/client").$Enums.Role;
        is_banned: boolean;
        locale_id: string | null;
    }>;
    private generateTokens;
    private comparePasswords;
}
