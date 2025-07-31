'use client'
import { useTranslations } from 'next-intl';
import { ExtendedService, Locale } from '@/lib/api';
import classes from './ServiceDetail.module.scss';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { GallerySection, InfoSection, DescriptionSection } from './sections';
import { formatExtendedService } from './localized-service';
import { useRouter } from '@hooks/useRouting';
import { Button, Container } from '@/components/styles';

interface ServiceDetailProps {
  service: ExtendedService;
  locale: Locale;
}

export const ServiceDetail = ({ service, locale }: ServiceDetailProps) => {
  const t = useTranslations('public.pages.services.detail');
  const router = useRouter()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const localized_service = formatExtendedService(service, locale);

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
      <Container>
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
            selectedImageIndex={selectedImageIndex}
            localized_service={localized_service}
            setSelectedImageIndex={setSelectedImageIndex}
          />

          <InfoSection
            localized_service={localized_service}
            handleShare={handleShare}
          />
        </div>

        {localized_service.item_descriptions.length > 0
          && <DescriptionSection descriptions={localized_service.item_descriptions} />
        }
      </Container>
    </div>
  );
}; 