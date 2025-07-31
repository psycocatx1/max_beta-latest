'use client';

import { useForm } from 'react-hook-form';
import { BaseFormModal } from './BaseFormModal';
import { LocaleSelectSection, NameSection, TextareaField, mergeDefaultValues, CategorySelectSection } from '@/components/admin/common/Form';
import { useTranslations } from 'next-intl';
import { CreateLocalCategoryDto, UpdateLocalCategoryDto, CategoryType } from '@lib/api/services';
import { useEffect, useMemo } from 'react';
import { useLocalCategories } from '@/hooks/admin/categories';
import { LocalCategory } from '@prisma/client';


interface LocalCategoryFormModalProps {
  is_open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLocalCategoryDto | UpdateLocalCategoryDto) => void;
  is_loading?: boolean;
  is_edit_mode?: boolean;
  initial_data?: Partial<LocalCategoryFormData>;
  type: CategoryType;
  is_excluded?: boolean;
}

export interface LocalCategoryFormData extends CreateLocalCategoryDto {
  name: string;
  description: string;
  locale_id: string;
  category_id: string;
  is_excluded: boolean;
}

const DEFAULT_VALUES: CreateLocalCategoryDto = {
  name: '',
  description: '',
  locale_id: '',
  category_id: '',
};

export const LocalCategoryFormModal = ({
  is_open,
  type,
  onClose,
  onSubmit,
  initial_data,
  is_loading = false,
  is_edit_mode = false,
  is_excluded = false,
}: LocalCategoryFormModalProps) => {
  const tLocalCategories = useTranslations('admin.local_categories');
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');
  const tCommon = useTranslations('common');

  const { data: local_categories } = useLocalCategories().useGet({
    category_id: initial_data?.category_id || '',
    locale_id: initial_data?.locale_id || '',
    is_excluded,
    skip: 0,
    take: 1,
  }, is_excluded);

  const local_category: LocalCategory | undefined = useMemo(() => local_categories?.items[0], [local_categories?.items]);
  const defaultValues = useMemo(() => mergeDefaultValues<CreateLocalCategoryDto, 'locale_id' | 'category_id'>(DEFAULT_VALUES, initial_data), [initial_data]);
  const form = useForm<CreateLocalCategoryDto>({ mode: 'onChange', defaultValues });
  const { register, formState: { errors }, reset } = form;

  useEffect(() => {
    if (local_category) {
      reset({
        ...defaultValues,
        name: local_category.name,
        description: local_category.description || undefined,
        locale_id: local_category.locale_id,
        category_id: local_category.category_id,
      });
    }
  }, [local_category, reset, defaultValues]);

  const update_local_category_mutation = useLocalCategories().useUpdate(local_category?.id || '');
  const onUpdate = (data: UpdateLocalCategoryDto) => update_local_category_mutation.mutate({ ...data, is_excluded: !is_excluded });

  const handleSubmit = (data: CreateLocalCategoryDto) => {
    if (local_category) {
      onUpdate(data as UpdateLocalCategoryDto);
    } else {
      onSubmit(data as CreateLocalCategoryDto);
    }
  };

  return (
    <BaseFormModal
      is_open={is_open}
      onClose={onClose}
      title={!!local_category ? tCommon('restore_title') : tLocalCategories(is_edit_mode ? 'edit_title' : 'create_title')}
      form={form}
      onSubmit={handleSubmit}
      is_loading={is_loading}
      save_button_text={!!local_category ? tCommon('restore') : tCommon(is_edit_mode ? 'save' : 'create')}
      loading_text={!!local_category ? tCommon('restoring') : tCommon(is_edit_mode ? 'saving' : 'creating')}
    >
      {!initial_data?.locale_id && <LocaleSelectSection
        register={register}
        errors={errors}
        field_name="locale_id"
        label={tFields('locale_label')}
        placeholder={tFields('locale_placeholder')}
        is_loading={is_loading}
      />}

      {!initial_data?.category_id && <CategorySelectSection
        register={register}
        errors={errors}
        is_loading={is_loading}
        label={tFields('category_label')}
        placeholder={tFields('category_placeholder')}
        type={type}
        field_name="category_id"
        use_hierarchy
      />}

      <NameSection
        is_loading={is_loading}
        register={register}
        field_name="name"
        errors={errors}
        label={tFields('name_label')}
        placeholder={tFields('name_placeholder')}
      />

      <TextareaField
        register={register}
        errors={errors}
        is_loading={is_loading}
        field_name="description"
        label={tFields('description_label')}
        placeholder={tFields('description_placeholder')}
        hint={tFields('description_hint', { max: 4096 })}
        rules={{
          maxLength: {
            value: 4096,
            message: tValidation('description_max_length', { max: 4096 })
          }
        }}
      />
    </BaseFormModal>
  );
}; 