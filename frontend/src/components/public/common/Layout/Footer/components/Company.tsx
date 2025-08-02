import { Heading } from '@/components';
import styles from '../Footer.module.scss';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export const Company = async () => {
  const tFooter = await getTranslations('public.common.footer');
  const tNavigation = await getTranslations('public.common.navigation');

  return (
    <div className={styles.footer__section}>
      <Heading size='md' className={styles.footer__title}>{tFooter('company')}</Heading>
      <ul className={styles.footer__links}>
        <li>
          <Link href="/about" className={styles.footer__links__item}>
            {tNavigation('about')}
          </Link>
        </li>
        <li>
          <Link href="/contacts" className={styles.footer__links__item}>
            {tNavigation('contacts')}
          </Link>
        </li>
        <li>
          <Link href="/privacy" className={styles.footer__links__item}>
            {tFooter('privacy')}
          </Link>
        </li>
        <li>
          <Link href="/terms" className={styles.footer__links__item}>
            {tFooter('terms')}
          </Link>
        </li>
      </ul>
    </div>
  );
};