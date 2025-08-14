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
          {t.raw('content.sections').map((section: any, index: number) => (
            <div key={index} className={styles.content__section}>
              <h2 className={styles.content__title}>{section.title}</h2>
              <p className={styles.content__text}>
                {section.description}
              </p>
              {section.list && (
                <ul className={styles.content__list}>
                  {section.list.map((item: string, itemIndex: number) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}
              {section.email && (
                <div className={styles.content__contact}>
                  <p>{section.email}</p>
                  <p>{section.phone}</p>
                  <p>{section.address}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
