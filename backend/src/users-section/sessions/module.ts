import { Module } from "@nestjs/common";
import { RedisModule } from "@lib/redis";
import { SessionsController } from "./controller";
import { RedisSessionService } from "./service";

@Module({
  imports: [RedisModule],
  controllers: [SessionsController],
  providers: [RedisSessionService],
  exports: [RedisSessionService],
})
export class SessionsModule {}
