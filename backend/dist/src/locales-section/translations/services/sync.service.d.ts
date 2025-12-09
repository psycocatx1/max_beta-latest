import { TranslationSyncResult } from "../types";
export declare class SyncService {
    private readonly translationsPath;
    private readonly templateModules;
    private createEmptyTemplate;
    private loadTemplateFile;
    private saveTranslationFile;
    private mergeWithTemplate;
    createTranslationFiles(locale_symbol: string): TranslationSyncResult;
    syncAllTranslations(locale_symbols: string[]): TranslationSyncResult[];
    deleteTranslationFiles(locale_symbol: string): {
        deleted_files: string[];
        errors: string[];
    };
    repairTranslationFile(locale_symbol: string, module: string): boolean;
}
