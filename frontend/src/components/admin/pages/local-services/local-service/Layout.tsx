'use client';

import { ExtendedLocalService, useLocalServices } from '@/hooks/admin/services';
import { useRouter } from '@hooks/useRouting';
import { useToast } from '@/hooks/useToast/useToast';
import { localServiceSidebarConfig } from '@/components/admin/common/SecondaryLayout/SecondarySidebar';
import { SecondaryLayout } from '@/components/admin/common/SecondaryLayout';
import { useTranslations } from 'next-intl';

interface LayoutProps {
  local_service_id: string;
  children: React.ReactNode;
}

export const Layout = ({ local_service_id, children }: LayoutProps) => {
  const { data, isLoading: is_loading } = useLocalServices().useFind(local_service_id);
  const router = useRouter();
  const delete_mutation = useLocalServices().useDelete(local_service_id);
  const toast = useToast();
  const tLocalServices = useTranslations('admin.local_services');
  const tCommon = useTranslations('common');
  const local_service: ExtendedLocalService = data;

  const handleDeleteLocalService = async () => {
    try {
      await delete_mutation.mutateAsync();
      toast.success(tCommon('deleted_successfully'));
      router.push('/admin/local-services');
    } catch {
      toast.error(tCommon('error_while_deleting'));
      console.error(delete_mutation.error);
    }
  };

  return local_service && (
    <SecondaryLayout
      item_id={local_service_id}
      title={local_service.name}
      description={local_service.service.description}
      image_url={local_service.service.image}
      sidebar_config={localServiceSidebarConfig}
      delete_button={{
        title: tLocalServices('delete_title'),
        loading_title: tCommon('deleting'),
        is_loading: delete_mutation.isPending,
        onDelete: handleDeleteLocalService,
        confirm_message: tLocalServices('confirm_delete')
      }}
      is_loading={is_loading}
    >
      {children}
    </SecondaryLayout>
  );
}; 