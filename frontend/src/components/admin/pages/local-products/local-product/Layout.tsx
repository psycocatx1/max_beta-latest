'use client';

import { ExtendedLocalProduct, useLocalProducts } from '@/hooks/admin/products';
import { useRouter } from '@hooks/useRouting';
import { useToast } from '@/hooks/useToast/useToast';
import { localProductSidebarConfig } from '@/components/admin/common/SecondaryLayout/SecondarySidebar';
import { SecondaryLayout } from '@/components/admin/common/SecondaryLayout';
import { useTranslations } from 'next-intl';

interface LayoutProps {
  local_product_id: string;
  children: React.ReactNode;
}

export const Layout = ({ local_product_id, children }: LayoutProps) => {
  const { data: data, isLoading: is_loading } = useLocalProducts().useFind(local_product_id);
  const router = useRouter();
  const delete_mutation = useLocalProducts().useDelete(local_product_id);
  const toast = useToast();
  const tLocalProducts = useTranslations('admin.local_products');
  const tCommon = useTranslations('common');
  const local_product: ExtendedLocalProduct = data;

  const handleDeleteLocalProduct = async () => {
    try {
      await delete_mutation.mutateAsync();
      toast.success(tCommon('deleted_successfully'));
      router.push('/admin/local-products');
    } catch {
      toast.error(tCommon('error_while_deleting'));
      console.error(delete_mutation.error);
    }
  };

  return local_product && (
    <SecondaryLayout
      item_id={local_product_id}
      title={local_product.name}
      description={local_product.product.description}
      image_url={local_product.product.image}
      sidebar_config={localProductSidebarConfig}
      delete_button={{
        title: tLocalProducts('delete_title'),
        loading_title: tCommon('deleting'),
        is_loading: delete_mutation.isPending,
        onDelete: handleDeleteLocalProduct,
        confirm_message: tLocalProducts('confirm_delete')
      }}
      is_loading={is_loading}
    >
      {children}
    </SecondaryLayout>
  );
}; 