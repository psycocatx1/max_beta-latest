'use client';

import { ReactNode, MouseEvent } from 'react';
import styles from './Card.module.scss';
import { Edit, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Image, Iframe } from '@/components/common';

interface CardProps {
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  actions?: ReactNode;
  children?: ReactNode;
  bodyClassName?: string;
  onEdit?: (e: MouseEvent) => void;
  onDelete?: (e: MouseEvent) => void;
  onView?: (e: MouseEvent) => void;
}

export const Card = ({
  title,
  subtitle,
  image,
  imageAlt,
  video,
  actions,
  children,
  bodyClassName,
  onEdit,
  onDelete,
  onView
}: CardProps) => {
  const tCommon = useTranslations('common');

  const handleView = (e: MouseEvent) => {
    e.stopPropagation();
    onView?.(e);
  }

  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
    onEdit?.(e);
  }

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    onDelete?.(e);
  }

  return (
    <div className={styles.card} onClick={handleView}>
      {image && (
        <div className={styles.card_image_container}>
          <Image
            src={image}
            alt={imageAlt || ''}
            width={120}
            height={80}
            className={styles.card_image}
          />
        </div>
      )}

      {video && (
        <div className={styles.card_image_container}>
          <Iframe url={video} title={video} className={styles.card_iframe} />
        </div>
      )}

      <div className={styles.card_content}>
        <div className={styles.card_header}>
          <div className={styles.card_title_container}>
            <h3 className={styles.card_title}>{title}</h3>
            {subtitle && <p className={styles.card_subtitle}>{subtitle}</p>}
          </div>

          <div className={styles.card_actions}>
            {actions || (
              <>
                {onEdit && (
                  <button
                    className={`${styles.card_action_button} ${styles.card_action_edit}`}
                    onClick={handleEdit}
                    aria-label={tCommon('edit')}
                    data-intl-default-key="common.edit"
                  >
                    <Edit size={16} />
                  </button>
                )}

                {onDelete && (
                  <button
                    className={`${styles.card_action_button} ${styles.card_action_delete}`}
                    onClick={handleDelete}
                    aria-label={tCommon('delete')}
                    data-intl-default-key="common.delete"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {children && <div className={`${styles.card_body} ${bodyClassName}`}>{children}</div>}
      </div>
    </div>
  );
}; 