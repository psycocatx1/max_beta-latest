import { useMutation, useQuery } from "@tanstack/react-query";
import { query_client } from "@lib/api";
import { LocalCategoryFiltersDto, CreateLocalCategoryDto, UpdateLocalCategoryDto, LocalCategoriesApi } from "@lib/api/services";
import { useCommon, QUERY_KEYS } from "../useCommon";

interface InvalidateQueries {
  id?: string,
  filters?: Partial<LocalCategoryFiltersDto>
}

const invalidate_queries = ({ id, filters }: InvalidateQueries) => {
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.local_categories(), exact: false });
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.categories(), exact: false });
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.validate_entities(), exact: false });
  if (id) query_client.invalidateQueries({ queryKey: QUERY_KEYS.local_category(id) });
  if (filters?.category_id) query_client.invalidateQueries({ queryKey: QUERY_KEYS.category(filters.category_id) });
}

/**
 * Хук для работы с локализациями категорий
 */
export const useLocalCategories = () => {
  const toast = useCommon()

  const useGet = (filters: LocalCategoryFiltersDto, enabled: boolean = true) => useQuery({
    queryKey: QUERY_KEYS.local_categories(filters),
    queryFn: () => LocalCategoriesApi.get(filters),
    select: (data) => data.data,
    enabled,
  });

  const useFind = (id: string) => useQuery({
    queryKey: QUERY_KEYS.local_category(id),
    queryFn: () => LocalCategoriesApi.find(id),
    select: (data) => data.data,
    enabled: !!id,
  });

  const useGetByCategory = (category_id: string, enabled: boolean = true) => useQuery({
    queryKey: QUERY_KEYS.local_categories({ category_id }),
    queryFn: () => LocalCategoriesApi.getByCategory(category_id),
    select: (data) => data.data,
    enabled: !!category_id && enabled,
  });

  const useGetByCategoryAndLocale = (category_id: string, locale_id: string, enabled: boolean = true) => useQuery({
    queryKey: QUERY_KEYS.local_categories({ category_id, locale_id }),
    queryFn: () => LocalCategoriesApi.getByCategoryAndLocale(category_id, locale_id),
    select: (data) => data.data,
    enabled: !!category_id && !!locale_id && enabled,
  });

  const useCreate = () => useMutation({
    mutationFn: (data: CreateLocalCategoryDto) => LocalCategoriesApi.create(data),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries({})
    },
    onError: toast.errorWhileCreating
  });

  const useCreateBulk = (category_id: string) => useMutation({
    mutationFn: (localizations: Omit<CreateLocalCategoryDto, 'category_id'>[]) => LocalCategoriesApi.createBulk(category_id, localizations),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries({ filters: { category_id } })
    },
    onError: toast.errorWhileCreating
  });

  const useUpdate = (id: string, category_id?: string) => useMutation({
    mutationFn: (data: UpdateLocalCategoryDto) => LocalCategoriesApi.update(id, data),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries({ id, filters: { category_id } })
    },
    onError: toast.errorWhileUpdating
  });

  const useDelete = (id: string, category_id?: string) => useMutation({
    mutationFn: () => LocalCategoriesApi.delete(id),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries({ id, filters: { category_id } })
    },
    onError: toast.errorWhileDeleting
  });

  return {
    useGet,
    useFind,
    useGetByCategory,
    useGetByCategoryAndLocale,
    useCreate,
    useCreateBulk,
    useUpdate,
    useDelete,
  };
}; 