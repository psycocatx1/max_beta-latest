import { FormStyles } from '@/components/admin/common/Form';
import { useTranslations } from 'next-intl';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { LocalItemDescriptionType } from '@prisma/client';

interface VideoFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  is_loading: boolean;
  url_field_name: Path<T>;
  content_type: LocalItemDescriptionType;
}
export const VideoField = <T extends FieldValues>({ register, errors, is_loading, url_field_name, content_type }: VideoFieldProps<T>) => {
  const tFields = useTranslations('admin.common.form.fields');
  const tValidation = useTranslations('admin.common.form.validation');

  return (
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
  );
};