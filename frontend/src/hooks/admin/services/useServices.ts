import { useQuery, useMutation } from "@tanstack/react-query";
import { CreateServiceFormData, ServiceFiltersDto, UpdateServiceFormData, ServicesApi } from "@lib/api/services";
import { AxiosResponse, BaseListResult, ExtendedService, query_client } from "@lib/api";
import { useCommon, QUERY_KEYS } from "../useCommon";

const invalidate_queries = (id?: string) => {
  query_client.invalidateQueries({ queryKey: ['services'], exact: false });
  query_client.invalidateQueries({ queryKey: ['validate_entities'], exact: false });
  if (id) query_client.invalidateQueries({ queryKey: QUERY_KEYS.service(id) });
}

/**
 * Хук для работы с услугами
 */
export const useServices = () => {
  const toast = useCommon()

  const useGet = (filters: ServiceFiltersDto, initial_data?: BaseListResult<ExtendedService>) => useQuery({
    queryKey: QUERY_KEYS.services(filters),
    queryFn: () => ServicesApi.get(filters),
    select: (data) => data.data,
    initialData: initial_data ? { data: initial_data } as AxiosResponse<BaseListResult<ExtendedService>> : undefined
  });

  const useFind = ({ id, locale_id, initial_data }: { id: string, locale_id?: string, initial_data?: ExtendedService }) => useQuery({
    queryKey: QUERY_KEYS.service(id),
    queryFn: () => ServicesApi.find(id, locale_id),
    select: (data) => data.data,
    initialData: initial_data ? { data: initial_data } as AxiosResponse<ExtendedService> : undefined,
  });

  const useCreate = () => useMutation({
    mutationFn: (data: CreateServiceFormData) => ServicesApi.create(data),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries()
    },
    onError: toast.errorWhileCreating
  });

  const useUpdate = (id: string) => useMutation({
    mutationFn: (data: UpdateServiceFormData) => ServicesApi.update(id, data),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries(id)
    },
    onError: toast.errorWhileUpdating
  });

  const useDelete = (id: string) => useMutation({
    mutationFn: () => ServicesApi.delete(id),
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