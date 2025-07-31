import { UseFiltersOptions, useFilters } from '@/hooks/filters/useFilters';
import { CategoryFiltersDto } from '@lib/api/services/types/categories.types';

const DEFAULT_FILTERS: CategoryFiltersDto = {
  search: '',
  skip: 0,
  take: 10,
};
/**
 * Хук для управления фильтрами категорий с дебонсом
 * @param options - Дополнительные опции для хука фильтров
 */
export const useCategoriesFilters = (options?: Partial<UseFiltersOptions<CategoryFiltersDto>>) => useFilters<CategoryFiltersDto>({
  default_filters: options?.default_filters || DEFAULT_FILTERS,
  debounce_settings: {
    fields: ['search'],
    delay: 1000
  },
  permanent_fields: options?.permanent_fields
});