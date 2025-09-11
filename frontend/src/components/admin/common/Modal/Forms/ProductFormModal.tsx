'use client';

import { useForm } from 'react-hook-form';
import { NameSection, DescriptionSection, CategorySelectSection, PriceSection, ImageSection, mergeDefaultValues } from '@/components/admin/common/Form';
import { BaseFormModal } from './BaseFormModal';
import { CreateProductFormData, UpdateProductFormData } from '@hooks/admin/products';
import { useTranslations } from 'next-intl';
import { CategoryType } from '@prisma/client';

interface ProductFormModalProps {
  is_open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProductFormData | UpdateProductFormData) => void;
  is_loading?: boolean;
  initial_data?: Partial<ProductFormData>;
  is_edit_mode?: boolean;
}

export interface ProductFormData {
  name: string;
  description: string;
  price_USD: number;
  discount_price_USD?: number;
  category_id: string;
  files?: FileList;
  url?: string;
  image_type: 'file' | 'url';
}

const DEFAULT_VALUES: ProductFormData = {
  name: '',
  description: '',
  price_USD: 0,
  category_id: '',
  image_type: 'file',
}

export const ProductFormModal = ({
  is_open,
  onClose,
  onSubmit,
  is_loading = false,
  initial_data,
  is_edit_mode = false
}: ProductFormModalProps) => {
  const tProducts = useTranslations('admin.products');
  const tFields = useTranslations('admin.common.form.fields');
  const tCommon = useTranslations('common');

  const defaultValues = mergeDefaultValues<ProductFormData, 'image_type'>(
    DEFAULT_VALUES,
    initial_data,
    { image_type: 'file' }
  );
  const form = useForm<ProductFormData>({ mode: 'onChange', defaultValues });

  const handleSubmit = (data: ProductFormData) => {
    const submitData: CreateProductFormData | UpdateProductFormData = {
      name: data.name,
      description: data.description,
      price_USD: data.price_USD,
      category_id: data.category_id,
      discount_price_USD: data.discount_price_USD || undefined,
      file: data.image_type === 'file' && data.files ? data.files[0] : undefined,
      image: data.image_type === 'url' ? data.url || undefined : undefined,
    };
    onSubmit(submitData);
  };

  const { register, watch, setValue, formState: { errors } } = form;

  return (
    <BaseFormModal
      is_open={is_open}
      onClose={onClose}
      title={tProducts(is_edit_mode ? 'edit_title' : 'create_title')}
      form={form}
      onSubmit={handleSubmit}
      is_loading={is_loading}
      save_button_text={is_edit_mode ? tCommon('save') : tCommon('create')}
      loading_text={is_edit_mode ? tCommon('saving') : tCommon('creating')}
    >
      <ImageSection
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        is_loading={is_loading}
        file_field_name='files'
        url_field_name='url'
        type_field_name='image_type'
      />

      {!initial_data?.category_id && <CategorySelectSection
        register={register}
        errors={errors}
        is_loading={is_loading}
        type={CategoryType.PRODUCT}
        label={tFields('category_label')}
        field_name="category_id"
        use_hierarchy
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
        price_field_name="price_USD"
        discount_price_field_name="discount_price_USD"
        errors={errors}
        is_loading={is_loading}
      />
    </BaseFormModal>
  );
}; 