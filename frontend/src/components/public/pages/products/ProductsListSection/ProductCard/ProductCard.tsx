'use client'
import { useTranslations } from 'next-intl';
import { ExtendedProduct, Locale } from '@/lib/api';
import classes from './ProductCard.module.scss';
import { Eye } from 'lucide-react';
import { Link } from '@/lib/intl/navigation';
import { formatExtendedProduct } from '../../../product/localized-product';
import { Heading, Paragraph } from '@/components/styles';
import { PriceSection, ImageSection } from './components';

interface ProductCardProps {
  product: ExtendedProduct;
  locale: Locale;
}

export const ProductCard = ({ product, locale }: ProductCardProps) => {
  const t = useTranslations('public.pages.products.card');
  const localized_product = formatExtendedProduct(product, locale);

  return (
    <article className={classes.card}>
      <ImageSection name={localized_product.name} image={product.image} is_discounted={localized_product.is_discounted} product_id={product.id} />

      <div className={classes.card__content}>
        <Heading size='lg' className={classes.card__title}>{localized_product.name}</Heading>
        {localized_product.description && (
          <Paragraph size='lg' className={classes.card__description}>{localized_product.description}</Paragraph>
        )}

        <div className={classes.card__price_section}>
          <PriceSection formatted_discount_price={localized_product.formatted_discount_price} formatted_price={localized_product.formatted_price} />

          <Link
            href={{ pathname: '/products/[product_id]', params: { product_id: product.id } }}
            className={classes.card__details_button}
          >
            <Paragraph size='md'>{t('view_details')}</Paragraph>
            <Eye size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}; 