import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { useValidation } from '@/hooks/admin/translations';
import { TranslationModuleType, GlobalTranslationValidationStatus, TranslationSyncResult, TranslationResponse, TranslationUrlParams, TranslationHref, TranslationPathname } from '@lib/api/services';
import { UseMutationResult } from '@tanstack/react-query';

// Типы для возвращаемых значений хука
interface TransactionStatusReturn {
  is_expanded: boolean;
  expandedLocales: Set<string>;
  toggleLocaleExpanded: (locale_symbol: string) => void;
  getTranslationEditUrl: (params: TranslationUrlParams) => TranslationHref;
  handleSyncAll: () => Promise<void>;
  handleRepairFile: (locale_symbol: string, module: TranslationModuleType) => Promise<void>;
  status: GlobalTranslationValidationStatus | undefined;
  setIsExpanded: (expanded: boolean) => void;
  error: unknown;
  is_loading: boolean;
  sync_all_mutation: UseMutationResult<{ data: TranslationSyncResult[]; }, Error, void, unknown>;
  repair_file_mutation: UseMutationResult<{ data: TranslationResponse; }, Error, { locale_symbol: string; module: TranslationModuleType; }, unknown>;
}

export const useTransactionStatus = (): TransactionStatusReturn => {
  const [is_expanded, setIsExpanded] = useState<boolean>(false);
  const [expandedLocales, setExpandedLocales] = useState<Set<string>>(new Set());

  const toast = useToast();

  const { useGetValidationStatus, useSyncAll, useRepairFile } = useValidation();
  const { data: status, isLoading: is_loading, error } = useGetValidationStatus();
  const sync_all_mutation = useSyncAll();
  const repair_file_mutation = useRepairFile();

  const handleSyncAll = async (): Promise<void> => {
    try {
      await sync_all_mutation.mutateAsync();
      toast.success('Синхронизация завершена успешно');
    } catch {
      toast.error('Ошибка синхронизации');
    }
  };

  const handleRepairFile = async (locale_symbol: string, module: TranslationModuleType): Promise<void> => {
    try {
      await repair_file_mutation.mutateAsync({ locale_symbol, module });
      toast.success(`Файл ${locale_symbol}/${module} восстановлен`);
    } catch {
      toast.error(`Ошибка восстановления файла ${locale_symbol}/${module}`);
    }
  };

  const toggleLocaleExpanded = (locale_symbol: string): void => {
    const newExpanded = new Set(expandedLocales);
    if (newExpanded.has(locale_symbol)) {
      newExpanded.delete(locale_symbol);
    } else {
      newExpanded.add(locale_symbol);
    }
    setExpandedLocales(newExpanded);
  };

  const getTranslationEditUrl = ({ module, locale_id }: TranslationUrlParams): TranslationHref => {
    // Строго типизированное создание URL без использования as, any или string
    const paths: Record<TranslationModuleType, TranslationPathname> = {
      admin: '/admin/locales/[locale_id]/translations/admin',
      common: '/admin/locales/[locale_id]/translations/common',
      public: '/admin/locales/[locale_id]/translations/public',
    };

    return {
      pathname: paths[module],
      params: { locale_id },
    };
  };

  return {
    is_expanded,
    expandedLocales,
    toggleLocaleExpanded,
    getTranslationEditUrl,
    handleSyncAll,
    handleRepairFile,
    status,
    setIsExpanded,
    error,
    is_loading,
    sync_all_mutation,
    repair_file_mutation,
  };
};