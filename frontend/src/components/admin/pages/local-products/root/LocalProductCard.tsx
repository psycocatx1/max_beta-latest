'use client';

import { useState } from 'react';
import styles from './LocalProductCard.module.scss';
import { LocalProductFormModal } from '@/components/admin/common/Modal/Forms/LocalProductFormModal';
import { useToast } from '@/hooks/useToast/useToast';
import { useLocalProducts } from '@/hooks/admin/products';
import { CreateLocalProductDto, ExtendedLocalProduct, UpdateLocalProductDto } from '@lib/api/services/types/local-products.types';
import { Card } from '@/components/admin/common/ListPage';
import { OriginalItem } from './OriginalItemCard';
import { formatDate } from '@/lib/intl';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@hooks/useRouting';

interface LocalProductCardProps {
  root: 'locale' | 'product' | 'none'
  product: ExtendedLocalProduct;
}

export const LocalProductCard = ({ product, root }: LocalProductCardProps) => {
  const [is_edit_modal_open, setIsEditModalOpen] = useState(false);
  const update_mutation = useLocalProducts().useUpdate(product.id);
  const delete_mutation = useLocalProducts().useDelete(product.id);
  const toast = useToast();
  const locale = useLocale();
  const tLocalProducts = useTranslations('admin.local_products');
  const tCommon = useTranslations('common');
  const tFields = useTranslations('admin.common.form.fields');
  const router = useRouter();

  if (!product.product || !product.locale) return null;

  const handleUpdate = async (data: CreateLocalProductDto | UpdateLocalProductDto) => {
    try {
      await update_mutation.mutateAsync(data);
      setIsEditModalOpen(false);
      toast.success(tCommon('updated_successfully'));
    } catch {
      toast.error(tCommon('error_while_updating'));
    }
  };

  const handleDelete = async () => {
    if (!confirm(tLocalProducts('confirm_delete'))) return;
    try {
      await delete_mutation.mutateAsync();
      toast.success(tCommon('deleted_successfully'));
    } catch {
      toast.error(tCommon('error_while_deleting'));
      console.error(delete_mutation.error);
    }
  };

  const handleView = () => router.push({ pathname: `/admin/local-products/[local_product_id]`, params: { local_product_id: product.id } });

  return (
    <div className={styles.local_product_item}>
      <Card
        title={product.name}
        onEdit={() => setIsEditModalOpen(true)}
        subtitle={product.description || ''}
        onDelete={handleDelete}
        onView={handleView}
      >
        <div className={styles.local_product_item_price}>
          {tFields('price_label')}: {product.price} {product.locale.currency_symbol}
        </div>
        {renderOriginalItem(product, root)}

        <div className={styles.local_product_item_meta}>
          <span className={styles.local_product_item_date}>
            {tFields('created_date_label')}: {formatDate({ date: product.created, locale })}
          </span>
          <span className={styles.local_product_item_date}>
            {tFields('updated_date_label')}: {formatDate({ date: product.updated, locale })}
          </span>
        </div>
      </Card>

      <LocalProductFormModal
        is_open={is_edit_modal_open}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        initial_data={{
          name: product.name,
          description: product.description,
          price: product.price,
          discount_price: product.discount_price,
          product_id: product.product_id,
          locale_id: product.locale_id,
        }}
        is_loading={update_mutation.isPending}
        locale={product.locale}
        is_excluded={product.is_excluded}
        is_edit
      />
    </div>
  );
};

function renderOriginalItem(product: ExtendedLocalProduct, root: 'locale' | 'product' | 'none') {
  switch (root) {
    case 'locale':
      return <OriginalItem product={product} root={root} />;
    case 'product':
      return <OriginalItem product={product} root={root} />;
    case 'none':
      return [
        <OriginalItem product={product} root={'product'} key={`${product.id}-product`} />,
        <OriginalItem product={product} root={'locale'} key={`${product.id}-locale`} />,
      ]
  }
}