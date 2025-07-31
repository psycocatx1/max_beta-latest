import { Module } from "@nestjs/common";
import { FormsController } from "./controller";
import { FormsService } from "./service";
import { PrismaModule } from "@lib/prisma";

@Module({
  imports: [PrismaModule],
  controllers: [FormsController],
  providers: [FormsService],
  exports: [FormsService],
})
export class FormsModule {}
