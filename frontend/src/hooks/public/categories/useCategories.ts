import { CategoryFiltersDto, CategoryWithCounts, CategoriesApi } from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import { useEffect } from "react";

interface UseCategories {
  filters: CategoryFiltersDto;
  enabled?: boolean;
  initial_data?: CategoryWithCounts[];
}

export const useCategories = ({ filters, enabled = true, initial_data = [] }: UseCategories) => {
  const categories = useQuery({
    queryKey: QUERY_KEYS.categories(filters),
    queryFn: async () => (await CategoriesApi.get(filters)).data,
    initialData: { items: initial_data, total: initial_data.length, skip: 0, take: 1000 },
    enabled,
  })
  useEffect(() => { categories.refetch() });
  return categories
}