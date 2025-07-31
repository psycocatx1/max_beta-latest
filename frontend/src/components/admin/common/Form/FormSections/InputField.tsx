import { UseFormRegister, FieldErrors, RegisterOptions, Path, FieldValues } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import styles from '../FormStyles.module.scss';

interface InputFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  is_loading?: boolean;
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  rules?: RegisterOptions<T, Path<T>>;
  hint?: string;
}

export const InputField = <T extends FieldValues>({
  register,
  errors,
  is_loading = false,
  name,
  label,
  type = 'text',
  placeholder = '',
  required = false,
  rules,
  hint
}: InputFieldProps<T>) => {
  const tValidation = useTranslations('admin.common.form.validation');

  return (
    <div className={styles.admin_form_section}>
      <div className={styles.admin_form_field}>
        <label className={styles.admin_form_label}>
          {label} {required && '*'}
        </label>
        <input
          type={type}
          className={`${styles.admin_form_input} ${errors[name] ? styles.admin_form_input_error : ''}`}
          placeholder={placeholder}
          disabled={is_loading}
          data-intl-validation-key="admin.common.form.validation.field_required"
          {...register(name, {
            required: required ? tValidation('field_required') : false,
            ...rules
          })}
        />
        {hint && (
          <div className={styles.admin_form_hint}>
            {hint}
          </div>
        )}
        {errors[name] && (
          <span className={styles.admin_form_error}>
            {String(errors[name]?.message || '')}
          </span>
        )}
      </div>
    </div>
  );
}; 