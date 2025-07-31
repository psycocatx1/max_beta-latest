import { UseFormRegister, FieldErrors, RegisterOptions, Path, FieldValues } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import styles from '../FormStyles.module.scss';

interface TextareaFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  is_loading?: boolean;
  field_name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  rules?: RegisterOptions<T, Path<T>>;
  hint?: string;
  rows?: number;
}

export const TextareaField = <T extends FieldValues>({
  register,
  errors,
  is_loading = false,
  field_name,
  label,
  placeholder,
  required = false,
  rules,
  hint,
  rows = 4
}: TextareaFieldProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');
  const defaultLabel = label || tFields('textarea_label');
  const defaultPlaceholder = placeholder || tFields('textarea_placeholder');
  return (
    <div className={styles.admin_form_section}>
      <div className={styles.admin_form_field}>
        <label className={styles.admin_form_label} data-intl-default-key="admin.common.form.fields.textarea_label">
          {defaultLabel} {required && '*'}
        </label>
        <textarea
          className={`${styles.admin_form_textarea} ${errors[field_name] ? styles.admin_form_textarea_error : ''}`}
          placeholder={defaultPlaceholder}
          disabled={is_loading}
          rows={rows}
          data-intl-validation-key="admin.common.form.validation.textarea_required"
          {...register(field_name, {
            required: required ? tValidation('field_required') : false,
            ...rules
          })}
        />
        {hint && (
          <div className={styles.admin_form_hint}>
            {hint}
          </div>
        )}
        {errors[field_name] && (
          <span className={styles.admin_form_error}>
            {String(errors[field_name]?.message || '')}
          </span>
        )}
      </div>
    </div>
  );
}; 