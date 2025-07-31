import { PrismaModule } from "@lib/prisma";
import { ServicesModule } from "./services";
import { Module } from "@nestjs/common";
import { LocalServicesModule } from "./local-services";

@Module({
  imports: [PrismaModule, ServicesModule, LocalServicesModule],
  exports: [ServicesModule, LocalServicesModule],
})
export class ServiceSectionModule {}
