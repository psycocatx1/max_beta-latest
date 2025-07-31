'use client'
import { useTranslations } from 'next-intl';
import { Image } from '@/components/Image';
import { ExtendedService, getImageUrl, Locale } from '@/lib/api';
import classes from './ServiceCard.module.scss';
import { Eye, Settings } from 'lucide-react';
import { Link } from '@/lib/intl/navigation';
import { Card, Paragraph, Heading } from '@/components/styles';

interface ServiceCardProps {
  service: ExtendedService;
  locale: Locale;
}

export const ServiceCard = ({ service, locale }: ServiceCardProps) => {
  const t = useTranslations('public.pages.services.card');

  const localService = service.local_services?.[0];
  const localName = localService?.name || service.name;
  const localDescription = localService?.description || service.description;
  const localPrice = localService?.price || service.price_USD;
  const localDiscountPrice = localService?.discount_price || service.discount_price_USD;
  const hasDiscount = !!localDiscountPrice && localDiscountPrice < localPrice;

  return (
    <Card hoverable className={classes.card}>
      <div className={classes.card__image_wrapper}>
        <Image
          src={getImageUrl(service.image)}
          alt={localName}
          width={300}
          height={200}
          className={classes.card__image}
        />
        {hasDiscount && (
          <div className={classes.card__discount_badge}>
            {t('discount')}
          </div>
        )}
        <div className={classes.card__actions}>
          <Link
            href={{ pathname: '/services/[service_id]', params: { service_id: service.id } }}
            className={classes.card__action_button}
            aria-label={t('view_details')}
          >
            <Eye size={20} />
          </Link>
        </div>
      </div>

      <div className={classes.card__content}>
        <div className={classes.card__header}>
          <Settings className={classes.card__service_icon} />
          <Heading size='sm' className={classes.card__title}>{localName}</Heading>
        </div>

        {localDescription && (
          <Paragraph size='sm' className={classes.card__description}>{localDescription}</Paragraph>
        )}

        <div className={classes.card__price_section}>
          <div className={classes.card__price}>
            {hasDiscount ? (
              <>
                <Heading size='md' className={classes.card__price_current}>
                  {localDiscountPrice.toFixed(2)} {locale.currency_symbol}
                </Heading>
                <Heading size='sm' className={classes.card__price_original}>
                  {localPrice.toFixed(2)} {locale.currency_symbol}
                </Heading>
              </>
            ) : (
              <Heading size='md' className={classes.card__price_current}>
                {localPrice.toFixed(2)} {locale.currency_symbol}
              </Heading>
            )}
          </div>
        </div>

        <Link
          href={{ pathname: '/services/[service_id]', params: { service_id: service.id } }}
          className={classes.card__details_button}
        >
          <span>{t('view_details')}</span>
          <Eye size={16} />
        </Link>
      </div>
    </Card>
  );
}; 