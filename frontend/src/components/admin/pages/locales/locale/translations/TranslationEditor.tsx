'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useToast } from '@/hooks/useToast';
import { useTranslations as useTranslationsAPI } from '@/hooks/admin/translations';
import { useLocales } from '@/hooks/admin/locales';
import { JsonEditor } from '@/components/admin/common/JsonEditor';
import { TranslationModuleType } from '@lib/api/services';
import styles from './TranslationEditor.module.scss';
import { Loader } from '@/components/admin/common/Loader';
import { NotFound } from '@/components/admin/common/NotFound';
import { NestedRecord } from '@/components/admin/common/JsonEditor/useJsonEditor';

interface TranslationEditorProps {
  locale_id: string;
  module: TranslationModuleType;
}

export const TranslationEditor = ({ locale_id, module }: TranslationEditorProps) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [localData, setLocalData] = useState<NestedRecord>({});
  const tTranslations = useTranslations('admin.locales.translations');
  const tCommon = useTranslations('common');
  const toast = useToast();

  // Получаем данные локали для получения символа
  const { useFind } = useLocales();
  const { data: locale } = useFind(locale_id);

  const locale_symbol = locale?.symbol || '';

  const { useGet, useUpdate } = useTranslationsAPI();

  const { data: translations, isLoading: is_loading } = useGet(locale_symbol, module, !!locale_symbol);
  const update_mutation = useUpdate(locale_symbol, module);

  // Инициализируем локальные данные при загрузке
  useEffect(() => {
    if (translations && !hasChanges) {
      setLocalData(translations);
    }
  }, [translations, hasChanges]);

  const handleDataChange = (newData: NestedRecord) => {
    setLocalData(newData);
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      await update_mutation.mutateAsync({
        translations: localData
      });
      setHasChanges(false);
      toast.success(tCommon('saved_successfully'));
    } catch (error) {
      toast.error(tCommon('error_while_saving'));
      console.error('Translation save error:', error);
    }
  };

  const handleReset = () => {
    if (translations) {
      setLocalData(translations);
      setHasChanges(false);
    }
  };

  if (is_loading) return <Loader />

  if (!locale) return <NotFound />

  return (
    <div className={styles.translation_editor}>
      <div className={styles.header}>
        <h2 className={styles.title} data-intl-key="admin.locales.translations.module_title">
          {tTranslations('module_title', { module })} ({locale_symbol})
        </h2>

        <div className={styles.actions}>
          {hasChanges && (
            <button
              onClick={handleReset}
              className={styles.reset_button}
              disabled={update_mutation.isPending}
              data-intl-key="common.cancel"
            >
              {tCommon('cancel')}
            </button>
          )}

          <button
            onClick={handleSave}
            className={styles.save_button}
            disabled={!hasChanges || update_mutation.isPending}
            data-intl-key="common.save, common.saving"
          >
            {tCommon(update_mutation.isPending ? 'saving' : 'save')}
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className={styles.changes_indicator} data-intl-key="admin.locales.translations.unsaved_changes">
          <span>{tTranslations("unsaved_changes")}</span>
        </div>
      )}

      <div className={styles.editor_container}>
        <JsonEditor
          data={localData}
          onChange={handleDataChange}
        />
      </div>
    </div>
  );
}; 