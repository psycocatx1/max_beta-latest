'use client'
import { useTranslations } from 'next-intl';
import { Search, Filter } from 'lucide-react';
import { ProductFiltersDto } from '@/lib/api';
import classes from './ProductsFiltersSection.module.scss';
import { Container, Section, Heading } from '@/components/styles';

interface ProductsFiltersSectionProps {
  filters: ProductFiltersDto;
  updateFilters: (filters: Partial<ProductFiltersDto>) => void;
}

export const ProductsFiltersSection = ({ filters, updateFilters }: ProductsFiltersSectionProps) => {
  const t = useTranslations('public.pages.products.filters');

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