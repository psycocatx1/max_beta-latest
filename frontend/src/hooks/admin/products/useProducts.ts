import { useQuery, useMutation } from "@tanstack/react-query";
import { CreateProductFormData, ProductFiltersDto, UpdateProductFormData, ProductsApi } from "@lib/api/services";
import { BaseListResult, AxiosResponse, ExtendedProduct, query_client } from "@lib/api";
import { useCommon, QUERY_KEYS } from '../useCommon'

const invalidate_queries = (id?: string) => {
  query_client.invalidateQueries({ queryKey: ['validate_entities'], exact: false });
  query_client.invalidateQueries({ queryKey: ['products'], exact: false });
  if (id) {
    query_client.invalidateQueries({ queryKey: QUERY_KEYS.product(id) });
    // Также инвалидируем все локальные продукты, так как они могут быть связаны с этим продуктом
    query_client.invalidateQueries({ queryKey: QUERY_KEYS.local_products(), exact: false });
  }
}

/**
 * Хук для работы с товарами
 */
export const useProducts = () => {
  const toast = useCommon()

  const useGet = (filters: ProductFiltersDto, initial_data?: BaseListResult<ExtendedProduct>) => useQuery({
    queryKey: QUERY_KEYS.products(filters),
    queryFn: () => ProductsApi.get(filters),
    select: (data) => data.data,
    initialData: initial_data ? { data: initial_data } as AxiosResponse<BaseListResult<ExtendedProduct>> : undefined
  })

  const useFind = ({ id, initial_data, locale_id }: { id: string, initial_data?: ExtendedProduct, locale_id?: string }) => useQuery({
    queryKey: QUERY_KEYS.product(id),
    queryFn: () => ProductsApi.find(id, locale_id),
    select: (data) => data.data,
    initialData: initial_data ? { data: initial_data } as AxiosResponse<ExtendedProduct> : undefined,
    enabled: !!id
  });

  const useCreate = () => useMutation({
    mutationFn: (data: CreateProductFormData) => ProductsApi.create(data),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries()
    },
    onError: toast.errorWhileCreating
  });

  const useUpdate = (id: string) => useMutation({
    mutationFn: (data: UpdateProductFormData) => ProductsApi.update(id, data),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries(id)
    },
    onError: toast.errorWhileCreating
  });

  const useDelete = (id: string) => useMutation({
    mutationFn: () => ProductsApi.delete(id),
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