'use client';

import { useForm } from 'react-hook-form';
import { BaseFormModal } from './BaseFormModal';
import { CreateCategoryFormData, UpdateCategoryFormData, flattenCategoriesForSelect, useCategories } from '@/hooks/admin/categories';
import { NameSection, DescriptionSection, ImageSection } from '@/components/admin/common/Form/FormSections';
import { SelectField } from '@/components/admin/common/Form';
import { mergeDefaultValues } from '@/components/admin/common/Form/utils/formUtils';
import { CategoryType } from '@prisma/client';
import { useTranslations } from 'next-intl';

interface CategoryFormModalProps {
  type: CategoryType;
  is_open: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateCategoryFormData | UpdateCategoryFormData) => void;
  onUpdate?: (data: UpdateCategoryFormData) => void;
  is_loading?: boolean;
  initial_data?: Partial<CategoryFormData>;
  is_edit_mode?: boolean;

}

export interface CategoryFormData {
  name: string;
  type?: CategoryType;
  description: string;
  parent_id?: string;
  files?: FileList;
  url?: string;
  image_type: 'file' | 'url';
  is_excluded?: boolean;
}

const DEFAULT_VALUES: CategoryFormData = {
  name: '',
  description: '',
  parent_id: undefined,
  image_type: 'file',
  files: undefined,
  url: undefined,
}

export const CategoryFormModal = ({
  type,
  is_open,
  onClose,
  onSubmit,
  is_loading = false,
  initial_data,
  is_edit_mode = false,
  onUpdate
}: CategoryFormModalProps) => {
  const tCommon = useTranslations('common');
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');
  const tCategories = useTranslations('admin.categories');
  const { data: categories } = useCategories().useGet({ skip: 0, take: 1000, type }, is_open);

  const defaultValues = mergeDefaultValues<CategoryFormData, 'image_type'>(
    DEFAULT_VALUES,
    { ...initial_data, type }
  );

  const form = useForm<CategoryFormData>({
    mode: 'onChange',
    defaultValues
  });

  const { register, setValue, watch, formState: { errors } } = form;

  const flatParentCategories = flattenCategoriesForSelect(categories?.items || []);

  const handleSubmit = (data: CategoryFormData) => {
    const hasFile = data.image_type === 'file' && data.files && data.files.length > 0;
    const hasUrl = data.image_type === 'url' && data.url && data.url.trim() !== '';
    if (!hasFile && !hasUrl) {
      alert(tValidation('image_required'));
      return;
    }
    const submitData: CreateCategoryFormData | UpdateCategoryFormData = {
      name: data.name,
      description: data.description || undefined,
      file: data.image_type === 'file' && data.files ? data.files[0] : undefined,
      image: data.image_type === 'url' ? data.url : undefined,
      type: type,
      parent_id: data.parent_id || undefined,
      is_excluded: false
    };
    onSubmit?.(submitData);
    onUpdate?.(submitData)
  };
  let title = '';
  switch (type) {
    case 'PRODUCT':
      title = is_edit_mode ? tCategories('edit_product_category') : tCategories('create_product_category');
      break;
    case 'SERVICE':
      title = is_edit_mode ? tCategories('edit_service_category') : tCategories('create_service_category');
      break;
  }


  return (
    <BaseFormModal
      is_open={is_open}
      onClose={onClose}
      title={initial_data?.is_excluded ? tCommon('restore_title') : title}
      form={form}
      onSubmit={handleSubmit}
      is_loading={is_loading}
      save_button_text={initial_data?.is_excluded ? tCommon('restore') : tCommon(is_edit_mode ? 'save' : 'create')}
      loading_text={initial_data?.is_excluded ? tCommon('restoring') : tCommon(is_edit_mode ? 'saving' : 'creating')}
    >
      <ImageSection<CategoryFormData>
        register={register}
        url_field_name='url'
        file_field_name='files'
        type_field_name='image_type'
        label={tFields('image_label')}
        errors={errors}
        setValue={setValue}
        watch={watch}
        is_loading={is_loading}
      />

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

      {!type && <SelectField
        register={register}
        errors={errors}
        is_loading={is_loading}
        field_name="type"
        label={tFields('category_types.label')}
        placeholder={tFields('category_types.placeholder')}
        options={Object.values(CategoryType).map(type => ({
          value: type,
          label: tFields('category_types.' + type)
        }))}
        rules={{}}
      />}

      {!initial_data?.parent_id && <SelectField
        register={register}
        errors={errors}
        is_loading={is_loading}
        field_name="parent_id"
        label={tFields('parent_label')}
        placeholder={tFields('parent_placeholder')}
        options={flatParentCategories.map((cat: { value: string; label: string }) => ({
          value: cat.value,
          label: cat.label
        }))}
        rules={{}}
      />}
    </BaseFormModal>
  );
}; 