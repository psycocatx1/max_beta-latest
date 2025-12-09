import { ExecutionContext } from "@nestjs/common";
import { Role } from "@prisma/client";
interface AuthenticatedUser {
    user_id: string;
    email: string;
    session_id: string;
    role: Role;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    image?: string;
    is_banned: boolean;
    locale_id?: string;
}
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
    handleRequest<T = AuthenticatedUser>(err: Error | null, user: T | false): T;
}
export {};
