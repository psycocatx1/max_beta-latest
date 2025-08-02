'use client'
import { useTranslations } from 'next-intl';
import { ExtendedService, Locale, BaseFilterDto } from '@/lib/api';
import { ServiceCard } from './ServiceCard';
import { LoadingList, EmptyList } from '@/components/public/common/for/items';
import classes from './ServicesListSection.module.scss';
import { Pagination } from '@/components/public/common/Pagination';
import { Container, Heading, Section } from '@/components/styles';

interface ServicesListSectionProps {
  locale: Locale;
  services: ExtendedService[];
  total: number;
  current_page: number;
  total_pages: number;
  current_page_size?: number;
  onPageChange: (page: number) => void;
  updateFilters: (filters: BaseFilterDto) => void;
  is_loading?: boolean;
}


export const ServicesListSection = ({
  locale,
  services,
  total,
  current_page,
  total_pages,
  current_page_size,
  onPageChange,
  updateFilters,
  is_loading = false
}: ServicesListSectionProps) => {
  const t = useTranslations('public.pages.services.list');

  if (is_loading) return <LoadingList />;
  if (services.length === 0 && !is_loading) return <EmptyList title={t('no_services')} description={t('no_services_description')} />;

  return (
    <Section className={classes.list}>
      <Container className={classes.list__container}>
        <div className={classes.list__header}>
          <Heading size='lg' className={classes.list__title}>
            {t('found_services', { count: total })}
          </Heading>
        </div>
        <Pagination
          current_page={current_page}
          total_pages={total_pages}
          current_page_size={current_page_size}
          onPageChange={onPageChange}
          updateFilters={updateFilters}
        />

        <div className={classes.list__grid}>
          {services.map((service) => (
            <ServiceCard
              locale={locale}
              key={service.id}
              service={service}
            />
          ))}
        </div>

        <Pagination
          current_page={current_page}
          total_pages={total_pages}
          current_page_size={current_page_size}
          onPageChange={onPageChange}
          updateFilters={updateFilters}
        />
      </Container>
    </Section>
  );
}; 