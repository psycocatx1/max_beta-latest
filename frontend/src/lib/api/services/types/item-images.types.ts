import { ItemImage } from "@prisma/client";
import { CreateItemImageDto, ItemImagesFiltersDto, UpdateItemImageDto } from '@/../../backend/src/shared-section/item-images';
export type { CreateItemImageDto, ItemImagesFiltersDto, UpdateItemImageDto, ItemImage };
/**
 * Поля для создания изображения товара или услуги
 */
export interface CreateItemImageFormData extends CreateItemImageDto {
  file?: File;
}
/**
 * Поля для обновления изображения товара или услуги
 */
export interface UpdateItemImageFormData extends UpdateItemImageDto {
  file?: File;
}