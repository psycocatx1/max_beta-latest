import { LocalItemDescription, LocalItemDescriptionType } from "@prisma/client";
import { CreateLocalItemDescriptionDto, LocalItemDescriptionsFiltersDto, UpdateLocalItemDescriptionDto } from '@/../../backend/src/shared-section/local-item-descriptions';
export type { CreateLocalItemDescriptionDto, LocalItemDescriptionsFiltersDto, UpdateLocalItemDescriptionDto, LocalItemDescription };
export { LocalItemDescriptionType };
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