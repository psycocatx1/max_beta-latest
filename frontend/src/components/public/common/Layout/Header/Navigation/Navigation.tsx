import { header_pathnames } from './pathnames';
import styles from './Navigation.module.scss';
import { NavLink } from './NavLink';
import { LanguageSelector } from '@/components/common/LanguageSelector/LanguageSelector';
import { Locale } from '@prisma/client';

type Props = {
  is_mobile_menu_opened: boolean;
  setIsMobileMenuOpened: (is_mobile_menu_opened: boolean) => void;
  locale: string;
  locales: Locale[];
}

export const Navigation = ({ is_mobile_menu_opened, setIsMobileMenuOpened, locale, locales }: Props) => (
  <nav className={`${styles.nav} ${is_mobile_menu_opened ? styles.nav__open : ''}`}>
    {header_pathnames.map(({ name, href }) => (
      <NavLink key={href} locale={locale} href={href} is_mobile_menu_opened={is_mobile_menu_opened} onClick={() => setIsMobileMenuOpened(false)} label={name}>
      </NavLink>
    ))}
    <LanguageSelector locale={locale} locales={locales} />
  </nav>
);