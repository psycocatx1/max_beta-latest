import { NestedRecord } from '@/components/admin/common/JsonEditor/useJsonEditor';
import { TranslationValidationResult, TranslationValidationStatus, GlobalTranslationValidationStatus } from '@/../../backend/src/locales-section/translations';
export type { TranslationValidationResult, TranslationValidationStatus, GlobalTranslationValidationStatus };
// Типы для работы с переводами
export interface TranslationModule {
  admin: 'admin';
  common: 'common';
  public: 'public';
}

export type { UpdateTranslationDto } from '@/../../backend/src/locales-section/translations';

export type TranslationModuleType = 'admin' | 'common' | 'public';

export interface TranslationResponse {
  success: boolean;
  message: string;
}

// Типы для работы с JSON структурой переводов
export interface JsonNode {
  key: string;
  value: string | NestedRecord;
  path: string;
  isLeaf: boolean;
  children?: JsonNode[];
}

export interface TranslationFormData {
  locale_symbol: string;
  module: TranslationModuleType;
  translations: NestedRecord;
}

export interface TranslationSyncResult {
  locale_symbol: string;
  created_files: string[];
  updated_files: string[];
  errors: string[];
  success: boolean;
}

// Строгие типы для pathname
export type TranslationPathname =
  | '/admin/locales/[locale_id]/translations/admin'
  | '/admin/locales/[locale_id]/translations/common'
  | '/admin/locales/[locale_id]/translations/public';

// Типизированный объект для навигации
export interface TranslationHref {
  pathname: TranslationPathname;
  params: { locale_id: string; };
}

// Параметры для создания URL переводов
export interface TranslationUrlParams {
  module: TranslationModuleType;
  locale_id: string;
}