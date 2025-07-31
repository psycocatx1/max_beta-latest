import { TranslationsApi } from "@/lib/api/services/api";
import { TranslationModuleType } from "@/lib/api/services/types";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

/**
 * Хук для получения переводов для использования в приложении
 */
export const useMessages = () => {
  const useGet = (locale_symbol: string, modules?: TranslationModuleType[], enabled: boolean = true) => useQuery({
    queryKey: QUERY_KEYS.messages(locale_symbol, modules),
    queryFn: () => TranslationsApi.getMessages(locale_symbol, modules),
    select: (data) => data.data,
    enabled: !!locale_symbol && enabled,
  });

  return {
    useGet,
  };
}; 