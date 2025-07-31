'use client';

import { useState } from 'react';
import { useCategories, CategoryType, UpdateCategoryFormData } from '@/hooks/admin/categories';
import { InfoDisplay } from '@/components/admin/common/InfoDisplay';
import { formatDate } from '@/lib/intl/format-date';
import { useLocale, useTranslations } from 'next-intl';
import { useToast } from '@/hooks/useToast';
import { CategoryFormModal, CategoryFormData } from '@/components/admin/common/Modal/Forms/CategoryFormModal';
import { getImageUrl } from '@/lib/api';

export const Info = ({ category_id, type }: { category_id: string, type: CategoryType }) => {
  const { data: category, isLoading: is_loading } = useCategories().useFind(category_id);
  const [is_editing, setIsEditing] = useState(false);
  const update_mutation = useCategories().useUpdate(category_id);
  const toast = useToast();
  const locale = useLocale();
  const tCategories = useTranslations('admin.categories');
  const tCommon = useTranslations('common');
  const tFields = useTranslations('admin.common.form.fields');

  const handleSubmitForm = async (data: UpdateCategoryFormData) => {
    const result = await update_mutation.mutateAsync(data);
    setIsEditing(false);
    if (result.status === 200) {
      toast.success(tCommon('updated_successfully'));
    } else {
      toast.error(tCommon('error_while_updating'));
      console.error(update_mutation.error);
    }
  };

  const fields = [
    { label: tFields('name_label'), value: category?.name || '' },
    { label: tFields('description_label'), value: category?.description || '' },
    {
      label: tFields('created_date_label'),
      value: formatDate({ date: category.created, locale })
    },
    {
      label: tFields('updated_date_label'),
      value: formatDate({ date: category.updated, locale })
    },
  ];

  const initial_data: CategoryFormData = {
    ...category,
    image_type: 'url' as const,
    url: getImageUrl(category?.image) || ''
  };
  return (
    <InfoDisplay
      title={tCategories('info_title', { name: category?.name || '' })}
      image={category?.image}
      image_alt={category?.name}
      fields={fields}
      is_loading={is_loading}
      is_editing={is_editing}
      onEdit={() => setIsEditing(true)}
      is_excluded={category?.is_excluded}
    >
      <CategoryFormModal
        type={type}
        is_open={is_editing}
        onClose={() => setIsEditing(false)}
        onUpdate={handleSubmitForm}
        is_loading={is_loading}
        initial_data={initial_data}
        is_edit_mode
      />
    </InfoDisplay>
  );
}; 