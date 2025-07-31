import { CategoriesApi, ExtendedCategory } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../query-keys"
import { useEffect } from "react"

interface UseCategory {
  locale_id?: string,
  category_id: string,
  initial_data?: ExtendedCategory
}

export const useCategory = ({ locale_id, category_id, initial_data }: UseCategory) => {
  const category = useQuery({
    queryKey: QUERY_KEYS.category(category_id, locale_id),
    queryFn: async () => (await CategoriesApi.find(category_id, locale_id)).data,
    initialData: initial_data
  })
  useEffect(() => { category.refetch() })
  return category
}