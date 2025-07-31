import { useState, useMemo } from 'react';
import { useDebounce } from '@/hooks/filters/useDebounce';
import { BaseFilterDto } from '@lib/api';

/**
 * Поддерживаемые поля для дебонса
 */
type DebounceableField = 'search' | 'email' | 'phone' | 'ip_address' | 'user_agent';

/**
 * Настройки для дебонса полей
 */
export interface DebounceSettings {
  fields: DebounceableField[];
  delay?: number;
}

/**
 * Постоянные поля, которые всегда должны быть в фильтрах (например, product_id)
 */
export interface PermanentFields {
  [key: string]: unknown;
}

/**
 * Type guard для проверки наличия поля в объекте
 */
function hasField<T extends object, K extends string>(
  obj: T,
  field: K
): obj is T & Record<K, unknown> {
  return field in obj;
}

/**
 * Безопасное получение строкового значения поля
 */
function getStringValue<T extends object>(obj: T, field: string): string {
  if (hasField(obj, field)) {
    const value = obj[field];
    return typeof value === 'string' ? value : '';
  }
  return '';
}
/**
 * Параметры для хука фильтров
 */
export interface UseFiltersOptions<T extends BaseFilterDto> {
  default_filters: T;
  debounce_settings?: DebounceSettings;
  permanent_fields?: PermanentFields;
}

/**
 * Универсальный хук для управления фильтрами с дебонсом
 */
export function useFilters<T extends BaseFilterDto>({
  default_filters,
  debounce_settings = { fields: [], delay: 1000 },
  permanent_fields = {}
}: UseFiltersOptions<T>) {
  // Объединяем дефолтные фильтры с постоянными полями
  const initial_filters = {
    ...default_filters,
    ...permanent_fields
  } as T;

  // Состояние фильтров
  const [filters, setFilters] = useState<T>(initial_filters);

  // Извлекаем значения для дебонса на верхнем уровне
  const searchValue = getStringValue(filters, 'search');
  const emailValue = getStringValue(filters, 'email');
  const phoneValue = getStringValue(filters, 'phone');

  // Всегда вызываем useDebounce для соблюдения правил хуков
  const searchDebounced = useDebounce(searchValue, debounce_settings.delay || 1000);
  const emailDebounced = useDebounce(emailValue, debounce_settings.delay || 1000);
  const phoneDebounced = useDebounce(phoneValue, debounce_settings.delay || 1000);

  // Выбираем дебонснутые или обычные значения в зависимости от настроек
  const debouncedSearch = debounce_settings.fields.includes('search') ? searchDebounced : searchValue;
  const debouncedEmail = debounce_settings.fields.includes('email') ? emailDebounced : emailValue;
  const debouncedPhone = debounce_settings.fields.includes('phone') ? phoneDebounced : phoneValue;

  // Создаем итоговые фильтры с дебонснутыми значениями
  const debounced_filters = useMemo(() => {
    const result = { ...filters, ...permanent_fields };

    // Безопасно устанавливаем дебонснутые значения
    if (debounce_settings.fields.includes('search') && hasField(result, 'search')) {
      result.search = debouncedSearch;
    }
    if (debounce_settings.fields.includes('email') && hasField(result, 'email')) {
      result.email = debouncedEmail;
    }
    if (debounce_settings.fields.includes('phone') && hasField(result, 'phone')) {
      result.phone = debouncedPhone;
    }

    return result;
  }, [filters, debouncedSearch, debouncedEmail, debouncedPhone, permanent_fields, debounce_settings.fields]);

  // Функция обновления фильтров
  const updateFilters = (new_filters: Partial<T>) => {
    setFilters(prev => {
      // Если изменяется размер страницы, нужно пересчитать skip
      if (new_filters.take !== undefined && new_filters.take !== prev.take) {
        const currentPage = Math.floor((prev.skip || 0) / (prev.take || 10)) + 1;
        new_filters.skip = (currentPage - 1) * new_filters.take;
      } else if (new_filters.skip === undefined && (Object.keys(new_filters) as Array<keyof T>).some(key =>
        key !== 'take' && key !== 'skip' && key in prev &&
        new_filters[key] !== prev[key])) {
        // При изменении других фильтров сбрасываем на первую страницу
        new_filters.skip = 0;
      }

      return {
        ...prev,
        ...new_filters,
        ...permanent_fields,
      };
    });
  };

  // Функция сброса фильтров
  const resetFilters = () => {
    setFilters({
      ...default_filters,
      ...permanent_fields,
    } as T);
  };

  // Функция изменения страницы
  const setPage = (page: number) => {
    const newSkip = (page - 1) * (filters.take || 10);

    setFilters(prev => ({
      ...prev,
      skip: newSkip,
    }));
  };
  // Вычисляем текущую страницу
  const current_page = Math.floor((filters.skip || 0) / (filters.take || 10)) + 1;

  return {
    filters,
    debounced_filters,
    current_page,
    updateFilters,
    resetFilters,
    setPage,
  };
} 