'use client'
import { useTranslations } from 'next-intl';
import { useServices, useServicesFilters } from '@/hooks/admin/services';
import { ExtendedService, Locale } from '@/lib/api';
import { ServicesFiltersSection, ServicesListSection } from './sections';
import { AnimatedSection } from '@/components/public/common/AnimatedSection';
import classes from './Services.module.scss';
import { Container, Heading, Paragraph, Section } from '@/components/styles';

interface ServicesProps {
  locale: Locale;
  initial_services: ExtendedService[];
}

export const Services = ({ locale, initial_services }: ServicesProps) => {
  const t = useTranslations('public.pages.services');
  const { filters, current_page, setPage, updateFilters } = useServicesFilters({
    default_filters: { locale_id: locale.id, take: 24, skip: 0, category_id: '' }
  });
  const { data: services, isLoading } = useServices().useGet(filters);

  const currentServices = services?.items || initial_services;
  const total = services?.total || initial_services.length;
  const totalPages = Math.ceil(total / (filters.take || 24));

  return (
    <div className={classes.services}>
      <AnimatedSection animation="fadeInUp" enableAnimations={true}>
        <Section className={classes.services__hero}>
          <Container>
            <Heading size='xl' className={classes.services__title}>
              {t('title')}
            </Heading>
            <Paragraph size='lg' className={classes.services__description}>
              {t('description')}
            </Paragraph>
          </Container>
        </Section>
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
          services={currentServices}
          total={total}
          currentPage={current_page}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      </AnimatedSection>
    </div>
  );
};
