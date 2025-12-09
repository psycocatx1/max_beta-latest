"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const prisma_1 = require("../../../../libs/prisma/src");
let ValidationService = class ValidationService {
    prisma;
    translationsPath = path.join(process.cwd(), "translations");
    templateModules = ["admin", "common", "public"];
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAllKeys(obj, prefix = "") {
        const keys = [];
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const fullKey = prefix ? `${prefix}.${key}` : key;
                const value = obj[key];
                if (value && typeof value === "object" && !Array.isArray(value)) {
                    keys.push(...this.getAllKeys(value, fullKey));
                }
                else {
                    keys.push(fullKey);
                }
            }
        }
        return keys;
    }
    getValueByPath(obj, keyPath) {
        return keyPath
            .split(".")
            .reduce((current, key) => {
            if (current && typeof current === "object") {
                const currentObj = current;
                const value = currentObj[key];
                if (typeof value === "string" || value === undefined) {
                    return value;
                }
                return value;
            }
            return undefined;
        }, obj);
    }
    isEmptyValue(value) {
        return value === "" || value === null || value === undefined;
    }
    loadTemplateFile(module) {
        const templatePath = path.join(this.translationsPath, module, `${module}.main.json`);
        try {
            return JSON.parse(fs.readFileSync(templatePath, "utf8"));
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    loadTranslationFile(locale_symbol, module) {
        const filePath = path.join(this.translationsPath, module, `${module}.${locale_symbol.toLowerCase()}.json`);
        try {
            return JSON.parse(fs.readFileSync(filePath, "utf8"));
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    validateTranslationFile(locale_symbol, module) {
        const filePath = path.join(this.translationsPath, module, `${module}.${locale_symbol.toLowerCase()}.json`);
        const exists = fs.existsSync(filePath);
        const result = {
            file_path: filePath,
            exists,
            missing_keys: [],
            empty_values: [],
            extra_keys: [],
            is_valid: true,
        };
        if (!exists) {
            result.is_valid = false;
            return result;
        }
        const template = this.loadTemplateFile(module);
        const translation = this.loadTranslationFile(locale_symbol, module);
        if (!template || !translation) {
            result.is_valid = false;
            return result;
        }
        const templateKeys = this.getAllKeys(template);
        const translationKeys = this.getAllKeys(translation);
        for (const key of templateKeys) {
            if (!translationKeys.includes(key))
                result.missing_keys.push(key);
        }
        for (const key of templateKeys) {
            const value = this.getValueByPath(translation, key);
            if (this.isEmptyValue(value))
                result.empty_values.push(key);
        }
        for (const key of translationKeys) {
            if (!templateKeys.includes(key))
                result.extra_keys.push(key);
        }
        result.is_valid = result.missing_keys.length === 0;
        return result;
    }
    async validateLocale(locale_symbol) {
        const locale = await this.prisma.locale.findFirst({
            where: {
                symbol: {
                    equals: locale_symbol,
                    mode: "insensitive",
                },
                is_excluded: false,
            },
        });
        if (!locale)
            throw new common_1.NotFoundException(`Locale not found or excluded: ${locale_symbol}`);
        const status = {
            locale: locale,
            modules: {},
            total_issues: 0,
            is_valid: true,
        };
        for (const module of this.templateModules) {
            const moduleResult = this.validateTranslationFile(locale_symbol, module);
            status.modules[module] = moduleResult;
            const moduleIssues = moduleResult.missing_keys.length +
                moduleResult.empty_values.length +
                (moduleResult.exists ? 0 : 1);
            status.total_issues += moduleIssues;
            if (!moduleResult.is_valid) {
                status.is_valid = false;
            }
        }
        return status;
    }
    async validateAllLocales(locale_symbols) {
        const activeLocales = await this.prisma.locale.findMany({
            where: {
                symbol: {
                    in: locale_symbols,
                    mode: "insensitive",
                },
                is_excluded: false,
            },
            select: { symbol: true },
        });
        const activeSymbols = activeLocales.map((locale) => locale.symbol);
        const status = {
            locales: [],
            template_files: {},
            summary: {
                total_locales: activeSymbols.length,
                locales_with_issues: 0,
                missing_files: 0,
                total_missing_keys: 0,
                total_empty_values: 0,
            },
        };
        for (const module of this.templateModules) {
            const template = this.loadTemplateFile(module);
            status.template_files[module] = {
                exists: template !== null,
                keys_count: template ? this.getAllKeys(template).length : 0,
            };
        }
        for (const locale_symbol of activeSymbols) {
            try {
                const localeStatus = await this.validateLocale(locale_symbol);
                status.locales.push(localeStatus);
                if (!localeStatus.is_valid)
                    status.summary.locales_with_issues++;
                for (const moduleResult of Object.values(localeStatus.modules)) {
                    if (!moduleResult.exists)
                        status.summary.missing_files++;
                    status.summary.total_missing_keys += moduleResult.missing_keys.length;
                    status.summary.total_empty_values += moduleResult.empty_values.length;
                }
            }
            catch (error) {
                console.error(error);
                status.summary.total_locales--;
            }
        }
        return status;
    }
    getAvailableLocales() {
        const locales = new Set();
        for (const module of this.templateModules) {
            const modulePath = path.join(this.translationsPath, module);
            if (fs.existsSync(modulePath)) {
                const files = fs.readdirSync(modulePath);
                for (const file of files) {
                    const match = file.match(/^[^.]+\.([^.]+)\.json$/);
                    if (match && match[1] !== "main") {
                        locales.add(match[1]);
                    }
                }
            }
        }
        return Array.from(locales);
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], ValidationService);
//# sourceMappingURL=validation.service.js.map