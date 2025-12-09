export interface TranslationSyncResult {
    locale_symbol: string;
    created_files: string[];
    updated_files: string[];
    errors: string[];
    success: boolean;
}
