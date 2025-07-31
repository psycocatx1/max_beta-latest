'use client';

import { ExtendedLocalProduct } from '@lib/api/services/types';
import { useTranslations } from 'next-intl';
import { OriginalItem as CommonOriginalItem } from '@/components/admin/common/ListPage/OriginalItem/OriginalItem';
import { useRouter } from '@hooks/useRouting';

interface OriginalItemProps {
  product: ExtendedLocalProduct;
  root: 'locale' | 'product';
}

export const OriginalItem = ({ product, root }: OriginalItemProps) => {
  const tFields = useTranslations(`admin.common.form.fields`);
  const router = useRouter();

  const handleNavigate = () => {
    switch (root) {
      case 'locale':
        router.push({ pathname: `/admin/products/[product_id]`, params: { product_id: product.id } });
        break;
      case 'product':
        router.push({ pathname: `/admin/locales/[locale_id]`, params: { locale_id: product.locale.id } });
        break;
    }
  };

  return (
    <CommonOriginalItem
      data={root === 'locale' ? product.product : product.locale}
      label={tFields(`original_${root === 'locale' ? 'product' : 'locale'}_label`)}
      onClick={handleNavigate}
      showPrice
    />
  );
}; 