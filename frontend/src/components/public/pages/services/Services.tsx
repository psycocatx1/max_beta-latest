'use client'
import { useServices, useServicesFilters } from '@/hooks/admin/services';
import { BaseListResult, ExtendedService, Locale } from '@/lib/api';
import { AnimatedSection } from '@/components/public/common/for/section';
import { HeroSection, FiltersSection } from '@/components/public/common/for/items';
import classes from './Services.module.scss';
import { ServicesListSection } from './ServicesListSection';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface ServicesProps {
  locale: Locale;
  initial_services: ExtendedService[];
}

export const Services = ({ locale, initial_services }: ServicesProps) => {
  const t = useTranslations('public.pages.services');

  const { filters, current_page, setPage, updateFilters } = useServicesFilters({
    default_filters: { locale_id: locale.id, take: 10, skip: 0 }
  });

  const initial_data: BaseListResult<ExtendedService> = {
    items: initial_services,
    total: initial_services.length,
    skip: 0,
    take: filters.take
  }
  const { data: services, isLoading, refetch } = useServices().useGet(filters, initial_data);

  useEffect(() => { refetch() })

  return services ? (
    <div className={classes.services}>
      <AnimatedSection animation="fadeInUp" enableAnimations={true} delay={0} useCssOnly>
        <HeroSection title={t('title')} description={t('description')} />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={200} enableAnimations={true} useCssOnly>
        <FiltersSection
          filters={filters}
          updateFilters={updateFilters}
        />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={200} enableAnimations={true} useCssOnly>
        <ServicesListSection
          locale={locale}
          services={services.items}
          current_page={current_page}
          total_pages={Math.ceil(services.total / services.take)}
          current_page_size={services.take}
          onPageChange={setPage}
          updateFilters={updateFilters}
          is_loading={isLoading}
        />
      </AnimatedSection>
    </div>
  ) : null;
};