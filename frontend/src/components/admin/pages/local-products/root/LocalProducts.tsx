'use client';

import { useState } from 'react';

import { LocalProductFormModal } from '@/components/admin/common/Modal/Forms/LocalProductFormModal';
import { useToast } from '@/hooks/useToast/useToast';
import { AdminPage } from '@/components/admin/common/AdminPage';
import { Filters, FilterField } from '@/components/admin/common/ListPage/Filters';
import { List } from '@/components/admin/common/ListPage/List';
import { LocalProductCard } from './LocalProductCard';
import { useLocalProducts, useLocalProductsFilters } from '@/hooks/admin/products';
import { CreateLocalProductDto } from '@lib/api/services/types/local-products.types';
import { useTranslations } from 'next-intl';

interface LocalProductsProps {
  locale_id?: string;
  product_id?: string;
  root: 'locale' | 'product' | 'none'
}

export const LocalProducts = ({ locale_id, product_id, root }: LocalProductsProps) => {
  const [is_modal_open, setIsModalOpen] = useState(false);
  const toast = useToast();
  const tLocalProducts = useTranslations('admin.local_products');
  const tCommon = useTranslations('common');
  const tFilters = useTranslations('admin.common.list_page.filters');

  const {
    filters,
    current_page,
    updateFilters,
    resetFilters,
    setPage
  } = useLocalProductsFilters({ permanent_fields: { locale_id, product_id } });

  const { data: local_products, isLoading: is_loading } = useLocalProducts().useGet(filters);
  const create_mutation = useLocalProducts().useCreate();

  const handleCreateProduct = async (data: CreateLocalProductDto) => {
    try {
      await create_mutation.mutateAsync(data);
      setIsModalOpen(false);
      toast.success(tCommon('saved_successfully'));
    } catch (error: unknown) {
      console.error('Product translation creation error:', error);
      toast.error(tCommon('error_while_saving'));
    }
  };

  // Функция изменения поля фильтра
  const handleFilterChange = (name: string, value: unknown) => {
    updateFilters({ [name]: value });
  };

  return (
    <AdminPage
      title={tLocalProducts('info_title')}
      onCreateClick={() => setIsModalOpen(true)}
      create_button_text={tLocalProducts('create_title')}
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
          value={String(!!filters.is_discounted)}
          onChange={(value) => updateFilters({ is_discounted: Boolean(value) })}
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
        items={local_products?.items || []}
        total={local_products?.total || 0}
        loading={is_loading}
        current_page={current_page}
        page_size={filters.take}
        onPageChange={setPage}
        renderItem={(product) => <LocalProductCard root={root} product={product} key={product.id} />}
        empty_message={tLocalProducts('empty_message')}
        items_label={tLocalProducts('items_label')}
        is_small
      />

      <LocalProductFormModal
        is_open={is_modal_open}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProduct}
        is_loading={create_mutation.isPending}
        initial_data={{ locale_id, product_id }}
      />
    </AdminPage>
  );
}; 