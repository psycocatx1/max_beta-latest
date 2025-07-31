import { LocalesController } from "./controller";
import { PrismaModule } from "@lib/prisma";
import { CrudService, ListService, ValidationService } from "./services";
import { Module, forwardRef } from "@nestjs/common";
import { FilesModule } from "../../files/files.module";
import { TranslationsModule } from "../translations/module";

@Module({
  imports: [PrismaModule, FilesModule, forwardRef(() => TranslationsModule)],
  controllers: [LocalesController],
  providers: [CrudService, ListService, ValidationService],
  exports: [CrudService, ListService, ValidationService],
})
export class LocalesModule {}
