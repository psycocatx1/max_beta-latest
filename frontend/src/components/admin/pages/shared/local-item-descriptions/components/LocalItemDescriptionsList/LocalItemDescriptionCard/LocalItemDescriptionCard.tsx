'use client';

import { useState } from 'react';
import { CategoryType, LocalItemDescription } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { useLocalItemDescriptions } from '@/hooks/admin/shared';
import { LocalItemDescriptionFormModal } from '@/components/admin/common/Modal/Forms/LocalItemDescriptionFormModal';
import { Card } from '@/components/admin/common/ListPage';
import { Content } from './Content';
import styles from './LocalItemDescriptionCard.module.scss';

interface LocalItemDescriptionCardProps {
  item: LocalItemDescription;
  type: CategoryType;
}

export const LocalItemDescriptionCard = ({ item, type }: LocalItemDescriptionCardProps) => {
  const [is_modal_open, setIsModalOpen] = useState(false);
  const delete_mutation = useLocalItemDescriptions().useDelete(item.id);
  const update_mutation = useLocalItemDescriptions().useUpdate(item.id);
  const tLocalItemDescriptions = useTranslations('admin.local_item_descriptions');

  const handleDelete = () => {
    if (delete_mutation.isPending) return;

    const confirmMessage = tLocalItemDescriptions('confirm_delete');
    if (confirm(confirmMessage)) {
      delete_mutation.mutate();
    }
  };

  const title = item.title || tLocalItemDescriptions('default_title', { type: tLocalItemDescriptions(`content_types.${item.type}`) });
  const subtitle = `${tLocalItemDescriptions(`content_types.${item.type}`)}`;

  return (
    <Card
      title={title}
      bodyClassName={styles.card_body}
      subtitle={subtitle}
      onEdit={() => setIsModalOpen(true)}
      onDelete={handleDelete}
      image={item.type === 'IMAGE' ? item.content : undefined}
      video={item.type === 'VIDEO' ? item.content : undefined}
    >
      <Content item={item} />

      <LocalItemDescriptionFormModal
        is_open={is_modal_open}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => update_mutation.mutate(data)}
        is_loading={update_mutation.isPending}
        initial_data={{
          ...item,
          title: item.title || undefined,
          local_item_id: item.local_product_id || item.local_service_id || ''
        }}
        type={type}
        is_edit
      />
    </Card>
  );
}; 