"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.AdminOnly = exports.ROLES_KEY = exports.Roles = void 0;
var roles_decorator_1 = require("./roles.decorator");
Object.defineProperty(exports, "Roles", { enumerable: true, get: function () { return roles_decorator_1.Roles; } });
Object.defineProperty(exports, "ROLES_KEY", { enumerable: true, get: function () { return roles_decorator_1.ROLES_KEY; } });
var admin_only_decorator_1 = require("./admin-only.decorator");
Object.defineProperty(exports, "AdminOnly", { enumerable: true, get: function () { return admin_only_decorator_1.AdminOnly; } });
var auth_decorator_1 = require("./auth.decorator");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return auth_decorator_1.Auth; } });
//# sourceMappingURL=index.js.map