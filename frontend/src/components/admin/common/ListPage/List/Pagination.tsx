'use client';

import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.scss';
import { getPageNumbers } from './page-numbers.util';

interface PaginationProps {
  current_page: number;
  total_pages: number;
  onPageChange: (page: number) => void;
  total: number;
  items_label: string;
}

export const Pagination = ({
  current_page,
  total_pages,
  onPageChange,
  total,
  items_label,
}: PaginationProps) => {
  const tListPagePagination = useTranslations('admin.common.list_page.pagination');

  const page_numbers = getPageNumbers(current_page, total_pages);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= total_pages) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination_info}>
        <span data-intl-default-key="admin.common.list_page.pagination.total">{tListPagePagination('total', { total })} </span>
        <span>{items_label}</span>
      </div>

      <div className={styles.pagination_controls}>
        {current_page > 1 && (
          <button
            className={styles.page_button}
            onClick={() => handlePageChange(current_page - 1)}
            aria-label={tListPagePagination('previous')}
            data-intl-default-key="admin.common.list_page.pagination.previous"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {page_numbers.map((page_number, index) => (
          page_number === -1 ? (
            <span key={`ellipsis-${index}`} className={styles.page_ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={page_number}
              className={`${styles.page_button} ${page_number === current_page ? styles.page_button_active : ''}`}
              onClick={() => handlePageChange(page_number)}
              aria-label={tListPagePagination('page', { page: page_number })}
            >
              {page_number}
            </button>
          )
        ))}

        {current_page < total_pages && (
          <button
            className={styles.page_button}
            onClick={() => handlePageChange(current_page + 1)}
            aria-label={tListPagePagination('next')}
            data-intl-default-key="admin.common.list_page.pagination.next"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};