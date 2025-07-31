import { Product } from '@prisma/client';
import { CreateProductDto, ProductFiltersDto, ExtendedProduct, UpdateProductDto } from '@/../../backend/src/products-section/products';
export type { ProductFiltersDto, ExtendedProduct, Product };
/**
 * Поля для создания товара
 */
export interface CreateProductFormData extends CreateProductDto {
  file?: File;
}
/**
 * Поля для обновления товара
 */
export interface UpdateProductFormData extends UpdateProductDto {
  file?: File;
}