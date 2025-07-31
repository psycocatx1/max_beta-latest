import { Locale } from '@prisma/client';
import { LocaleFiltersDto, CreateLocaleDto, UpdateLocaleDto, EntityValidationResult, EntitiesValidationResult } from '@/../../backend/src/locales-section/locales';
export type { LocaleFiltersDto, Locale, EntityValidationResult, EntitiesValidationResult };
/**
 * Тип для создания региона с файлом
 */
export interface CreateLocaleFormData extends CreateLocaleDto {
  file?: File;
}
/**
 * Тип для обновления региона с файлом
 */
export interface UpdateLocaleFormData extends UpdateLocaleDto {
  file?: File;
}