'use client';

import { ArrowLeft, Trash } from 'lucide-react';
import { useRouter } from '@hooks/useRouting';
import { SecondarySidebar, SecondarySidebarConfig } from '@/components/admin/common/SecondaryLayout/SecondarySidebar';
import styles from './SecondaryLayout.module.scss';
import { useUIStore } from '@/store/useUIStore';
import { useTranslations } from 'next-intl';
import { Image } from '@/components/Image';
import { Loader } from '../Loader';

interface SecondaryLayoutProps {
  item_id: string;
  title: string;
  description?: string;
  image_url?: string;
  children: React.ReactNode;
  sidebar_config?: SecondarySidebarConfig;
  is_loading?: boolean;
  delete_button?: {
    title: string;
    loading_title: string;
    is_loading: boolean;
    onDelete: () => Promise<void>;
    confirm_message?: string;
  };
}

export const SecondaryLayout = ({
  item_id,
  title,
  description,
  image_url,
  children,
  sidebar_config,
  delete_button,
  is_loading
}: SecondaryLayoutProps) => {
  const router = useRouter();
  const tCommon = useTranslations('common');
  const { isSecondarySidebarCollapsed } = useUIStore();

  const handleDelete = async () => {
    if (!delete_button) return;
    const confirm_message = delete_button.confirm_message || tCommon('confirm_delete');
    if (!confirm(confirm_message)) return;
    await delete_button.onDelete();
  };

  const contentClass = isSecondarySidebarCollapsed
    ? `${styles.admin_layout_content} ${styles.admin_layout_content_collapsed}`
    : styles.admin_layout_content;

  if (is_loading) return <Loader />

  return (
    <div className={styles.admin_layout}>
      <div className={styles.admin_layout_header}>
        <div className={styles.admin_layout_header_top}>
          <button
            className={styles.admin_layout_back_button}
            onClick={() => router.back()}
          >
            <ArrowLeft size={20} />
            {tCommon('back')}
          </button>

          {delete_button && (
            <button
              className={styles.admin_layout_delete_button}
              onClick={handleDelete}
              disabled={delete_button.is_loading}
            >
              <Trash size={16} />
              {delete_button.is_loading ? delete_button.loading_title : delete_button.title}
            </button>
          )}
        </div>

        <div className={styles.admin_layout_item_info}>
          {image_url && (
            <div className={styles.admin_layout_image}>
              <Image
                src={image_url}
                alt={title}
                width={80}
                height={80}
                className={styles.admin_layout_image_content}
              />
            </div>
          )}

          <div className={styles.admin_layout_text_info}>
            <h1 className={styles.admin_layout_title}>
              {title}
            </h1>
            {description && (
              <p className={styles.admin_layout_subtitle}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={contentClass}>
        {sidebar_config && <SecondarySidebar item_id={item_id} {...sidebar_config} />}

        <div className={styles.admin_layout_main}>
          {children}
        </div>
      </div>
    </div>
  );
}; 