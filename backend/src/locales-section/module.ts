import { Module } from "@nestjs/common";
import { PrismaModule } from "@lib/prisma";
import {
  CrudService,
  ListService,
  ValidationService,
} from "./locales/services";
import { TranslationsModule } from "./translations/module";
import { FilesModule } from "../files/files.module";

@Module({
  imports: [PrismaModule, TranslationsModule, FilesModule],
  providers: [CrudService, ListService, ValidationService],
  exports: [CrudService, ListService, ValidationService],
})
export class LocalesSectionModule {}
