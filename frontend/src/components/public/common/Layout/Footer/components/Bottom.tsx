import { Container, Paragraph } from '@/components/styles';
import styles from '../Footer.module.scss';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export const Bottom = async () => {
  const tFooter = await getTranslations('public.layout');

  return (
    <div className={styles.footer__bottom}>
      <Container className={styles.footer__bottom__container}>
        <div className={styles.footer__bottom__content}>
          <Paragraph size='sm' className={styles.footer__bottom__text}>
            © 2024 <strong>{tFooter('company_name')}</strong>. {tFooter('all_rights_reserved', { year: new Date().getFullYear() })}
          </Paragraph>
          <div className={styles.footer__bottom__links}>
            <Link href="/privacy" className={styles.footer__bottom__links__item}>
              {tFooter('privacy_policy')}
            </Link>
            <Link href="/terms" className={styles.footer__bottom__links__item}>
              {tFooter('terms_of_use')}
            </Link>
            <Link href="/contacts" className={styles.footer__bottom__links__item}>
              {tFooter('contact_us')}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};