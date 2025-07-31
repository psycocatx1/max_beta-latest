import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
  Req,
  Patch,
  ForbiddenException,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Request } from "express";
import { RedisSessionService } from "./service";
import { JwtAuthGuard } from "@lib/common/guards/jwt-auth.guard";
import { Role } from "@lib/prisma";
import { Roles, RolesGuard } from "@lib/common";
import { SessionData } from "@lib/redis";

interface AuthenticatedRequest extends Request {
  user: {
    user_id: string;
    email: string;
    session_id: string;
    role: Role;
  };
}

@ApiTags("Сессии")
@Controller("sessions")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SessionsController {
  constructor(private readonly redisSessionService: RedisSessionService) {}

  @Get()
  @ApiOperation({
    summary: "Получить активные сессии",
    description: "Возвращает список всех активных сессий пользователя",
  })
  @ApiResponse({ status: 200, description: "Список активных сессий" })
  async getActiveSessions(
    @Req() req: AuthenticatedRequest,
    @Query("user_id", ParseUUIDPipe) userId?: string,
  ): Promise<{ sessionId: string; data: SessionData }[]> {
    // Если пользователь не админ, он может видеть только свои сессии
    if (userId && req.user.role !== Role.ADMIN)
      throw new ForbiddenException(
        "Недостаточно прав для просмотра сессий других пользователей",
      );
    // Если user_id не указан или пользователь не админ, возвращаем сессии текущего пользователя
    const targetUserId =
      userId && req.user.role === Role.ADMIN ? userId : req.user.user_id;
    return this.redisSessionService.getActiveSessions(targetUserId);
  }

  @Get("stats")
  @ApiOperation({
    summary: "Получить статистику сессий",
    description: "Возвращает статистику по сессиям",
  })
  @ApiResponse({ status: 200, description: "Статистика сессий" })
  async getSessionStats(@Req() req: AuthenticatedRequest): Promise<any> {
    // Только админы могут видеть общую статистику
    if (req.user.role !== Role.ADMIN)
      throw new ForbiddenException(
        "Недостаточно прав для просмотра статистики",
      );
    return this.redisSessionService.getSessionStats();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get("health")
  @ApiOperation({
    summary: "Проверить состояние сессий",
    description: "Проверяет состояние системы сессий",
  })
  @ApiResponse({ status: 200, description: "Статус состояния" })
  async healthCheck(@Req() req: AuthenticatedRequest): Promise<boolean> {
    // Только админы могут проверять здоровье системы
    if (req.user.role !== Role.ADMIN)
      throw new ForbiddenException(
        "Недостаточно прав для проверки состояния системы",
      );
    return this.redisSessionService.healthCheck();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(":id/refresh")
  @ApiOperation({
    summary: "Обновить время жизни сессии",
    description: "Продлевает время жизни указанной сессии",
  })
  @ApiResponse({ status: 200, description: "Сессия успешно обновлена" })
  async refreshSession(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ success: boolean; ttl?: number }> {
    // Проверяем что сессия принадлежит текущему пользователю
    const sessionData = await this.redisSessionService.getSessionInfo(id);
    if (!sessionData || sessionData.user_id !== req.user.user_id)
      throw new ForbiddenException("Нет доступа к этой сессии");
    const success = await this.redisSessionService.refreshSession(id);
    if (success) {
      const ttl = await this.redisSessionService.getSessionTTL(id);
      return { success: true, ttl };
    }
    return { success: false };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(":id")
  @ApiOperation({
    summary: "Удалить сессию",
    description: "Удаляет указанную сессию",
  })
  @ApiResponse({ status: 200, description: "Сессия успешно удалена" })
  async deleteSession(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ message: string }> {
    // Проверяем что сессия принадлежит текущему пользователю
    const sessionData = await this.redisSessionService.getSessionInfo(id);
    if (!sessionData || sessionData.user_id !== req.user.user_id)
      throw new ForbiddenException("Нет доступа к этой сессии");
    await this.redisSessionService.delete(id);
    return { message: "Сессия успешно удалена" };
  }

  @Delete("user/all-other")
  @ApiOperation({
    summary: "Удалить все другие сессии",
    description: "Деактивирует все сессии пользователя кроме текущей",
  })
  @ApiResponse({ status: 200, description: "Сессии успешно деактивированы" })
  async deactivateAllOtherSessions(
    @Req() req: AuthenticatedRequest,
  ): Promise<{ deactivatedCount: number }> {
    return {
      deactivatedCount:
        await this.redisSessionService.deactivateAllOtherSessions(
          req.user.user_id,
          req.user.session_id,
        ),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get("count")
  @ApiOperation({
    summary: "Получить количество активных сессий пользователя",
    description: "Возвращает количество активных сессий текущего пользователя",
  })
  @ApiResponse({ status: 200, description: "Количество активных сессий" })
  async getUserSessionCount(
    @Req() req: AuthenticatedRequest,
  ): Promise<{ count: number }> {
    return {
      count: await this.redisSessionService.countUserActiveSessions(
        req.user.user_id,
      ),
    };
  }
}
