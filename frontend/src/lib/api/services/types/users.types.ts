import { AdminUpdateUserDto, UserFiltersDto } from '@/../../backend/src/users-section/users';
import { RegisterDto, LoginDto } from "@/../../backend/src/users-section/auth";
import { Locale, User } from '@prisma/client';
export type { AdminUpdateUserDto, UserFiltersDto, RegisterDto, LoginDto };
export type { User } from "@prisma/client"
/**
 * Форма для обновления пользователя
 */
export interface UpdateUserFormData extends AdminUpdateUserDto {
  file?: File;
}

export interface AuthResponse {
  user: User & { locale: Locale };
  message: string;
}