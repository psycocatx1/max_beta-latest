import { UseFiltersOptions, useFilters } from '@/hooks/filters/useFilters';
import { LocalProductFiltersDto } from '@lib/api/services/types/local-products.types';

const DEFAULT_FILTERS: LocalProductFiltersDto = {
  locale_id: '',
  product_id: '',
  skip: 0,
  take: 10,
};
/**
 * Хук для управления фильтрами локальных товаров с дебонсом
 * @param options - Дополнительные опции для хука фильтров
 */
export const useLocalProductsFilters = <T extends LocalProductFiltersDto>(
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