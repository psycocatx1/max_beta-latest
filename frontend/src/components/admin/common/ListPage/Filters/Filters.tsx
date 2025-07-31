'use client';

import React, { ReactNode } from 'react';
import styles from './Filters.module.scss';
import { useTranslations } from 'next-intl';
import { BaseFilterDto } from '@lib/api';
import { FilterField } from './FilterField';

export interface FilterFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type: 'text' | 'select' | 'checkbox' | 'number';
  value: string | number | undefined | string[] | boolean;
  onChange: (name: string, value: string | number | undefined | string[] | boolean) => void;
  options?: Array<{ value: string; label: string }>;
  children?: ReactNode;
  default_select?: { value: string, label: string }
}

interface FiltersProps<T extends BaseFilterDto> {
  filters: T;
  onUpdateFilters: (filters: Partial<T>) => void;
  onResetFilters: () => void;
  is_loading: boolean;
  children?: ReactNode;
}


export function Filters<T extends BaseFilterDto>({ filters, onUpdateFilters, onResetFilters, is_loading, children }: FiltersProps<T>) {
  const tFilters = useTranslations('admin.common.list_page.filters');

  const handleFieldChange = (name: string, value: string | number | undefined | string[] | boolean) => {
    onUpdateFilters({
      [name]: value
    } as Partial<T>);
  };

  // Варианты размера страницы
  const pageSizeOptions = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];

  return (
    <div className={styles.filters}>
      <div className={styles.filters_header}>
        <h2 className={styles.filters_title} data-intl-key="admin.common.list_page.filters.title">
          {tFilters('title')}
        </h2>
        <button
          className={styles.filters_reset}
          onClick={onResetFilters}
          disabled={is_loading}
          data-intl-key="admin.common.list_page.filters.reset"
        >
          {tFilters('reset')}
        </button>
      </div>

      <div className={styles.filters_form}>
        {children && (
          <>
            {React.Children.map(children, (child) => {
              if (React.isValidElement<FilterFieldProps>(child)) {
                return React.cloneElement(child, {
                  onChange: handleFieldChange,
                });
              }
              return child;
            })}
          </>
        )}

        <FilterField
          name="take"
          label={tFilters('page_size_label')}
          placeholder={tFilters('page_size_placeholder')}
          type="select"
          value={filters.take?.toString() || '10'}
          onChange={(name, value) => handleFieldChange(name, Number(value))}
          options={pageSizeOptions}
          data-intl-key="admin.common.list_page.filters.page_size_label"
          data-intl-placeholder-key="admin.common.list_page.filters.page_size_placeholder"
        />
      </div>
    </div>
  );
} 