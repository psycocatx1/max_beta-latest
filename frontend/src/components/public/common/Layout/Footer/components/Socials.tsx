import { Package, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import styles from '../Footer.module.scss';
import { getTranslations } from 'next-intl/server';

export const Socials = async () => {
  const tFooter = await getTranslations('public.layout');

  return (
    <div className={styles.footer__section}>
      <div className={styles.footer__logo}>
        <Package className={styles.footer__logo__icon} size={32} />
        <span className={styles.footer__logo__text}>{tFooter('company_name')}</span>
      </div>
      <p className={styles.footer__description}>
        {tFooter('company_description')}
      </p>
      <div className={styles.footer__social}>
        <a href="https://facebook.com" className={styles.footer__social__link} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
          <Facebook size={20} />
        </a>
        <a href="https://twitter.com" className={styles.footer__social__link} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
          <Twitter size={20} />
        </a>
        <a href="https://instagram.com" className={styles.footer__social__link} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <Instagram size={20} />
        </a>
        <a href="https://linkedin.com" className={styles.footer__social__link} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <Linkedin size={20} />
        </a>
      </div>
    </div>
  );
};