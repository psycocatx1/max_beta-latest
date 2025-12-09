"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
let SyncService = class SyncService {
    translationsPath = path.join(process.cwd(), "translations");
    templateModules = ["admin", "common", "public"];
    createEmptyTemplate(template) {
        if (typeof template !== "object" ||
            template === null ||
            Array.isArray(template))
            return {};
        const result = {};
        for (const key in template) {
            if (Object.prototype.hasOwnProperty.call(template, key)) {
                const value = template[key];
                result[key] =
                    typeof value === "object"
                        ? this.createEmptyTemplate(value)
                        : `#!restored "${value}"`;
            }
        }
        return result;
    }
    loadTemplateFile(module) {
        const templatePath = path.join(this.translationsPath, module, `${module}.main.json`);
        if (!fs.existsSync(templatePath))
            return null;
        try {
            const content = fs.readFileSync(templatePath, "utf8");
            return JSON.parse(content);
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    saveTranslationFile(locale_symbol, module, data) {
        const filePath = path.join(this.translationsPath, module, `${module}.${locale_symbol.toLowerCase()}.json`);
        const dirPath = path.dirname(filePath);
        try {
            if (!fs.existsSync(dirPath))
                fs.mkdirSync(dirPath, { recursive: true });
            if (fs.existsSync(filePath))
                fs.copyFileSync(filePath, `${filePath}.backup.${Date.now()}`);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    mergeWithTemplate(existing, template) {
        const result = {};
        for (const key in template) {
            if (Object.prototype.hasOwnProperty.call(template, key)) {
                const templateValue = template[key];
                const existingValue = existing?.[key];
                if (typeof templateValue === "object" && templateValue !== null) {
                    result[key] = this.mergeWithTemplate(existingValue, templateValue);
                }
                else {
                    result[key] = typeof existingValue === "string"
                        ? existingValue
                        : `#!restored "${templateValue}"`;
                }
            }
        }
        if (existing && typeof existing === "object") {
            for (const key in existing) {
                if (Object.prototype.hasOwnProperty.call(existing, key) &&
                    !Object.prototype.hasOwnProperty.call(template, key))
                    result[key] = existing[key];
            }
        }
        return result;
    }
    createTranslationFiles(locale_symbol) {
        const normalizedLocale = locale_symbol.toLowerCase();
        const result = {
            locale_symbol: normalizedLocale,
            created_files: [],
            updated_files: [],
            errors: [],
            success: true,
        };
        for (const module of this.templateModules) {
            try {
                const template = this.loadTemplateFile(module);
                if (!template) {
                    const error = `Не удалось загрузить шаблон для модуля ${module}`;
                    result.errors.push(error);
                    result.success = false;
                    continue;
                }
                const filePath = path.join(this.translationsPath, module, `${module}.${normalizedLocale}.json`);
                let translations;
                if (fs.existsSync(filePath)) {
                    try {
                        const existingContent = fs.readFileSync(filePath, "utf8");
                        const existingTranslations = JSON.parse(existingContent);
                        translations = this.mergeWithTemplate(existingTranslations, template);
                        result.updated_files.push(filePath);
                    }
                    catch (error) {
                        console.error(error);
                        translations = this.createEmptyTemplate(template);
                        result.created_files.push(filePath);
                    }
                }
                else {
                    translations = this.createEmptyTemplate(template);
                    result.created_files.push(filePath);
                }
                const saved = this.saveTranslationFile(normalizedLocale, module, translations);
                if (!saved) {
                    const error = `Не удалось сохранить файл для модуля ${module}`;
                    result.errors.push(error);
                    result.success = false;
                }
            }
            catch (error) {
                const errorMsg = `Ошибка создания файла для модуля ${module}: ${error instanceof Error ? error.message : String(error)}`;
                result.errors.push(errorMsg);
                result.success = false;
                console.error(errorMsg);
            }
        }
        if (!result.success)
            console.error(`Ошибки при создании файлов переводов для локализации ${normalizedLocale}`);
        return result;
    }
    syncAllTranslations(locale_symbols) {
        const results = [];
        for (const locale_symbol of locale_symbols) {
            results.push(this.createTranslationFiles(locale_symbol));
        }
        return results;
    }
    deleteTranslationFiles(locale_symbol) {
        const deleted_files = [];
        const errors = [];
        for (const module of this.templateModules) {
            const filePath = path.join(this.translationsPath, module, `${module}.${locale_symbol.toLowerCase()}.json`);
            if (fs.existsSync(filePath)) {
                try {
                    const backupPath = `${filePath}.deleted.${Date.now()}`;
                    fs.copyFileSync(filePath, backupPath);
                    fs.unlinkSync(filePath);
                    deleted_files.push(filePath);
                }
                catch (error) {
                    const errorMsg = `Ошибка удаления файла ${filePath}: ${error instanceof Error ? error.message : String(error)}`;
                    errors.push(errorMsg);
                    console.error(errorMsg);
                }
            }
        }
        return { deleted_files, errors };
    }
    repairTranslationFile(locale_symbol, module) {
        try {
            const template = this.loadTemplateFile(module);
            if (!template)
                return false;
            const filePath = path.join(this.translationsPath, module, `${module}.${locale_symbol.toLowerCase()}.json`);
            let existing = {};
            if (fs.existsSync(filePath)) {
                try {
                    const content = fs.readFileSync(filePath, "utf8");
                    existing = JSON.parse(content);
                }
                catch (error) {
                    console.error(`Не удалось прочитать существующий файл ${filePath}, создаем новый`, error instanceof Error ? error.message : String(error));
                }
            }
            const repaired = this.mergeWithTemplate(existing, template);
            return this.saveTranslationFile(locale_symbol.toLowerCase(), module, repaired);
        }
        catch (error) {
            console.error(`Ошибка восстановления файла ${locale_symbol}/${module}: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
};
exports.SyncService = SyncService;
exports.SyncService = SyncService = __decorate([
    (0, common_1.Injectable)()
], SyncService);
//# sourceMappingURL=sync.service.js.map