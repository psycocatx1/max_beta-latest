import { useFilters, UseFiltersOptions } from '@/hooks/filters/useFilters';
import { UserFiltersDto } from '@lib/api/services/types/users.types';

const DEFAULT_FILTERS: UserFiltersDto = {
  search: '',
  email: '',
  phone_number: '',
  role: undefined,
  is_banned: undefined,
  skip: 0,
  take: 10,
};

/**
 * Хук для управления фильтрами пользователей с дебонсом
 */
export const useUsersFilters = (options?: Partial<UseFiltersOptions<UserFiltersDto>>) => {
  return useFilters<UserFiltersDto>({
    default_filters: options?.default_filters || DEFAULT_FILTERS,
    debounce_settings: {
      fields: ['search', 'email', 'phone'],
      delay: 1000
    },
    permanent_fields: options?.permanent_fields
  });
}; 