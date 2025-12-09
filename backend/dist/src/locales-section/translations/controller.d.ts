import { TranslationsService } from "./services";
import { UpdateTranslationDto } from "./dto";
export declare class TranslationsController {
    private readonly translationsService;
    constructor(translationsService: TranslationsService);
    getValidationStatus(): Promise<import("./types").GlobalTranslationValidationStatus>;
    syncAllTranslations(): Promise<import("./types").TranslationSyncResult[]>;
    createLocaleFiles(locale_symbol: string): Promise<import("./types").TranslationSyncResult>;
    repairTranslationFile(locale_symbol: string, module: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getMessages(locale_symbol: string, modules?: string): Promise<object>;
    updateTranslations(locale_symbol: string, module: string, data: UpdateTranslationDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getTranslations(locale_symbol: string, module: string): Promise<object>;
}
