import { admin_pathnames } from "./pathnames/admin";
import { public_pathnames } from "./pathnames/public";

// Минимальная тестовая конфигурация pathnames
export const pathnames = {
  "/": "/",
  ...admin_pathnames,
  ...public_pathnames
} as const; 