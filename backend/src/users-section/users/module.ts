import { Module } from "@nestjs/common";
import { UsersController } from "./controller";
import { UsersListService, UsersCrudService } from "./services";

@Module({
  controllers: [UsersController],
  providers: [UsersListService, UsersCrudService],
  exports: [UsersListService, UsersCrudService],
})
export class UsersModule {}
