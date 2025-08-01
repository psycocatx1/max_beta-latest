'use client';

import { useState } from 'react';
import { useServices, CreateServiceFormData, UpdateServiceFormData } from '@/hooks/admin/services';
import { InfoDisplay } from '@/components/admin/common/InfoDisplay';
import { formatDate } from '@/lib/intl/format-date';
import { useLocale, useTranslations } from 'next-intl';
import { useToast } from '@/hooks/useToast';
import { ServiceFormModal } from '@/components/admin/common/Modal/Forms/ServiceFormModal';

export const Info = ({ service_id }: { service_id: string }) => {
  const { data: service, isLoading: is_loading } = useServices().useFind({ id: service_id });
  const [is_editing, setIsEditing] = useState(false);
  const update_mutation = useServices().useUpdate(service_id);
  const toast = useToast();
  const locale = useLocale();
  const tServices = useTranslations('admin.services');
  const tCommon = useTranslations('common');
  const tFields = useTranslations('admin.common.form.fields');

  // Обработчик отправки формы с адаптацией типов
  const handleSubmitForm = async (data: CreateServiceFormData | UpdateServiceFormData) => {
    try {
      await update_mutation.mutateAsync(data);
      toast.success(tCommon('updated_successfully'));
      setIsEditing(false);
    } catch {
      toast.error(tCommon('error_while_updating'));
      console.error(update_mutation.error);
    }
  };

  // Подготавливаем поля для отображения
  const fields = [
    { label: tFields('name_label'), value: service?.name },
    { label: tFields('description_label'), value: service?.description },
    { label: tFields('price_label'), value: `$${service?.price_USD}` },
    ...(service?.discount_price_USD ? [{ label: tFields('discount_label'), value: `$${service?.discount_price_USD}` }] : []),
    ...(service?.category ? [{ label: tFields('category_label'), value: service?.category?.name }] : []),
    { label: tFields('created_date_label'), value: formatDate({ date: service?.created, locale }) },
    { label: tFields('updated_date_label'), value: formatDate({ date: service?.updated, locale }) },
  ];


  return service ? (
    <InfoDisplay
      title={tServices('info_title')}
      image={service?.image}
      image_alt={service?.name}
      fields={fields}
      is_loading={is_loading || update_mutation.isPending}
      is_editing={is_editing}
      onEdit={() => setIsEditing(true)}
    >
      <ServiceFormModal
        is_open={is_editing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleSubmitForm}
        is_loading={is_loading || update_mutation.isPending}
        initial_data={{
          ...service,
          image_type: 'url',
          url: service.image || '',
          description: service.description || undefined,
          discount_price_USD: service.discount_price_USD || undefined
        }}
        is_edit
      />
    </InfoDisplay>
  ) : null;
}; 