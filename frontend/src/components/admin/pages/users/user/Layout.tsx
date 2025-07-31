'use client';

import { SecondaryLayout, userSidebarConfig } from '@/components/admin/common/SecondaryLayout';
import { useUsers } from '@/hooks/admin/users/useUsers';
import { useTranslations } from 'next-intl';

interface LayoutProps {
  user_id: string;
  children: React.ReactNode;
}

export const Layout = ({ user_id, children }: LayoutProps) => {
  const tUsers = useTranslations('admin.users');
  const { data: user, isLoading: is_loading } = useUsers().useFind({ id: user_id });

  const getFullName = () => {
    const firstName = user?.first_name || '';
    const lastName = user?.last_name || '';

    if (!firstName && !lastName) return tUsers('no_name');
    return `${firstName} ${lastName}`.trim();
  };


  return user && (
    <SecondaryLayout
      item_id={user_id}
      title={getFullName()}
      description={user.email}
      sidebar_config={userSidebarConfig}
      is_loading={is_loading}
    >
      {children}
    </SecondaryLayout>
  );
}; 