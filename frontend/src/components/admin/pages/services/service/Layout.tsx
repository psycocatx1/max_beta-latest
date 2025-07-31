'use client';

import { useServices } from '@/hooks/admin/services';
import { useRouter } from '@hooks/useRouting';
import { useToast } from '@/hooks/useToast/useToast';
import { serviceSidebarConfig } from '@/components/admin/common/SecondaryLayout/SecondarySidebar';
import { SecondaryLayout } from '@/components/admin/common/SecondaryLayout';
import { useTranslations } from 'next-intl';

interface LayoutProps {
  service_id: string;
  children: React.ReactNode;
}

export const Layout = ({ service_id, children }: LayoutProps) => {
  const { data: service, isLoading: is_loading } = useServices().useFind(service_id);
  const router = useRouter();
  const delete_mutation = useServices().useDelete(service_id);
  const toast = useToast();
  const tServices = useTranslations('admin.services');
  const tCommon = useTranslations('common');

  const handleDeleteService = async () => {
    try {
      await delete_mutation.mutateAsync();
      toast.success(tCommon('deleted_successfully'));
      router.push('/admin/services');
    } catch {
      toast.error(tCommon('error_while_deleting'));
      console.error(delete_mutation.error);
    }
  };

  return service && (
    <SecondaryLayout
      item_id={service_id}
      title={service.name}
      description={service.description || undefined}
      image_url={service.image || undefined}
      sidebar_config={serviceSidebarConfig}
      delete_button={{
        title: tServices('delete_title'),
        loading_title: tCommon('deleting'),
        is_loading: delete_mutation.isPending,
        onDelete: handleDeleteService,
        confirm_message: tServices('confirm_delete')
      }}
      is_loading={is_loading}
    >
      {children}
    </SecondaryLayout>
  );
}; 