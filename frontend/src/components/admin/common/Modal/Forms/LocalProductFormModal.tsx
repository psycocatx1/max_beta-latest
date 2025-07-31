'use client';

import { useForm } from 'react-hook-form';
import { NameSection, PriceSection, ItemSelectSection, LocaleSelectSection, mergeDefaultValues, DescriptionSection } from '@/components/admin/common/Form';
import { BaseFormModal } from './BaseFormModal';
import { useEffect, useMemo } from 'react';
import { CreateLocalProductDto, UpdateLocalProductDto } from '@lib/api/services/types/local-products.types';
import { useTranslations } from 'next-intl';
import { CategoryType, Locale, LocalProduct } from '@prisma/client';
import { useLocalProducts } from '@/hooks/admin/products';

interface LocalProductFormModalProps {
  is_open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLocalProductDto) => void;
  is_loading?: boolean;
  initial_data?: Partial<LocalProductFormData>;
  locale?: Locale
  is_edit?: boolean;
  is_excluded?: boolean;
  currency_symbol?: string;
}

export interface LocalProductFormData extends CreateLocalProductDto {
  name: string;
  description: string;
  price: number;
  discount_price: number | undefined;
  locale_id: string;
  product_id: string;
  is_excluded: boolean;
}

const DEFAULT_VALUES: Partial<LocalProductFormData> = {
  name: '',
  description: '',
  price: 0,
  discount_price: undefined,
  locale_id: '',
  product_id: '',
}

export const LocalProductFormModal = ({
  is_open,
  onClose,
  onSubmit,
  is_loading = false,
  initial_data,
  is_edit = false,
  locale,
  is_excluded = false,
  currency_symbol,
}: LocalProductFormModalProps) => {
  const tLocalProducts = useTranslations('admin.local_products');
  const tFields = useTranslations('admin.common.form.fields');
  const tCommon = useTranslations('common');
  const { data: local_products } = useLocalProducts().useGet({
    product_id: initial_data?.product_id || '',
    locale_id: initial_data?.locale_id || '',
    is_excluded,
    skip: 0,
    take: 1,
  }, is_excluded);

  const local_product: LocalProduct | undefined = useMemo(() => local_products?.items[0], [local_products?.items]);
  const defaultValues = useMemo(() => mergeDefaultValues<LocalProductFormData, 'product_id'>(DEFAULT_VALUES, initial_data), [initial_data]);
  const form = useForm<LocalProductFormData>({ mode: 'onChange', defaultValues, });
  const { register, formState: { errors }, reset } = form;

  useEffect(() => {
    if (local_product) {
      reset({
        ...defaultValues,
        name: local_product.name,
        description: local_product.description || undefined,
        price: local_product.price,
        discount_price: local_product.discount_price || undefined,
        locale_id: local_product.locale_id,
        product_id: local_product.product_id,
      });
    }
  }, [local_product, defaultValues, reset]);

  const update_local_product_mutation = useLocalProducts().useUpdate(local_product?.id || '');
  const onUpdate = (data: UpdateLocalProductDto) => update_local_product_mutation.mutate({ ...data, is_excluded: !is_excluded });

  const handleSubmitWrapper = (data: LocalProductFormData) => {
    if (local_product) {
      onUpdate(data as UpdateLocalProductDto);
    } else {
      onSubmit(data as CreateLocalProductDto);
    }
  };

  return (
    <BaseFormModal<LocalProductFormData>
      is_open={is_open}
      onClose={onClose}
      title={!!local_product ? tCommon('restore_title') : tLocalProducts(is_edit ? 'edit_title' : 'create_title')}
      form={form}
      onSubmit={handleSubmitWrapper}
      is_loading={is_loading}
      save_button_text={!!local_product ? tCommon('restore') : tCommon(is_edit ? 'save' : 'create')}
      loading_text={!!local_product ? tCommon('restoring') : tCommon(is_edit ? 'saving' : 'creating')}
    >
      {!initial_data?.locale_id && <LocaleSelectSection
        register={register}
        errors={errors}
        is_loading={is_loading}
        field_name="locale_id"
        label={tFields('locale_label')}
        placeholder={tFields('locale_placeholder')}
      />}
      {!initial_data?.product_id && <ItemSelectSection<LocalProductFormData>
        register={register}
        errors={errors}
        field_name="product_id"
        label={tFields('product_label')}
        type={CategoryType.PRODUCT}
      />}
      <NameSection
        is_loading={is_loading}
        register={register}
        errors={errors}
        field_name="name"
        label={tFields('name_label')}
        placeholder={tFields('name_placeholder')}
      />
      <DescriptionSection
        is_loading={is_loading}
        register={register}
        errors={errors}
        field_name="description"
        label={tFields('description_label')}
        placeholder={tFields('description_placeholder')}
      />
      <PriceSection
        register={register}
        errors={errors}
        is_loading={is_loading}
        price_field_name="price"
        discount_price_field_name="discount_price"
        label={tFields('price_label')}
        discount_label={tFields('discount_label')}
        currency_symbol={locale?.currency_symbol || currency_symbol}
      />
    </BaseFormModal>
  );
};