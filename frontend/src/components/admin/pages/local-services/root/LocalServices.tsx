'use client';

import { useState } from 'react';
import { LocalServiceFormModal } from '@/components/admin/common/Modal/Forms/LocalServiceFormModal';
import { useToast } from '@/hooks/useToast/useToast';
import { AdminPage } from '@/components/admin/common/AdminPage';
import { Filters, FilterField } from '@/components/admin/common/ListPage/Filters';
import { List } from '@/components/admin/common/ListPage/List';
import { LocalServiceCard } from './LocalServiceCard';
import { useLocalServices, useLocalServicesFilters, CreateLocalServiceDto } from '@/hooks/admin/services';
import { useTranslations } from 'next-intl';

interface LocalServicesProps {
  locale_id?: string;
  service_id?: string;
  root: 'locale' | 'service' | 'none'
}

export const LocalServices = ({ locale_id, service_id, root }: LocalServicesProps) => {
  const [is_modal_open, setIsModalOpen] = useState(false);
  const toast = useToast();
  const tLocalServices = useTranslations('admin.local_services');
  const tCommon = useTranslations('common');
  const tFilters = useTranslations('admin.common.list_page.filters');

  const {
    filters,
    current_page,
    updateFilters,
    resetFilters,
    setPage
  } = useLocalServicesFilters({ permanent_fields: { locale_id, service_id } });

  const { data: local_services, isLoading: is_loading } = useLocalServices().useGet(filters);
  const create_mutation = useLocalServices().useCreate();

  // Обработчик создания локализации услуги
  const handleCreateService = async (data: CreateLocalServiceDto) => {
    try {
      await create_mutation.mutateAsync(data);
      setIsModalOpen(false);
      toast.success(tCommon('created_successfully'));
    } catch {
      toast.error(tCommon('error_while_creating'));
      console.error(create_mutation.error);
    }
  };

  // Функция изменения поля фильтра
  const handleFilterChange = (name: string, value: unknown) => {
    updateFilters({ [name]: value });
  };

  return (
    <AdminPage
      title={tLocalServices('info_title')}
      onCreateClick={() => setIsModalOpen(true)}
      create_button_text={tLocalServices('create_title')}
      is_loading={is_loading}
    >
      <Filters
        filters={filters}
        onUpdateFilters={updateFilters}
        onResetFilters={resetFilters}
        is_loading={is_loading}
      >
        <FilterField
          name="name"
          label={tFilters('search_label')}
          placeholder={tFilters('search_placeholder')}
          type="text"
          value={filters.name || ''}
          onChange={handleFilterChange}
        />
        <FilterField
          name="is_discounted"
          label={tFilters('is_discounted_label')}
          placeholder={tFilters('is_discounted_placeholder')}
          type="checkbox"
          value={String(filters.is_discounted || false)}
          onChange={(value) => updateFilters({ is_discounted: value === 'true' })}
        />
        <FilterField
          name="min_price"
          label={tFilters('min_price_label')}
          placeholder={tFilters('min_price_placeholder')}
          type="number"
          value={String(filters.min_price || 0)}
          onChange={(value) => updateFilters({ min_price: Number(value) })}
        />
        <FilterField
          name="max_price"
          label={tFilters('max_price_label')}
          placeholder={tFilters('max_price_placeholder')}
          type="number"
          value={String(filters.max_price || 0)}
          onChange={(value) => updateFilters({ max_price: Number(value) })}
        />
      </Filters>

      <List
        items={local_services?.items || []}
        total={local_services?.total || 0}
        loading={is_loading}
        current_page={current_page}
        page_size={filters.take}
        onPageChange={setPage}
        renderItem={(service) => <LocalServiceCard root={root} service={service} key={service.id} />}
        empty_message={tLocalServices('empty_message')}
        items_label={tLocalServices('items_label')}
        is_small
      />

      <LocalServiceFormModal
        is_open={is_modal_open}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateService}
        is_loading={create_mutation.isPending}
        initial_data={{ locale_id, service_id }}
      />
    </AdminPage>
  );
}; 