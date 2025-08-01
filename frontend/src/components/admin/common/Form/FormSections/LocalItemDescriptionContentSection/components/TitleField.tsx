import { FormStyles } from '@/components/admin/common/Form';
import { useTranslations } from 'next-intl';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface TitleFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  is_loading: boolean;
  title_field_name: Path<T>;
}

export const TitleField = <T extends FieldValues>({ register, errors, is_loading, title_field_name }: TitleFieldProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');
  return (
    <div className={FormStyles.admin_form_field}>
      <label className={FormStyles.admin_form_label} data-intl-default-key="admin.common.form.fields.title_label">
        {tFields('title_label')}
      </label>
      <input
        type="text"
        className={`${FormStyles.admin_form_input} ${errors[title_field_name] ? FormStyles.admin_form_input_error : ''}`}
        placeholder={tFields('title_placeholder')}
        disabled={is_loading}
        data-intl-validation-key="admin.common.form.validation.title_max_length"
        {...register(title_field_name, {
          maxLength: {
            value: 100,
            message: tValidation('title_max_length')
          }
        })}
      />
      <div className={FormStyles.admin_form_hint} data-intl-default-key="admin.common.form.fields.title_hint">{tFields('title_hint')}</div>
      {errors[title_field_name] && (
        <span className={FormStyles.admin_form_error}>
          {String(errors[title_field_name]?.message || '')}
        </span>
      )}
    </div>
  );
};