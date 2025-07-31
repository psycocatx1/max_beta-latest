'use client';

import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch, Path, FieldValues } from 'react-hook-form';
import { Camera, X } from 'lucide-react';
import styles from './ImageUploader.module.scss';
import { isValidImageUrl, getValidationRules } from './utils';
import { useImageUploader } from './useImageUploader';
import Switch from './components/Switch';
import { useTranslations } from 'next-intl';
import { isImageType } from './utils';

interface ImageUploaderProps<T extends FieldValues> {
  is_loading: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  label: string;
  placeholder?: string;
  image_file_field_name: Path<T>;
  image_url_field_name: Path<T>;
  image_type_field_name: Path<T>;
  accepted_types?: string[];
  max_size_in_mb?: number;
  width?: number;
  height?: number;
  className?: string;
}

export const ImageUploader = <T extends FieldValues>({
  is_loading,
  register,
  errors,
  setValue,
  watch,
  label,
  placeholder = "https://example.com/image.jpg",
  image_file_field_name,
  image_url_field_name,
  image_type_field_name,
  accepted_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'svg'],
  max_size_in_mb = 5,
  width = 150,
  height = 150,
  className = ''
}: ImageUploaderProps<T>) => {

  const {
    handleTypeChange,
    handleImageChange,
    handleUrlChange,
    handleRemoveImage,
    preview_image,
    image_type
  } = useImageUploader<T>({
    image_type_field_name,
    image_url_field_name,
    image_file_field_name,
    watch,
    setValue
  });

  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');
  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`
  };

  return (
    <div className={`${styles.image_uploader} ${className}`}>
      {/* Превью изображения слева */}
      <div className={styles.image_uploader_preview_container}>
        {image_type === 'file' ? (
          <div className={styles.image_uploader_container} style={containerStyle}>
            {preview_image ? (
              <>
                <input
                  type="file"
                  accept={accepted_types.join(',')}
                  className={styles.image_uploader_hidden_input}
                  disabled={is_loading}
                  {...register(image_file_field_name, getValidationRules<T>(accepted_types, max_size_in_mb))}
                  onChange={(e) => {
                    // Сначала вызываем стандартный onChange из register
                    const registerOnChange = register(image_file_field_name).onChange;
                    if (registerOnChange) {
                      registerOnChange(e);
                    }
                    // Затем наш кастомный обработчик для превью
                    handleImageChange(e);
                  }}
                  style={{ display: 'none' }}
                />
                <div className={styles.image_uploader_preview}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview_image}
                    alt={tFields('image_preview')}
                    data-intl-default-key="admin.common.form.fields.image_preview"
                    width={width}
                    height={height}
                    className={styles.image_uploader_preview_image}
                  />
                </div>
                <button
                  type="button"
                  className={styles.image_uploader_remove_button}
                  onClick={handleRemoveImage}
                  disabled={is_loading}
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <input
                  type="file"
                  accept={accepted_types.join(',')}
                  className={styles.image_uploader_hidden_input}
                  disabled={is_loading}
                  {...register(image_file_field_name, getValidationRules<T>(accepted_types, max_size_in_mb))}
                  onChange={(e) => {
                    // Сначала вызываем стандартный onChange из register
                    const registerOnChange = register(image_file_field_name).onChange;
                    if (registerOnChange) {
                      registerOnChange(e);
                    }
                    // Затем наш кастомный обработчик для превью
                    handleImageChange(e);
                  }}
                />
                <div className={styles.image_uploader_placeholder}>
                  <Camera size={24} />
                  <span data-intl-default-key="admin.common.form.fields.add_image">{tFields('add_image')}</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={styles.image_uploader_container} style={containerStyle}>
            {preview_image ? (
              <div className={styles.image_uploader_preview}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview_image}
                  alt={tFields('image_preview')}
                  data-intl-default-key="admin.common.form.fields.image_preview"
                  width={width}
                  height={height}
                  className={styles.image_uploader_preview_image}
                />
                <button
                  type="button"
                  className={styles.image_uploader_remove_button}
                  onClick={handleRemoveImage}
                  disabled={is_loading}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className={styles.image_uploader_preview_placeholder} style={containerStyle}>
                <Camera size={24} />
                <span data-intl-default-key="admin.common.form.fields.image_preview">{tFields('image_preview')}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Контролы справа */}
      <div className={styles.image_uploader_content}>
        <label className={styles.image_uploader_label}>
          {label}
        </label>

        {/* Переключатель типа изображения */}
        <Switch image_type={isImageType(image_type) ? image_type : 'file'} handleTypeChange={handleTypeChange} is_loading={is_loading} />

        {image_type === 'url' && (
          <div className={styles.image_uploader_url_input}>
            <input
              type="url"
              className={`${styles.image_uploader_input} ${errors[image_url_field_name] ? styles.image_uploader_input_error : ''}`}
              placeholder={placeholder}
              data-intl-validation-key="admin.common.form.validation.invalid_image_url"
              disabled={is_loading}
              {...register(image_url_field_name, {
                validate: {
                  validUrl: (value: unknown): string | true => {
                    const url = String(value);
                    if (!url) return true;
                    return isValidImageUrl(url) || tValidation('invalid_image_url');
                  }
                }
              })}
              onChange={handleUrlChange}
            />
          </div>
        )}

        {/* Ошибки */}
        {errors[image_file_field_name] && (
          <span className={styles.image_uploader_error}>
            {String((errors[image_file_field_name])?.message || '')}
          </span>
        )}
        {errors[image_url_field_name] && (
          <span className={styles.image_uploader_error}>
            {String((errors[image_url_field_name])?.message || '')}
          </span>
        )}
      </div>
    </div>
  );
}; 