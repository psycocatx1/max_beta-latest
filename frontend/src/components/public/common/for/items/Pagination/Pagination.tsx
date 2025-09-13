import React, { useEffect, useState } from 'react';
import classes from './Pagination.module.scss';
import { BaseFilterDto } from '@/lib/api';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  current_page: number;
  total_pages: number;
  current_page_size?: number;
  onPageChange: (page: number) => void;
  updateFilters: (filters: BaseFilterDto) => void;
}

const page_sizes = [10, 20, 50, 100, 200, 500, 1000];

// Генерируем массив страниц для отображения
const generatePageNumbers = (current_page: number, total_pages: number, isMobile: boolean) => {
  const pages = [];

  if (isMobile) {
    // Мобильная версия - максимум 5 элементов
    if (total_pages <= 5) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i);
      }
    } else {
      // Упрощенная логика для мобильных
      if (current_page <= 3) {
        // Ближе к началу: 1, 2, 3, 4, ..., total_pages
        pages.push(1, 2, 3, 4, '...', total_pages);
      } else if (current_page >= total_pages - 2) {
        // Ближе к концу: 1, ..., total_pages-3, total_pages-2, total_pages-1, total_pages
        pages.push(1, '...', total_pages - 3, total_pages - 2, total_pages - 1, total_pages);
      } else {
        // В середине: 1, ..., current-1, current, current+1, ..., total_pages
        pages.push(1, '...', current_page - 1, current_page, current_page + 1, '...', total_pages);
      }
    }
  } else {
    // Десктопная версия - текущая логика
    if (total_pages <= 7) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i);
      }
    } else {
      // Умная логика отображения страниц
      if (current_page <= 4) {
        // Ближе к началу: 1, 2, 3, 4, 5, ..., total_pages
        pages.push(1, 2, 3, 4, 5, '...', total_pages);
      } else if (current_page >= total_pages - 3) {
        // Ближе к концу: 1, ..., total_pages-4, total_pages-3, total_pages-2, total_pages-1, total_pages
        pages.push(1, '...', total_pages - 4, total_pages - 3, total_pages - 2, total_pages - 1, total_pages);
      } else {
        // В середине: 1, ..., current-1, current, current+1, ..., total_pages
        pages.push(1, '...', current_page - 1, current_page, current_page + 1, '...', total_pages);
      }
    }
  }

  return pages;
};

export const Pagination = ({
  current_page,
  total_pages,
  current_page_size = 20,
  onPageChange,
  updateFilters
}: PaginationProps) => {
  const t = useTranslations('public.pages.products.list');
  const [isMobile, setIsMobile] = useState(false);

  // Определяем мобильное устройство по ширине экрана
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= total_pages && page !== current_page) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const take = Number(e.target.value);
    if (updateFilters && !isNaN(take)) {
      updateFilters({ take, skip: 0 });
    }
  };

  const pageNumbers = generatePageNumbers(current_page, total_pages, isMobile);

  return (
    <div className={classes.pagination}>
      {/* Умная нумерация страниц */}
      <div className={classes.pagination_pages}>
        {isMobile && (
          <>
            {/* Кнопка "Предыдущая" для мобильных */}
            <button
              onClick={() => handlePageChange(current_page - 1)}
              disabled={current_page <= 1}
              className={`${classes.pagination_page} ${classes.pagination_page_nav}`}
              aria-label={t('previous_page')}
            >
              <ChevronLeft size={16} />
            </button>
          </>
        )}

        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            disabled={page === current_page || page === '...'}
            className={`${classes.pagination_page} ${page === current_page ? classes.pagination_page_active : ''
              } ${page === '...' ? classes.pagination_page_disabled : ''}`}
            aria-label={typeof page === 'number' ? t('page_number', { number: page }) : undefined}
          >
            {page}
          </button>
        ))}

        {isMobile && (
          <>
            {/* Кнопка "Следующая" для мобильных */}
            <button
              onClick={() => handlePageChange(current_page + 1)}
              disabled={current_page >= total_pages}
              className={`${classes.pagination_page} ${classes.pagination_page_nav}`}
              aria-label={t('next_page')}
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Выбор размера страницы */}
      <select
        value={current_page_size}
        onChange={handlePageSizeChange}
        className={classes.pagination_select}
        aria-label={t('items_per_page')}
      >
        {page_sizes.map((size) => (
          <option key={size} value={size}>
            {t('items_per_page_option', { count: size })}
          </option>
        ))}
      </select>
      <ChevronDown className={classes.pagination_select_appearance} size={20} />
    </div>
  );
};
