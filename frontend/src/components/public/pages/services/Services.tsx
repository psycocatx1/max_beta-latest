'use client'
import { useServices, useServicesFilters } from '@/hooks/admin/services';
import { BaseListResult, ExtendedService, Locale } from '@/lib/api';
import { AnimatedSection } from '@/components/public/common/AnimatedSection';
import classes from './Services.module.scss';
import { HeroSection, ServicesFiltersSection, ServicesListSection } from './sections';
import { useEffect } from 'react';

interface ServicesProps {
  locale: Locale;
  initial_services: ExtendedService[];
}

export const Services = ({ locale, initial_services }: ServicesProps) => {
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
      <AnimatedSection animation="fadeInUp" enableAnimations={true}>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={200} enableAnimations={true}>
        <ServicesFiltersSection
          filters={filters}
          updateFilters={updateFilters}
        />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={400} enableAnimations={true}>
        <ServicesListSection
          locale={locale}
          services={services.items}
          total={services.total}
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