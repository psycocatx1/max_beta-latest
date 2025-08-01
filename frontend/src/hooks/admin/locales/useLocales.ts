import { useQuery, useMutation } from "@tanstack/react-query";
import { CreateLocaleFormData, LocaleFiltersDto, UpdateLocaleFormData, LocalesApi } from "@lib/api/services";
import { query_client } from "@lib/api";
import { useCommon, QUERY_KEYS } from "../useCommon";

const invalidate_queries = (id?: string) => {
  query_client.invalidateQueries({ queryKey: ['locales'], exact: false });
  query_client.invalidateQueries({ queryKey: ['validate_entities'], exact: false });
  if (id) {
    query_client.invalidateQueries({ queryKey: QUERY_KEYS.locale(id) });
    // Также инвалидируем все локальные сущности, так как они могут быть связаны с этой локалью
    query_client.invalidateQueries({ queryKey: ['local_products'], exact: false });
    query_client.invalidateQueries({ queryKey: ['local_services'], exact: false });
    query_client.invalidateQueries({ queryKey: ['local_categories'], exact: false });
    query_client.invalidateQueries({ queryKey: ['local_item_descriptions'], exact: false });
  }
}

/**
 * Хук для работы с локалями
 */
export const useLocales = () => {
  const toast = useCommon()

  const useGet = (filters: LocaleFiltersDto, enabled: boolean = true) => useQuery({
    queryKey: QUERY_KEYS.locales(filters),
    queryFn: () => LocalesApi.get(filters),
    select: (data) => data.data,
    enabled
  });

  const useFind = (id: string) => useQuery({
    queryKey: QUERY_KEYS.locale(id),
    queryFn: () => LocalesApi.find(id),
    select: (data) => data.data,
  });

  const useCreate = () => useMutation({
    mutationFn: (data: CreateLocaleFormData) => LocalesApi.create(data),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries()
    },
    onError: toast.createdSuccessfully
  });

  const useUpdate = (id: string) => useMutation({
    mutationFn: (data: UpdateLocaleFormData) => LocalesApi.update(id, data),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries(id)
    },
    onError: toast.errorWhileUpdating
  });

  const useDelete = (id: string) => useMutation({
    mutationFn: () => LocalesApi.delete(id),
    onSuccess: () => {
      toast.deletedSuccessfully()
      invalidate_queries(id)
    },
    onError: toast.errorWhileDeleting
  });

  const useValidateEntities = () => useQuery({
    queryKey: QUERY_KEYS.validate_entities(),
    queryFn: () => LocalesApi.validateEntities(),
    select: (data) => data.data,
  });

  return {
    useGet,
    useValidateEntities,
    useFind,
    useUpdate,
    useCreate,
    useDelete
  };
};