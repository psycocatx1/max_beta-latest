import { useQuery, useMutation } from "@tanstack/react-query";
import { CreateLocalItemDescriptionFormData, LocalItemDescriptionsFiltersDto, UpdateLocalItemDescriptionFormData, LocalItemDescriptionsApi } from "@lib/api/services";
import { query_client } from "@lib/api";
import { useCommon, QUERY_KEYS } from "../useCommon";

const invalidate_queries = (id?: string) => {
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.local_item_descriptions(), exact: false });
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.validate_entities(), exact: false });
  if (id) query_client.invalidateQueries({ queryKey: QUERY_KEYS.local_item_description(id) });
}

/**
 * Хук для работы с локальными описаниями товаров и услуг
 */
export const useLocalItemDescriptions = () => {
  const toast = useCommon()

  const useGet = (filters: LocalItemDescriptionsFiltersDto, enabled: boolean = true) => useQuery({
    queryKey: QUERY_KEYS.local_item_descriptions(filters),
    queryFn: () => LocalItemDescriptionsApi.get(filters),
    select: (data) => data.data,
    enabled
  });

  const useFind = (id: string) => useQuery({
    queryKey: QUERY_KEYS.local_item_description(id),
    queryFn: () => LocalItemDescriptionsApi.find(id),
    select: (data) => data.data,
  });

  const useCreate = () => useMutation({
    mutationFn: (data: CreateLocalItemDescriptionFormData) => LocalItemDescriptionsApi.create(data),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries()
    },
    onError: toast.errorWhileCreating
  });

  const useUpdate = (id: string) => useMutation({
    mutationFn: (data: UpdateLocalItemDescriptionFormData) => LocalItemDescriptionsApi.update(id, data),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries(id)
    },
    onError: toast.errorWhileUpdating
  });

  const useDelete = (id: string) => useMutation({
    mutationFn: () => LocalItemDescriptionsApi.delete(id),
    onSuccess: () => {
      toast.deletedSuccessfully()
      invalidate_queries(id)
    },
    onError: toast.errorWhileDeleting
  });

  const useReindex = () => useMutation({
    mutationFn: (data: { local_product_id?: string; local_service_id?: string }) =>
      LocalItemDescriptionsApi.reindex(data),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries()
    },
    onError: toast.errorWhileUpdating
  });

  return {
    useGet,
    useFind,
    useCreate,
    useUpdate,
    useDelete,
    useReindex
  };
};
