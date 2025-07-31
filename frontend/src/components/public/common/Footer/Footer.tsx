'use client'

import { Link } from '@/lib/intl';
import { useTranslations } from 'next-intl';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Package,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { GoogleMap } from '../GoogleMap';
import styles from './Footer.module.scss';
import { Container, Heading, Paragraph } from '@/components';

export const Footer = () => {
  const t = useTranslations('public.pages.contacts');

  // Координаты офиса (фиксированные значения для стабильной работы)
  const officeCoordinates = {
    lat: 55.7558, // Москва
    lng: 37.6176
  };

  return (
    <footer className={styles.footer}>
      <Container className={styles.footer__container}>
        <div className={styles.footer__content}>
          <div className={styles.footer__section}>
            <div className={styles.footer__logo}>
              <Package className={styles.footer__logo__icon} size={32} />
              <span className={styles.footer__logo__text}>LogiTrans</span>
            </div>
            <p className={styles.footer__description}>
              Революционные решения для логистики и фулфилмента eCommerce.
              Используем ИИ и современные технологии для максимальной эффективности вашего бизнеса.
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

          <div className={styles.footer__section}>
            <Heading size='md' className={styles.footer__title}>Компания</Heading>
            <ul className={styles.footer__links}>
              <li>
                <Link href="/about" className={styles.footer__links__item}>
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/services" className={styles.footer__links__item}>
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="/contacts" className={styles.footer__links__item}>
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={styles.footer__links__item}>
                  Политика
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footer__section}>
            <Heading size='md' className={styles.footer__title}>Решения</Heading>
            <ul className={styles.footer__links}>
              <li>
                <Link href="/products" className={styles.footer__links__item}>
                  Продукты
                </Link>
              </li>
              <li>
                <Link href="/services" className={styles.footer__links__item}>
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.footer__links__item}>
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/contacts" className={styles.footer__links__item}>
                  Поддержка
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footer__section}>
            <Heading size='md' className={styles.footer__title}>Контакты</Heading>
            <div className={styles.footer__contacts}>
              <div className={styles.footer__contacts__item}>
                <MapPin className={styles.footer__contacts__item__icon} size={16} />
                <div className={styles.footer__contacts__item__content}>
                  <p>Главный офис</p>
                  <p>{t('main_office.address')}</p>
                </div>
              </div>

              <div className={styles.footer__contacts__item}>
                <Phone className={styles.footer__contacts__item__icon} size={16} />
                <div className={styles.footer__contacts__item__content}>
                  <p>Телефон</p>
                  <p>{t('main_office.phone')}</p>
                </div>
              </div>

              <div className={styles.footer__contacts__item}>
                <Mail className={styles.footer__contacts__item__icon} size={16} />
                <div className={styles.footer__contacts__item__content}>
                  <p>Email</p>
                  <p>{t('main_office.email')}</p>
                </div>
              </div>

              <div className={styles.footer__contacts__item}>
                <Clock className={styles.footer__contacts__item__icon} size={16} />
                <div className={styles.footer__contacts__item__content}>
                  <p>График работы</p>
                  <p>{t('main_office.hours')}</p>
                </div>
              </div>
            </div>

            {/* Мини-карта в футере */}
            <div className={styles.footer__map}>
              <GoogleMap
                lat={officeCoordinates.lat}
                lng={officeCoordinates.lng}
                zoom={14}
                height="200px"
                markerTitle={t('map.office_marker')}
                showDirectionsButton={false}
                className={styles.footer__map__content}
              />
            </div>
          </div>
        </div>
      </Container>

      <div className={styles.footer__bottom}>
        <Container className={styles.footer__bottom__container}>
          <div className={styles.footer__bottom__content}>
            <Paragraph size='sm' className={styles.footer__bottom__text}>
              © 2024 <strong>LogiTrans</strong>. Все права защищены.
            </Paragraph>
            <div className={styles.footer__bottom__links}>
              <Link href="/privacy" className={styles.footer__bottom__links__item}>
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className={styles.footer__bottom__links__item}>
                Условия использования
              </Link>
              <Link href="/contacts" className={styles.footer__bottom__links__item}>
                Обратная связь
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};