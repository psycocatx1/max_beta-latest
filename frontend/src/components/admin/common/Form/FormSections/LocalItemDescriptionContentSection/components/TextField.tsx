import React from 'react';
import { FormStyles } from '@/components/admin/common/Form';
import { useTranslations } from 'next-intl';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { LocalItemDescriptionType } from '@prisma/client';

interface TextFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  is_loading: boolean;
  text_field_name: Path<T>;
  content_type: LocalItemDescriptionType;
}

export const TextField = <T extends FieldValues>({ register, errors, is_loading, text_field_name, content_type }: TextFieldProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');

  return (
    <div className={FormStyles.admin_form_field}>
      <label className={FormStyles.admin_form_label} data-intl-default-key="admin.common.form.fields.text_label">
        {tFields('text_label')} *
      </label>
      <textarea
        className={`${FormStyles.admin_form_textarea} ${errors[text_field_name] ? FormStyles.admin_form_textarea_error : ''}`}
        placeholder={tFields('text_placeholder')}
        disabled={is_loading}
        rows={6}
        data-intl-validation-key="admin.common.form.validation.text_required"
        {...register(text_field_name, {
          required: content_type === LocalItemDescriptionType.TEXT ? tValidation('text_required') : false
        })}
      />
      {errors[text_field_name] && (
        <span className={FormStyles.admin_form_error}>
          {String(errors[text_field_name]?.message || '')}
        </span>
      )}
    </div>
  );
};