'use client';

import { useAccount } from '@/hooks/useAuth/useAccount';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { UserMenu } from './UserMenu';
import styles from './Header.module.scss';
import { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { Image } from '@/components/common/Image';
import default_avatar from '@/../public/default-avatar.png';
import { Locale } from '@prisma/client';

export const Header = ({ locale, locales }: { locale: string, locales: Locale[] }) => {
  const { user } = useAccount();
  const { isMainSidebarCollapsed } = useUIStore();
  const [is_visible, setIsVisible] = useState(false);

  return (
    <header className={isMainSidebarCollapsed ? `${styles.header} ${styles.header_sidebar_collapsed}` : styles.header}>
      <div className={styles.header_content}>
        <LanguageSelector locale={locale} locales={locales} />

        <div className={styles.header_user}>
          <button
            className={styles.header_user_button}
            onClick={() => setIsVisible(true)}
          >
            <Image
              src={user?.image || default_avatar.src}
              alt={user?.email || ''}
              width={32}
              height={32}
              className={styles.header_user_avatar}
            />
            <span className={styles.header_user_name}>
              {user?.email}
            </span>
          </button>
          <UserMenu
            is_visible={is_visible}
            onClose={() => setIsVisible(false)}
          />
        </div>
      </div>
    </header>
  );
}; 