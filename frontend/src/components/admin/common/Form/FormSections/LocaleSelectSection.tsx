import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import styles from '../FormStyles.module.scss';
import { useTranslations } from 'next-intl';
import { useLocales } from '@/hooks/admin/locales';

interface LocaleSelectSectionProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  field_name: Path<T>;
  is_loading?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export const LocaleSelectSection = <T extends FieldValues>({
  register,
  errors,
  field_name,
  is_loading = false,
  label,
  placeholder,
  required = true
}: LocaleSelectSectionProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');
  const { data: locales } = useLocales().useGet({ skip: 0, take: 100 });

  const defaultLabel = label || tFields('locale_label');
  const defaultPlaceholder = placeholder || tFields('locale_placeholder');

  return (
    <div className={styles.admin_form_section}>
      <div className={styles.admin_form_field}>
        <label className={styles.admin_form_label} data-intl-default-key="admin.common.form.fields.locale_label">
          {defaultLabel} {required && '*'}
        </label>
        <select
          className={`${styles.admin_form_select} ${errors[field_name] ? styles.admin_form_select_error : ''}`}
          disabled={is_loading}
          data-intl-validation-key="admin.common.form.validation.locale_required"
          {...register(field_name, {
            required: required ? tValidation('locale_required') : false
          })}
        >
          <option value="" data-intl-default-key="admin.common.form.fields.locale_placeholder">{defaultPlaceholder}</option>
          {locales?.items.map((locale) => (
            <option key={locale.id} value={locale.id}>
              {locale.name} ({locale.symbol})
            </option>
          ))}
        </select>
        {errors[field_name] && (
          <span className={styles.admin_form_error}>
            {String(errors[field_name]?.message || '')}
          </span>
        )}
      </div>
    </div>
  );
}; 