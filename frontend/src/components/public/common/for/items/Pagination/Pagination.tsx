import classes from './Pagination.module.scss';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { BaseFilterDto } from '@/lib/api';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

interface PaginationProps {
  current_page: number;
  total_pages: number;
  current_page_size?: number;
  onPageChange: (page: number) => void;
  updateFilters: (filters: BaseFilterDto) => void;
}

const page_sizes = [10, 20, 50, 100, 200, 500, 1000];

export const Pagination = ({
  current_page,
  total_pages,
  current_page_size = 20,
  onPageChange,
  updateFilters
}: PaginationProps) => {
  const t = useTranslations('public.pages.products.list');
  const [is_mobile, setIsMobile] = useState(false);

  // Определяем размер экрана для адаптивного отображения
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 640); // vars.$breakpoint-sm
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handlePrevPage = () => {
    if (current_page > 1) {
      onPageChange(current_page - 1);
    }
  };

  const handleNextPage = () => {
    if (current_page < total_pages) {
      onPageChange(current_page + 1);
    }
  };

  const handleFirstPage = () => {
    if (current_page > 1) {
      onPageChange(1);
    }
  };

  const handleLastPage = () => {
    if (current_page < total_pages) {
      onPageChange(total_pages);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const take = Number(e.target.value);
    if (updateFilters && !isNaN(take)) {
      updateFilters({ take, skip: 0 });
    }
  };

  const handleDirectPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const page = Number(e.target.value);
    if (onPageChange && !isNaN(page) && page >= 1 && page <= total_pages) {
      onPageChange(page);
    }
  };

  // Если только одна страница, показываем только селект размера страницы
  if (total_pages <= 1) {
    return (
      <div className={classes.pagination}>
        <div className={classes.pagination_controls}>
          <div className={classes.pagination_info}>
            {t('single_page')}
          </div>

          <select
            value={current_page_size}
            onChange={handlePageSizeChange}
            className={classes.pagination_select}
          >
            {page_sizes.map((size) => (
              <option key={size} value={size}>
                {t('items_per_page_option', { count: size })}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.pagination}>
      <div className={classes.pagination_controls}>
        {/* Мобильная версия - только кнопки навигации и селект размера */}
        {is_mobile ? (
          <>
            {/* Кнопки навигации */}
            <div className={classes.pagination_navigation}>
              <button
                onClick={handleFirstPage}
                disabled={current_page <= 1}
                className={classes.pagination_button}
                aria-label={t('first_page')}
              >
                <ChevronsLeft />
              </button>

              <button
                onClick={handlePrevPage}
                disabled={current_page <= 1}
                className={classes.pagination_button}
                aria-label={t('previous_page')}
              >
                <ChevronLeft />
              </button>

              {/* Информация о текущей странице */}
              <div className={classes.pagination_info}>
                {t('page_info', { current: current_page, total: total_pages })}
              </div>

              <button
                onClick={handleNextPage}
                disabled={current_page >= total_pages}
                className={classes.pagination_button}
                aria-label={t('next_page')}
              >
                <ChevronRight />
              </button>

              <button
                onClick={handleLastPage}
                disabled={current_page >= total_pages}
                className={classes.pagination_button}
                aria-label={t('last_page')}
              >
                <ChevronsRight />
              </button>
            </div>

            {/* Селект размера страницы */}
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
          </>
        ) : (
          <>
            {/* Десктопная версия - полный функционал */}
            <button
              onClick={handleFirstPage}
              disabled={current_page <= 1}
              className={classes.pagination_button}
              aria-label={t('first_page')}
            >
              <ChevronsLeft />
            </button>

            <button
              onClick={handlePrevPage}
              disabled={current_page <= 1}
              className={classes.pagination_button}
              aria-label={t('previous_page')}
            >
              <ChevronLeft />
            </button>

            {/* Селект страницы */}
            <select
              value={current_page}
              onChange={handleDirectPageChange}
              className={classes.pagination_select}
              aria-label={t('select_page')}
            >
              {Array.from({ length: total_pages }, (_, index) => (
                <option key={index} value={index + 1}>
                  {t('page_number', { number: index + 1 })}
                </option>
              ))}
            </select>

            {/* Информация о страницах */}
            <div className={classes.pagination_info}>
              {t('page_info', { current: current_page, total: total_pages })}
            </div>

            {/* Селект размера страницы */}
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

            {/* Кнопка следующей страницы */}
            <button
              onClick={handleNextPage}
              disabled={current_page >= total_pages}
              className={classes.pagination_button}
              aria-label={t('next_page')}
            >
              <ChevronRight />
            </button>

            <button
              onClick={handleLastPage}
              disabled={current_page >= total_pages}
              className={classes.pagination_button}
              aria-label={t('last_page')}
            >
              <ChevronsRight />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
