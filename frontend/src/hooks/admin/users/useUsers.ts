import { useQuery, useMutation } from "@tanstack/react-query";
import { UsersApi, UserFiltersDto, UpdateUserFormData } from "@lib/api/services";
import { query_client } from "@lib/api";
import { Prisma } from "@prisma/client";
import { useCommon, QUERY_KEYS } from "../useCommon";

const invalidate_queries = (where?: Prisma.UserWhereUniqueInput) => {
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.users(), exact: false });
  if (where) query_client.invalidateQueries({ queryKey: QUERY_KEYS.user(where) });
}

/**
 * Хук для работы с пользователями
 */
export const useUsers = () => {
  const toast = useCommon()

  const useGet = (filters: UserFiltersDto) => useQuery({
    queryKey: QUERY_KEYS.users(filters),
    queryFn: () => UsersApi.get(filters),
    select: (data) => data.data,
  });

  const useUpdate = (where: Prisma.UserWhereUniqueInput) => useMutation({
    mutationFn: (data: UpdateUserFormData) => UsersApi.update(where, data),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries(where)
    }
  });

  const useFind = (where: Prisma.UserWhereUniqueInput) => useQuery({
    queryKey: QUERY_KEYS.user(where),
    queryFn: () => UsersApi.find(where),
    select: data => data.data
  })

  return {
    useFind,
    useGet,
    useUpdate
  };
};