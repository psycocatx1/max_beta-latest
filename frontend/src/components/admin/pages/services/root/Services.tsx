'use client';

import { useServices, useServicesFilters, CreateServiceFormData } from '@/hooks/admin/services';
import { ServiceFiltersDto, ExtendedService, UpdateServiceFormData } from '@lib/api/services/types/services.types';
import { useState } from 'react';
import { AdminPage } from '@/components/admin/common/AdminPage';
import { Filters, FilterField, List } from '@/components/admin/common/ListPage';
import { ServiceFormModal } from '@/components/admin/common/Modal/Forms';
import { ServiceCard } from './ServiceCard';
import { useCategories } from '@/hooks/admin/categories';
import { flattenCategoriesForSelect } from '@/hooks/admin/categories';
import { useTranslations } from 'next-intl';
import { CategoryType, Service } from '@prisma/client';


interface ServicesPageProps {
  category_id?: string;
}

export const Services = ({ category_id }: ServicesPageProps) => {
  const tServices = useTranslations('admin.services');
  const tFilters = useTranslations('admin.common.list_page.filters');

  const [is_create_modal_open, setIsCreateModalOpen] = useState(false);

  const { filters, updateFilters, resetFilters, setPage, current_page } = useServicesFilters({
    default_filters: { category_id: category_id || '', skip: 0, take: 10 } as ServiceFiltersDto,
  });

  const { data: services, isLoading, refetch } = useServices().useGet(filters);
  const { data: categories } = useCategories().useGet({ skip: 0, take: 300, type: CategoryType.SERVICE });
  const create_service_mutation = useServices().useCreate();

  const flatCategories = categories?.items ? flattenCategoriesForSelect(categories.items) : [];

  const handleCreateService = (data: CreateServiceFormData) => {
    create_service_mutation.mutate(data);
    setIsCreateModalOpen(false);
    refetch();
  };

  const handleFilterChange = (name: string, value: unknown) => {
    updateFilters({ [name]: value } as Partial<ServiceFiltersDto>);
  };

  const renderServiceItem = (service: Service) => (
    <ServiceCard
      key={service.id}
      service={service as ExtendedService}
    />
  );

  return (
    <AdminPage
      title={tServices('title')}
      create_button_text={tServices('create_title')}
      onCreateClick={() => setIsCreateModalOpen(true)}
      is_loading={isLoading}
    >
      <Filters
        filters={filters}
        onUpdateFilters={(filters) => updateFilters(filters as ServiceFiltersDto)}
        onResetFilters={() => resetFilters()}
        is_loading={isLoading}
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
          name="category_id"
          label={tFilters('category_label')}
          placeholder={tFilters('category_placeholder')}
          type="select"
          value={filters.category_id || ''}
          options={flatCategories.map((category) => ({
            value: category.value,
            label: category.label
          })).concat({ value: '', label: tFilters('all_categories') })}
          onChange={handleFilterChange}
        />
      </Filters>

      <List<Service>
        items={services?.items || []}
        total={services?.total || 0}
        loading={isLoading}
        current_page={current_page}
        page_size={filters.take || 10}
        onPageChange={setPage}
        renderItem={renderServiceItem}
        empty_message={tServices('empty_message')}
        items_label={tServices('items_label')}
      />

      <ServiceFormModal
        is_open={is_create_modal_open}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateService as (data: CreateServiceFormData | UpdateServiceFormData) => void}
      />
    </AdminPage>
  );
}; 