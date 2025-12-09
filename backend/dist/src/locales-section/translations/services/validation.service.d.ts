import { TranslationValidationResult, TranslationValidationStatus, GlobalTranslationValidationStatus } from "../types";
import { PrismaService } from "@lib/prisma";
export declare class ValidationService {
    private readonly prisma;
    private readonly translationsPath;
    private readonly templateModules;
    constructor(prisma: PrismaService);
    private getAllKeys;
    private getValueByPath;
    private isEmptyValue;
    private loadTemplateFile;
    private loadTranslationFile;
    validateTranslationFile(locale_symbol: string, module: string): TranslationValidationResult;
    validateLocale(locale_symbol: string): Promise<TranslationValidationStatus>;
    validateAllLocales(locale_symbols: string[]): Promise<GlobalTranslationValidationStatus>;
    getAvailableLocales(): string[];
}
