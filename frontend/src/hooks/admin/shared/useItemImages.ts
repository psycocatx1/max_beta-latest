import { useQuery, useMutation } from "@tanstack/react-query";
import { CreateItemImageFormData, ItemImagesFiltersDto, UpdateItemImageFormData, ItemImagesApi } from "@lib/api/services";
import { query_client } from "@lib/api";
import { useCommon, QUERY_KEYS } from "../useCommon";

const invalidate_queries = (id?: string) => {
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.item_images(), exact: false });
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.validate_entities(), exact: false });
  if (id) query_client.invalidateQueries({ queryKey: QUERY_KEYS.item_image(id) });
}

/**
 * Хук для работы с изображениями товаров и услуг
 */
export const useItemImages = () => {
  const toast = useCommon()

  const useGet = (filters: ItemImagesFiltersDto, enabled: boolean = true) => useQuery({
    queryKey: QUERY_KEYS.item_images(filters),
    queryFn: () => ItemImagesApi.get(filters),
    select: (data) => data.data,
    enabled
  });

  const useFind = (id: string) => useQuery({
    queryKey: QUERY_KEYS.item_image(id),
    queryFn: () => ItemImagesApi.find(id),
    select: (data) => data.data,
  });

  const useCreate = () => useMutation({
    mutationFn: (data: CreateItemImageFormData) => ItemImagesApi.create(data),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries()
    },
    onError: toast.errorWhileCreating
  });

  const useUpdate = (id: string) => useMutation({
    mutationFn: (data: UpdateItemImageFormData) => ItemImagesApi.update(id, data),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries(id)
    },
    onError: toast.errorWhileUpdating
  });

  const useDelete = (id: string) => useMutation({
    mutationFn: () => ItemImagesApi.delete(id),
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