'use client';

import { TranslationModuleType } from '@lib/api/services';
import styles from './TranslationStatus.module.scss';
import { Loader } from '@/components/admin/common/Loader';
import { Link } from '@lib/intl';
import { Image } from '@/components/Image';
import { useTransactionStatus } from './useTransactionStatus';
import { useTranslations } from 'next-intl';
import { Locale } from '@prisma/client';
import { TranslationValidationResult } from '@lib/api/services';

interface LocaleValidationStatus {
  locale: Locale;
  modules: Record<string, TranslationValidationResult>;
}

interface TemplateFileInfo {
  exists: boolean;
  keys_count: number;
}

export const TranslationStatus = () => {
  const {
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
    repair_file_mutation
  } = useTransactionStatus();
  const tTranslationStatus = useTranslations('admin.dashboard.translation_status');

  // Функция для подсчета проблем в модуле
  const calculateModuleIssues = (moduleResult: TranslationValidationResult, templateKeysCount: number): number => {
    if (!moduleResult.exists) {
      // Если файл отсутствует, считаем все ключи как проблемы
      return templateKeysCount;
    }
    // Иначе сумма недостающих ключей и пустых значений
    return moduleResult.missing_keys.length + moduleResult.empty_values.length;
  };

  // Функция для подсчета всех проблем в локали
  const calculateLocaleIssues = (locale: LocaleValidationStatus, template_files: Record<string, TemplateFileInfo>): number => {
    return Object.entries(locale.modules).reduce((total, [module, moduleResult]) => {
      const templateInfo = template_files[module as TranslationModuleType];
      const templateKeysCount = templateInfo?.keys_count || 0;
      return total + calculateModuleIssues(moduleResult, templateKeysCount);
    }, 0);
  };

  if (is_loading) return <Loader />;

  if (error) {
    return (
      <div className={styles.translation_status}>
        <div className={styles.card_header}>
          <h3 className={styles.title}>
            <span className={styles.icon}>🌐</span>
            {tTranslationStatus('status_title')}
          </h3>
        </div>
        <div className={styles.error_state}>
          <span className={styles.error_icon}>⚠️</span>
          <span>{tTranslationStatus('loading_error')}</span>
        </div>
      </div>
    );
  }

  if (!status) return null;

  const { summary, locales, template_files } = status;

  // Обновляем подсчет общего количества проблем
  const totalIssues = locales.reduce((total, locale) => {
    return total + calculateLocaleIssues(locale, template_files);
  }, 0);

  const hasIssues = totalIssues > 0;
  const problemLocales = locales.filter(locale => {
    const localeIssues = calculateLocaleIssues(locale, template_files);
    return localeIssues > 0;
  });

  return (
    <div className={styles.translation_status}>
      {/* Основная карточка */}
      <div className={`${styles.main_card} ${hasIssues ? styles.has_issues : styles.all_good}`}>
        <div className={styles.card_header}>
          <div className={styles.title_section}>
            <h3 className={styles.title}>
              <span className={styles.icon}>🌐</span>
              {tTranslationStatus('system_title')}
            </h3>
            <div className={styles.status_indicators}>
              {hasIssues ? (
                <div className={styles.status_indicator_error}>
                  <span className={styles.indicator_icon}>⚠️</span>
                  <span>{tTranslationStatus('total_issues', { count: totalIssues })}</span>
                </div>
              ) : (
                <div className={styles.status_indicator_success}>
                  <span className={styles.indicator_icon}>✅</span>
                  <span>{tTranslationStatus('no_issues')}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.header_actions}>
            {hasIssues && (
              <button
                onClick={() => setIsExpanded(!is_expanded)}
                className={styles.expand_button}
              >
                {tTranslationStatus(is_expanded ? 'collapse' : 'expand')}
                <span className={`${styles.expand_icon} ${is_expanded ? styles.expanded : ''}`}>
                  ▼
                </span>
              </button>
            )}

            <button
              onClick={handleSyncAll}
              className={styles.sync_button}
              disabled={sync_all_mutation.isPending}
            >
              {tTranslationStatus(sync_all_mutation.isPending ? 'sync_loading' : 'sync')}
            </button>
          </div>
        </div>

        {/* Краткая статистика */}
        <div className={styles.quick_stats}>
          <div className={styles.stat_item}>
            <span className={styles.stat_number}>{summary.total_locales}</span>
            <span className={styles.stat_label}>{tTranslationStatus('total_locales')}</span>
          </div>

          {hasIssues && (
            <>
              <div className={styles.stat_item}>
                <span className={`${styles.stat_number} ${styles.stat_number_error}`}>
                  {summary.missing_files}
                </span>
                <span className={styles.stat_label}>{tTranslationStatus('missing_files')}</span>
              </div>

              <div className={styles.stat_item}>
                <span className={`${styles.stat_number} ${styles.stat_number_warning}`}>
                  {summary.total_missing_keys}
                </span>
                <span className={styles.stat_label}>{tTranslationStatus('missing_keys')}</span>
              </div>

              <div className={styles.stat_item}>
                <span className={`${styles.stat_number} ${styles.stat_number_info}`}>
                  {summary.total_empty_values}
                </span>
                <span className={styles.stat_label}>{tTranslationStatus('empty_values')}</span>
              </div>
            </>
          )}
        </div>

        {/* Шаблонные файлы */}
        <div className={styles.templates_status}>
          <h4 className={styles.section_title}>{tTranslationStatus('templates_title')}</h4>
          <div className={styles.templates_grid}>
            {Object.entries(template_files).map(([module, info]) => (
              <div
                key={module}
                className={`${styles.template_badge} ${!info.exists ? styles.error : styles.success}`}
              >
                <span className={styles.template_name}>{module}</span>
                <span className={styles.template_count}>
                  {info.exists ? info.keys_count : 0} {tTranslationStatus('keys')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Детальная информация о проблемах */}
      {hasIssues && is_expanded && (
        <div className={styles.details_section}>
          <h4 className={styles.details_title}>
            {tTranslationStatus('details_title', { count: problemLocales.length })}
          </h4>

          <div className={styles.problem_locales}>
            {problemLocales.map(locale => {
              const isLocaleExpanded = expandedLocales.has(locale.locale.symbol);
              const problemModules = Object.entries(locale.modules)
                .filter(([module, moduleResult]) => {
                  const templateInfo = template_files[module as keyof typeof template_files];
                  const templateKeysCount = templateInfo?.keys_count || 0;
                  return calculateModuleIssues(moduleResult, templateKeysCount) > 0;
                });

              const localeIssues = calculateLocaleIssues(locale, template_files);

              return (
                <div key={locale.locale.symbol} className={styles.locale_card}>
                  <div
                    className={styles.locale_header}
                    onClick={() => toggleLocaleExpanded(locale.locale.symbol)}
                  >
                    <div className={styles.locale_info}>
                      <Image src={locale.locale.image} alt={locale.locale.symbol} width={32} height={24} />
                      <span className={styles.locale_name}>{locale.locale.symbol.toUpperCase()}</span>
                      <span className={styles.locale_issues_count}>
                        {tTranslationStatus('issues_in_modules', { count: localeIssues, modules: problemModules.length })}
                      </span>
                    </div>

                    <div className={styles.locale_actions}>
                      <span className={`${styles.expand_icon} ${isLocaleExpanded ? styles.expanded : ''}`}>
                        ▼
                      </span>
                    </div>
                  </div>

                  {isLocaleExpanded && (
                    <div className={styles.locale_details}>
                      {problemModules.map(([module, moduleResult]) => {
                        const templateInfo = template_files[module as keyof typeof template_files];
                        const templateKeysCount = templateInfo?.keys_count || 0;

                        return (
                          <div key={module} className={styles.module_card}>
                            <div className={styles.module_header}>
                              <div className={styles.module_info}>
                                <span className={styles.module_name}>{module}</span>
                                <div className={styles.module_issues}>
                                  {!moduleResult.exists ? (
                                    <span className={styles.issue_badge_error}>
                                      {tTranslationStatus('file_missing', { count: templateKeysCount })}
                                    </span>
                                  ) : (
                                    <>
                                      {moduleResult.missing_keys.length > 0 && (
                                        <span className={styles.issue_badge_warning}>
                                          {tTranslationStatus('missing_keys_count', { count: moduleResult.missing_keys.length })}
                                        </span>
                                      )}
                                      {moduleResult.empty_values.length > 0 && (
                                        <span className={styles.issue_badge_info}>
                                          {tTranslationStatus('empty_values_count', { count: moduleResult.empty_values.length })}
                                        </span>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className={styles.module_actions}>
                                {moduleResult.exists && (
                                  <Link
                                    href={getTranslationEditUrl({ module: module as TranslationModuleType, locale_id: locale.locale.id })}
                                    className={styles.edit_link}
                                  >
                                    {tTranslationStatus('edit')}
                                  </Link>
                                )}

                                {!moduleResult.is_valid && (
                                  <button
                                    onClick={() => handleRepairFile(locale.locale.symbol, module as TranslationModuleType)}
                                    className={styles.repair_button}
                                    disabled={repair_file_mutation.isPending}
                                  >
                                    {tTranslationStatus('repair')}
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Детали проблем модуля */}
                            {moduleResult.exists && (
                              <>
                                {moduleResult.missing_keys.length > 0 && (
                                  <div className={styles.issue_details}>
                                    <span className={styles.issue_label}>{tTranslationStatus('missing_keys_label')}</span>
                                    <div className={styles.keys_preview}>
                                      {moduleResult.missing_keys.slice(0, 3).map(key => (
                                        <code key={key} className={styles.key_code}>{key}</code>
                                      ))}
                                      {moduleResult.missing_keys.length > 3 && (
                                        <span className={styles.keys_more}>
                                          +{moduleResult.missing_keys.length - 3} {tTranslationStatus('more')}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {moduleResult.empty_values.length > 0 && (
                                  <div className={styles.issue_details}>
                                    <span className={styles.issue_label}>{tTranslationStatus('empty_values_label')}</span>
                                    <div className={styles.keys_preview}>
                                      {moduleResult.empty_values.slice(0, 3).map(key => (
                                        <code key={key} className={styles.key_code}>{key}</code>
                                      ))}
                                      {moduleResult.empty_values.length > 3 && (
                                        <span className={styles.keys_more}>
                                          +{moduleResult.empty_values.length - 3} {tTranslationStatus('more')}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Сообщение об успехе */}
      {!hasIssues && (
        <div className={styles.success_state}>
          <span className={styles.success_icon}>🎉</span>
          <div className={styles.success_content}>
            <h4>{tTranslationStatus('success_title')}</h4>
            <p>{tTranslationStatus('success_description')}</p>
          </div>
        </div>
      )}
    </div>
  );
}; 