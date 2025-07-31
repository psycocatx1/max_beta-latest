import { useFilters, UseFiltersOptions } from '@/hooks/filters/useFilters';
import { SessionFiltersDto } from '@lib/api/services/types/session.types';

const DEFAULT_FILTERS: SessionFiltersDto = {
  user_id: '',
  is_active: undefined,
  ip_address: '',
  user_agent: '',
  skip: 0,
  take: 10,
};

/**
 * Хук для управления фильтрами сессий с дебонсом
 */
export const useSessionsFilters = (options?: Partial<UseFiltersOptions<SessionFiltersDto>>) => {
  return useFilters<SessionFiltersDto>({
    default_filters: options?.default_filters || DEFAULT_FILTERS,
    debounce_settings: {
      fields: ['ip_address', 'user_agent'],
      delay: 1000
    },
    permanent_fields: options?.permanent_fields
  });
}; 