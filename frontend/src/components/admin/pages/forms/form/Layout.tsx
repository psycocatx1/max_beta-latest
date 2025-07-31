'use client';

import { useRouter } from '@hooks/useRouting';
import { useToast } from '@/hooks/useToast/useToast';
import { SecondaryLayout } from '@/components/admin/common/SecondaryLayout';
import { useTranslations } from 'next-intl';
import { useForms } from '@/hooks/admin/forms';

interface LayoutProps {
  form_id: string;
  children: React.ReactNode;
}

export const Layout = ({ form_id, children }: LayoutProps) => {
  const { data: form, isLoading: is_loading } = useForms().useFind(form_id);
  const router = useRouter();
  const delete_mutation = useForms().useDelete(form_id);
  const toast = useToast();
  const tForms = useTranslations('admin.forms');
  const tCommon = useTranslations('common');

  const handleDeleteForm = async () => {
    try {
      await delete_mutation.mutateAsync();
      toast.success(tCommon('deleted_successfully'));
      router.push('/admin/forms');
    } catch {
      toast.error(tCommon('error_while_deleting'));
    }
  };

  return form && (
    <SecondaryLayout
      item_id={form_id}
      title={form.sender_name}
      description={form.company_name || form.email}
      delete_button={{
        title: tForms('delete_title'),
        loading_title: tCommon('deleting'),
        is_loading: delete_mutation.isPending,
        onDelete: handleDeleteForm,
        confirm_message: tForms('confirm_delete')
      }}
      is_loading={is_loading}
    >
      {children}
    </SecondaryLayout>
  );
}; 