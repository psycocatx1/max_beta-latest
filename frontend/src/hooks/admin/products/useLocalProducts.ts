import { useQuery, useMutation } from "@tanstack/react-query";
import { CreateLocalProductDto, LocalProductFiltersDto, UpdateLocalProductDto, LocalProductsApi } from "@lib/api/services";
import { query_client } from "@lib/api";
import { useCommon, QUERY_KEYS } from '../useCommon'

const invalidate_queries = (id?: string) => {
  query_client.invalidateQueries({ queryKey: ['local_products'], exact: false });
  query_client.invalidateQueries({ queryKey: ['validate_entities'], exact: false });
  if (id) query_client.invalidateQueries({ queryKey: ['local_product', id] });
}

/**
 * Хук для работы с локальными товарами
 */
export const useLocalProducts = () => {
  const toast = useCommon()

  const useGet = (filters: LocalProductFiltersDto, enabled: boolean = true) => useQuery({
    queryKey: QUERY_KEYS.local_products(filters),
    queryFn: () => LocalProductsApi.get(filters),
    select: (data) => data.data,
    enabled
  });

  const useFind = (id: string) => useQuery({
    queryKey: QUERY_KEYS.local_product(id),
    queryFn: () => LocalProductsApi.find(id),
    select: (data) => data.data,
  });

  const useCreate = () => useMutation({
    mutationFn: (data: CreateLocalProductDto) => LocalProductsApi.create(data),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries()
    },
    onError: toast.errorWhileCreating
  });

  const useUpdate = (id: string) => useMutation({
    mutationFn: (data: UpdateLocalProductDto) => LocalProductsApi.update(id, data),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries(id)
    },
    onError: toast.errorWhileUpdating
  });

  const useDelete = (id: string) => useMutation({
    mutationFn: () => LocalProductsApi.delete(id),
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
