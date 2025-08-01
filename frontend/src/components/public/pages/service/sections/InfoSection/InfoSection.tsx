import { Share2, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import classes from './InfoSection.module.scss';
import { LocalizedService } from '../../localized-service';
import { Button, Heading, Paragraph } from '@/components';

interface InfoSectionProps {
  localized_service: LocalizedService
  handleShare: () => void;
}

export const InfoSection = ({ localized_service, handleShare }: InfoSectionProps) => {
  const t = useTranslations('public.pages.service.detail');
  return (
    <div className={classes.info}>
      <div className={classes.info__header}>
        <div className={classes.info__title_section}>
          <div className={classes.info__title_wrapper}>
            <Heading size='xl'>{localized_service.name}</Heading>
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

        <Paragraph size='lg'>{localized_service.description}</Paragraph>

        <div className={classes.info__price_section}>
          <div className={classes.info__price}>
            {localized_service.is_discounted ? (
              <>
                <Heading size='lg' className={classes.info__price_current}>
                  {localized_service.formatted_discount_price}
                </Heading>
                <Heading size='md' className={classes.info__price_original}>
                  {localized_service.formatted_price}
                </Heading>
              </>
            ) : (
              <Heading size='lg' className={classes.info__price_current}>
                {localized_service.formatted_price}
              </Heading>
            )}
          </div>
          <Paragraph size='sm' className={classes.info__price_note}>{t('price_negotiable')}</Paragraph>
        </div>
      </div>

      <div className={classes.info__cta}>
        <Button href={t('contact_for_order_url')} className={classes.info__contact_button} variant='primary'>
          <Phone size={20} />
          {t('contact_for_order')}
        </Button>
      </div>
    </div>
  );
}