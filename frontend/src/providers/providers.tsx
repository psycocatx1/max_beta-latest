'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react';
import { query_client } from '@lib/api';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface ProvidersProps {
  children: ReactNode
  locale: string
  messages: Record<string, string> | null
}
/**
 * Компонент для обертывания приложения необходимыми провайдерами
 * @param children - Дочерние компоненты
 * @returns Обернутые провайдерами компоненты
 */
export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <QueryClientProvider client={query_client}>
      <ReactQueryDevtools client={query_client} />
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Moscow">
        {children}
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
}