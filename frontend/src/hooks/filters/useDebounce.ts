import { useState, useEffect } from 'react';

/**
 * Хук для дебонса значений
 * @param value - значение для дебонса
 * @param delay - задержка в миллисекундах
 * @returns дебонснутое значение
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}; 