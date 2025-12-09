import { OnModuleDestroy } from "@nestjs/common";
import { Redis } from "ioredis";
export interface SessionData {
    user_id: string;
    ip_address: string;
    user_agent: string;
    created_at: string;
    expires_at: string;
    is_active: boolean;
}
export declare class RedisService implements OnModuleDestroy {
    private readonly redis;
    constructor(redis: Redis);
    onModuleDestroy(): Promise<void>;
    createSession(sessionId: string, sessionData: SessionData, ttlSeconds?: number): Promise<void>;
    getSession(sessionId: string): Promise<SessionData | null>;
    refreshSession(sessionId: string, ttlSeconds?: number): Promise<boolean>;
    deleteSession(sessionId: string): Promise<void>;
    deactivateSession(sessionId: string): Promise<void>;
    getUserActiveSessions(userId: string): Promise<{
        sessionId: string;
        data: SessionData;
    }[]>;
    deactivateAllOtherSessions(userId: string, currentSessionId?: string): Promise<number>;
    cleanupExpiredUserSessions(userId: string): Promise<number>;
    sessionExists(sessionId: string): Promise<boolean>;
    getSessionTTL(sessionId: string): Promise<number>;
    private getSessionKey;
    private getUserSessionsKey;
    getRedisInfo(): Promise<string>;
    ping(): Promise<string>;
}
