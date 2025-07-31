'use client';

import { useState } from 'react';

import { LocalCategoryFormModal } from '@/components/admin/common/Modal/Forms/LocalCategoryFormModal';
import { useToast } from '@/hooks/useToast/useToast';
import { AdminPage } from '@/components/admin/common/AdminPage';
import { Filters, FilterField } from '@/components/admin/common/ListPage/Filters';
import { List } from '@/components/admin/common/ListPage/List';
import { LocalCategoryCard } from './LocalCategoryCard';
import { useLocalCategories, useLocalCategoriesFilters } from '@/hooks/admin/categories';
import { CreateLocalCategoryDto, UpdateLocalCategoryDto } from '@/lib/api/services/types/local-categories.types';
import { useTranslations } from 'next-intl';
import { CategoryType } from '@prisma/client';

interface LocalCategoriesProps {
  locale_id?: string;
  category_id?: string;
  type: CategoryType;
  root: 'locale' | 'category'
}

export const LocalCategories = ({ locale_id, type, category_id, root }: LocalCategoriesProps) => {
  const [is_modal_open, setIsModalOpen] = useState(false);
  const toast = useToast();
  const tLocalCategories = useTranslations('admin.local_categories');
  const tCommon = useTranslations('common');
  const tFilters = useTranslations('admin.common.list_page.filters');

  // Используем общий хук для управления фильтрами локализаций категорий
  const {
    filters,
    debounced_filters,
    current_page,
    updateFilters,
    resetFilters,
    setPage
  } = useLocalCategoriesFilters({ category_id, locale_id });

  const { data: local_categories, isLoading: is_loading } = useLocalCategories().useGet(debounced_filters);
  // Хук для создания локализации категории с общим хуком
  const create_mutation = useLocalCategories().useCreate();

  // Обработчик создания локализации категории
  const handleCreateCategory = async (data: CreateLocalCategoryDto) => {
    try {
      await create_mutation.mutateAsync(data);
      setIsModalOpen(false);
      toast.success(tCommon('created_successfully'));
    } catch (error: unknown) {
      console.error('Category translation creation error:', error);
      toast.error(tCommon('error_while_creating'));
    }
  };


  // Функция изменения поля фильтра
  const handleFilterChange = (name: string, value: unknown) => {
    updateFilters({ [name]: value });
  };

  return (
    <AdminPage
      title={tLocalCategories('info_title')}
      onCreateClick={() => setIsModalOpen(true)}
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

      <List
        items={local_categories?.items || []}
        total={local_categories?.total || 0}
        loading={is_loading}
        current_page={current_page}
        page_size={filters.take}
        onPageChange={setPage}
        renderItem={(item) => <LocalCategoryCard root={root} item={item} type={type} key={item.id} />}
        empty_message={tLocalCategories('empty_message')}
        items_label={tLocalCategories('items_label')}
        is_small
      />

      <LocalCategoryFormModal
        is_open={is_modal_open}
        type={type}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCategory as (data: CreateLocalCategoryDto | UpdateLocalCategoryDto) => void}
        is_loading={create_mutation.isPending}
        initial_data={{ locale_id, category_id }}
      />
    </AdminPage>
  );
};