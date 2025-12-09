import { RedisService, SessionData } from "@lib/redis";
import { CreateSessionDto } from "./dto";
export declare class RedisSessionService {
    private readonly redisService;
    constructor(redisService: RedisService);
    create(createSessionDto: CreateSessionDto): Promise<{
        id: string;
        session: SessionData;
    }>;
    validateSession(id: string): Promise<SessionData | null>;
    refreshSession(id: string, ttlSeconds?: number): Promise<boolean>;
    deactivateSession(id: string): Promise<void>;
    delete(sessionId: string): Promise<void>;
    deactivateAllOtherSessions(user_id: string, current_session_id?: string): Promise<number>;
    getActiveSessions(userId: string): Promise<{
        sessionId: string;
        data: SessionData;
    }[]>;
    getSessionStats(): Promise<string>;
    healthCheck(): Promise<boolean>;
    countUserActiveSessions(user_id: string): Promise<number>;
    getSessionInfo(id: string): Promise<SessionData | null>;
    sessionExists(id: string): Promise<boolean>;
    getSessionTTL(id: string): Promise<number>;
}
