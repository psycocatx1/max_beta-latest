'use client';

import { useProducts, useProductsFilters, CreateProductFormData } from '@/hooks/admin/products';
import { ProductFiltersDto, Product } from '@lib/api/services/types/products.types';
import { useState } from 'react';
import { AdminPage } from '@/components/admin/common/AdminPage';
import { Filters, FilterField, List } from '@/components/admin/common/ListPage';
import { ProductFormModal } from '@/components/admin/common/Modal';
import { ProductCard } from './ProductCard';
import { useCategories } from '@/hooks/admin/categories';
import { flattenCategoriesForSelect } from '@lib/api/services/types/categories.types';
import { useTranslations } from 'next-intl';
import { CategoryType } from '@prisma/client';

interface ProductsPageProps {
  category_id?: string;
}

export const Products = ({ category_id }: ProductsPageProps) => {
  const tProducts = useTranslations('admin.products');
  const tFilters = useTranslations('admin.common.list_page.filters');

  const [is_create_modal_open, setIsCreateModalOpen] = useState(false);

  const { filters, updateFilters, resetFilters, setPage, current_page } = useProductsFilters({
    default_filters: { category_id: category_id || '', skip: 0, take: 10 } as ProductFiltersDto,
  });

  const { data: products, isLoading: is_loading, refetch } = useProducts().useGet(filters);
  const { data: categories } = useCategories().useGet({ skip: 0, take: 300, type: CategoryType.PRODUCT });
  const create_product_mutation = useProducts().useCreate();

  const flatCategories = categories?.items ? flattenCategoriesForSelect(categories.items) : [];

  const handleCreateProduct = (data: CreateProductFormData) => {
    create_product_mutation.mutate(data);
    setIsCreateModalOpen(false);
    refetch();
  };

  const handleFilterChange = (name: string, value: unknown) => {
    updateFilters({ [name]: value });
  };

  const renderProductItem = (product: Product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  );

  return (
    <AdminPage
      title={tProducts('info_title')}
      create_button_text={tProducts('create_title')}
      onCreateClick={() => setIsCreateModalOpen(true)}
      is_loading={is_loading}
    >
      <Filters
        filters={filters}
        onUpdateFilters={updateFilters}
        onResetFilters={() => resetFilters()}
        is_loading={is_loading}
      >
        <FilterField
          name="name"
          label={tFilters('search_label')}
          placeholder={tFilters('search_placeholder')}
          type="text"
          value={filters.name || ''}
          onChange={handleFilterChange}
        />
        <FilterField
          name="category_id"
          label={tFilters('category_label')}
          placeholder={tFilters('category_placeholder')}
          type="select"
          value={filters.category_id || ''}
          options={[
            { value: '', label: tFilters('all_categories') },
            ...flatCategories.map((category) => ({
              value: category.value,
              label: category.label
            }))
          ]}
          onChange={handleFilterChange}
        />
      </Filters>

      <List<Product>
        items={products?.items || []}
        total={products?.total || 0}
        loading={is_loading}
        current_page={current_page}
        page_size={filters.take || 10}
        onPageChange={setPage}
        renderItem={renderProductItem}
        empty_message={tProducts('empty_message')}
        items_label={tProducts('items_label')}
      />

      <ProductFormModal
        is_open={is_create_modal_open}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={() => handleCreateProduct as (data: CreateProductFormData) => void}
      />
    </AdminPage>
  );
};