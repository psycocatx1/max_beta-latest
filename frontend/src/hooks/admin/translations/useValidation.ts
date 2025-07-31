import { useMutation, useQuery } from "@tanstack/react-query";
import { TranslationsApi, TranslationModuleType } from "@lib/api/services";
import { query_client } from "@lib/api";
import { useCommon, QUERY_KEYS } from "../useCommon";

const invalidate_queries = () => {
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.translations(), exact: false });
  query_client.invalidateQueries({ queryKey: QUERY_KEYS.translations_validation(), exact: false });
}

interface RepairFile { locale_symbol: string; module: TranslationModuleType }

/**
 * Хук для работы с валидацией переводов
 */
export const useValidation = () => {
  const toast = useCommon()

  const useGetValidationStatus = () => useQuery({
    queryKey: ['translations_validation'],
    queryFn: () => TranslationsApi.getValidationStatus(),
    select: (data) => data.data,
  });

  const useSyncAll = () => useMutation({
    mutationFn: () => TranslationsApi.syncAllTranslations(),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries()
    },
    onError: toast.errorWhileUpdating
  });

  const useCreateLocaleFiles = () => useMutation({
    mutationFn: (locale_symbol: string) => TranslationsApi.createLocaleFiles(locale_symbol),
    onSuccess: () => {
      toast.createdSuccessfully()
      invalidate_queries()
    },
    onError: toast.errorWhileCreating
  });

  const useRepairFile = () => useMutation({
    mutationFn: ({ locale_symbol, module }: RepairFile) => TranslationsApi.repairTranslationFile(locale_symbol, module),
    onSuccess: () => {
      toast.updatedSuccessfully()
      invalidate_queries()
    },
    onError: toast.errorWhileUpdating
  });

  return {
    useGetValidationStatus,
    useSyncAll,
    useCreateLocaleFiles,
    useRepairFile
  };
}; 