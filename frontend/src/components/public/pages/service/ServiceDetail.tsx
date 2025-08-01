'use client'
import { useTranslations } from 'next-intl';
import { ExtendedService, Locale } from '@/lib/api';
import classes from './ServiceDetail.module.scss';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GallerySection, InfoSection, DescriptionSection } from './sections';
import { formatExtendedService } from './localized-service';
import { useRouter } from '@hooks/useRouting';
import { Button } from '@/components/styles';
import { useServices } from '@hooks/admin/services';

interface ServiceDetailProps {
  locale: Locale;
  initial_service: ExtendedService;
  service_id: string;
}

export const ServiceDetail = ({ locale, initial_service, service_id }: ServiceDetailProps) => {
  const t = useTranslations('public.pages.service.detail');
  const [selected_image_index, setSelectedImageIndex] = useState(0);

  const { data: service, refetch } = useServices().useFind({ id: service_id, locale_id: locale.id, initial_data: initial_service })

  useEffect(() => { refetch() })

  const localized_service = formatExtendedService(service || initial_service, locale);
  const router = useRouter();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: localized_service.name,
        text: localized_service.description || '',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className={classes.detail}>
      <div className={classes.detail__container}>
        <Button
          variant='secondary'
          onClick={router.back}
          className={classes.detail__back_button}
        >
          <ArrowLeft size={20} />
          {t('back_to_services')}
        </Button>

        <div className={classes.detail__content}>
          <GallerySection
            selected_image_index={selected_image_index}
            is_discounted={localized_service.is_discounted}
            name={localized_service.name}
            images={localized_service.images || []}
            setSelectedImageIndex={setSelectedImageIndex}
          />
          <InfoSection
            localized_service={localized_service}
            handleShare={handleShare}
          />
        </div>

        {localized_service.item_descriptions.length > 0 && (
          <DescriptionSection descriptions={localized_service.item_descriptions} />
        )}
      </div>
    </div >
  );
}; 