import { PrismaModule } from "@lib/prisma";
import { ServicesController } from "./controller";
import { CrudService } from "./services/crud.service";
import { ListService } from "./services/list.service";
import { Module } from "@nestjs/common";
import { FilesModule } from "src/files/files.module";
import { CategoriesModule } from "src/categories-section";

/**
 * Модуль для работы с услугами
 */
@Module({
  imports: [PrismaModule, FilesModule, CategoriesModule],
  controllers: [ServicesController],
  providers: [ListService, CrudService],
  exports: [ListService, CrudService],
})
export class ServicesModule {}
