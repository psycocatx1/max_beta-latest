'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth/useAuth';
import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';
import styles from './Header.module.scss';

interface UserMenuProps {
  is_visible: boolean;
  onClose: () => void;
}

export const UserMenu = ({ is_visible, onClose }: UserMenuProps) => {
  const { logout } = useAuth();
  const tHeader = useTranslations('admin.common.main_layout.header');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (is_visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [is_visible, onClose]);

  if (!is_visible) return null;

  return (
    <div ref={menuRef} className={styles.header_user_dropdown}>
      <button
        className={styles.header_user_dropdown_item}
        onClick={() => {
          logout();
          onClose();
        }}
      >
        <LogOut size={16} />
        <span data-intl-key="admin.common.main_layout.header.logout">{tHeader('logout')}</span>
      </button>
    </div>
  );
}; 