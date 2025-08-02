import { useTranslations } from 'next-intl';
import classes from './PriceSection.module.scss';
import { Heading, Paragraph } from '@/components/styles';

interface PriceSectionProps {
  formatted_discount_price: string | null;
  formatted_price: string;
  price_negotiable?: boolean;
}

export const PriceSection = ({ formatted_discount_price, formatted_price, price_negotiable }: PriceSectionProps) => {
  const t = useTranslations('public.pages.service.detail');
  return (
    <div className={classes.section}>
      <div className={classes.section__price}>
        {!!formatted_discount_price ? (
          <>
            <Heading size='lg' className={classes.section__price_current}>
              {formatted_discount_price}
            </Heading>
            <Heading size='md' className={classes.section__price_original}>
              {formatted_price}
            </Heading>
          </>
        ) : (
          <Heading size='lg' className={classes.section__price_current}>
            {formatted_price}
          </Heading>
        )}
      </div>
      {price_negotiable && <Paragraph size='sm' className={classes.section__note}>{t('price_negotiable')}</Paragraph>}
    </div>
  )
};