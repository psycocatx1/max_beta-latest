import { FormStyles } from '@/components/admin/common/Form';
import { useTranslations } from 'next-intl';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { LocalItemDescriptionType } from '@prisma/client';

interface ContentTypeSelectProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  is_loading: boolean;
  type_field_name: Path<T>;
}

export const ContentTypeSelect = <T extends FieldValues>({ register, errors, is_loading, type_field_name }: ContentTypeSelectProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');

  return (
    <div className={FormStyles.admin_form_field}>
      <label className={FormStyles.admin_form_label} data-intl-default-key="admin.common.form.fields.content_type_label">
        {tFields('content_type_label')} *
      </label>
      <select
        className={`${FormStyles.admin_form_select} ${errors[type_field_name] ? FormStyles.admin_form_select_error : ''}`}
        disabled={is_loading}
        data-intl-validation-key="admin.common.form.validation.content_type_required"
        {...register(type_field_name, {
          required: tValidation('content_type_required')
        })}
      >
        <option value="" data-intl-default-key="admin.common.form.fields.content_type_placeholder">{tFields('content_type_placeholder')}</option>
        {Object.values(LocalItemDescriptionType).map(type => (
          <option key={type} value={type} data-intl-default-key={`admin.common.form.fields.content_types.${type}`}>{tFields(`content_types.${type}`)}</option>
        ))}
      </select>
      {errors[type_field_name] && (
        <span className={FormStyles.admin_form_error}>
          {String(errors[type_field_name]?.message || '')}
        </span>
      )}
    </div>
  );
};