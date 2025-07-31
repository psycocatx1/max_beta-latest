'use client';

import { UseFormRegister, FieldErrors, UseFormWatch, Path, FieldValues } from 'react-hook-form';
import { FormStyles } from '@/components/admin/common/Form';
import { useTranslations } from 'next-intl';
import { LocalItemDescriptionType } from "@prisma/client";

interface LocalItemDescriptionContentSectionProps<T extends FieldValues> {
  is_loading: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  type_field_name: Path<T>;
  title_field_name?: Path<T>;
  text_field_name?: Path<T>;
  url_field_name?: Path<T>;
}

export const LocalItemDescriptionContentSection = <T extends FieldValues>({
  is_loading,
  register,
  errors,
  watch,
  type_field_name,
  title_field_name,
  text_field_name,
  url_field_name
}: LocalItemDescriptionContentSectionProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');

  const content_type = watch(type_field_name);

  return (
    <div className={FormStyles.admin_form_section}>
      {/* Тип контента */}
      <div className={FormStyles.admin_form_field}>
        <label className={FormStyles.admin_form_label} data-intl-default-key="admin.common.form.fields.content_type_label">
          {tFields('content_type_label')} *
        </label>
        <select
          className={`${FormStyles.admin_form_select} ${errors[type_field_name] ? FormStyles.admin_form_select_error : ''}`}
          disabled={is_loading}
          data-intl-validation-key="admin.common.form.validation.content_type_required"
          {...register(type_field_name, {
            required: tValidation('content_type_required')
          })}
        >
          <option value="" data-intl-default-key="admin.common.form.fields.content_type_placeholder">{tFields('content_type_placeholder')}</option>
          <option value={LocalItemDescriptionType.TEXT} data-intl-default-key="admin.common.form.fields.content_types.TEXT">{tFields('content_types.TEXT')}</option>
          <option value={LocalItemDescriptionType.IMAGE} data-intl-default-key="admin.common.form.fields.content_types.IMAGE">{tFields('content_types.IMAGE')}</option>
          <option value={LocalItemDescriptionType.VIDEO} data-intl-default-key="admin.common.form.fields.content_types.VIDEO">{tFields('content_types.VIDEO')}</option>
          <option value={LocalItemDescriptionType.LINK} data-intl-default-key="admin.common.form.fields.content_types.LINK">{tFields('content_types.LINK')}</option>
        </select>
        {errors[type_field_name] && (
          <span className={FormStyles.admin_form_error}>
            {String(errors[type_field_name]?.message || '')}
          </span>
        )}
      </div>

      {/* Заголовок */}
      {title_field_name && (
        <div className={FormStyles.admin_form_field}>
          <label className={FormStyles.admin_form_label} data-intl-default-key="admin.common.form.fields.title_label">
            {tFields('title_label')}
          </label>
          <input
            type="text"
            className={`${FormStyles.admin_form_input} ${errors[title_field_name] ? FormStyles.admin_form_input_error : ''}`}
            placeholder={tFields('title_placeholder')}
            disabled={is_loading}
            data-intl-validation-key="admin.common.form.validation.title_max_length"
            {...register(title_field_name, {
              maxLength: {
                value: 100,
                message: tValidation('title_max_length')
              }
            })}
          />
          <div className={FormStyles.admin_form_hint} data-intl-default-key="admin.common.form.fields.title_hint">{tFields('title_hint')}</div>
          {errors[title_field_name] && (
            <span className={FormStyles.admin_form_error}>
              {String(errors[title_field_name]?.message || '')}
            </span>
          )}
        </div>
      )}

      {/* Текст описания - показывается для типа TEXT */}
      {content_type === LocalItemDescriptionType.TEXT && text_field_name && (
        <div className={FormStyles.admin_form_field}>
          <label className={FormStyles.admin_form_label} data-intl-default-key="admin.common.form.fields.text_label">
            {tFields('text_label')} *
          </label>
          <textarea
            className={`${FormStyles.admin_form_textarea} ${errors[text_field_name] ? FormStyles.admin_form_textarea_error : ''}`}
            placeholder={tFields('text_placeholder')}
            disabled={is_loading}
            rows={6}
            data-intl-validation-key="admin.common.form.validation.text_required"
            {...register(text_field_name, {
              required: content_type === LocalItemDescriptionType.TEXT ? tValidation('text_required') : false
            })}
          />
          {errors[text_field_name] && (
            <span className={FormStyles.admin_form_error}>
              {String(errors[text_field_name]?.message || '')}
            </span>
          )}
        </div>
      )}

      {/* URL видео - показывается для типа VIDEO */}
      {content_type === LocalItemDescriptionType.VIDEO && url_field_name && (
        <div className={FormStyles.admin_form_field}>
          <label className={FormStyles.admin_form_label} data-intl-default-key="admin.common.form.fields.video_label">
            {tFields('video_label')} *
          </label>
          <input
            type="url"
            className={`${FormStyles.admin_form_input} ${errors[url_field_name] ? FormStyles.admin_form_input_error : ''}`}
            placeholder={tFields('video_placeholder')}
            disabled={is_loading}
            data-intl-validation-key="admin.common.form.validation.video_url_invalid"
            {...register(url_field_name, {
              required: content_type === LocalItemDescriptionType.VIDEO ? tValidation('video_required') : false,
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: tValidation('video_url_invalid')
              }
            })}
          />
          <div className={FormStyles.admin_form_hint} data-intl-default-key="admin.common.form.fields.video_hint">{tFields('video_hint')}</div>
          {errors[url_field_name] && (
            <span className={FormStyles.admin_form_error}>
              {String(errors[url_field_name]?.message || '')}
            </span>
          )}
        </div>
      )}

      {/* URL ссылки - показывается для типа LINK */}
      {content_type === LocalItemDescriptionType.LINK && url_field_name && (
        <div className={FormStyles.admin_form_field}>
          <label className={FormStyles.admin_form_label} data-intl-default-key="admin.common.form.fields.link_label">
            {tFields('link_label')} *
          </label>
          <input
            type="url"
            className={`${FormStyles.admin_form_input} ${errors[url_field_name] ? FormStyles.admin_form_input_error : ''}`}
            placeholder={tFields('link_placeholder')}
            disabled={is_loading}
            data-intl-validation-key="admin.common.form.validation.link_required"
            {...register(url_field_name, {
              required: content_type === LocalItemDescriptionType.LINK ? tValidation('link_required') : false,
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: tValidation('url_invalid')
              }
            })}
          />
          {errors[url_field_name] && (
            <span className={FormStyles.admin_form_error}>
              {String(errors[url_field_name]?.message || '')}
            </span>
          )}
        </div>
      )}
    </div>
  );
}; 