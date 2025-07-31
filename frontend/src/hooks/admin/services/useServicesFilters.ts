import { UseFiltersOptions, useFilters } from '@/hooks/filters/useFilters';
import { ServiceFiltersDto } from '@lib/api/services/types/services.types';

const DEFAULT_FILTERS: ServiceFiltersDto = {
  category_id: '',
  skip: 0,
  take: 10,
};
/**
 * Хук для управления фильтрами услуг с дебонсом
 * @param options - Дополнительные опции для хука фильтров
 */
export const useServicesFilters = <T extends ServiceFiltersDto>(
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