'use client';

import { UseFormRegister, FieldErrors, Path, FieldValues } from 'react-hook-form';
import { FormStyles } from '@/components/admin/common/Form';
import { useTranslations } from 'next-intl';

interface DescriptionSectionProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  field_name: Path<T>;
  is_loading?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  max_length?: number;
  rows?: number;
  hint?: string;
}

export const DescriptionSection = <T extends FieldValues>({
  register,
  errors,
  field_name,
  is_loading = false,
  label,
  placeholder,
  required = true,
  max_length = 2000,
  rows = 4,
  hint
}: DescriptionSectionProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');

  const defaultLabel = label || tFields('description_label');
  const defaultPlaceholder = placeholder || tFields('description_placeholder');
  const defaultHint = hint || tFields('description_hint', { max: max_length });

  return (
    <div className={FormStyles.admin_form_section}>
      <div className={FormStyles.admin_form_field}>
        <label className={FormStyles.admin_form_label} data-intl-default-key="admin.common.form.fields.description_label" >
          {defaultLabel} {required && '*'}
        </label>
        <textarea
          className={`${FormStyles.admin_form_textarea} ${errors[field_name] ? FormStyles.admin_form_textarea_error : ''}`}
          placeholder={defaultPlaceholder}
          disabled={is_loading}
          rows={rows}
          data-intl-validation-key="admin.common.form.validation.description_max_length,admin.common.form.validation._required"
          {...register(field_name, {
            required: required ? tValidation('description_required') : false,
            maxLength: {
              value: max_length,
              message: tValidation('description_max_length', { max: max_length })
            }
          })}
        />
        <div className={FormStyles.admin_form_hint} data-intl-default-key="admin.common.form.fields.description_hint">{defaultHint}</div>
        {errors[field_name] && (
          <span className={FormStyles.admin_form_error}>
            {String(errors[field_name]?.message || '')}
          </span>
        )}
      </div>
    </div>
  );
}; 