import { PrismaModule } from "@lib/prisma";
import { CrudService, ListService } from "./services";
import { Module } from "@nestjs/common";
import { LocalItemDescriptionsController } from "./controller";
import { FilesModule } from "src/files/files.module";
import { LocalProductsModule } from "src/products-section/local-products/module";
import { LocalServicesModule } from "src/services-section/local-services/module";

/**
 * Модуль для работы с описаниями объектов
 */
@Module({
  imports: [
    PrismaModule,
    FilesModule,
    LocalProductsModule,
    LocalServicesModule,
  ],
  controllers: [LocalItemDescriptionsController],
  providers: [ListService, CrudService],
  exports: [ListService, CrudService],
})
export class LocalItemDescriptionsModule {}
