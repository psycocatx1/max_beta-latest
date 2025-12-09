import { User } from "@prisma/client";
export interface RequestWithCookies extends Request {
    cookies: {
        refresh_token?: string;
        access_token?: string;
    };
}
export interface AuthenticatedRequest extends Request {
    user: User & {
        user_id: string;
        session_id: string;
    };
}
