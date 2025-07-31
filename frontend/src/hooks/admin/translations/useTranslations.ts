import { useQuery, useMutation } from "@tanstack/react-query";
import { query_client } from "@lib/api";
import { TranslationsApi, TranslationModuleType, UpdateTranslationDto } from "@lib/api/services";
import { QUERY_KEYS, useCommon } from "../useCommon";

/**
 * Хук для работы с переводами в админке (редактирование)
 */
export const useTranslations = () => {
  const toast = useCommon()

  const useGet = (locale_symbol: string, module: TranslationModuleType, enabled: boolean = true) => useQuery({
    queryKey: QUERY_KEYS.translations(locale_symbol, module),
    queryFn: () => TranslationsApi.get(locale_symbol, module),
    select: (data) => data.data,
    enabled: !!locale_symbol && !!module && enabled,
  });

  const useUpdate = (locale_symbol: string, module: TranslationModuleType) => useMutation({
    mutationFn: (data: UpdateTranslationDto) => TranslationsApi.update(locale_symbol, module, data),
    onSuccess: () => {
      toast.updatedSuccessfully()
      query_client.invalidateQueries({ queryKey: QUERY_KEYS.translations(locale_symbol, module), exact: true });
      query_client.invalidateQueries({ queryKey: QUERY_KEYS.messages(locale_symbol), exact: true });
    },
    onError: toast.errorWhileUpdating
  });

  return {
    useGet,
    useUpdate,
  };
};
