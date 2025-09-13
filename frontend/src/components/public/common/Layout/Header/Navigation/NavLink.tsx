import { Link, usePathname } from '@lib/intl';
import classes from './Navigation.module.scss';
import { HeaderPathnames } from './pathnames';
import { useTranslations } from 'next-intl';
import { match } from 'path-to-regexp'

type NavLinkProps = {
  locale: string;
  href: HeaderPathnames;
  onClick: () => void;
  label: string;
  is_mobile_menu_opened: boolean;
}

import { useEffect, useState } from 'react';

export const NavLink = ({ locale, href, onClick, label, is_mobile_menu_opened }: NavLinkProps) => {
  const tNavigation = useTranslations('public.layout.navigation');
  const pathname = usePathname();

  const [is_desktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      if (typeof window !== 'undefined') {
        setIsDesktop(window.matchMedia('(min-width: 769px)').matches);
      }
    };

    checkIsDesktop();

    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  if (is_mobile_menu_opened || is_desktop) {
    return (
      <Link
        id={label}
        locale={locale}
        href={href}
        className={`${classes.nav_link} ${match(href)(pathname) ? classes.nav_link__active : ''}`}
        onClick={onClick}
      >
        {tNavigation(label)}
      </Link>
    );
  }

  return (
    <span className={classes.nav_link}>
      {tNavigation(label)}
    </span>
  );
}