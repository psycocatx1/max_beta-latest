import { Heading } from '@/components';
import styles from '../Footer.module.scss';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export const Solutions = async () => {
  const tNavigation = await getTranslations('public.layout.navigation');
  const tFooter = await getTranslations('public.layout');

  return (
    <div className={styles.footer__section}>
      <Heading size='md' className={styles.footer__title}>{tFooter('solutions')}</Heading>
      <ul className={styles.footer__links}>
        <li>
          <Link href="/products" className={styles.footer__links__item}>
            {tNavigation('products')}
          </Link>
        </li>
        <li>
          <Link href="/services" className={styles.footer__links__item}>
            {tNavigation('services')}
          </Link>
        </li>
      </ul>
    </div>
  );
};