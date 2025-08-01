'use client';

import { UseFormRegister, FieldErrors, UseFormWatch, Path, FieldValues, UseFormSetValue } from 'react-hook-form';
import { FormStyles, ImageUploader } from '@/components/admin/common/Form';
import { LocalItemDescriptionType } from "@prisma/client";
import { ContentTypeSelect, TitleField, TextField, LinkField, VideoField } from './components';
import { useTranslations } from 'next-intl';

interface LocalItemDescriptionContentSectionProps<T extends FieldValues> {
  is_loading: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  type_field_name: Path<T>;
  title_field_name?: Path<T>;
  text_field_name?: Path<T>;
  url_field_name?: Path<T>;
  image_url_field_name?: Path<T>;
  image_type_field_name?: Path<T>;
  image_file_field_name?: Path<T>;
  setValue: UseFormSetValue<T>;
}

export const LocalItemDescriptionContentSection = <T extends FieldValues>({
  is_loading,
  register,
  errors,
  watch,
  type_field_name,
  title_field_name,
  text_field_name,
  url_field_name,
  image_url_field_name,
  image_type_field_name,
  image_file_field_name,
  setValue
}: LocalItemDescriptionContentSectionProps<T>) => {
  const content_type = watch(type_field_name);
  const tFields = useTranslations('admin.common.form.fields');

  return (
    <div className={FormStyles.admin_form_section}>
      {/* Тип контента */}
      <ContentTypeSelect register={register} errors={errors} is_loading={is_loading} type_field_name={type_field_name} />

      {/* Заголовок */}
      {title_field_name && (
        <TitleField register={register} errors={errors} is_loading={is_loading} title_field_name={title_field_name} />
      )}

      {/* Изображение */}
      {content_type === LocalItemDescriptionType.IMAGE && image_url_field_name && image_type_field_name && image_file_field_name && (
        <ImageUploader<T>
          register={register}
          errors={errors}
          is_loading={is_loading}
          image_url_field_name={image_url_field_name}
          image_type_field_name={image_type_field_name}
          setValue={setValue}
          watch={watch}
          image_file_field_name={image_file_field_name}
          label={tFields('image_label')}
        />
      )}

      {/* Текст описания - показывается для типа TEXT */}
      {content_type === LocalItemDescriptionType.TEXT && text_field_name && (
        <TextField register={register} errors={errors} is_loading={is_loading} text_field_name={text_field_name} content_type={content_type} />
      )}

      {/* URL видео - показывается для типа VIDEO */}
      {content_type === LocalItemDescriptionType.VIDEO && url_field_name && (
        <VideoField register={register} errors={errors} is_loading={is_loading} url_field_name={url_field_name} content_type={content_type} />
      )}

      {/* URL ссылки - показывается для типа LINK */}
      {content_type === LocalItemDescriptionType.LINK && url_field_name && (
        <LinkField register={register} errors={errors} is_loading={is_loading} url_field_name={url_field_name} content_type={content_type} />
      )}
    </div>
  );
}; 