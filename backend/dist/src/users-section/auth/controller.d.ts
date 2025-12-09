import { Response, Request } from "express";
import { AuthService } from "./service";
import { LoginDto, RegisterDto } from "./dto";
import { UsersCrudService } from "../users/services";
import { AuthenticatedRequest, RequestWithCookies } from "./request.interface";
export declare class AuthController {
    private readonly authService;
    private readonly usersCrudService;
    constructor(authService: AuthService, usersCrudService: UsersCrudService);
    register(registerDto: RegisterDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    login(loginDto: LoginDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    refresh(req: RequestWithCookies, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: AuthenticatedRequest): Promise<{
        locale: {
            symbol: string;
            name: string;
        } | null;
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
    } | null>;
    private getClientIp;
    private setTokenCookies;
    private clearTokenCookies;
}
