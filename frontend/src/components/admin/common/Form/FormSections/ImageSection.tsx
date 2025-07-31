import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue, Path, FieldValues } from 'react-hook-form';
import { ImageUploader } from './ImageUploader/ImageUploader';
import styles from '../FormStyles.module.scss';
import { useTranslations } from 'next-intl';

interface ImageSectionProps<T extends FieldValues = FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  is_loading?: boolean;
  label?: string;
  file_field_name: Path<T>;
  url_field_name: Path<T>;
  type_field_name: Path<T>;
  className?: string;
}

export const ImageSection = <T extends FieldValues = FieldValues>({
  register,
  errors,
  watch,
  setValue,
  is_loading = false,
  label,
  file_field_name,
  url_field_name,
  type_field_name,
  className = ''
}: ImageSectionProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const effectiveLabel = label || tFields('image_label');
  return (
    <div className={`${styles.admin_form_section} ${styles.admin_form_section_image} ${className}`}>
      <ImageUploader
        is_loading={is_loading}
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        label={effectiveLabel}
        image_file_field_name={file_field_name}
        image_url_field_name={url_field_name}
        image_type_field_name={type_field_name}
      />
    </div>
  );
}; 