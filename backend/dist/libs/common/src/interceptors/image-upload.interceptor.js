"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadInterceptor = void 0;
exports.createImageUploadInterceptor = createImageUploadInterceptor;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
function createImageUploadInterceptor(fieldName = "file", config = {}) {
    const { maxFileSize = 5 * 1024 * 1024, allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"], } = config;
    return (0, platform_express_1.FileInterceptor)(fieldName, {
        limits: {
            fileSize: maxFileSize,
        },
        fileFilter: (req, file, callback) => {
            if (allowedMimeTypes.includes(file.mimetype)) {
                callback(null, true);
            }
            else {
                const allowedFormats = allowedMimeTypes
                    .map((type) => type.replace("image/", "").toUpperCase())
                    .join(", ");
                callback(new common_1.BadRequestException(`Недопустимый формат файла. Разрешены только: ${allowedFormats}`), false);
            }
        },
    });
}
exports.ImageUploadInterceptor = createImageUploadInterceptor();
//# sourceMappingURL=image-upload.interceptor.js.map