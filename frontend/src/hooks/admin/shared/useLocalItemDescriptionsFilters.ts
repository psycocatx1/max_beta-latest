import { UseFiltersOptions, useFilters } from '@/hooks/filters/useFilters';
import { LocalItemDescriptionsFiltersDto } from '@lib/api/services/types';

const DEFAULT_FILTERS: LocalItemDescriptionsFiltersDto = {
  local_product_id: '',
  local_service_id: '',
  product_id: '',
  service_id: '',
  skip: 0,
  take: 10,
};
/**
 * Хук для управления фильтрами локальных описаний товаров и услуг с дебонсом
 * @param options - Дополнительные опции для хука фильтров
 */
export const useLocalItemDescriptionsFilters = <T extends LocalItemDescriptionsFiltersDto>(
  options?: Partial<UseFiltersOptions<T>>
) => {
  return useFilters<T>({
    default_filters: options?.default_filters || (DEFAULT_FILTERS as T),
    debounce_settings: {
      fields: ['search'],
      delay: 1000
    },
    permanent_fields: options?.permanent_fields
  });
}; 