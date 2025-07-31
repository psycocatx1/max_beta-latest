import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { TranslationModuleType } from '../api/services/types/translations.types';
import { TranslationsApi } from '../api/services/api/translations.api';
import { NestedRecord } from '@/components/admin/common/JsonEditor/useJsonEditor';

/**
 * Загружает переводы с API бэкенда
 */
async function loadTranslationsFromAPI(locale: string, modules: TranslationModuleType[]): Promise<NestedRecord> {
  try {
    // Загружаем все модули сразу для упрощения
    return (await TranslationsApi.getMessages(locale, modules)).data;
  } catch (error) {
    console.error(`Ошибка загрузки переводов с API для локали ${locale}:`, error);
    throw error;
  }
}

/**
 * Fallback переводы для критических ситуаций
 */
function getFallbackMessages(): NestedRecord {
  return {
    admin: {
      common: {
        loading: 'Загрузка...',
        error: 'Ошибка',
        back: 'Назад',
        cancel: 'Отмена',
        save: 'Сохранить',
      },
      sidebar: {
        information: 'Информация',
        users: 'Пользователи',
        categories: 'Категории',
        products: 'Товары',
        services: 'Услуги',
        translations: 'Переводы'
      }
    },
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка'
    }
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Получаем локаль из запроса
  const requested = await requestLocale;

  // Проверяем, что локаль валидна
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  try {
    // Загружаем переводы с API
    const messages = await loadTranslationsFromAPI(locale, ['common', 'admin', 'public']);
    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error(`Ошибка при загрузке переводов для локали ${locale}:`, error);

    // В случае ошибки используем fallback переводы
    return {
      locale: routing.defaultLocale,
      messages: getFallbackMessages(),
    };
  }
}); 