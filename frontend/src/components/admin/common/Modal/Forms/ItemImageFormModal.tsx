'use client';

import { useForm } from 'react-hook-form';
import { ImageSection, BaseFormModal, mergeDefaultValues } from '@/components/admin/common/Form';
import { CreateItemImageFormData } from '@hooks/admin/shared';
import { useTranslations } from 'next-intl';
import { CategoryType } from '@prisma/client';

interface ItemImageFormModalProps {
  is_open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateItemImageFormData) => void;
  is_loading?: boolean;
  initial_data?: Partial<ItemImageFormData>;
  type: CategoryType;
  item_id: string;
}

export interface ItemImageFormData {
  files?: FileList;
  url?: string;
  image_type: 'file' | 'url';
  item_id: string;
}

const DEFAULT_VALUES: Partial<ItemImageFormData> = {
  image_type: 'file',
}

export const ItemImageFormModal = ({
  is_open,
  onClose,
  onSubmit,
  is_loading = false,
  initial_data,
  type,
  item_id
}: ItemImageFormModalProps) => {
  const tItemImages = useTranslations('admin.item_images');
  const tCommon = useTranslations('common');
  const tFields = useTranslations('admin.common.form.fields');

  const defaultValues = mergeDefaultValues<ItemImageFormData, 'item_id' | 'image_type'>(
    DEFAULT_VALUES,
    initial_data,
    { item_id, image_type: 'file' }
  );

  const form = useForm<ItemImageFormData>({
    mode: 'onChange',
    defaultValues
  });

  const { register, watch, setValue, formState: { errors } } = form;

  const handleSubmitWrapper = (data: ItemImageFormData) => {
    const itemImage: CreateItemImageFormData = {
      image: data.image_type === 'url' ? data.url : undefined,
      file: data.image_type === 'file' && data.files ? data.files[0] : undefined,
      ...(type === CategoryType.PRODUCT ? { product_id: item_id } : { service_id: item_id })
    }
    onSubmit(itemImage);
  };

  return (
    <BaseFormModal
      is_open={is_open}
      onClose={onClose}
      title={tItemImages('title')}
      form={form}
      onSubmit={handleSubmitWrapper}
      is_loading={is_loading}
      save_button_text={tItemImages('create_title')}
      loading_text={tCommon('creating')}
    >
      <ImageSection
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        is_loading={is_loading}
        label={tFields('image_label')}
        file_field_name='files'
        url_field_name='url'
        type_field_name='image_type'
      />
    </BaseFormModal>
  );
}; 