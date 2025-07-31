import { Module } from "@nestjs/common";
import { PrismaModule } from "@lib/prisma";
import { CrudService, ListService } from "./services";
import { CategoriesController } from "./controller";
import { FilesModule } from "src/files/files.module";

@Module({
  imports: [PrismaModule, FilesModule],
  providers: [CrudService, ListService],
  controllers: [CategoriesController],
  exports: [CrudService, ListService],
})
export class CategoriesModule {}
