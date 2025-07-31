'use client';

import { useRouter } from '@hooks/useRouting';
import { useToast } from '@/hooks/useToast/useToast';
import { localeSidebarConfig } from '@/components/admin/common/SecondaryLayout/SecondarySidebar/configs';
import { SecondaryLayout } from '@/components/admin/common/SecondaryLayout';
import { useLocales } from '@/hooks/admin/locales/useLocales';
import { useTranslations } from 'next-intl';

interface LayoutProps {
  locale_id: string;
  children: React.ReactNode;
}

export const Layout = ({ locale_id, children }: LayoutProps) => {
  const tCommon = useTranslations('common');
  const tLocales = useTranslations('admin.locales');
  const { data: locale, isLoading: is_loading } = useLocales().useFind(locale_id);
  const router = useRouter();
  const delete_mutation = useLocales().useDelete(locale_id);
  const toast = useToast();

  const handleDeleteLocale = async () => {
    try {
      await delete_mutation.mutateAsync();
      toast.success(tCommon('deleted_successfully'));
      router.push({ pathname: '/admin/locales' });
    } catch {
      toast.error(tCommon('error_while_deleting'));
      console.error(delete_mutation.error);
    }
  };

  return locale && (
    <SecondaryLayout
      item_id={locale_id}
      title={locale.name}
      image_url={locale.image}
      description={locale.language}
      sidebar_config={localeSidebarConfig}
      delete_button={{
        title: tLocales('delete_title'),
        loading_title: tCommon('deleting'),
        is_loading: delete_mutation.isPending,
        onDelete: handleDeleteLocale,
        confirm_message: tLocales('confirm_delete')
      }}
      is_loading={is_loading}
    >
      {children}
    </SecondaryLayout>
  );
}; 