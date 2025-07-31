'use client';

import { InfoDisplay, InfoDisplayField } from "@/components/admin/common/InfoDisplay";
import { LocalServiceFormModal } from "@/components/admin/common/Modal/Forms/LocalServiceFormModal";
import { useLocalServices } from "@/hooks/admin/services";
import { UpdateLocalServiceDto } from '@lib/api/services/types/local-services.types';
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Loader } from "@/components/admin/common/Loader";
import { NotFound } from "@/components/admin/common/NotFound";
import { useToast } from '@/hooks/useToast';
import { formatDate } from "@/lib/intl";

export const Info = ({ local_service_id }: { local_service_id: string }) => {
  const { data: local_service, isLoading: is_loading } = useLocalServices().useFind(local_service_id);
  const [is_modal_open, setIsModalOpen] = useState(false);
  const update_mutation = useLocalServices().useUpdate(local_service_id);
  const tLocalServices = useTranslations('admin.local_services');
  const tFields = useTranslations('admin.common.form.fields');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const toast = useToast();

  const handleUpdateService = (data: UpdateLocalServiceDto) => {
    try {
      update_mutation.mutate(data);
      toast.success(tCommon('updated_successfully'));
      setIsModalOpen(false);
    } catch {
      toast.error(tCommon('error_while_updating'));
      console.error(update_mutation.error);
    }
  }

  if (is_loading) return <Loader />;

  if (!local_service) return <NotFound />;


  const local_service_fields: InfoDisplayField[] = local_service && local_service.service && local_service.locale ? [
    { label: tFields('name_label'), value: local_service.name },
    { label: tFields('description_label'), value: local_service.description },
    { label: tFields('price_label'), value: `${local_service.price?.toFixed(2)} ${local_service.locale.currency_symbol}` },
    ...(local_service.discount_price ? [{ label: tFields('discount_label'), value: `${local_service.discount_price.toFixed(2)} ${local_service.locale.currency_symbol}` }] : []),
    { label: tFields('created_date_label'), value: formatDate({ date: local_service.created, locale }) },
    { label: tFields('updated_date_label'), value: formatDate({ date: local_service.updated, locale }) },
    { label: tFields('original_service_label'), value: local_service.service.name },
    { label: tFields('description_label'), value: local_service.service.description },
    { label: tFields('price_label'), value: `$${local_service.service.price_USD?.toFixed(2)}` },
    ...(local_service.service.discount_price_USD ? [{ label: tFields('discount_label'), value: `$${local_service.service.discount_price_USD.toFixed(2)}` }] : []),
    { label: tFields('original_locale_label'), value: local_service.locale.name },
    { label: tFields('language_label'), value: local_service.locale.language },
    { label: tFields('currency_label'), value: local_service.locale.currency },
    { label: tFields('symbol_label'), value: local_service.locale.symbol },
    { label: tFields('phone_code_label'), value: local_service.locale.phone_code }
  ] : [];

  return (
    <>
      <InfoDisplay
        title={tLocalServices('info_title')}
        fields={local_service_fields}
        is_loading={is_loading}
        is_editing={is_modal_open}
        onEdit={() => setIsModalOpen(true)}
        image={local_service.service.image}
        image_alt={local_service.name}
        locale_image={local_service.locale.image}
        locale_image_alt={local_service.locale.name}
      />

      <LocalServiceFormModal
        is_open={is_modal_open}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdateService}
        is_loading={update_mutation.isPending}
        initial_data={local_service}
        is_edit
        locale={local_service.locale}
        is_excluded={local_service.is_excluded}
      />
    </>
  );
}; 