'use client';

import { Role, User as UserType } from '@prisma/client';
import { useUsers } from '@hooks/admin/users/useUsers';
import { useUsersFilters } from '@/hooks/admin/users/useUsersFilters';
import { AdminPage } from '@/components/admin/common/AdminPage';
import { Filters, FilterField } from '@/components/admin/common/ListPage/Filters';
import { List } from '@/components/admin/common/ListPage/List';
import { User } from './User';
import { useTranslations } from 'next-intl';

export const Users = ({ locale_id }: { locale_id?: string }) => {
  const tUsers = useTranslations('admin.users');
  const tRoles = useTranslations('admin.common.form.fields.roles');
  const tFilters = useTranslations('admin.common.list_page.filters');

  // Используем хук для управления фильтрами с дебонсом
  const {
    filters,
    debounced_filters,
    current_page,
    updateFilters,
    resetFilters,
    setPage
  } = useUsersFilters({ default_filters: { locale_id, skip: 0, take: 10 } });

  // Получаем данные о пользователях с применением дебонснутых фильтров
  const { data: result, isLoading: is_loading } = useUsers().useGet(debounced_filters);

  const handleFilterChange = (name: string, value: unknown) => {
    updateFilters({ [name]: value });
  };

  return (
    <AdminPage
      title={tUsers('title')}
      is_loading={is_loading}
    >
      <Filters
        filters={filters}
        onUpdateFilters={updateFilters}
        onResetFilters={resetFilters}
        is_loading={is_loading}
      >
        <FilterField
          name="search"
          label={tFilters('search_label')}
          placeholder={tFilters('search_placeholder')}
          type="text"
          value={filters.search || ''}
          onChange={handleFilterChange}
        />

        <FilterField
          name="email"
          label={tFilters('email_label')}
          placeholder={tFilters('email_placeholder')}
          type="text"
          value={filters.email || ''}
          onChange={handleFilterChange}
        />

        <FilterField
          name="phone_number"
          label={tFilters('phone_number_label')}
          placeholder={tFilters('phone_number_placeholder')}
          type="text"
          value={filters.phone_number || ''}
          onChange={handleFilterChange}
        />

        <FilterField
          name="role"
          label={tFilters('role_label')}
          placeholder={tFilters('role_placeholder')}
          type="select"
          value={filters.role || ''}
          onChange={handleFilterChange}
          options={[
            { value: '', label: tRoles('all_roles') },
            ...Object.keys(Role).map((role) => ({ value: role, label: tRoles(role) }))
          ]}
        />

        <FilterField
          name="is_banned"
          label={tFilters('is_banned_label')}
          placeholder=""
          type="checkbox"
          value={String(!!filters.is_banned)}
          onChange={(value) => updateFilters({ is_banned: Boolean(value) })}
        />
      </Filters>

      <List<UserType>
        items={result?.items || []}
        total={result?.total || 0}
        loading={is_loading}
        current_page={current_page}
        page_size={filters.take}
        onPageChange={setPage}
        renderItem={(user) => <User key={user.id} user={user} />}
        empty_message={tUsers('empty_message')}
        items_label={tUsers('items_label')}
      />
    </AdminPage>
  );
};
