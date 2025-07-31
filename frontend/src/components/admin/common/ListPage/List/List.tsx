'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Loader } from '../../Loader';
import { Pagination } from './Pagination';
import styles from './List.module.scss';

interface ListProps<T extends { id: string }> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  current_page: number;
  page_size: number;
  total: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  empty_message?: string;
  items_label: string;
  is_small?: boolean;
}

export const List = <T extends { id: string }>({
  items,
  renderItem,
  current_page,
  page_size,
  total,
  onPageChange,
  loading = false,
  empty_message,
  items_label,
  is_small = false,
}: ListProps<T>) => {
  const tListPage = useTranslations('admin.common.list_page');

  if (loading) return <Loader />

  if (items.length === 0) {
    return (
      <div className={styles.list_empty} data-intl-default-key="admin.common.list_page.empty_message">
        <p>{empty_message || tListPage('empty_message')}</p>
      </div>
    );
  }

  const total_pages = Math.ceil(total / page_size);

  return (
    <div className={styles.list}>
      {total_pages > 1 && (
        <Pagination
          current_page={current_page}
          total_pages={total_pages}
          onPageChange={onPageChange}
          total={total}
          items_label={items_label}
        />
      )}
      <div className={styles.list_content}>
        <div className={is_small ? styles.list_grid_small : styles.list_grid}>
          {items.map(renderItem)}
        </div>
      </div>

      {total_pages > 1 && (
        <Pagination
          current_page={current_page}
          total_pages={total_pages}
          onPageChange={onPageChange}
          total={total}
          items_label={items_label}
        />
      )}
    </div>
  );
};