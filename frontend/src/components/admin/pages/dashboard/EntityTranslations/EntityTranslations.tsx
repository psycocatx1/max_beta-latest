'use client';
import { useLocales } from '@/hooks/admin/locales/useLocales';
import styles from './EntityTranslations.module.scss';
import { EntityValidationResult } from '@/lib/api/services/types/locales.types';
import { Loader } from '@/components/admin/common/Loader';
import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';
import { LocalCategoryFormModal, LocalProductFormModal, LocalServiceFormModal } from '@/components/admin/common/Modal/Forms';
import { CreateModalData, ItemWithIssue } from './ItemWithIssue';

const StatusBadge = ({ variant, children }: { variant: 'success' | 'error' | 'warning'; children: React.ReactNode }) => {
  return (
    <div className={`${styles.badge} ${styles[`badge_${variant}`]}`}>
      {children}
    </div>
  );
};



export const EntityTranslations = () => {
  const { data: validation_data, isLoading: is_loading } = useLocales().useValidateEntities();
  const tEntityTranslations = useTranslations('admin.dashboard.entity_translations');
  const [createModalData, setCreateModalData] = useState<CreateModalData | null>(null);

  if (is_loading) return <Loader />;

  const renderEntitySection = (type: 'products' | 'services' | 'categories', data: EntityValidationResult) => {
    if (data.missing_translations === 0) return null;

    return (
      <div className={styles.translations_section}>
        <h3 className={styles.translations_section_title}>
          {tEntityTranslations(`${type}`)}
          <StatusBadge variant="error">
            {data.missing_translations} / {data.items_with_issues.reduce((acc, item) => acc + item.missing_locales.length, 0)}
          </StatusBadge>
        </h3>
        <div className={styles.translations_list}>
          {data.items_with_issues.map((item) => (
            <Fragment key={item.id}>
              {item.missing_locales.map((locale) => (
                <ItemWithIssue type={type} item={item} key={`${item.id}-${locale.id}`} locale={locale} setCreateModalData={setCreateModalData} />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    );
  };

  if (!validation_data) return null;

  const totalIssues =
    validation_data.products.missing_translations +
    validation_data.services.missing_translations +
    validation_data.categories.missing_translations;

  return (
    <div className={`${styles.translations} ${totalIssues > 0 ? styles.translations_error : styles.translations_success}`}>
      <h2 className={styles.translations_title}>
        {tEntityTranslations('title')}
        {totalIssues > 0
          ? <StatusBadge variant="error">{totalIssues} {tEntityTranslations('entities_missing')}</StatusBadge>
          : <StatusBadge variant="success">{tEntityTranslations('no_issues')}</StatusBadge>
        }
      </h2>

      {renderEntitySection('products', validation_data.products)}
      {renderEntitySection('services', validation_data.services)}
      {renderEntitySection('categories', validation_data.categories)}

      {createModalData?.type === 'categories' && createModalData?.entity.type && <LocalCategoryFormModal
        is_open={createModalData?.type === 'categories'}
        onClose={() => setCreateModalData(null)}
        onSubmit={() => { }}
        type={createModalData?.entity.type}
        initial_data={{
          locale_id: createModalData?.locale.id,
          category_id: createModalData?.entity.id,
        }}
        is_excluded
      />}
      {createModalData?.type === 'products' && <LocalProductFormModal
        is_open={createModalData?.type === 'products'}
        onClose={() => setCreateModalData(null)}
        onSubmit={() => { }}
        initial_data={{
          locale_id: createModalData?.locale.id,
          product_id: createModalData?.entity.id,
        }}
        is_excluded
        currency_symbol={createModalData?.locale?.currency_symbol}
      />}
      {createModalData?.type === 'services' && <LocalServiceFormModal
        is_open={createModalData?.type === 'services'}
        onClose={() => setCreateModalData(null)}
        onSubmit={() => { }}
        initial_data={{
          locale_id: createModalData?.locale.id,
          service_id: createModalData?.entity.id,
        }}
        is_excluded
        currency_symbol={createModalData?.locale?.currency_symbol}
      />}
    </div>
  );
}; 