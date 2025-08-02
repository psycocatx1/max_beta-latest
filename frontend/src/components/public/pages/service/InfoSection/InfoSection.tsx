import { useTranslations } from 'next-intl';
import classes from './InfoSection.module.scss';
import { CTAButton, DataSection, PriceSection } from '@/components/public/common/for/item/InfoSection';
import { LocalizedService } from '../localized-service';

export const InfoSection = ({ localized_service }: { localized_service: LocalizedService }) => {
  const t = useTranslations('public.pages.service.detail');
  return (
    <div className={classes.info}>
      <div className={classes.info__header}>
        <DataSection name={localized_service.name} description={localized_service.description} />
        <PriceSection
          formatted_discount_price={localized_service.formatted_discount_price}
          formatted_price={localized_service.formatted_price}
          price_negotiable
        />
      </div>
      <CTAButton href={t('contact_for_order_url')} text={t('contact_for_order')} />
    </div>
  );
}