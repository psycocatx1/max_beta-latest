import { useQuery, useMutation } from '@tanstack/react-query';
import { SessionsApi } from '@lib/api/services/api';
import { query_client } from '@lib/api';
import { useCommon, QUERY_KEYS } from '../useCommon';

const invalidate_queries = (user_id: string) => {
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.sessions(user_id), exact: false });
}
/**
 * Хук для работы с сессиями пользователя
 */
export const useSessions = (user_id: string) => {
  const toast = useCommon()
  /**
   * Получение активных сессий пользователя
   */
  const useGet = () => useQuery({
    queryKey: QUERY_KEYS.sessions(user_id),
    queryFn: () => SessionsApi.get(user_id),
    enabled: !!user_id,
    select: data => data.data
  });

  /**
   * Деактивация конкретной сессии
   */
  const useDeactivate = () => useMutation({
    mutationFn: SessionsApi.deactivate_session,
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries(user_id)
    },
    onError: toast.errorWhileUpdating
  });

  /**
   * Деактивация всех остальных сессий (кроме текущей)
   */
  const useDeactivateAll = () => useMutation({
    mutationFn: () => SessionsApi.deactivate_all_sessions(user_id),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries(user_id)
    },
    onError: toast.errorWhileUpdating
  });

  const useDelete = () => useMutation({
    mutationFn: (session_id: string) => SessionsApi.delete_session(session_id),
    onSuccess: () => {
      toast.deletedSuccessfully()
      invalidate_queries(user_id)
    },
    onError: toast.errorWhileDeleting
  });

  return {
    useGet,
    useDeactivate,
    useDeactivateAll,
    useDelete
  };
};