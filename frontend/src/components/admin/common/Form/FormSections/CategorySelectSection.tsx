import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import styles from '../FormStyles.module.scss';
import { flattenCategoriesForSelect } from '@lib/api/services/types/categories.types';
import { useTranslations } from 'next-intl';
import { useCategories } from '@/hooks/admin/categories';
import { CategoryType } from '@prisma/client';

interface CategorySelectSectionProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  field_name: Path<T>;
  is_loading?: boolean;
  label?: string;
  placeholder?: string;
  type: CategoryType;
  use_hierarchy?: boolean;
}

export const CategorySelectSection = <T extends FieldValues>({
  register,
  errors,
  field_name,
  is_loading = false,
  label,
  placeholder,
  use_hierarchy = false,
  type
}: CategorySelectSectionProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');
  const { data: categories } = useCategories().useGet({ take: 1000, skip: 0, type });

  const categoryOptions = use_hierarchy && categories?.items.length && categories.items.length > 0 && 'children' in categories.items[0]
    ? flattenCategoriesForSelect(categories.items).map(cat => ({
      value: cat.value,
      label: cat.label
    }))
    : categories?.items.map((category) => ({
      value: category.id,
      label: category.name
    }));

  const label_text = label || tFields('category_label');
  const placeholder_text = placeholder || tFields('category_placeholder');

  return (
    <>
      <div className={styles.admin_form_section}>
        <div className={styles.admin_form_field}>
          <label className={styles.admin_form_label} data-intl-default-key="admin.common.form.category_label">
            {label_text} *
          </label>
          <select
            className={`${styles.admin_form_select} ${errors[field_name] ? styles.admin_form_select_error : ''}`}
            disabled={is_loading}
            data-intl-validation-key="admin.common.form.validation.category_required"
            {...register(field_name, {
              required: tValidation('category_required')
            })}
          >
            <option value="" data-intl-default-key="admin.common.form.fields.category_placeholder">{placeholder_text}</option>
            {categoryOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
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
    </>
  );
}; 