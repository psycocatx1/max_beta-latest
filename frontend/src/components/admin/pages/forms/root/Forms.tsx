'use client';

import { useForms, useFormsFilters } from '@/hooks/admin/forms';
import { AdminPage } from '@/components/admin/common/AdminPage';
import { Filters, FilterField, List } from '@/components/admin/common/ListPage';
import { FormCard } from './FormCard';
import { useTranslations } from 'next-intl';
import { ExtendedForm } from '@lib/api/services/types/forms.types';

interface FormsProps {
  locale_id: string;
}

export const Forms = ({ locale_id }: FormsProps) => {
  const tForms = useTranslations('admin.forms');
  const tFilters = useTranslations('admin.common.list_page.filters');

  const { filters, debounced_filters, current_page, updateFilters, resetFilters, setPage } = useFormsFilters({
    permanent_fields: { locale_id }
  });

  const { data: result, isLoading: is_loading } = useForms().useGet(debounced_filters);

  const handleFilterChange = (name: string, value: unknown) => {
    updateFilters({ [name]: value });
  };

  return (
    <AdminPage
      title={tForms('title')}
      is_loading={is_loading}
    >
      <Filters
        filters={{ ...filters, search: filters.search || '' }}
        onUpdateFilters={updateFilters}
        onResetFilters={resetFilters}
        is_loading={is_loading}
      >
        <FilterField
          name="search"
          label={tFilters('search_label')}
          placeholder={tFilters('search_placeholder')}
          type="text"
          value={filters.search || ''}
          onChange={handleFilterChange}
        />

        <FilterField
          name="is_read"
          label={tForms('filters.is_read')}
          type="select"
          value={filters.is_read?.toString() || ''}
          onChange={handleFilterChange}
          options={[
            { value: '', label: tFilters('all') },
            { value: 'true', label: tForms('filters.read') },
            { value: 'false', label: tForms('filters.unread') }
          ]}
        />

        <FilterField
          name="is_answered"
          label={tForms('filters.is_answered')}
          type="select"
          value={filters.is_answered?.toString() || ''}
          onChange={handleFilterChange}
          options={[
            { value: '', label: tFilters('all') },
            { value: 'true', label: tForms('filters.answered') },
            { value: 'false', label: tForms('filters.not_answered') }
          ]}
        />
      </Filters>

      <List<ExtendedForm>
        items={result?.items || []}
        total={result?.total || 0}
        loading={is_loading}
        current_page={current_page}
        page_size={filters.take || 10}
        onPageChange={setPage}
        renderItem={(form) => <FormCard form={form} key={form.id} />}
        empty_message={tForms('empty_message')}
        items_label={tForms('items_label')}
      />
    </AdminPage>
  );
}; 