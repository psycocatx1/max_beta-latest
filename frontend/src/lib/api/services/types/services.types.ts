import { Service } from '@prisma/client';
import { CreateServiceDto, ServiceFiltersDto, UpdateServiceDto } from '@/../../backend/src/services-section/services';
import { ExtendedService } from '@/../../backend/src/services-section/services/example.data';
export type { Service, ServiceFiltersDto, ExtendedService };

/**
 * Поля для создания услуги
 */
export interface CreateServiceFormData extends CreateServiceDto {
  file?: File;
}
/**
 * Поля для обновления услуги
 */
export interface UpdateServiceFormData extends UpdateServiceDto {
  file?: File;
}