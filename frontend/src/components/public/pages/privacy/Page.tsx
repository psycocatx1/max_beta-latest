'use client'

import { useTranslations } from 'next-intl';
import styles from './Page.module.scss';

export const Page = () => {
  const t = useTranslations('public.pages.privacy');

  return (
    <div className={styles.privacy_page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero__background}>
          <div className={styles.hero__gradient}></div>
          <div className={styles.hero__pattern}></div>
        </div>
        <div className={styles.hero__container}>
          <div className={styles.hero__content}>
            <div className={styles.hero__badge}>
              <span className={styles.hero__badge_icon}>🔒</span>
              <span>{t('hero.badge')}</span>
            </div>
            <h1 className={styles.hero__title}>
              {t('hero.title')}
              <span className={styles.hero__title_accent}> {t('hero.title_accent')}</span>
            </h1>
            <p className={styles.hero__description}>
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.content}>
        <div className={styles.content__container}>
          <div className={styles.content__section}>
            <h2 className={styles.content__title}>{t('content.collection.title')}</h2>
            <p className={styles.content__text}>
              {t('content.collection.text')}
            </p>
            <ul className={styles.content__list}>
              <li>{t('content.collection.list.contact_info')}</li>
              <li>{t('content.collection.list.company_info')}</li>
              <li>{t('content.collection.list.order_data')}</li>
              <li>{t('content.collection.list.technical_info')}</li>
            </ul>
          </div>

          <div className={styles.content__section}>
            <h2 className={styles.content__title}>{t('content.usage.title')}</h2>
            <p className={styles.content__text}>
              {t('content.usage.text')}
            </p>
            <ul className={styles.content__list}>
              <li>{t('content.usage.list.order_processing')}</li>
              <li>{t('content.usage.list.service_improvement')}</li>
              <li>{t('content.usage.list.customer_communication')}</li>
              <li>{t('content.usage.list.service_analysis')}</li>
            </ul>
          </div>

          <div className={styles.content__section}>
            <h2 className={styles.content__title}>{t('content.protection.title')}</h2>
            <p className={styles.content__text}>
              {t('content.protection.text')}
            </p>
            <ul className={styles.content__list}>
              <li>{t('content.protection.list.data_encryption')}</li>
              <li>{t('content.protection.list.security_updates')}</li>
              <li>{t('content.protection.list.access_restriction')}</li>
              <li>{t('content.protection.list.security_monitoring')}</li>
            </ul>
          </div>

          <div className={styles.content__section}>
            <h2 className={styles.content__title}>{t('content.sharing.title')}</h2>
            <p className={styles.content__text}>
              {t('content.sharing.text')}
            </p>
            <ul className={styles.content__list}>
              <li>{t('content.sharing.list.order_fulfillment')}</li>
              <li>{t('content.sharing.list.legal_requirements')}</li>
              <li>{t('content.sharing.list.explicit_consent')}</li>
            </ul>
          </div>

          <div className={styles.content__section}>
            <h2 className={styles.content__title}>{t('content.rights.title')}</h2>
            <p className={styles.content__text}>
              {t('content.rights.text')}
            </p>
            <ul className={styles.content__list}>
              <li>{t('content.rights.list.data_access')}</li>
              <li>{t('content.rights.list.data_correction')}</li>
              <li>{t('content.rights.list.data_deletion')}</li>
              <li>{t('content.rights.list.consent_withdrawal')}</li>
            </ul>
          </div>

          <div className={styles.content__section}>
            <h2 className={styles.content__title}>{t('content.contacts.title')}</h2>
            <p className={styles.content__text}>
              {t('content.contacts.text')}
            </p>
            <div className={styles.content__contact}>
              <p>Email: {t('content.contacts.email')}</p>
              <p>{t('content.contacts.phone_label')}: {t('content.contacts.phone')}</p>
              <p>{t('content.contacts.address_label')}: {t('content.contacts.address')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
