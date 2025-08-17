'use client'
import { useTranslations } from 'next-intl';
import { Image } from '@/components/common/Image';
import { ExtendedProduct, getImageUrl, Locale } from '@/lib/api';
import classes from './ProductCard.module.scss';
import { Eye } from 'lucide-react';
import { Link } from '@/lib/intl/navigation';
import { formatExtendedProduct } from '../../../product/localized-product';
import { Heading, Paragraph } from '@/components/styles';

interface ProductCardProps {
  product: ExtendedProduct;
  locale: Locale;
}

export const ProductCard = ({ product, locale }: ProductCardProps) => {
  const t = useTranslations('public.pages.products.card');
  const localized_product = formatExtendedProduct(product, locale);

  return (
    <article className={classes.card}>
      <div className={classes.card__image_wrapper}>
        <Image
          src={getImageUrl(product.image)}
          alt={localized_product.name}
          width={320}
          height={220}
          className={classes.card__image}
        />
        {localized_product.is_discounted && (
          <div className={classes.card__discount_badge}>
            {t('discount')}
          </div>
        )}
        <div className={classes.card__actions}>
          <Link
            href={{ pathname: '/products/[product_id]', params: { product_id: product.id } }}
            className={classes.card__action_button}
            aria-label={t('view_details')}
          >
            <Eye size={20} />
          </Link>
        </div>
      </div>

      <div className={classes.card__content}>
        <Heading size='lg' className={classes.card__title}>{localized_product.name}</Heading>
        {localized_product.description && (
          <Paragraph size='lg' className={classes.card__description}>{localized_product.description}</Paragraph>
        )}

        <div className={classes.card__price_section}>
          <div className={classes.card__price}>
            {localized_product.is_discounted ? (
              <>
                <span className={classes.card__price_current}>
                  {localized_product.formatted_discount_price}
                </span>
                <span className={classes.card__price_original}>
                  {localized_product.formatted_price}
                </span>
              </>
            ) : (
              <span className={classes.card__price_current}>
                {localized_product.formatted_price}
              </span>
            )}
          </div>

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