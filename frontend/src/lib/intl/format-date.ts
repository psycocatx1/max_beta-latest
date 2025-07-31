/**
 * Форматирует дату в удобочитаемый формат
 * @param date - Дата для форматирования
 * @returns Форматированная дата в виде строки
 */

interface FormatDateProps {
  date?: Date | string | null;
  locale?: string;
}

export const formatDate = ({ date, locale = 'ru' }: FormatDateProps): string => {
  if (!date) return 'Не указано';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj.toLocaleDateString(`${locale}-${locale.toUpperCase()}`, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}; 