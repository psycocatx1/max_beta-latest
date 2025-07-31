'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useLocales } from '@/hooks/admin/locales/useLocales';
import { LocaleFormModal } from '@/components/admin/common/Modal/Forms/LocaleFormModal';
import { InfoDisplay } from '@/components/admin/common/InfoDisplay';
import { formatDate } from '@/lib/intl/format-date';
import { UpdateLocaleFormData } from '@lib/api/services/types/locales.types';
import { useToast } from '@/hooks/useToast';
import { getImageUrl } from '@/lib/api';

export const Info = ({ locale_id }: { locale_id: string }) => {
  const [is_editing, setIsEditing] = useState(false);
  const current_locale = useLocale();
  const tFields = useTranslations('admin.common.form.fields');
  const tLocales = useTranslations('admin.locales')
  const tCommon = useTranslations('common');
  const { data: locale, isLoading: is_loading } = useLocales().useFind(locale_id);
  const update_mutation = useLocales().useUpdate(locale_id);
  const toast = useToast()

  const handleFormSubmit = async (data: UpdateLocaleFormData) => {
    const result = await update_mutation.mutateAsync(data);
    setIsEditing(false);
    if (result.status === 200) {
      toast.success(tCommon('updated_successfully'))
    } else {
      toast.error(tCommon('error_while_updating'))
      console.error(update_mutation.error)
    }
  };

  // Подготавливаем поля для отображения
  const fields = locale ? [
    { label: tFields('name_label'), value: locale.name },
    { label: tFields('language_label'), value: locale.language },
    { label: tFields('symbol_label'), value: locale.symbol },
    { label: tFields('currency_label'), value: locale.currency },
    { label: tFields('currency_symbol_label'), value: locale.currency_symbol },
    { label: tFields('phone_code_label'), value: locale.phone_code },
    {
      label: tFields('created_date_label'),
      value: formatDate({ date: locale.created, locale: current_locale })
    },
    {
      label: tFields('updated_date_label'),
      value: formatDate({ date: locale.updated, locale: current_locale })
    },
  ] : [];

  return (
    <InfoDisplay
      title={tLocales('info_title')}
      image={locale?.image}
      image_alt={locale?.name}
      fields={fields}
      is_loading={is_loading}
      is_editing={is_editing}
      onEdit={() => setIsEditing(true)}
    >
      <LocaleFormModal
        is_open={is_editing}
        onClose={() => setIsEditing(false)}
        onUpdate={handleFormSubmit}
        is_loading={is_loading}
        initial_data={{ ...locale, url: getImageUrl(locale?.image), image_type: 'url' }}
        is_edit
      />
    </InfoDisplay>
  );
}; 