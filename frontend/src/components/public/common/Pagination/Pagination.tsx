import classes from './Pagination.module.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BaseFilterDto } from '@/lib/api';
import { useTranslations } from 'next-intl';

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

  return (
    <div className={classes.pagination}>
      <div className={classes.pagination_controls}>
        {total_pages > 1 && (
          <>
            <button
              onClick={handlePrevPage}
              disabled={current_page <= 1}
              className={classes.pagination_button}
            >
              <ChevronLeft />
            </button>

            <select
              value={current_page}
              onChange={handleDirectPageChange}
              className={classes.pagination_select}
            >
              {Array.from({ length: total_pages }, (_, index) => (
                <option key={index} value={index + 1}>
                  {t('page_number', { number: index + 1 })}
                </option>
              ))}
            </select>
          </>
        )}

        <div className={classes.pagination_info}>
          {total_pages > 1
            ? t('page_info', { current: current_page, total: total_pages })
            : t('single_page')
          }
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

        {total_pages > 1 && (
          <button
            onClick={handleNextPage}
            disabled={current_page >= total_pages}
            className={classes.pagination_button}
          >
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};
