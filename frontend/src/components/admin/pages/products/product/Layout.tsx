'use client';

import { useProducts } from '@/hooks/admin/products';
import { useRouter } from '@hooks/useRouting';
import { useToast } from '@/hooks/useToast/useToast';
import { productSidebarConfig } from '@/components/admin/common/SecondaryLayout/SecondarySidebar';
import { SecondaryLayout } from '@/components/admin/common/SecondaryLayout';
import { useTranslations } from 'next-intl';

interface LayoutProps {
  product_id: string;
  children: React.ReactNode;
}

export const Layout = ({ product_id, children }: LayoutProps) => {
  const { data: product, isLoading: is_loading } = useProducts().useFind(product_id);
  const router = useRouter();
  const delete_mutation = useProducts().useDelete(product_id);
  const toast = useToast();
  const tProducts = useTranslations('admin.products');
  const tCommon = useTranslations('common');

  const handleDeleteProduct = async () => {
    try {
      await delete_mutation.mutateAsync();
      toast.success(tCommon('deleted_successfully'));
      router.push('/admin/products');
    } catch {
      toast.error(tCommon('error_while_deleting'));
      console.error(delete_mutation.error);
    }
  };

  return product && (
    <SecondaryLayout
      item_id={product_id}
      title={product.name}
      description={product.description || undefined}
      image_url={product.image || undefined}
      sidebar_config={productSidebarConfig}
      delete_button={{
        title: tProducts('delete_title'),
        loading_title: tCommon('deleting'),
        is_loading: delete_mutation.isPending,
        onDelete: handleDeleteProduct,
        confirm_message: tProducts('confirm_delete')
      }}
      is_loading={is_loading}
    >
      {children}
    </SecondaryLayout>
  );
}; 