import { BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

/**
 * Конфигурация для интерсептора загрузки изображений
 */
export interface ImageUploadConfig {
  maxFileSize?: number; // размер в байтах
  allowedMimeTypes?: string[];
}

/**
 * Создает интерсептор для загрузки изображений с валидацией
 */
export function createImageUploadInterceptor(
  fieldName: string = "file",
  config: ImageUploadConfig = {},
) {
  const {
    maxFileSize = 5 * 1024 * 1024, // 5MB по умолчанию
    allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  } = config;

  return FileInterceptor(fieldName, {
    limits: {
      fileSize: maxFileSize,
    },
    // @ts-expect-error eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unused-vars-experimental
    fileFilter: (req, file, callback) => {
      if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        const allowedFormats = allowedMimeTypes
          .map((type) => type.replace("image/", "").toUpperCase())
          .join(", ");
        callback(
          new BadRequestException(
            `Недопустимый формат файла. Разрешены только: ${allowedFormats}`,
          ),
          false,
        );
      }
    },
  });
}

/**
 * Готовый интерсептор для загрузки изображений с настройками по умолчанию
 */
export const ImageUploadInterceptor = createImageUploadInterceptor();
