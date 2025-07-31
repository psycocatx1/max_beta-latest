'use client';

import { useCategories } from '@/hooks/admin/categories';
import { productCategorySidebarConfig, serviceCategorySidebarConfig } from '@/components/admin/common/SecondaryLayout/SecondarySidebar';
import { SecondaryLayout } from '@/components/admin/common/SecondaryLayout';
import { CategoryType } from '@prisma/client';
import { useTranslations } from 'next-intl';

interface LayoutProps {
  category_id: string;
  type: CategoryType;
  children: React.ReactNode;
}

export const Layout = ({ category_id, children, type }: LayoutProps) => {
  const { data: category, isLoading: is_loading } = useCategories().useFind(category_id);
  const delete_mutation = useCategories().useDelete(category_id, type);
  const tCategories = useTranslations('admin.categories');
  const tCommon = useTranslations('common');

  const sidebar_config = type === CategoryType.PRODUCT ? productCategorySidebarConfig(category?.children?.length > 0) : serviceCategorySidebarConfig(category?.children?.length > 0);

  return category && (
    <SecondaryLayout
      item_id={category_id}
      title={category.name}
      description={category.description || undefined}
      image_url={category.image || undefined}
      sidebar_config={sidebar_config}
      delete_button={
        category.is_excluded
          ? undefined
          : {
            title: tCategories('delete_title'),
            loading_title: tCommon('deleting'),
            is_loading: delete_mutation.isPending,
            onDelete: async () => delete_mutation.mutate(),
            confirm_message: tCategories('confirm_delete')
          }
      }
      is_loading={is_loading}
    >
      {children}
    </SecondaryLayout>
  );
}; 