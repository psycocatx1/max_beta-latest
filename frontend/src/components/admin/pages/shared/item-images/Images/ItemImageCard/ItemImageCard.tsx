'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/lib/intl/format-date';
import { Card } from '@/components/admin/common/ListPage';
import { ItemImage, UpdateItemImageFormData, useItemImages } from '@/hooks/admin/shared';
import { ItemImageFormModal } from '@/components/admin/common/Modal';
import { getImageUrl } from '@lib/api';
import styles from './ItemImageCard.module.scss';
import { CategoryType } from '@prisma/client';
import { useToast } from '@/hooks/useToast';

interface ItemImageCardProps {
  item: ItemImage;
  type: CategoryType;
}

export const ItemImageCard = ({ item, type }: ItemImageCardProps) => {
  const [is_modal_open, setIsModalOpen] = useState(false);
  const delete_mutation = useItemImages().useDelete(item.id);
  const update_mutation = useItemImages().useUpdate(item.id);
  const tItemImages = useTranslations('admin.item_images');
  const tCommon = useTranslations('common');
  const tFields = useTranslations('admin.common.form.fields');
  const locale = useLocale();
  const toast = useToast();

  const handleSubmit = async (data: UpdateItemImageFormData) => {
    try {
      await update_mutation.mutateAsync(data);
      toast.success(tCommon('updated_successfully'));
      setIsModalOpen(false);
    } catch {
      toast.error(tCommon('error_while_updating'));
      console.error(update_mutation.error);
    }
  };

  const handleDelete = () => {
    if (delete_mutation.isPending) return;
    const confirmMessage = tItemImages('confirm_delete');
    if (confirm(confirmMessage)) {
      delete_mutation.mutate();
    }
  };

  const title = tItemImages('card_title');
  const subtitle = tItemImages(type === CategoryType.PRODUCT ? 'product_image' : 'service_image');

  return (
    <>
      <Card
        title={title}
        subtitle={subtitle}
        image={getImageUrl(item.image)}
        onEdit={() => setIsModalOpen(true)}
        onDelete={handleDelete}
      >
        <div className={styles.card_content}>
          <div className={styles.card_meta}>
            <span className={styles.card_date}>
              {tFields('created_date')}: {formatDate({ date: item.created, locale: locale })}
            </span>
            {item.updated !== item.created && (
              <span className={styles.card_date}>
                {tFields('updated_date')}: {formatDate({ date: item.updated, locale: locale })}
              </span>
            )}
          </div>
        </div>
      </Card>

      <ItemImageFormModal
        is_open={is_modal_open}
        onClose={() => setIsModalOpen(false)}
        type={type}
        onSubmit={handleSubmit}
        item_id={item.product_id || item.service_id || ''}
        initial_data={{ ...item, item_id: (item.product_id || item.service_id) || undefined }}
      />
    </>
  );
}; 