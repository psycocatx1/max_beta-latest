'use client'

import { useState } from 'react';
import { Link } from '@/lib/intl';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.scss';
import { useTranslations } from 'next-intl';
import { Navigation } from './Navigation';
import { LanguageSelector } from '@/components/common/LanguageSelector/LanguageSelector';
import { Locale } from '@prisma/client';
import { Image } from '../../../../common/Image'
import logo from '@/../public/logo.svg'

export const Header = ({ locale, locales }: { locale: string, locales: Locale[] }) => {
  const [is_mobile_menu_opened, setIsMobileMenuOpened] = useState(false);
  const t = useTranslations('public.layout');

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_left}>
          <Link locale={locale} href="/" className={styles.header_logo_link}>
            <Image src={logo.src} alt="Logo" width={270} height={150} />
          </Link>
        </div>

        <div className={styles.header_right}>
          <Navigation is_mobile_menu_opened={is_mobile_menu_opened} setIsMobileMenuOpened={setIsMobileMenuOpened} locale={locale} locales={locales} />

          <div className={styles.header_actions}>
            <div className={styles.header_actions_language_selector}>
              <LanguageSelector locale={locale} locales={locales} />
            </div>
            <button
              className={styles.header_mobile_toggle}
              onClick={() => setIsMobileMenuOpened(!is_mobile_menu_opened)}
              aria-label={t('navigation.menu')}
            >
              {is_mobile_menu_opened ? (
                <X width={26} height={26} />
              ) : (
                <Menu width={26} height={26} />
              )}
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};