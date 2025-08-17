import { Heading, Paragraph } from '@/components';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from '../Footer.module.scss';
import { GoogleMap } from '../../../GoogleMap';
import { getTranslations } from 'next-intl/server';

export const Contacts = async () => {
  const tFooter = await getTranslations('public.layout');

  return (
    <div className={styles.footer__section}>
      <Heading size='md' className={styles.footer__title}>{tFooter('contacts')}</Heading>
      <div className={styles.footer__contacts}>
        <div className={styles.footer__contacts__item}>
          <MapPin className={styles.footer__contacts__item__icon} size={16} />
          <div className={styles.footer__contacts__item__content}>
            <Paragraph size='md'>{tFooter('main_office.address_label')}</Paragraph>
            <Paragraph size='md'>{tFooter('main_office.address')}</Paragraph>
          </div>
        </div>

        <div className={styles.footer__contacts__item}>
          <Phone className={styles.footer__contacts__item__icon} size={16} />
          <div className={styles.footer__contacts__item__content}>
            <Paragraph size='md'>{tFooter('main_office.phone_label')}</Paragraph>
            <Paragraph size='md'>{tFooter('main_office.phone')}</Paragraph>
          </div>
        </div>

        <div className={styles.footer__contacts__item}>
          <Mail className={styles.footer__contacts__item__icon} size={16} />
          <div className={styles.footer__contacts__item__content}>
            <Paragraph size='md'>{tFooter('main_office.email_label')}</Paragraph>
            <Paragraph size='md'>{tFooter('main_office.email')}</Paragraph>
          </div>
        </div>

        <div className={styles.footer__contacts__item}>
          <Clock className={styles.footer__contacts__item__icon} size={16} />
          <div className={styles.footer__contacts__item__content}>
            <Paragraph size='md'>{tFooter('main_office.hours_label')}</Paragraph>
            <Paragraph size='md'>{tFooter('main_office.hours')}</Paragraph>
          </div>
        </div>
      </div>

      {/* Мини-карта в футере */}
      <div className={styles.footer__map}>
        <GoogleMap
          lat={Number(tFooter('main_office.latitude'))}
          lng={Number(tFooter('main_office.longitude'))}
          zoom={14}
          height="200px"
          markerTitle={tFooter('main_office.address_label')}
          showDirectionsButton={false}
          className={styles.footer__map__content}
        />
      </div>
    </div>
  );
};