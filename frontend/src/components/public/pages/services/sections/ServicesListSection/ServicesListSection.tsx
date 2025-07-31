'use client'
import { useTranslations } from 'next-intl';
import { ExtendedService, Locale } from '@/lib/api';
import { ServiceCard } from '../../components/ServiceCard';
import classes from './ServicesListSection.module.scss';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { Paragraph, Container, Section, Heading } from '@/components/styles';

interface ServicesListSectionProps {
  locale: Locale;
  services: ExtendedService[];
  total: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const ServicesListSection = ({
  locale,
  services,
  total,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false
}: ServicesListSectionProps) => {
  const t = useTranslations('public.pages.services.list');

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (isLoading) {
    return (
      <Section>
        <Container>
          <div className={classes.list__loading}>
            {t('loading')}
          </div>
        </Container>
      </Section>
    );
  }

  if (services.length === 0) {
    return (
      <Section>
        <Container>
          <div className={classes.list__empty}>
            <Settings size={64} className={classes.list__empty_icon} />
            <Heading size='md' className={classes.list__empty_title}>{t('no_services')}</Heading>
            <Paragraph size='lg' className={classes.list__empty_description}>{t('no_services_description')}</Paragraph>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <div className={classes.list__header}>
          <Heading size='lg' className={classes.list__title}>
            {t('found_services', { count: total })}
          </Heading>
        </div>

        <div className={classes.list__grid}>
          {services.map((service) => (<ServiceCard key={service.id} service={service} locale={locale} />))}
        </div>

        {totalPages > 1 && (
          <div className={classes.list__pagination}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className={classes.list__pagination_button}
              aria-label={t('previous_page')}
            >
              <ChevronLeft size={20} />
            </button>

            <div className={classes.list__pagination_info}>
              <Paragraph size='sm'>{t('page_info', { current: currentPage, total: totalPages })}</Paragraph>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className={classes.list__pagination_button}
              aria-label={t('next_page')}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </Container>
    </Section>
  );
}; 