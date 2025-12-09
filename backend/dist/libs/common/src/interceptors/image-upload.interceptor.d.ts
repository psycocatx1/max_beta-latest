export interface ImageUploadConfig {
    maxFileSize?: number;
    allowedMimeTypes?: string[];
}
export declare function createImageUploadInterceptor(fieldName?: string, config?: ImageUploadConfig): import("@nestjs/common").Type<import("@nestjs/common").NestInterceptor<any, any>>;
export declare const ImageUploadInterceptor: import("@nestjs/common").Type<import("@nestjs/common").NestInterceptor<any, any>>;
