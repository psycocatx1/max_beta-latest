import { PrismaService } from "@lib/prisma";
import { ValidationService } from "./validation.service";
import { SyncService } from "./sync.service";
import { TranslationSyncResult, GlobalTranslationValidationStatus } from "../types";
export declare class TranslationsService {
    private readonly prisma;
    private readonly validationService;
    private readonly syncService;
    private readonly translationsPath;
    private readonly allowedModules;
    constructor(prisma: PrismaService, validationService: ValidationService, syncService: SyncService);
    getMessages(locale_symbol: string, modules: string[]): Promise<object>;
    getTranslations(locale_symbol: string, module: string): Promise<object>;
    updateTranslations(locale_symbol: string, module: string, translations: object): Promise<{
        success: boolean;
        message: string;
    }>;
    private validateParams;
    getValidationStatus(): Promise<GlobalTranslationValidationStatus>;
    createLocaleFiles(locale_symbol: string): Promise<TranslationSyncResult>;
    deleteLocaleFiles(locale_symbol: string): {
        deleted_files: string[];
        errors: string[];
    };
    syncAllTranslations(): Promise<TranslationSyncResult[]>;
    repairTranslationFile(locale_symbol: string, module: string): Promise<boolean>;
    getAvailableLocales(): Promise<string[]>;
    private validateLocale;
    private getFilePath;
}
