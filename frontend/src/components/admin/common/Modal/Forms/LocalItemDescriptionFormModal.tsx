'use client';

import { useForm } from 'react-hook-form';
import { LocalItemDescriptionContentSection } from '@/components/admin/common/Form/FormSections/LocalItemDescriptionContentSection';
import { BaseFormModal, ItemSelectSection, LocaleSelectSection, mergeDefaultValues, SelectField } from '@/components/admin/common/Form';
import { useLocalProducts } from '@/hooks/admin/products';
import { useLocalServices } from '@/hooks/admin/services';
import { getImageUrl } from '@/lib/api/image-url';
import { useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { CategoryType, LocalItemDescriptionType } from '@prisma/client';
import { CreateLocalItemDescriptionFormData, UpdateLocalItemDescriptionFormData } from '@lib/api/services/types/local-item-descriptions.types';

interface LocalItemDescriptionFormModalProps {
  is_open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLocalItemDescriptionFormData | UpdateLocalItemDescriptionFormData) => void;
  is_loading?: boolean;
  initial_data?: Partial<LocalItemDescriptionFormData>;
  type: CategoryType;
  is_edit?: boolean;
}

export interface LocalItemDescriptionFormData {
  content: string;
  text?: string;
  title?: string;
  type: LocalItemDescriptionType;
  files?: FileList;
  file?: File;
  image?: string;
  url?: string;
  image_type?: 'file' | 'url';
  local_item_id: string;
  locale_id?: string;
  item_id?: string;
}

const DEFAULT_VALUES: LocalItemDescriptionFormData = {
  content: '',
  text: '',
  title: '',
  type: LocalItemDescriptionType.TEXT,
  local_item_id: '',
  image_type: 'url',
  image: '',
  url: '',
}

export const LocalItemDescriptionFormModal = ({
  is_open,
  onClose,
  onSubmit,
  is_loading = false,
  initial_data,
  type,
  is_edit = false,
}: LocalItemDescriptionFormModalProps) => {
  const tLocalItemDescriptions = useTranslations('admin.local_item_descriptions');
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');
  const tCommon = useTranslations('common');

  const defaultValues = mergeDefaultValues<LocalItemDescriptionFormData, 'local_item_id'>(
    DEFAULT_VALUES as LocalItemDescriptionFormData,
    initial_data,
  );

  const form = useForm<LocalItemDescriptionFormData>({
    mode: 'onChange',
    defaultValues
  });

  const { data: local_products, isLoading: is_loading_local_products } = useLocalProducts().useGet({ skip: 0, take: 1000 }, !initial_data?.local_item_id && type === CategoryType.PRODUCT);
  const { data: local_services, isLoading: is_loading_local_services } = useLocalServices().useGet({ skip: 0, take: 1000 }, !initial_data?.local_item_id && type === CategoryType.SERVICE);

  const local_items = useMemo(() => type === CategoryType.PRODUCT ? local_products : local_services, [type, local_products, local_services]);

  const { register, watch, setValue, formState: { errors } } = form;

  const handleSubmitWrapper = (data: LocalItemDescriptionFormData) => {
    if (data.type === 'IMAGE') {
      const hasFile = data.image_type === 'file' && data.files && data.files.length > 0;
      const hasUrl = data.image_type === 'url' && data.content && data.content.trim() !== '';

      if (!hasFile && !hasUrl) {
        alert(tValidation('image_required'));
        return;
      }
    }

    const submitData = {
      ...data,
      content: data.type === 'IMAGE' && data.image_type === 'url' ? data.content : data.type === 'TEXT' ? data.text : data.content,
      file: data.type === 'IMAGE' && data.image_type === 'file' ? data.files?.[0] : undefined,
      ...(type === CategoryType.PRODUCT ? { local_product_id: data.local_item_id } : { local_service_id: data.local_item_id })
    };
    onSubmit(submitData);
  };

  useEffect(() => {
    if (initial_data && initial_data.type === 'IMAGE') {
      if (initial_data.content) {
        setValue('image_type', 'url');
        setValue('content', getImageUrl(initial_data.content) || initial_data.content);
      } else {
        setValue('image_type', 'file');
      }
    } else if (initial_data && initial_data.type === 'TEXT') {
      setValue('text', initial_data.content);
    }
  }, [initial_data, setValue]);

  const title = is_edit ? tLocalItemDescriptions('edit_title') : tLocalItemDescriptions('create_title');

  return (
    <BaseFormModal
      is_open={is_open}
      onClose={onClose}
      title={title}
      form={form}
      onSubmit={handleSubmitWrapper}
      is_loading={is_loading}
      save_button_text={is_edit ? tCommon('save') : tCommon('create')}
      loading_text={is_edit ? tCommon('saving') : tCommon('creating')}
      size="lg"
    >
      {!initial_data?.locale_id && !initial_data?.local_item_id && <LocaleSelectSection<LocalItemDescriptionFormData>
        register={register}
        errors={errors}
        label={tFields('locale_label')}
        field_name="locale_id"
        placeholder={tFields('locale_placeholder')}
      />}

      {!initial_data?.item_id && !initial_data?.local_item_id && <ItemSelectSection<LocalItemDescriptionFormData>
        register={register}
        errors={errors}
        field_name="item_id"
        label={tFields(`${type.toLowerCase()}_label`)}
        placeholder={tFields(`${type.toLowerCase()}_placeholder`)}
        type={type}
      />}

      {!initial_data?.local_item_id && <SelectField<LocalItemDescriptionFormData>
        register={register}
        errors={errors}
        field_name="local_item_id"
        is_loading={is_loading_local_products || is_loading_local_services}
        options={[{ label: tFields(`select_local_${type.toLowerCase()}`), value: '' }, ...(local_items?.items.map(item => ({ label: item.name, value: item.id })) || [])]}
        label={tFields(`local_${type.toLowerCase()}_label`)}
        placeholder={tFields(`local_${type.toLowerCase()}_placeholder`)}
        required
      />}

      <LocalItemDescriptionContentSection<LocalItemDescriptionFormData>
        register={register}
        errors={errors}
        watch={watch}
        is_loading={is_loading}
        type_field_name="type"
        title_field_name="title"
        text_field_name="text"
        url_field_name="url"
      />
    </BaseFormModal>
  );
}; 