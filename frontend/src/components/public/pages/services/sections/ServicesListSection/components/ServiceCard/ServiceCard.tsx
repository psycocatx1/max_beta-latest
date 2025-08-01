'use client'
import { useTranslations } from 'next-intl';
import { Image } from '@/components/common/Image';
import { ExtendedService, getImageUrl, Locale } from '@/lib/api';
import classes from './ServiceCard.module.scss';
import { Eye } from 'lucide-react';
import { Link } from '@/lib/intl/navigation';
import { formatExtendedService } from '../../../../../service/localized-service';

interface ServiceCardProps {
  service: ExtendedService;
  locale: Locale;
}

export const ServiceCard = ({ service, locale }: ServiceCardProps) => {
  const t = useTranslations('public.pages.services.card');
  const localized_service = formatExtendedService(service, locale);

  return (
    <article className={classes.card}>
      <div className={classes.card__image_wrapper}>
        <Image
          src={getImageUrl(service.image)}
          alt={localized_service.name}
          width={320}
          height={220}
          className={classes.card__image}
        />
        {localized_service.is_discounted && (
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
        <h3 className={classes.card__title}>{localized_service.name}</h3>
        {localized_service.description && (
          <p className={classes.card__description}>{localized_service.description}</p>
        )}

        <div className={classes.card__price_section}>
          <div className={classes.card__price}>
            {localized_service.is_discounted ? (
              <>
                <span className={classes.card__price_current}>
                  {localized_service.formatted_discount_price}
                </span>
                <span className={classes.card__price_original}>
                  {localized_service.formatted_price}
                </span>
              </>
            ) : (
              <span className={classes.card__price_current}>
                {localized_service.formatted_price}
              </span>
            )}
          </div>

          <Link
            href={{ pathname: '/services/[service_id]', params: { service_id: service.id } }}
            className={classes.card__details_button}
          >
            <span>{t('view_details')}</span>
            <Eye size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}; 