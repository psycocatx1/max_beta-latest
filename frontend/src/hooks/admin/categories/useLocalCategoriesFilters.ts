import { useFilters } from '@/hooks/filters/useFilters';
import { LocalCategoryFiltersDto } from '@lib/api/services/types/local-categories.types';

const DEFAULT_FILTERS: LocalCategoryFiltersDto = {
  search: '',
  locale_id: undefined,
  category_id: undefined,
  skip: 0,
  take: 10,
};
/**
 * Хук для управления фильтрами локализаций категорий с дебонсом
 * @param params - Параметры для фильтров (category_id, locale_id)
 */
export const useLocalCategoriesFilters = (
  params: { category_id?: string; locale_id?: string }
) => {
  return useFilters<LocalCategoryFiltersDto>({
    default_filters: DEFAULT_FILTERS,
    debounce_settings: {
      fields: ['search'],
      delay: 1000
    },
    permanent_fields: params
  });
}; 