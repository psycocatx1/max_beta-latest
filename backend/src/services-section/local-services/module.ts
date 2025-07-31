import { LocalServicesController } from "./controller";
import { ListService, CrudService } from "./services";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@lib/prisma";
import { ServicesModule } from "../services/module";
import { LocalesModule } from "../../locales-section/locales/module";

/**
 * Модуль для работы с локализациями услуг
 */
@Module({
  imports: [PrismaModule, ServicesModule, LocalesModule],
  controllers: [LocalServicesController],
  providers: [ListService, CrudService],
  exports: [CrudService, ListService],
})
export class LocalServicesModule {}
