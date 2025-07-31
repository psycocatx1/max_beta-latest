'use client'

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Loader } from 'lucide-react';
import styles from './LanguageSelector.module.scss';
import { Link, usePathname } from '@/lib/intl';
import { Image } from '@/components/Image';
import { useParams } from 'next/navigation';
import { LOCALES } from '@/lib/intl/routing';
import { Locale } from '@prisma/client';

type Params = {
  locale: string,
  locale_id?: string,
  category_id?: string,
  service_id?: string,
  local_service_id?: string,
  product_id?: string,
  local_product_id?: string,
}

export const LanguageSelector = ({ locale, locales }: { locale: string, locales: Locale[] }) => {
  const [is_open, setIsOpen] = useState(false);
  const dropdown_ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname()
  const params = useParams<Params>()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdown_ref.current && !dropdown_ref.current.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, []);

  if (!locales) {
    return (
      <div className={styles.language_selector}>
        <button className={styles.language_selector_button} disabled>
          <Loader className={styles.language_selector_loader} width={24} height={24} />
          <span className={styles.language_selector_loading_text}>Загрузка</span>
        </button>
      </div>
    );
  }

  const formatted_locales = locales.map((locale) => ({
    code: locale.symbol.toLowerCase(),
    name: locale.language,
    flag: locale.image,
  })).filter((locale) => LOCALES.includes(locale.code.toLowerCase()));

  const current_language = formatted_locales.find((language) => language.code === locale);
  return (
    <div className={styles.language_selector} ref={dropdown_ref}>
      <button
        className={styles.language_selector_button}
        onClick={() => setIsOpen(!is_open)}
        aria-label="Выбрать язык"
      >
        <span className={styles.language_selector_current}>
          {current_language ? (
            <>
              <Image
                src={current_language.flag}
                alt={current_language.name}
                width={24}
                height={18}
                className={styles.language_selector_flag}
              />
              <span className={styles.language_selector_name}>{current_language.name}</span>
            </>
          ) : (
            <>
              <Globe width={24} height={24} />
              <span className={styles.language_selector_name}>{locale.toUpperCase()}</span>
            </>
          )}
        </span>
        <ChevronDown
          width={24}
          height={24}
          className={`${styles.language_selector_icon} ${is_open ? styles.language_selector_icon__open : ''}`}
        />
      </button>

      {is_open && (
        <div className={styles.language_selector_dropdown}>
          {formatted_locales.map((l) => (
            <Link
              key={l.code}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={{ pathname, params } as any}
              locale={l.code}
              className={`${styles.language_selector_option} ${l.code === locale ? styles.language_selector_option__active : ''}`}
            >
              <Image
                src={l.flag}
                alt={l.name}
                width={18}
                height={12}
                className={styles.language_selector_flag}
              />
              <span className={styles.language_selector_name}>{l.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}; 