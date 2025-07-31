import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { PrismaModule } from "../libs/prisma/src/prisma.module";
import { RedisModule } from "@lib/redis";
import { ProductsSectionModule } from "./products-section";
import { CategoriesSectionModule } from "./categories-section";
import { UsersSectionModule } from "./users-section";
import { FilesModule } from "./files/files.module";
import { ServiceSectionModule } from "./services-section";
import { SharedSectionModule } from "./shared-section";
import { LocalesSectionModule } from "./locales-section";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    RedisModule,
    FilesModule,
    UsersSectionModule,
    ProductsSectionModule,
    CategoriesSectionModule,
    ServiceSectionModule,
    SharedSectionModule,
    LocalesSectionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
