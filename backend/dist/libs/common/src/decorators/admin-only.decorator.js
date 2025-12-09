"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOnly = AdminOnly;
const common_1 = require("@nestjs/common");
const guards_1 = require("../guards");
const roles_decorator_1 = require("./roles.decorator");
const client_1 = require("@prisma/client");
function AdminOnly() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN));
}
//# sourceMappingURL=admin-only.decorator.js.map