'use client';

import { InfoDisplay, InfoDisplayField } from "@/components/admin/common/InfoDisplay";
import { useForms } from "@/hooks/admin/forms";
import { useLocale, useTranslations } from "next-intl";
import { Loader } from "@/components/admin/common/Loader";
import { NotFound } from "@/components/admin/common/NotFound";
import { formatDate } from "@/lib/intl";

export const Info = ({ form_id }: { form_id: string }) => {
  const { data: form, isLoading: is_loading } = useForms().useFind(form_id);
  const tFields = useTranslations('admin.common.form.fields');
  const tForms = useTranslations('admin.forms');
  const locale = useLocale();

  if (is_loading) return <Loader />;

  if (!form) return <NotFound />;

  const fields: InfoDisplayField[] = [
    { label: tFields('sender_name_label'), value: form.sender_name },
    { label: tFields('company_name_label'), value: form.company_name },
    { label: tFields('email_label'), value: form.email },
    { label: tFields('phone_number_label'), value: form.phone_number },
    { label: tFields('message_label'), value: form.message },
    { label: tFields('created_date_label'), value: formatDate({ date: form.created, locale }) },
    { label: tFields('updated_date_label'), value: formatDate({ date: form.updated, locale }) },
  ]

  return (
    <InfoDisplay
      title={tForms('info_title')}
      fields={fields}
      is_loading={is_loading}
    />
  );
}