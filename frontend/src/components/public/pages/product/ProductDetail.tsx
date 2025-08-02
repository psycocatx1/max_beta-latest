'use client'
import { useTranslations } from 'next-intl';
import { ExtendedProduct, Locale } from '@/lib/api';
import classes from './ProductDetail.module.scss';
import { useEffect } from 'react';
import { InfoSection } from './InfoSection';
import { formatExtendedProduct } from './localized-product';
import { useProducts } from '@hooks/admin/products';
import { GallerySection, DescriptionSection, BackButton } from '@/components/public/common/for/item';

interface ProductDetailProps {
  locale: Locale;
  initial_product: ExtendedProduct;
  product_id: string;
}

export const ProductDetail = ({ locale, initial_product, product_id }: ProductDetailProps) => {
  const t = useTranslations('public.pages.product.detail');

  const { data: product, refetch } = useProducts().useFind({ id: product_id, locale_id: locale.id, initial_data: initial_product })

  useEffect(() => { refetch() })

  const localized_product = formatExtendedProduct(product || initial_product, locale);

  return (
    <div className={classes.detail}>
      <div className={classes.detail__container}>
        <BackButton text={t('back_to_products')} />

        <div className={classes.detail__content}>
          <GallerySection
            is_discounted={localized_product.is_discounted}
            name={localized_product.name}
            images={localized_product.images || []}
          />
          <InfoSection
            localized_product={localized_product}
          />
        </div>

        {localized_product.item_descriptions.length > 0 && (
          <DescriptionSection descriptions={localized_product.item_descriptions} />
        )}
      </div>
    </div >
  );
}; 