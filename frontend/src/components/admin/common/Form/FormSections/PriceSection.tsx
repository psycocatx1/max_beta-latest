import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import styles from '../FormStyles.module.scss';
import { useTranslations } from 'next-intl';

interface PriceSectionProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  price_field_name: Path<T>;
  discount_price_field_name: Path<T>;
  is_loading?: boolean;
  label?: string;
  placeholder?: string;
  discount_label?: string;
  discount_placeholder?: string;
  currency_symbol?: string;
}

export const PriceSection = <T extends FieldValues>({
  register,
  errors,
  price_field_name,
  discount_price_field_name,
  is_loading = false,
  label,
  placeholder,
  discount_label,
  discount_placeholder,
  currency_symbol = '$',
}: PriceSectionProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');
  const defaultLabel = label || tFields('price_label');
  const defaultPlaceholder = placeholder || tFields('price_placeholder');
  const defaultDiscountLabel = discount_label || tFields('discount_label');
  const defaultDiscountPlaceholder = discount_placeholder || tFields('discount_placeholder');
  return (
    <div className={styles.admin_form_section}>
      <div className={styles.admin_form_field}>
        <label className={styles.admin_form_label} data-intl-default-key="admin.common.form.fields.price_label">
          {defaultLabel} ({currency_symbol}) *
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          className={`${styles.admin_form_input} ${errors[price_field_name] ? styles.admin_form_input_error : ''}`}
          placeholder={defaultPlaceholder}
          data-intl-default-key="admin.common.form.fields.price_placeholder"
          disabled={is_loading}
          data-intl-validation-key="admin.common.form.validation.price_required,admin.common.form.validation.price_negative"
          {...register(price_field_name, {
            required: tValidation('price_required'),
            min: {
              value: 0,
              message: tValidation('price_negative')
            },
            valueAsNumber: true
          })}
        />
        {errors[price_field_name] && (
          <span className={styles.admin_form_error}>
            {String(errors[price_field_name]?.message || '')}
          </span>
        )}
      </div>

      <div className={styles.admin_form_field}>
        <label className={styles.admin_form_label} data-intl-default-key="admin.common.form.fields.discount_label">
          {defaultDiscountLabel} ({currency_symbol})
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          className={`${styles.admin_form_input} ${errors[discount_price_field_name] ? styles.admin_form_input_error : ''}`}
          placeholder={defaultDiscountPlaceholder}
          data-intl-default-key="admin.common.form.fields.discount_placeholder"
          disabled={is_loading}
          data-intl-validation-key="admin.common.form.validation.discount_negative"
          {...register(discount_price_field_name, {
            min: {
              value: 0,
              message: tValidation('discount_negative')
            },
            valueAsNumber: true
          })}
        />
        {errors[discount_price_field_name] && (
          <span className={styles.admin_form_error}>
            {String(errors[discount_price_field_name]?.message || '')}
          </span>
        )}
      </div>
    </div>
  );
}; 