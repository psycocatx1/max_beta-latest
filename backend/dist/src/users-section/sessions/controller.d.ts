import { Request } from "express";
import { RedisSessionService } from "./service";
import { Role } from "@lib/prisma";
import { SessionData } from "@lib/redis";
interface AuthenticatedRequest extends Request {
    user: {
        user_id: string;
        email: string;
        session_id: string;
        role: Role;
    };
}
export declare class SessionsController {
    private readonly redisSessionService;
    constructor(redisSessionService: RedisSessionService);
    getActiveSessions(req: AuthenticatedRequest, userId?: string): Promise<{
        sessionId: string;
        data: SessionData;
    }[]>;
    getSessionStats(req: AuthenticatedRequest): Promise<any>;
    healthCheck(req: AuthenticatedRequest): Promise<boolean>;
    refreshSession(id: string, req: AuthenticatedRequest): Promise<{
        success: boolean;
        ttl?: number;
    }>;
    deleteSession(id: string, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    deactivateAllOtherSessions(req: AuthenticatedRequest): Promise<{
        deactivatedCount: number;
    }>;
    getUserSessionCount(req: AuthenticatedRequest): Promise<{
        count: number;
    }>;
}
export {};
