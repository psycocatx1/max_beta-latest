import { useQuery, useMutation } from "@tanstack/react-query";
import { CreateLocalServiceDto, LocalServiceFiltersDto, UpdateLocalServiceDto, LocalServicesApi } from "@lib/api/services";
import { query_client } from "@lib/api";
import { useCommon, QUERY_KEYS } from "../useCommon";

const invalidate_queries = (id?: string) => {
  query_client.invalidateQueries({ queryKey: ['local_services'], exact: false });
  query_client.invalidateQueries({ queryKey: ['validate_entities'], exact: false });
  if (id) query_client.invalidateQueries({ queryKey: QUERY_KEYS.local_service(id) });
}

/**
 * Хук для работы с локальными услугами
 */
export const useLocalServices = () => {
  const toast = useCommon()

  const useGet = (filters: LocalServiceFiltersDto, enabled: boolean = true) => useQuery({
    queryKey: QUERY_KEYS.local_services(filters),
    queryFn: () => LocalServicesApi.get(filters),
    select: (data) => data.data,
    enabled
  });

  const useFind = (id: string) => useQuery({
    queryKey: QUERY_KEYS.local_service(id),
    queryFn: () => LocalServicesApi.find(id),
    select: (data) => data.data,
  });

  const useCreate = () => useMutation({
    mutationFn: (data: CreateLocalServiceDto) => LocalServicesApi.create(data),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries()
    },
    onError: toast.errorWhileCreating
  });

  const useUpdate = (id: string) => useMutation({
    mutationFn: (data: UpdateLocalServiceDto) => LocalServicesApi.update(id, data),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries(id)
    },
    onError: toast.errorWhileUpdating
  });

  const useDelete = (id: string) => useMutation({
    mutationFn: () => LocalServicesApi.delete(id),
    onSuccess: () => {
      toast.deletedSuccessfully()
      invalidate_queries(id)
    },
    onError: toast.errorWhileDeleting
  });

  return {
    useGet,
    useFind,
    useCreate,
    useUpdate,
    useDelete
  };
};
