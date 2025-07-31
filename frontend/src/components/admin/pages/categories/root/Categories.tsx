'use client';

import { ExtendedCategory, useCategories, useCategoriesFilters } from '@/hooks/admin/categories';
import { CategoryFormModal } from '@/components/admin/common/Modal';
import { CreateCategoryFormData, UpdateCategoryFormData } from '@lib/api/services/types/categories.types';
import { CategoryType } from '@prisma/client';
import { useState } from 'react';
import { AdminPage } from '@/components/admin/common/AdminPage';
import { Filters, FilterField } from '@/components/admin/common/ListPage';
import { Category } from './Category';
import { useTranslations } from 'next-intl';
import styles from './Categories.module.scss';
import { useToast } from '@/hooks/useToast';

export const Categories = ({ type, parent_id }: { type: CategoryType, parent_id?: string }) => {
  const tCategories = useTranslations('admin.categories');
  const tCommon = useTranslations('common');
  const tFilters = useTranslations('admin.common.list_page.filters');
  const toast = useToast()
  const [is_modal_open, setIsModalOpen] = useState(false);
  const { filters, updateFilters, resetFilters } = useCategoriesFilters({ default_filters: { type: type, parent_id: parent_id, skip: 0, take: 10 } });
  const { data: result, isLoading: is_loading } = useCategories().useGet(filters);
  const create_mutation = useCategories().useCreate();

  const handleCreateCategory = async (data: CreateCategoryFormData) => {
    const result = await create_mutation.mutateAsync({ ...data, type });
    setIsModalOpen(false);

    if (result.status === 201) {
      toast.success(tCommon('created_successfully'));
    } else {
      toast.error(tCommon('error_while_creating'));
      console.error(create_mutation.error)
    }
  };

  const handleFilterChange = (name: string, value: unknown) => {
    updateFilters({ [name]: value });
  };

  return (
    <AdminPage
      title={tCategories(`title_${type.toLowerCase()}`)}
      onCreateClick={() => setIsModalOpen(true)}
      create_button_text={tCommon('create')}
      is_loading={is_loading}
    >
      <div className={styles.categories_container}>
        <Filters
          filters={filters}
          onUpdateFilters={updateFilters}
          onResetFilters={() => {
            resetFilters();
          }}
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
          {/* <FilterField   TODO MAKE IT WORKS
            name="is_excluded"
            label={tFilters('is_excluded_label')}
            placeholder={tFilters('is_excluded_placeholder')}
            type='checkbox'
            value={String(filters.is_excluded)}
            onChange={() => updateFilters({ ...filters, is_excluded: !filters.is_excluded })}
          /> */}
        </Filters>

        {is_loading ? (
          <div className={styles.categories_loader}>
            {tCommon('loading')}
          </div>
        ) : result?.items && result.items.length > 0 ? (
          <div className={styles.categories_list}>
            {result.items.map((category: ExtendedCategory) => (
              <Category
                key={category.id}
                category={category}
                showChildren={true}
              />
            ))}
          </div>
        ) : (
          <div className={styles.categories_empty}>
            {tCategories('empty_message')}
          </div>
        )}
      </div>

      <CategoryFormModal
        type={type}
        is_open={is_modal_open}
        initial_data={{ parent_id, type }}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCategory as (data: CreateCategoryFormData | UpdateCategoryFormData) => void}
        is_loading={create_mutation.isPending}
      />
    </AdminPage>
  );
}; 