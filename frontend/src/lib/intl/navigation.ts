import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Создаем навигационные утилиты
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing); 