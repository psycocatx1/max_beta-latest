import { LocaleFiltersDto } from '@lib/api/services/types/locales.types';
import { useFilters, UseFiltersOptions } from '@/hooks/filters/useFilters';

const DEFAULT_FILTERS: LocaleFiltersDto = {
  search: '',
  skip: 0,
  take: 10,
};

/**
 * Хук для управления фильтрами локализаций с дебонсом
 */
export const useLocalesFilters = (options?: Partial<UseFiltersOptions<LocaleFiltersDto>>) => {
  return useFilters<LocaleFiltersDto>({
    default_filters: options?.default_filters || DEFAULT_FILTERS,
    debounce_settings: {
      fields: ['search'],
      delay: 1000
    },
    permanent_fields: options?.permanent_fields
  });
}; 