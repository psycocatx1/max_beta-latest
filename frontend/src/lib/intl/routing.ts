import { defineRouting } from 'next-intl/routing';
import { pathnames } from './pathnames.data';
// import { Locale } from '@prisma/client';
// import { execSync } from 'child_process';

// Исправленный список локалей с правильной дефолтной локалью
export const LOCALES = process.env.NEXT_PUBLIC_LOCALES?.split(',') || ['ru', 'gb', 'ua', 'pl'];
export const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'ru';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined');

// console.log('Loading locales from api')

// const result = execSync(`curl -s ${API_URL}/locales`).toString()

// console.log('Locales are loaded: ', result)

// if (result) {
// 	const body = JSON.parse(result);
// 	if (body.items && Array.isArray(body.items)) {
// 		locales = body.items.map((locale: Locale) => locale.symbol.toLowerCase());
// 	}
// }
// Создаем конфигурацию маршрутизации
export const routing = defineRouting({
	locales: LOCALES,
	defaultLocale: DEFAULT_LOCALE,
	localePrefix: 'always',
	pathnames
});