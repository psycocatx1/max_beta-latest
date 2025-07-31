'use client';

import { useState } from 'react';
import styles from './LocalCategoryCard.module.scss';
import { LocalCategoryFormModal } from '@/components/admin/common/Modal/Forms/LocalCategoryFormModal';
import { useToast } from '@/hooks/useToast/useToast';
import { useLocalCategories } from '@/hooks/admin/categories';
import { CreateLocalCategoryDto, ExtendedLocalCategory, UpdateLocalCategoryDto } from '@/lib/api/services/types/local-categories.types';
import { CategoryType } from '@prisma/client';
import { Card } from '@/components/admin/common/ListPage';
import { OriginalItem } from './OriginalItemCard';
import { formatDate } from '@/lib/intl';
import { useLocale, useTranslations } from 'next-intl';

interface LocalCategoryCardProps {
  type: CategoryType;
  root: 'locale' | 'category'
  item: ExtendedLocalCategory;
}

export const LocalCategoryCard = ({ item, type, root }: LocalCategoryCardProps) => {
  const [is_edit_modal_open, setIsEditModalOpen] = useState(false);
  const update_mutation = useLocalCategories().useUpdate(item.id);
  const delete_mutation = useLocalCategories().useDelete(item.id);
  const toast = useToast();
  const locale = useLocale();
  const tLocalCategories = useTranslations('admin.local_categories');
  const tCommon = useTranslations('common');
  const tFields = useTranslations('admin.common.form.fields');

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdate = async (data: UpdateLocalCategoryDto) => {
    try {
      await update_mutation.mutateAsync(data);
      setIsEditModalOpen(false);
      toast.success(tCommon('updated_successfully'));
    } catch {
      toast.error(tCommon('error_while_updating'));
      console.error(update_mutation.error);
    }
  };

  const handleDelete = async () => {
    if (!confirm(tLocalCategories('confirm_delete'))) {
      return;
    }

    try {
      await delete_mutation.mutateAsync();
      toast.success(tCommon('deleted_successfully'));
    } catch {
      toast.error(tCommon('error_while_deleting'));
      console.error(delete_mutation.error);
    }
  };

  return (
    <div className={styles.local_category_item}>
      <Card
        title={item.name}
        subtitle={item.description || ''}
        onEdit={handleOpenEditModal}
        onDelete={handleDelete}
      >
        <OriginalItem item={item} root={root} type={type} />

        <div className={styles.local_category_item_meta}>
          <span className={styles.local_category_item_date}>
            {tFields('created_date_label')}: {formatDate({ date: item.created, locale })}
          </span>
        </div>
      </Card>

      <LocalCategoryFormModal
        is_open={is_edit_modal_open}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdate as (data: CreateLocalCategoryDto | UpdateLocalCategoryDto) => void}
        initial_data={{
          name: item.name,
          description: item.description,
          locale_id: item.locale_id,
          category_id: item.category_id,
        }}
        is_excluded={item.is_excluded}
        is_loading={update_mutation.isPending}
        is_edit_mode
        type={type}
      />
    </div>
  );
};
