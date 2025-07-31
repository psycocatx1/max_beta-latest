import { UseFiltersOptions, useFilters } from '@/hooks/filters/useFilters';
import { LocalServiceFiltersDto } from '@lib/api/services/types/local-services.types';

const DEFAULT_FILTERS: LocalServiceFiltersDto = {
  locale_id: '',
  service_id: '',
  skip: 0,
  take: 10,
};
/**
 * Хук для управления фильтрами локальных услуг с дебонсом
 * @param options - Дополнительные опции для хука фильтров
 */
export const useLocalServicesFilters = <T extends LocalServiceFiltersDto>(
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