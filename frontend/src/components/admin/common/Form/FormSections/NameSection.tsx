'use client';

import { UseFormRegister, FieldErrors, Path, FieldValues } from 'react-hook-form';
import { FormStyles } from '@/components/admin/common/Form';
import { useTranslations } from 'next-intl';

interface NameSectionProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  field_name: Path<T>;
  is_loading?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  max_length?: number;
  hint?: string;
}

export const NameSection = <T extends FieldValues>({
  register,
  errors,
  field_name,
  is_loading = false,
  label,
  placeholder,
  required = true,
  max_length = 512,
  hint
}: NameSectionProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');

  const defaultLabel = label || tFields('name_label');
  const defaultPlaceholder = placeholder || tFields('name_placeholder');
  const defaultHint = hint || tFields('name_hint', { max: max_length });

  return (
    <div className={FormStyles.admin_form_section}>
      <div className={FormStyles.admin_form_field}>
        <label className={FormStyles.admin_form_label} data-intl-default-key="admin.common.form.fields.name_label">
          {defaultLabel} {required && '*'}
        </label>
        <input
          type="text"
          className={`${FormStyles.admin_form_input} ${errors[field_name] ? FormStyles.admin_form_input_error : ''}`}
          placeholder={defaultPlaceholder}
          disabled={is_loading}
          data-intl-validation-key="admin.common.form.validation.name_max_length,admin.common.form.validation.field_required"
          {...register(field_name, {
            required: required ? tValidation('field_required') : false,
            maxLength: {
              value: max_length,
              message: tValidation('name_max_length', { max: max_length })
            }
          })}
        />
        <div className={FormStyles.admin_form_hint} data-intl-default-key="admin.common.form.fields.name_hint">{defaultHint}</div>
        {errors[field_name] && (
          <span className={FormStyles.admin_form_error}>
            {String(errors[field_name]?.message || '')}
          </span>
        )}
      </div>
    </div>
  );
}; 