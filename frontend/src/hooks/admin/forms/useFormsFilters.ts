import { UseFiltersOptions, useFilters } from '@/hooks/filters/useFilters';
import { FormsFiltersDto } from '@lib/api/services/types/forms.types';

const DEFAULT_FILTERS: FormsFiltersDto = {
  skip: 0,
  take: 10,
  search: '',
  is_read: false,
  is_answered: false,
};

/**
 * Хук для управления фильтрами форм с дебонсом
 * @param options - Дополнительные опции для хука фильтров
 */
export const useFormsFilters = <T extends FormsFiltersDto>(
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