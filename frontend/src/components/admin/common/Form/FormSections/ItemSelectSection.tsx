import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import styles from '../FormStyles.module.scss';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useProducts } from '@/hooks/admin/products';
import { useServices } from '@/hooks/admin/services';
import { CategoryType } from '@prisma/client';

interface ItemSelectSectionProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  field_name: Path<T>;
  type: CategoryType;
  label?: string;
  placeholder?: string;
}

export const ItemSelectSection = <T extends FieldValues>({
  register,
  errors,
  field_name,
  type,
  label,
  placeholder
}: ItemSelectSectionProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');

  const { data: products, isLoading: is_products_loading } = useProducts().useGet({ skip: 0, take: 1000 }, type === CategoryType.PRODUCT);
  const { data: services, isLoading: is_services_loading } = useServices().useGet({ skip: 0, take: 1000 }, type === CategoryType.SERVICE);

  const items = useMemo(() => {
    if (type === CategoryType.PRODUCT && products) {
      return products.items;
    }
    if (type === CategoryType.SERVICE && services) {
      return services.items;
    }
    return [];
  }, [type, products, services]);

  const defaultLabel = label || tFields(`${type.toLowerCase()}_label`);
  const defaultPlaceholder = placeholder || tFields(`select_${type.toLowerCase()}_placeholder`);

  return (
    <div className={styles.admin_form_section}>
      <div className={styles.admin_form_field}>
        <label className={styles.admin_form_label} data-intl-default-key={`admin.common.form.fields.${type.toLowerCase()}_label`}>
          {defaultLabel} *
        </label>
        <select
          className={`${styles.admin_form_select} ${errors[field_name] ? styles.admin_form_select_error : ''}`}
          disabled={is_products_loading || is_services_loading}
          data-intl-validation-key={`admin.common.form.validation.${type.toLowerCase()}_required`}
          {...register(field_name, {
            required: tValidation(`${type.toLowerCase()}_required`)
          })}
        >
          <option value="" data-intl-default-key={`admin.common.form.fields.select_${type.toLowerCase()}_placeholder`}>{defaultPlaceholder}</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
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