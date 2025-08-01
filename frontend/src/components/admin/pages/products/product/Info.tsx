'use client';

import { useState } from 'react';
import { CreateProductFormData, UpdateProductFormData, useProducts } from '@/hooks/admin/products';
import { InfoDisplay } from '@/components/admin/common/InfoDisplay';
import { formatDate } from '@/lib/intl/format-date';
import { useLocale, useTranslations } from 'next-intl';
import { useToast } from '@/hooks/useToast';
import { ProductFormModal } from '@/components/admin/common/Modal/Forms/ProductFormModal';
import { getImageUrl } from '@lib/api';

export const Info = ({ product_id }: { product_id: string }) => {
  const { data: product, isLoading: is_loading } = useProducts().useFind({ id: product_id });
  const [is_editing, setIsEditing] = useState(false);
  const update_mutation = useProducts().useUpdate(product_id);
  const toast = useToast();
  const locale = useLocale();
  const tProducts = useTranslations('admin.products');
  const tCommon = useTranslations('common');
  const tFields = useTranslations('admin.common.form.fields');

  const handleSubmitForm = async (data: CreateProductFormData | UpdateProductFormData) => {
    try {
      await update_mutation.mutateAsync(data);
      toast.success(tCommon('updated_successfully'));
      setIsEditing(false);
    } catch {
      toast.error(tCommon('error_while_updating'));
      console.error(update_mutation.error);
    }
  };

  const fields = [
    { label: tFields('name_label'), value: product?.name },
    { label: tFields('description_label'), value: product?.description },
    { label: tFields('price_label'), value: product?.price_USD ? `$${product.price_USD}` : undefined },
    { label: tFields('category_label'), value: product?.category?.name },
    { label: tFields('created_date_label'), value: formatDate({ date: product?.created, locale }) || tCommon('not_specified') },
    { label: tFields('updated_date_label'), value: formatDate({ date: product?.updated, locale }) || tCommon('not_specified') },
  ];
  if (product?.discount_price_USD) {
    fields.push({ label: tFields('discount_label'), value: `$${product.discount_price_USD}` });
  }

  return product ? (
    <InfoDisplay
      title={tProducts('info_title')}
      image={product?.image || undefined}
      image_alt={product?.name || ''}
      fields={fields}
      is_loading={is_loading}
      is_editing={is_editing}
      onEdit={() => setIsEditing(true)}
    >
      <ProductFormModal
        is_open={is_editing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleSubmitForm}
        is_loading={is_loading || update_mutation.isPending}
        initial_data={{
          ...product,
          image_type: 'url',
          url: getImageUrl(product?.image),
          description: product?.description || undefined,
          discount_price_USD: product?.discount_price_USD || undefined,
        }}
      />
    </InfoDisplay>
  ) : null;
}; 