'use client'

import { useTranslations } from 'next-intl';
import styles from './Page.module.scss';

export const Page = () => {
  const t = useTranslations('public.pages.terms');

  return (
    <div className={styles.terms_page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero__background}>
          <div className={styles.hero__gradient}></div>
          <div className={styles.hero__pattern}></div>
        </div>
        <div className={styles.hero__container}>
          <div className={styles.hero__content}>
            <div className={styles.hero__badge}>
              <span className={styles.hero__badge_icon}>📜</span>
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
            <h2 className={styles.content__title}>{t('content.general.title')}</h2>
            <p className={styles.content__text}>
              {t('content.general.text')}
            </p>
          </div>

          <div className={styles.content__section}>
            <h2 className={styles.content__title}>{t('content.registration.title')}</h2>
            <p className={styles.content__text}>
              {t('content.registration.text')}
            </p>
            <ul className={styles.content__list}>
              <li>{t('content.registration.list.accurate_info')}</li>
              <li>{t('content.registration.list.maintain_data')}</li>
              <li>{t('content.registration.list.secure_account')}</li>
              <li>{t('content.registration.list.no_sharing')}</li>
            </ul>
          </div>

          <div className={styles.content__section}>
            <h2 className={styles.content__title}>{t('content.usage.title')}</h2>
            <p className={styles.content__text}>
              {t('content.usage.text')}
            </p>
            <ul className={styles.content__list}>
              <li>{t('content.usage.list.no_law_violation')}</li>
              <li>{t('content.usage.list.no_interference')}</li>
              <li>{t('content.usage.list.no_malware')}</li>
              <li>{t('content.usage.list.respect_rights')}</li>
            </ul>
          </div>

          <div className={styles.content__section}>
            <h2 className={styles.content__title}>{t('content.orders.title')}</h2>
            <p className={styles.content__text}>
              {t('content.orders.text')}
            </p>
            <ul className={styles.content__list}>
              <li>{t('content.orders.list.correct_data')}</li>
              <li>{t('content.orders.list.packaging_rules')}</li>
              <li>{t('content.orders.list.timely_payment')}</li>
              <li>{t('content.orders.list.track_status')}</li>
            </ul>
          </div>

          <div className={styles.content__section}>
            <h2 className={styles.content__title}>{t('content.responsibility.title')}</h2>
            <p className={styles.content__text}>
              {t('content.responsibility.text')}
            </p>
            <ul className={styles.content__list}>
              <li>{t('content.responsibility.list.service_quality')}</li>
              <li>{t('content.responsibility.list.timely_delivery')}</li>
              <li>{t('content.responsibility.list.transport_safety')}</li>
              <li>{t('content.responsibility.list.cargo_security')}</li>
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
