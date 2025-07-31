import { useSessions } from '@/hooks/useAuth';
import { formatDate } from '@/lib/intl/format-date';
import { TrashIcon, BanIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SessionType } from '@lib/api/services/types/session.types';
import styles from './Session.module.scss';

export const Session = ({ session, locale }: { session: SessionType, locale: string }) => {
  const delete_mutation = useSessions(session.data.user_id).useDelete();
  const deactivate_mutation = useSessions(session.data.user_id).useDeactivate();
  const tSessions = useTranslations('admin.users.sessions');

  const getSessionInfo = () => {
    const info = [];
    if (session.data.ip_address) {
      info.push(`${tSessions('ip_address')}: ${session.data.ip_address}`);
    }
    if (session.data.is_active) info.push(tSessions('is_active'));
    return info.join(' • ');
  };

  return (
    <div className={`${styles.session} ${session.data.is_active ? styles.session_active : ''}`}>
      <div className={styles.session_info}>
        <div className={styles.session_info_title}>
          {session.data.user_agent || tSessions('user_agent')}
        </div>
        <div className={styles.session_info_subtitle}>
          {getSessionInfo()}
        </div>
        <div className={styles.session_info_subtitle}>
          {tSessions('expires_at')}: {formatDate({ date: session.data.expires_at, locale })}
        </div>
      </div>
      <div className={styles.session_actions}>
        <button
          className={`${styles.session_actions_button} ${styles.session_actions_button_delete}`}
          onClick={() => delete_mutation.mutate(session.id)}
          disabled={delete_mutation.isPending}
        >
          <TrashIcon />
          {tSessions('delete_session')}
        </button>
        <button
          className={`${styles.session_actions_button} ${styles.session_actions_button_deactivate}`}
          onClick={() => deactivate_mutation.mutate(session.id)}
          disabled={deactivate_mutation.isPending}
        >
          <BanIcon />
          {tSessions('deactivate_session')}
        </button>
      </div>
    </div>
  );
};