import { Locale } from "@prisma/client";
export interface TranslationValidationResult {
    file_path: string;
    exists: boolean;
    missing_keys: string[];
    empty_values: string[];
    extra_keys: string[];
    is_valid: boolean;
}
export interface TranslationValidationStatus {
    locale: Locale;
    modules: {
        [module: string]: TranslationValidationResult;
    };
    total_issues: number;
    is_valid: boolean;
}
export interface GlobalTranslationValidationStatus {
    locales: TranslationValidationStatus[];
    template_files: {
        [module: string]: {
            exists: boolean;
            keys_count: number;
        };
    };
    summary: {
        total_locales: number;
        locales_with_issues: number;
        missing_files: number;
        total_missing_keys: number;
        total_empty_values: number;
    };
}
