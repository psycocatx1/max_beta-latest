import { Strategy } from "passport-jwt";
import { AuthService } from "../service";
import { RedisSessionService } from "../../sessions/service";
import { ConfigService } from "@nestjs/config";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    private readonly redisSessionService;
    private readonly configService;
    constructor(authService: AuthService, redisSessionService: RedisSessionService, configService: ConfigService);
    validate(payload: {
        user_id: string;
        session_id: string;
        email: string;
    }): Promise<{
        user_id: string;
        session_id: string;
        email: string;
        created: Date;
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
}
export {};
