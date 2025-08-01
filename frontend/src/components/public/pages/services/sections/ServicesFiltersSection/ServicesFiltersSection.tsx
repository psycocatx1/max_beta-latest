'use client'
import { useTranslations } from 'next-intl';
import { Search, Filter } from 'lucide-react';
import { ServiceFiltersDto } from '@/lib/api';
import classes from './ServicesFiltersSection.module.scss';
import { Container, Section, Heading } from '@/components/styles';

interface ServicesFiltersSectionProps {
  filters: ServiceFiltersDto;
  updateFilters: (filters: Partial<ServiceFiltersDto>) => void;
}

export const ServicesFiltersSection = ({ filters, updateFilters }: ServicesFiltersSectionProps) => {
  const t = useTranslations('public.pages.services.filters');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ name: e.target.value });
  };



  return (
    <Section className={classes.filters}>
      <Container className={classes.filters__container}>
        <div className={classes.filters__header}>
          <Heading size='lg' className={classes.filters__title}>
            <Filter className={classes.filters__icon} />
            {t('title')}
          </Heading>
        </div>

        <div className={classes.filters__content}>
          <div className={classes.filters__search}>
            <div className={classes.filters__search_wrapper}>
              <Search className={classes.filters__search_icon} />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={filters.name || ''}
                onChange={handleSearchChange}
                className={classes.filters__search_input}
              />
            </div>
          </div>


        </div>
      </Container>
    </Section>
  );
}; 