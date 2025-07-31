import { Module } from "@nestjs/common";
import { PrismaModule } from "@lib/prisma";
import { TranslationsController } from "./controller";
import {
  TranslationsService,
  ValidationService,
  SyncService,
} from "./services";

@Module({
  imports: [PrismaModule],
  controllers: [TranslationsController],
  providers: [TranslationsService, ValidationService, SyncService],
  exports: [TranslationsService, ValidationService, SyncService],
})
export class TranslationsModule {}
