'use client';

import { useState } from 'react';
import { CategoryType, LocalItemDescription } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit, Trash2, GripVertical } from 'lucide-react';
import Image from 'next/image';
import { useLocalItemDescriptions } from '@/hooks/admin/shared';
import { useToast } from '@/hooks/useToast/useToast';
import { LocalItemDescriptionFormModal } from '@/components/admin/common/Modal/Forms/LocalItemDescriptionFormModal';
import { UpdateLocalItemDescriptionFormData } from '@lib/api/services/types/local-item-descriptions.types';
import styles from './DraggableDescriptionCard.module.scss';
import { getImageUrl } from '@/lib/api';

interface DraggableDescriptionCardProps {
  item: LocalItemDescription;
  type: CategoryType;
  is_dragging?: boolean;
  is_disabled?: boolean;
}

export const DraggableDescriptionCard = ({
  item,
  type,
  is_dragging = false,
  is_disabled = false
}: DraggableDescriptionCardProps) => {
  const [is_modal_open, setIsModalOpen] = useState(false);

  const toast = useToast();
  const tLocalItemDescriptions = useTranslations('admin.local_item_descriptions');
  const tCommon = useTranslations('common');

  const delete_mutation = useLocalItemDescriptions().useDelete(item.id);
  const update_mutation = useLocalItemDescriptions().useUpdate(item.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: is_disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const handleDelete = () => {
    if (delete_mutation.isPending) return;

    const confirmMessage = tLocalItemDescriptions('confirm_delete');
    if (confirm(confirmMessage)) {
      delete_mutation.mutate();
    }
  };

  const handleUpdate = async (data: UpdateLocalItemDescriptionFormData) => {
    try {
      await update_mutation.mutateAsync(data);
      setIsModalOpen(false);
      toast.success(tCommon('updated_successfully'));
    } catch {
      toast.error(tCommon('error_while_updating'));
    }
  };

  const title = item.title || tLocalItemDescriptions('default_title', {
    type: tLocalItemDescriptions(`content_types.${item.type}`)
  });
  const subtitle = `${tLocalItemDescriptions(`content_types.${item.type}`)}`;

  const card_classes = [
    styles.draggable_card,
    is_dragging && styles.dragging,
    is_disabled && styles.disabled,
  ].filter(Boolean).join(' ');

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={card_classes}
        {...attributes}
      >
        <div
          className={styles.card_drag_handle}
          {...listeners}
        >
          <GripVertical size={20} />
        </div>

        <div className={styles.card_header}>
          <h3 className={styles.card_title}>{title}</h3>
          <div className={styles.card_subtitle}>{subtitle}</div>
          <div className={styles.card_order}>#{item.order}</div>
        </div>

        {/* Content */}
        <div className={styles.card_content}>
          {item.type === 'IMAGE' && item.content && (
            <div className={styles.card_image_container}>
              <Image
                src={getImageUrl(item.content) || ''}
                alt={title}
                width={200}
                height={120}
                style={{ objectFit: 'cover' }}
                className={styles.card_image}
              />
            </div>
          )}

          {item.type === 'TEXT' && (
            <div className={styles.card_text}>
              {item.content.length > 300
                ? `${item.content.substring(0, 300)}...`
                : item.content}
            </div>
          )}

          {item.type === 'VIDEO' && (
            <div className={styles.card_video}>
              <div className={styles.card_video_placeholder}>
                📹 {tLocalItemDescriptions('content_types.VIDEO')}
              </div>
            </div>
          )}

          {item.type === 'LINK' && (
            <div className={styles.card_link}>
              <a
                href={item.content}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card_link_preview}
              >
                🔗 {item.content.length > 300
                  ? `${item.content.substring(0, 300)}...`
                  : item.content}
              </a>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.card_actions}>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.card_actions_edit_button}
            disabled={is_disabled}
            title={tCommon('edit')}
          >
            <Edit size={14} />
          </button>
          <button
            onClick={handleDelete}
            className={styles.card_actions_delete_button}
            disabled={delete_mutation.isPending || is_disabled}
            title={tCommon('delete')}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <LocalItemDescriptionFormModal
        is_open={is_modal_open}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdate}
        is_loading={update_mutation.isPending}
        initial_data={{
          ...item,
          title: item.title || undefined,
          local_item_id: item.local_product_id || item.local_service_id || ''
        }}
        type={type}
        is_edit
      />
    </>
  );
}; 