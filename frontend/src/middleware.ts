import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './lib/intl/routing';

// Создаем основной middleware для интернационализации
const intlMiddleware = createIntlMiddleware(routing);

export function middleware(request: NextRequest) {
  // Получаем pathname для определения контекста
  const pathname = request.nextUrl.pathname;

  // Применяем интернационализацию
  const response = intlMiddleware(request);

  // Добавляем pathname в заголовки для доступа в getRequestConfig
  if (response) {
    response.headers.set('x-pathname', pathname);
    return response;
  }

  // Если intlMiddleware не вернул ответ, создаем новый с заголовком
  const newResponse = NextResponse.next();
  newResponse.headers.set('x-pathname', pathname);
  return newResponse;
}

export const config = {
  // Matcher ignores `/_next/` and `/api/` and other internal paths
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(ru|gb|ua|pl)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
}; 