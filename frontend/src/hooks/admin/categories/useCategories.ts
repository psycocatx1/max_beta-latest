import { useQuery, useMutation } from "@tanstack/react-query";
import { CategoryFiltersDto, CreateCategoryFormData, UpdateCategoryFormData, CategoriesApi } from "@lib/api/services";
import { CategoryType, query_client } from "@lib/api";
import { isAxiosError } from "axios";
import { useRouter } from "@/hooks/useRouting";
import { useCommon, QUERY_KEYS } from "../useCommon"
import { useTranslations } from "next-intl";

const invalidate_queries = (id?: string) => {
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.categories(), exact: false });
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.validate_entities(), exact: false });
  if (id) query_client.invalidateQueries({ queryKey: QUERY_KEYS.category(id) });
}

/**
 * Хук для работы с категориями
 */
export const useCategories = () => {
  const tCategories = useTranslations('admin.categories')

  const toast = useCommon()
  const router = useRouter()

  const useGet = (filters: CategoryFiltersDto, enabled: boolean = true) => useQuery({
    queryKey: QUERY_KEYS.categories(filters),
    queryFn: () => CategoriesApi.get(filters),
    select: (data) => data.data,
    enabled
  });

  const useFind = (id: string) => useQuery({
    queryKey: QUERY_KEYS.category(id),
    queryFn: () => CategoriesApi.find(id),
    select: (data) => data.data,
  });

  const useCreate = () => useMutation({
    mutationFn: (data: CreateCategoryFormData) => CategoriesApi.create(data),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries()
    },
    onError: toast.errorWhileCreating
  });

  const useUpdate = (id: string) => useMutation({
    mutationFn: (data: UpdateCategoryFormData) => CategoriesApi.update(id, data),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries(id)
    },
    onError: toast.errorWhileUpdating
  });

  const useDelete = (id: string, type: CategoryType) => useMutation({
    mutationFn: () => CategoriesApi.delete(id),
    onSuccess: () => {
      toast.deletedSuccessfully()
      invalidate_queries(id)
      router.push(`/admin/${type.toLowerCase() as 'product' | 'service'}-categories`);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            toast.warning(tCategories("error_while_deleting_category_has_children_elements"));
            break;
          default:
            toast.errorWhileDeleting(error)
        }
      }
    }
  });

  return {
    useGet,
    useFind,
    useCreate,
    useUpdate,
    useDelete
  };
}; 