import Image from 'next/image';
import styles from './EntityTranslations.module.scss';
import { EntityValidationResult } from '@lib/api/services/types';
import { Locale } from '@prisma/client';
import { useRouter } from '@/hooks/useRouting';
import { getImageUrl } from '@/lib/api';

export type CreateModalData = {
  type: 'products' | 'services' | 'categories';
  locale: Locale;
  entity: EntityValidationResult['items_with_issues'][number];
}

interface ItemWithIssueProps {
  item: EntityValidationResult['items_with_issues'][number];
  locale: Locale;
  setCreateModalData: (data: CreateModalData) => void;
  type: 'products' | 'services' | 'categories';
}

export const ItemWithIssue = ({ item, locale, setCreateModalData, type }: ItemWithIssueProps) => {
  const router = useRouter();
  const onClick = (entity: EntityValidationResult['items_with_issues'][number], locale: Locale) => {
    if (!entity.is_excluded) {
      setCreateModalData({
        type,
        locale,
        entity,
      });
    } else {
      switch (type) {
        case 'categories':
          router.push({ pathname: `/admin/local-categories/[local_category_id]`, params: { local_category_id: entity.id } });
          break;
        case 'products':
          router.push({ pathname: `/admin/local-products/[local_product_id]`, params: { local_product_id: entity.id } });
          break;
        case 'services':
          router.push({ pathname: `/admin/local-services/[local_service_id]`, params: { local_service_id: entity.id } });
      }
    }
  };

  return (
    <div className={styles.translations_item} onClick={() => onClick(item, locale)}>
      <div className={styles.translations_item_content}>
        {item.image && (
          <div className={styles.translations_item_image}>
            <Image
              src={getImageUrl(item.image) || ''}
              alt={item.name}
              width={64}
              height={64}
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.translations_item_info}>
          <div className={styles.translations_item_name}>{item.name}</div>
          {item.description && (
            <div className={styles.translations_item_description}>{item.description}</div>
          )}
        </div>
      </div>
      <div className={styles.translations_locales}>
        {item.image && (
          <div className={styles.badge_image}>
            <Image
              src={getImageUrl(locale.image) || ''}
              alt={locale.name}
              width={64}
              height={64}
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.badge_info}>
          <div className={styles.badge_name}>{locale.name}</div>
          {locale.symbol && (
            <div className={styles.badge_symbol}>{locale.symbol}</div>
          )}
        </div>
      </div>
    </div>
  )
};