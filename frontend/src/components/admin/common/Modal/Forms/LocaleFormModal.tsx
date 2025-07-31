'use client';

import { useForm } from 'react-hook-form';
import { BaseFormModal, mergeDefaultValues, InputField } from '@/components/admin/common/Form';
import { ImageSection } from '@/components/admin/common/Form/FormSections/ImageSection';
import FormStyles from '@/components/admin/common/Form/FormStyles.module.scss';
import { useTranslations } from 'next-intl';
import { CreateLocaleFormData, UpdateLocaleFormData } from '@/lib/api/services/types/locales.types';

export interface LocaleFormData {
  name: string;
  language: string;
  symbol: string;
  currency: string;
  currency_symbol: string;
  phone_code: string;
  url?: string;
  files?: File[];
  image_type: 'file' | 'url';
  is_excluded?: boolean;
}

const DEFAULT_VALUES: LocaleFormData = {
  image_type: 'file',
  name: '',
  language: '',
  symbol: '',
  currency: '',
  currency_symbol: '',
  files: [],
  url: '',
  phone_code: '',
}

interface LocaleFormModalProps {
  is_open: boolean;
  onClose: () => void;
  onCreate?: (data: CreateLocaleFormData) => void;
  onUpdate?: (data: UpdateLocaleFormData) => void;
  is_loading?: boolean;
  initial_data?: Partial<LocaleFormData>;
  is_edit?: boolean;
}

export const LocaleFormModal = ({
  is_open,
  onClose,
  onCreate,
  onUpdate,
  initial_data,
  is_loading = false,
  is_edit = false
}: LocaleFormModalProps) => {
  const tLocales = useTranslations('admin.locales');
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');
  const tCommon = useTranslations('common');

  const defaultValues = mergeDefaultValues(
    DEFAULT_VALUES,
    initial_data,
  );

  const form = useForm<LocaleFormData>({
    mode: 'onChange',
    defaultValues
  });

  const { register, setValue, watch, formState: { errors } } = form;

  const handleSubmit = (data: LocaleFormData) => {
    const hasFile = data.image_type === 'file' && data.files && data.files.length > 0;
    const hasUrl = data.image_type === 'url' && data.url && data.url.trim() !== '';
    if (!hasFile && !hasUrl) return alert(tValidation('image_required'));

    const submitData: CreateLocaleFormData = {
      ...data,
      file: data.image_type === 'file' ? data.files?.[0] : undefined,
      image: data.image_type === 'url' ? data.url : undefined,
    };
    onCreate?.(submitData)
    onUpdate?.({ ...submitData, is_excluded: false })
  };

  return (
    <BaseFormModal<LocaleFormData>
      is_open={is_open}
      onClose={onClose}
      title={initial_data?.is_excluded ? tCommon('rerestore_title') : tLocales(is_edit ? 'edit_title' : 'create_title')}
      form={form}
      onSubmit={handleSubmit}
      is_loading={is_loading}
      save_button_text={initial_data?.is_excluded ? tCommon('restore') : tCommon(is_edit ? 'save' : 'create')}
      loading_text={initial_data?.is_excluded ? tCommon('restoring') : tCommon(is_edit ? 'saving' : 'creating')}
      size="lg"
    >
      <ImageSection<LocaleFormData>
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        is_loading={is_loading}
        label={tFields('image_label')}
        file_field_name="files"
        url_field_name="url"
        type_field_name='image_type'
        data-intl-key="admin.locales.form.flag_icon"
      />

      {/* Основная информация */}
      <div className={FormStyles.admin_form_section}>
        <div className={FormStyles.admin_form_grid}>
          <InputField
            register={register}
            errors={errors}
            is_loading={is_loading}
            name="name"
            label={tFields('name_label')}
            placeholder={tFields('name_placeholder')}
            required={true}
            rules={{
              minLength: {
                value: 2,
                message: tValidation('name_min_length', { min: 2 })
              },
              maxLength: {
                value: 512,
                message: tValidation('name_max_length', { max: 512 })
              }
            }}
            data-intl-key="admin.locales.form.name"
          />

          <InputField
            register={register}
            errors={errors}
            is_loading={is_loading}
            name="language"
            label={tFields('language_label')}
            placeholder={tFields('language_placeholder')}
            required={true}
            rules={{
              minLength: {
                value: 2,
                message: tValidation('language_min_length', { min: 2 })
              },
              maxLength: {
                value: 512,
                message: tValidation('language_max_length', { max: 512 })
              }
            }}
            data-intl-key="admin.locales.form.language"
          />

          <InputField
            register={register}
            errors={errors}
            is_loading={is_loading}
            name="symbol"
            label={tFields('symbol_label')}
            placeholder={tFields('symbol_placeholder')}
            required={true}
            rules={{
              minLength: {
                value: 2,
                message: tValidation('symbol_min_length', { min: 2 })
              },
              maxLength: {
                value: 5,
                message: tValidation('symbol_max_length', { max: 5 })
              },
              pattern: {
                value: /^[A-Z]+$/,
                message: tValidation('symbol_pattern')
              }
            }}
          />
        </div>
      </div>

      {/* Контактная информация */}
      <div className={FormStyles.admin_form_section}>
        <div className={FormStyles.admin_form_grid}>
          <InputField
            register={register}
            errors={errors}
            is_loading={is_loading}
            name="currency"
            label={tFields('currency_label')}
            placeholder={tFields('currency_placeholder')}
            required={true}
            rules={{
              minLength: {
                value: 2,
                message: tValidation('currency_min_length', { min: 2 })
              },
              maxLength: {
                value: 256,
                message: tValidation('currency_max_length', { max: 256 })
              }
            }}
          />

          <InputField
            register={register}
            errors={errors}
            is_loading={is_loading}
            name="currency_symbol"
            label={tFields('currency_symbol_label')}
            placeholder={tFields('currency_symbol_placeholder')}
            required={true}
            rules={{
              minLength: {
                value: 1,
                message: tValidation('currency_symbol_min_length', { min: 1 })
              },
              maxLength: {
                value: 5,
                message: tValidation('currency_symbol_max_length', { max: 5 })
              }
            }}
          />

          <InputField
            register={register}
            errors={errors}
            is_loading={is_loading}
            name="phone_code"
            label={tFields('phone_code_label')}
            placeholder={tFields('phone_code_placeholder')}
            required={true}
            rules={{
              minLength: {
                value: 1,
                message: tValidation('phone_code_min_length', { min: 1 })
              },
              maxLength: {
                value: 5,
                message: tValidation('phone_code_max_length', { max: 5 })
              },
              pattern: {
                value: /^\+\d+$/,
                message: tValidation('phone_code_pattern')
              }
            }}
          />
        </div>
      </div>
    </BaseFormModal>
  );
}; 