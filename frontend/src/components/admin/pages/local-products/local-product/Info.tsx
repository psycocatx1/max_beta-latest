'use client';

import { InfoDisplay, InfoDisplayField } from "@/components/admin/common/InfoDisplay";
import { LocalProductFormModal } from "@/components/admin/common/Modal/Forms/LocalProductFormModal";
import { useLocalProducts } from "@/hooks/admin/products";
import { UpdateLocalProductDto } from '@lib/api/services/types/local-products.types';
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Loader } from "@/components/admin/common/Loader";
import { NotFound } from "@/components/admin/common/NotFound";
import { formatDate } from "@/lib/intl";
import { useToast } from "@/hooks/useToast";
import { Locale, Product } from "@prisma/client";

export const Info = ({ local_product_id }: { local_product_id: string }) => {
  const { data: local_product, isLoading: is_loading } = useLocalProducts().useFind(local_product_id);
  const [is_modal_open, setIsModalOpen] = useState(false);
  const update_mutation = useLocalProducts().useUpdate(local_product_id);
  const tFields = useTranslations('admin.common.form.fields');
  const tLocalProducts = useTranslations('admin.local_products');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const toast = useToast();

  const handleUpdateProduct = (data: UpdateLocalProductDto) => {
    try {
      update_mutation.mutate(data);
      toast.success(tCommon('updated_successfully'));
      setIsModalOpen(false);
    } catch {
      toast.error(tCommon('error_while_updating'));
      console.error(update_mutation.error);
    }
  }

  if (is_loading) return <Loader />;

  if (!local_product) return <NotFound />;

  const db_locale: Locale = local_product.locale;
  const db_product: Product = local_product.product;

  const fields: InfoDisplayField[] = [
    { label: tFields('name_label'), value: local_product.name },
    { label: tFields('description_label'), value: local_product.description },
    { label: tFields('price_label'), value: `${local_product.price} ${local_product.locale.currency}` },
    ...(local_product.discount_price ? [{ label: tFields('discount_label'), value: `${local_product.discount_price} ${local_product.locale.currency}` }] : []),
    { label: tFields('created_date_label'), value: formatDate({ date: local_product.created, locale }) },
    { label: tFields('updated_date_label'), value: formatDate({ date: local_product.updated, locale }) },
    { label: tFields('original_product_label'), value: db_product.name },
    { label: tFields('description_label'), value: db_product.description },
    { label: tFields('price_label'), value: `$${db_product.price_USD}` },
    ...(db_product.discount_price_USD ? [{ label: tFields('discount_label'), value: `$${db_product.discount_price_USD}` }] : []),
    { label: tFields('original_locale_label'), value: db_locale.name },
    { label: tFields('language_label'), value: db_locale.language },
    { label: tFields('currency_label'), value: db_locale.currency },
    { label: tFields('symbol_label'), value: db_locale.symbol },
    { label: tFields('phone_code_label'), value: db_locale.phone_code }
  ]

  return (
    <InfoDisplay
      image={local_product.product.image}
      image_alt={local_product.name}
      locale_image={local_product.locale.image}
      locale_image_alt={local_product.locale.name}
      title={tLocalProducts('info_title')}
      fields={fields}
      is_loading={is_loading}
      is_editing={is_modal_open}
      onEdit={() => setIsModalOpen(true)}
    >
      <LocalProductFormModal
        is_open={is_modal_open}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdateProduct}
        is_loading={update_mutation.isPending}
        initial_data={local_product}
        is_edit
        locale={local_product.locale}
        is_excluded={local_product.is_excluded}
      />
    </InfoDisplay>
  );
}