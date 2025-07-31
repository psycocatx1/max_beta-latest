import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAuthGuard, RolesGuard } from "../guards";
import { Roles } from "./roles.decorator";
import { Role } from "@prisma/client";

export function AdminOnly() {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(Role.ADMIN),
  );
}
