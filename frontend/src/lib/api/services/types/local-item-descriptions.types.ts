import { LocalItemDescription } from "@prisma/client";
import { CreateLocalItemDescriptionDto, LocalItemDescriptionsFiltersDto, UpdateLocalItemDescriptionDto } from '@/../../backend/src/shared-section/local-item-descriptions';
export type { CreateLocalItemDescriptionDto, LocalItemDescriptionsFiltersDto, UpdateLocalItemDescriptionDto, LocalItemDescription };
/**
 * Поля для создания локального описания товара или услуги
 */
export interface CreateLocalItemDescriptionFormData extends CreateLocalItemDescriptionDto {
  file?: File;
}
/**
 * Поля для обновления локального описания товара или услуги
 */
export interface UpdateLocalItemDescriptionFormData extends UpdateLocalItemDescriptionDto {
  file?: File;
}