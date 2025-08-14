'use client'
import { useProducts, useProductsFilters } from '@/hooks/admin/products';
import { BaseListResult, ExtendedProduct, Locale } from '@/lib/api';
import { AnimatedSection } from '@/components/public/common/for/section';
import { HeroSection, FiltersSection } from '@/components/public/common/for/items';
import classes from './Products.module.scss';
import { ProductsListSection } from './ProductsListSection';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface ProductsProps {
  locale: Locale;
  initial_products: ExtendedProduct[];
}

export const Products = ({ locale, initial_products }: ProductsProps) => {
  const { filters, current_page, setPage, updateFilters } = useProductsFilters({
    default_filters: { locale_id: locale.id, take: 10, skip: 0 }
  });

  const t = useTranslations('public.pages.products');

  const initial_data: BaseListResult<ExtendedProduct> = {
    items: initial_products,
    total: initial_products.length,
    skip: 0,
    take: filters.take
  }
  const { data: products, isLoading, refetch } = useProducts().useGet(filters, initial_data);

  useEffect(() => { refetch() })

  return products ? (
    <div className={classes.products}>
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
        <ProductsListSection
          locale={locale}
          products={products.items}
          total={products.total}
          current_page={current_page}
          total_pages={Math.ceil(products.total / products.take)}
          current_page_size={products.take}
          onPageChange={setPage}
          updateFilters={updateFilters}
          is_loading={isLoading}
        />
      </AnimatedSection>
    </div>
  ) : null;
};