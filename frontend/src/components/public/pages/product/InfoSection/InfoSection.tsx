import { useTranslations } from 'next-intl';
import classes from './InfoSection.module.scss';
import { LocalizedProduct } from '../localized-product';
import { CTAButton, PriceSection, DataSection } from '@/components/public/common/for/item';

export const InfoSection = ({ localized_product }: { localized_product: LocalizedProduct }) => {
  const t = useTranslations('public.pages.product.detail');
  return (
    <div className={classes.info}>
      <div className={classes.info__header}>
        <DataSection name={localized_product.name} description={localized_product.description} />
        <PriceSection
          formatted_discount_price={localized_product.formatted_discount_price}
          formatted_price={localized_product.formatted_price}
          price_negotiable
        />
      </div>
      <CTAButton href={t('contact_for_order_url')} text={t('contact_for_order')} />
    </div>
  );
}