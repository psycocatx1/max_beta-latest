'use client';

import { useForm } from 'react-hook-form';
import { NameSection, DescriptionSection, CategorySelectSection, PriceSection, ImageSection, mergeDefaultValues } from '@/components/admin/common/Form';
import { BaseFormModal } from './BaseFormModal';
import { CreateServiceFormData, UpdateServiceFormData } from '@hooks/admin/services';
import { useTranslations } from 'next-intl';
import { CategoryType } from '@prisma/client';

interface ServiceFormModalProps {
  is_open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateServiceFormData | UpdateServiceFormData) => void;
  is_loading?: boolean;
  initial_data?: Partial<ServiceFormData>;
  is_edit?: boolean;
}

export interface ServiceFormData {
  name: string;
  description: string;
  price_USD: number;
  discount_price_USD?: number;
  category_id: string;
  files?: FileList;
  url?: string;
  image_type: 'file' | 'url';
}

const DEFAULT_VALUES: ServiceFormData = {
  name: '',
  description: '',
  price_USD: 0,
  category_id: '',
  image_type: 'file',
}

export const ServiceFormModal = ({
  is_open,
  onClose,
  onSubmit,
  is_loading = false,
  initial_data,
  is_edit = false
}: ServiceFormModalProps) => {
  const tServices = useTranslations('admin.services');
  const tFields = useTranslations('admin.common.form.fields');
  const tCommon = useTranslations('common');

  const defaultValues = mergeDefaultValues<ServiceFormData, 'image_type'>(
    DEFAULT_VALUES,
    initial_data,
    { image_type: 'file' }
  );

  const form = useForm<ServiceFormData>({
    mode: 'onChange',
    defaultValues
  });

  const handleSubmit = (data: ServiceFormData) => {
    const submitData: CreateServiceFormData | UpdateServiceFormData = {
      ...data,
      file: data.image_type === 'file' && data.files ? data.files[0] : undefined,
      image: data.image_type === 'url' ? data.url : undefined,
    };
    onSubmit(submitData);
  };

  const { register, watch, setValue, formState: { errors } } = form;

  return (
    <BaseFormModal
      is_open={is_open}
      onClose={onClose}
      title={tServices(is_edit ? 'edit_title' : 'create_title')}
      form={form}
      onSubmit={handleSubmit}
      is_loading={is_loading}
      save_button_text={tCommon(is_edit ? 'save' : 'create')}
      loading_text={tCommon(is_edit ? 'saving' : 'creating')}
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
        type={CategoryType.SERVICE}
        register={register}
        errors={errors}
        is_loading={is_loading}
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
        errors={errors}
        price_field_name="price_USD"
        discount_price_field_name="discount_price_USD"
        is_loading={is_loading}
      />
    </BaseFormModal>
  );
}; 