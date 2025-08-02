'use client'
import { useTranslations } from 'next-intl';
import { ExtendedProduct, Locale, BaseFilterDto } from '@/lib/api';
import { ProductCard } from './ProductCard';
import { LoadingList, EmptyList } from '@/components/public/common/for/items';
import classes from './ProductsListSection.module.scss';
import { Pagination } from '@/components/public/common/Pagination';
import { Container, Heading, Section } from '@/components/styles';

interface ProductsListSectionProps {
  locale: Locale;
  products: ExtendedProduct[];
  total: number;
  current_page: number;
  total_pages: number;
  current_page_size?: number;
  onPageChange: (page: number) => void;
  updateFilters: (filters: BaseFilterDto) => void;
  is_loading?: boolean;
}


export const ProductsListSection = ({
  locale,
  products,
  total,
  current_page,
  total_pages,
  current_page_size,
  onPageChange,
  updateFilters,
  is_loading = false
}: ProductsListSectionProps) => {
  const t = useTranslations('public.pages.products.list');

  if (is_loading) return <LoadingList />;
  if (products.length === 0 && !is_loading) return <EmptyList title={t('no_products')} description={t('no_products_description')} />;

  return (
    <Section className={classes.list}>
      <Container className={classes.list__container}>
        <div className={classes.list__header}>
          <Heading size='lg' className={classes.list__title}>
            {t('found_products', { count: total })}
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
          {products.map((product) => (
            <ProductCard
              locale={locale}
              key={product.id}
              product={product}
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