import { PrismaModule } from "@lib/prisma";
import { ItemImagesController } from "./controller";
import { CrudService } from "./services/crud.service";
import { ListService } from "./services/list.service";
import { Module } from "@nestjs/common";
import { FilesModule } from "src/files/files.module";
import { ProductsModule } from "src/products-section/products/module";
import { ServicesModule } from "src/services-section/services/module";
/**
 * Модуль для работы с картинками объектов
 */
@Module({
  imports: [PrismaModule, FilesModule, ProductsModule, ServicesModule],
  controllers: [ItemImagesController],
  providers: [ListService, CrudService],
  exports: [ListService, CrudService],
})
export class ItemImagesModule {}
