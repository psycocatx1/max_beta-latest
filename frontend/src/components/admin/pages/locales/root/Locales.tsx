'use client';

import { useState } from 'react';
import { useLocales, useLocalesFilters } from '@/hooks/admin/locales';
import { CreateLocaleFormData } from '@lib/api/services/types/locales.types';
import { useToast } from '@/hooks/useToast';
import { LocaleFormModal } from '@/components/admin/common/Modal/Forms/LocaleFormModal';
import { AdminPage } from '@/components/admin/common/AdminPage';
import { Filters, FilterField, List } from '@/components/admin/common/ListPage';
import { LocaleCard } from './LocaleCard';
import { useTranslations } from 'next-intl';
import { Locale } from '@prisma/client';

export const Locales = () => {
  const [is_create_modal_open, setIsCreateModalOpen] = useState(false);
  const tLocales = useTranslations('admin.locales');
  const tCommon = useTranslations('common');
  const tFilters = useTranslations('admin.common.list_page.filters');
  const { filters, debounced_filters, current_page, updateFilters, resetFilters, setPage } = useLocalesFilters();
  const { data: result, isLoading: is_loading } = useLocales().useGet(debounced_filters);
  const toast = useToast();
  const create_mutation = useLocales().useCreate();

  const handleCreateSubmit = async (data: CreateLocaleFormData) => {
    const result = await create_mutation.mutateAsync(data);
    setIsCreateModalOpen(false);

    if (result.status === 201) {
      toast.success(tCommon('created_successfully'))
    } else {
      toast.error(tCommon('error_while_creating'))
      console.error(create_mutation.error);
    }
  };

  const handleFilterChange = (name: string, value: unknown) => {
    updateFilters({ [name]: value });
  };

  return (
    <AdminPage
      title={tLocales('title')}
      onCreateClick={() => setIsCreateModalOpen(true)}
      create_button_text={tCommon('create')}
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
      </Filters>

      <List<Locale>
        items={result?.items || []}
        total={result?.total || 0}
        loading={is_loading}
        current_page={current_page}
        page_size={filters.take}
        onPageChange={setPage}
        renderItem={(locale) => <LocaleCard locale={locale} key={locale.id} />}
        empty_message={tLocales('empty_message')}
        items_label={tLocales('items_label')}
      />

      <LocaleFormModal
        is_open={is_create_modal_open}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateSubmit}
        is_loading={create_mutation.isPending}
      />
    </AdminPage>
  );
}; 