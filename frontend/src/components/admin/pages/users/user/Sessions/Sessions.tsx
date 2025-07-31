'use client';

import { useTranslations } from 'next-intl';
import { Loader } from '@/components/admin/common/Loader';
import { NotFound } from '@/components/admin/common/NotFound';
import { AdminPage } from '@/components/admin/common/AdminPage';
import { useSessions } from '@/hooks/admin/users/useSessions';
import { FilterField, Filters, List } from '@/components/admin/common/ListPage';
import { useLocale } from 'next-intl';
import { Session } from './Session';
import { useSessionsFilters } from '@/hooks/admin/users/useSessionsFilters';
import { SessionType } from '@lib/api/services/types/session.types';

export const Sessions = ({ user_id }: { user_id: string }) => {
  const tSessions = useTranslations('admin.users.sessions');
  const tFilters = useTranslations('admin.common.list_page.filters');
  const { data: sessions, isLoading: is_loading } = useSessions(user_id).useGet();
  const locale = useLocale();
  const { filters, updateFilters, resetFilters, setPage, current_page } = useSessionsFilters({
    permanent_fields: {
      user_id: user_id
    }
  });

  if (is_loading) return <Loader />

  if (!sessions) return <NotFound />

  return (
    <AdminPage
      title={tSessions('title')}
    >
      <Filters
        filters={filters}
        onUpdateFilters={updateFilters}
        onResetFilters={resetFilters}
        is_loading={is_loading}
      >
        <FilterField
          name="ip_address"
          label={tFilters('ip_address_label')}
          value={filters.ip_address}
          onChange={(name, value) => updateFilters({ [name]: value })}
          placeholder={tFilters('ip_address_placeholder')}
          type="text"
        />
        <FilterField
          name="user_agent"
          label={tFilters('user_agent_label')}
          value={filters.user_agent}
          onChange={(name, value) => updateFilters({ [name]: value })}
          placeholder={tFilters('user_agent_placeholder')}
          type="text"
        />
        <FilterField
          name="is_active"
          label={tFilters('is_active_label')}
          value={filters.is_active}
          onChange={(name, value) => updateFilters({ [name]: value })}
          placeholder={tFilters('is_active_placeholder')}
          type="checkbox"
        />
      </Filters>
      <List<SessionType>
        items={sessions || []}
        total={sessions.length || 0}
        current_page={current_page}
        loading={is_loading}
        page_size={filters.take}
        onPageChange={setPage}
        empty_message={tSessions('empty_message')}
        renderItem={(item) => (<Session session={item} locale={locale} key={`${item.id}-${item.data.expires_at}`} />)}
        items_label={tSessions('items_label')}
      />
    </AdminPage>
  );
}; 