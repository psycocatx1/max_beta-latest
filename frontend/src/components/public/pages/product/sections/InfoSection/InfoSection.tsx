import { Settings, Share2, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import classes from './InfoSection.module.scss';
import { LocalizedProduct } from '../../localized-product';
import { Button, Heading, Paragraph } from '@/components';

interface InfoSectionProps {
  localized_product: LocalizedProduct
  handleShare: () => void;
}

export const InfoSection = ({ localized_product, handleShare }: InfoSectionProps) => {
  const t = useTranslations('public.pages.product.detail');
  return (
    <div className={classes.info}>
      <div className={classes.info__header}>
        <div className={classes.info__title_section}>
          <div className={classes.info__title_wrapper}>
            <Settings className={classes.info__service_icon} />
            <Heading size='xl'>{localized_product.name}</Heading>
          </div>
          <div className={classes.info__actions}>
            <button
              onClick={handleShare}
              className={classes.info__action_button}
              aria-label={t('share')}
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className={classes.info__price_section}>
          <div className={classes.info__price}>
            {localized_product.is_discounted ? (
              <>
                <Heading size='lg' className={classes.info__price_current}>
                  {localized_product.formatted_discount_price}
                </Heading>
                <Heading size='md' className={classes.info__price_original}>
                  {localized_product.formatted_price}
                </Heading>
              </>
            ) : (
              <Heading size='lg' className={classes.info__price_current}>
                {localized_product.formatted_price}
              </Heading>
            )}
          </div>
          <Paragraph size='sm' className={classes.info__price_note}>{t('price_negotiable')}</Paragraph>
        </div>
      </div>

      <div className={classes.info__cta}>
        <Button className={classes.info__contact_button} variant='primary'>
          <Phone size={20} />
          {t('contact_for_order')}
        </Button>
      </div>
    </div>
  );
}