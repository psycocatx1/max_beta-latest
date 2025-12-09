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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const allowed_models_data_1 = require("./allowed-models.data");
let FilesService = class FilesService {
    uploadPath = "uploads";
    constructor() {
        this.ensureUploadDir();
    }
    ensureUploadDir() {
        if (!fs.existsSync(this.uploadPath)) {
            fs.mkdirSync(this.uploadPath, { recursive: true });
        }
        const modelDirectories = Object.values(allowed_models_data_1.images_paths);
        modelDirectories.forEach((dir) => {
            const modelDir = path.join(this.uploadPath, dir);
            if (!fs.existsSync(modelDir)) {
                fs.mkdirSync(modelDir, { recursive: true });
            }
        });
    }
    saveImage(file, model_name) {
        if (!allowed_models_data_1.images_paths[model_name]) {
            throw new Error(`Недопустимая модель: ${model_name}`);
        }
        const cleanOriginalName = file.originalname
            .replace(/[^a-zA-Z0-9.-]/g, "_")
            .replace(/_+/g, "_")
            .replace(/^_|_$/g, "");
        const singularModel = model_name.endsWith("s")
            ? model_name.slice(0, -1)
            : model_name;
        const fileName = `${singularModel}_${Date.now()}_${cleanOriginalName}`;
        const filePath = path.join(this.uploadPath, model_name, fileName);
        fs.writeFileSync(filePath, file.buffer);
        return `/static/${allowed_models_data_1.images_paths[model_name]}/${fileName}`;
    }
    deleteImage(imagePath) {
        if (!imagePath || !imagePath.startsWith("/static/")) {
            return;
        }
        const filePath = path.join(this.uploadPath, imagePath.replace("/static/", ""));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    isValidImage(file) {
        const allowedMimeTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];
        return allowedMimeTypes.includes(file.mimetype);
    }
    isValidSize(file, maxSizeInMB = 5) {
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        return file.size <= maxSizeInBytes;
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FilesService);
//# sourceMappingURL=files.service.js.map