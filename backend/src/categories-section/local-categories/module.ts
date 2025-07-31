import { Module } from "@nestjs/common";
import { LocalCategoriesController } from "./controller";
import { CrudService, ListService } from "./services";
import { PrismaModule } from "@lib/prisma";
import { CategoriesModule } from "../categories/module";
import { LocalesModule } from "src/locales-section/locales/module";

@Module({
  imports: [PrismaModule, CategoriesModule, LocalesModule],
  providers: [CrudService, ListService],
  controllers: [LocalCategoriesController],
  exports: [CrudService, ListService],
})
export class LocalCategoriesModule {}
