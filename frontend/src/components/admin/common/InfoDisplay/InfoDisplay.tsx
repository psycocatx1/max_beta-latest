'use client';

import { ReactNode } from 'react';
import styles from './InfoDisplay.module.scss';
import { Edit } from 'lucide-react';
import { Loader } from '@/components/admin/common/Loader';
import { useTranslations } from 'next-intl';
import { Image } from '@/components/common/Image';

export interface InfoDisplayField {
  label: string;
  value: string | number | ReactNode;
}

export interface InfoDisplayProps {
  title: string;
  image?: string;
  image_alt?: string;
  locale_image?: string;
  locale_image_alt?: string;
  fields: InfoDisplayField[];
  is_loading?: boolean;
  is_editing?: boolean;
  onEdit?: () => void;
  children?: ReactNode;
  is_excluded?: boolean;
}

export const InfoDisplay = ({
  title,
  image,
  image_alt,
  locale_image,
  locale_image_alt,
  fields,
  is_loading = false,
  is_editing = false,
  onEdit,
  children,
  is_excluded = false,
}: InfoDisplayProps) => {
  const tCommon = useTranslations('common');

  if (is_loading) return <Loader />;

  return (
    <div className={styles.info}>
      <div className={styles.info_header}>
        <h2 className={styles.info_title}>
          {title}
        </h2>
        <div className={styles.info_actions}>
          {onEdit && !is_editing && (
            <button
              className={styles.info_edit_button}
              onClick={onEdit}
              disabled={is_loading}
              data-intl-key="common.edit,common.restore"
            >
              <Edit size={16} />
              <span>{tCommon(is_excluded ? 'restore' : 'edit')}</span>
            </button>
          )}
        </div>
      </div>

      <div className={styles.info_content}>
        {/* Изображения */}
        {(image || locale_image) && (
          <div className={styles.info_images}>
            {image && (
              <div className={styles.info_image}>
                <Image
                  src={image}
                  alt={image_alt || ''}
                  width={200}
                  height={200}
                />
              </div>
            )}
            {locale_image && (
              <div className={styles.info_locale_image}>
                <Image
                  src={locale_image}
                  alt={locale_image_alt || ''}
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>
        )}

        {/* Поля */}
        <div className={styles.info_fields}>
          {fields.map((field, index) => (
            <div key={index} className={styles.info_field}>
              <div className={styles.info_field_label}>
                {field.label}:
              </div>
              <div className={styles.info_field_value}>
                {field.value}
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительный контент */}
        {children && (
          <div className={styles.info_additional}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}; 