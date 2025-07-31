import { useQuery, useMutation } from '@tanstack/react-query';
import { FormsApi } from '@lib/api/services/api/forms.api';
import { FormsFiltersDto, CreateFormDto } from '@lib/api/services/types/forms.types';
import { QUERY_KEYS } from '../query-keys';
import { query_client } from '@lib/api';
import { useCommon } from '../useCommon';
import { useTranslations } from 'next-intl';
import { AxiosError } from 'axios';

const invalidate_queries = (id?: string) => {
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.forms(), exact: false });
  if (id) query_client.invalidateQueries({ queryKey: QUERY_KEYS.form(id) });
};

/**
 * Хук для работы с формами
 */
export const useForms = () => {
  const toast = useCommon();
  const tForms = useTranslations('public.pages.contacts.form');
  const useGet = (filters: FormsFiltersDto, enabled: boolean = true) => useQuery({
    queryKey: QUERY_KEYS.forms(filters),
    queryFn: () => FormsApi.get(filters),
    select: (data) => data.data,
    enabled
  });

  const useFind = (id: string) => useQuery({
    queryKey: QUERY_KEYS.form(id),
    queryFn: () => FormsApi.find(id),
    select: (data) => data.data,
  });

  const useCreate = (locale: string) => useMutation({
    mutationFn: (data: CreateFormDto) => FormsApi.create(locale, data),
    onSuccess: () => {
      toast.success(tForms('form_sent_success'));
      invalidate_queries();
    },
    onError: (e: AxiosError) => {
      switch (e.response?.status) {
        case 400:
          toast.warning(tForms('form_sent_daily_limit_error'));
          break
        default:
          toast.error(tForms('form_sent_error'));
          break
      }
    }
  });

  const useMarkAsAnswered = (id: string) => useMutation({
    mutationFn: () => FormsApi.markAsAnswered(id),
    onSuccess: () => {
      toast.updatedSuccessfully();
      invalidate_queries(id);
    },
    onError: toast.errorWhileUpdating
  });

  const useDelete = (id: string) => useMutation({
    mutationFn: () => FormsApi.delete(id),
    onSuccess: () => {
      toast.deletedSuccessfully();
      invalidate_queries(id);
    },
    onError: toast.errorWhileDeleting
  });

  return {
    useGet,
    useFind,
    useCreate,
    useMarkAsAnswered,
    useDelete
  };
}; 