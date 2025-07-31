import { PrismaModule } from "@lib/prisma";
import { ProductsController } from "./controller";
import { CrudService } from "./services/crud.service";
import { ListService } from "./services/list.service";
import { Module } from "@nestjs/common";

/**
 * Модуль для работы с продуктами
 */
@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ListService, CrudService],
  exports: [ListService, CrudService],
})
export class ProductsModule {}
