import { images_paths } from "./allowed-models.data";
export declare class FilesService {
    private readonly uploadPath;
    constructor();
    private ensureUploadDir;
    saveImage(file: Express.Multer.File, model_name: keyof typeof images_paths): string;
    deleteImage(imagePath: string): void;
    isValidImage(file: Express.Multer.File): boolean;
    isValidSize(file: Express.Multer.File, maxSizeInMB?: number): boolean;
}
