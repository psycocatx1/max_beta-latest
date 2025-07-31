import { UseFormRegister, FieldErrors, RegisterOptions, Path, FieldValues } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import styles from '../FormStyles.module.scss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  is_loading?: boolean;
  field_name: Path<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  rules?: RegisterOptions<T, Path<T>>;
  hint?: string;
}

export const SelectField = <T extends FieldValues>({
  register,
  errors,
  is_loading = false,
  field_name,
  label,
  options,
  placeholder,
  required = false,
  rules,
  hint
}: SelectFieldProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');
  const defaultLabel = label || tFields('select_label');
  const defaultPlaceholder = placeholder || tFields('select_placeholder');
  return (
    <div className={styles.admin_form_section}>
      <div className={styles.admin_form_field}>
        <label className={styles.admin_form_label} data-intl-default-key="admin.common.form.fields.select_label">
          {defaultLabel} {required && '*'}
        </label>
        <select
          className={`${styles.admin_form_select} ${errors[field_name] ? styles.admin_form_select_error : ''}`}
          disabled={is_loading}
          data-intl-validation-key="admin.common.form.validation.field_required"
          {...register(field_name, {
            required: required ? tValidation('field_required') : false,
            ...rules
          })}
        >
          <option value="" data-intl-default-key="admin.common.form.fields.select_placeholder">{defaultPlaceholder}</option>
          {options.map((option: SelectOption) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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