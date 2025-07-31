'use client';

import { useTranslations } from 'next-intl';
import { LoaderCircle } from 'lucide-react';
import styles from './Loader.module.scss';

export const Loader = () => {
  const t = useTranslations('common');

  return (
    <div className={styles.loader}>
      <p data-intl-key="common.loading">{t('loading')}</p>
      <LoaderCircle className={styles.loader_icon} />
    </div>
  );
};
