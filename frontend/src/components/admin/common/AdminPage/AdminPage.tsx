'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { Loader } from '../Loader';
import styles from './AdminPage.module.scss';

interface AdminPageProps {
  title: string;
  children: ReactNode;
  onCreateClick?: () => void;
  create_button_text?: string;
  is_loading?: boolean;
  additional_button?: ReactNode;
}

export const AdminPage = ({
  title,
  children,
  onCreateClick,
  create_button_text,
  is_loading = false,
  additional_button,
}: AdminPageProps) => {
  const tCommon = useTranslations('common');

  if (is_loading) return <Loader />

  return (
    <div className={styles.admin_page}>
      <div className={styles.admin_page_header}>
        <h1 className={styles.admin_page_title}>
          {title}
        </h1>

        {onCreateClick && (
          <div className={styles.admin_page_buttons_container}>
            {additional_button}
            <button
              className={styles.admin_page_create_button}
              onClick={onCreateClick}
              data-intl-default-key="common.create"
            >
              <Plus size={20} />
              <span>{create_button_text || tCommon('create')}</span>
            </button>
          </div>
        )}
      </div>

      <div className={styles.admin_page_content}>
        {children}
      </div>
    </div>
  );
}; 