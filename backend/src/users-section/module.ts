import { UsersModule } from "./users";
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth";
import { SessionsModule } from "./sessions";
import { FormsModule } from "./forms";

@Module({
  imports: [UsersModule, AuthModule, SessionsModule, FormsModule],
  exports: [UsersModule, AuthModule, SessionsModule, FormsModule],
})
export class UsersSectionModule {}
