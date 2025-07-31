import { LocalProductsController } from "./controller";
import { ListService, CrudService } from "./services";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@lib/prisma";
import { ProductsModule } from "../products/module";
import { LocalesModule } from "../../locales-section/locales/module";

/**
 * Модуль для работы с локализациями продуктов
 */
@Module({
  imports: [PrismaModule, ProductsModule, LocalesModule],
  controllers: [LocalProductsController],
  providers: [ListService, CrudService],
  exports: [CrudService, ListService],
})
export class LocalProductsModule {}
