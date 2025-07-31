import { CategoryFiltersDto } from "@/lib/api";

export const QUERY_KEYS = {
  categories: (filters?: CategoryFiltersDto) => ['categories', filters],
  category: (id: string, locale_id?: string) => ['category', id, locale_id]
}