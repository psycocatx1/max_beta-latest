import { ReactNode } from 'react';
import { getMessages } from "next-intl/server";
import { LOCALES, DEFAULT_LOCALE } from "@lib/intl/routing";
import { Providers } from '@/providers';
import "./globals.css";


interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Проверка валидности локали и использование defaultLocale если локаль невалидна
  const current_locale = locale && LOCALES.includes(locale as typeof LOCALES[number])
    ? locale
    : DEFAULT_LOCALE;

  // Загрузка сообщений с fallback на defaultLocale при ошибке
  let messages;
  try {
    messages = await getMessages({ locale: current_locale });
  } catch (error) {
    console.error(`Ошибka загрузки сообщений для локали ${locale}:`, error);
    // Fallback на локаль по умолчанию
    try {
      messages = await getMessages({ locale: DEFAULT_LOCALE });
    } catch (defaultError) {
      // В крайнем случае используем пустой объект сообщений
      console.error(`Ошибka загрузки сообщений для локали по умолчанию:`, defaultError);
      messages = {};
    }
  }

  return (
    <Providers locale={current_locale} messages={messages}>
      <div>
        {children}
      </div>
    </Providers>
  );
} 