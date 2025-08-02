'use client'
import { useTranslations } from 'next-intl';
import { ExtendedService, Locale } from '@/lib/api';
import classes from './ServiceDetail.module.scss';
import { useEffect } from 'react';
import { InfoSection } from './InfoSection';
import { formatExtendedService } from './localized-service';
import { useServices } from '@hooks/admin/services';
import { GallerySection, DescriptionSection, BackButton } from '@/components/public/common/for/item';

interface ServiceDetailProps {
  locale: Locale;
  initial_service: ExtendedService;
  service_id: string;
}

export const ServiceDetail = ({ locale, initial_service, service_id }: ServiceDetailProps) => {
  const t = useTranslations('public.pages.service.detail');

  const { data: service, refetch } = useServices().useFind({ id: service_id, locale_id: locale.id, initial_data: initial_service })

  useEffect(() => { refetch() })

  const localized_service = formatExtendedService(service || initial_service, locale);

  return (
    <div className={classes.detail}>
      <div className={classes.detail__container}>
        <BackButton text={t('back_to_services')} />

        <div className={classes.detail__content}>
          <GallerySection
            is_discounted={localized_service.is_discounted}
            name={localized_service.name}
            images={localized_service.images || []}
          />
          <InfoSection
            localized_service={localized_service}
          />
        </div>

        {localized_service.item_descriptions.length > 0 && (
          <DescriptionSection descriptions={localized_service.item_descriptions} />
        )}
      </div>
    </div >
  );
}; 