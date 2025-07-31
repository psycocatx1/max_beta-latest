import { getTranslations } from 'next-intl/server';
import classes from './ContactInfoSection.module.scss';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Building2,
  Package
} from 'lucide-react';
import { Card, Container, Heading, Section } from '@/components/styles';

export const ContactInfoSection = async () => {
  const t = await getTranslations('public.pages.contacts');

  return (
    <Section className={classes.contact_info}>
      <Container>
        <div className={classes.contact_info__grid}>
          {/* Главный офис */}
          <Card hoverable className={classes.contact_card}>
            <div className={classes.contact_card__icon}>
              <Building2 size={32} />
            </div>
            <div className={classes.contact_card__content}>
              <Heading size='md' className={classes.contact_card__title}>{t('main_office.title')}</Heading>
              <div className={classes.contact_card__info}>
                <div className={classes.contact_item}>
                  <MapPin size={18} />
                  <span>{t('main_office.address')}</span>
                </div>
                <div className={classes.contact_item}>
                  <Phone size={18} />
                  <span>{t('main_office.phone')}</span>
                </div>
                <div className={classes.contact_item}>
                  <Mail size={18} />
                  <span>{t('main_office.email')}</span>
                </div>
                <div className={classes.contact_item}>
                  <Clock size={18} />
                  <span>{t('main_office.hours')}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Склад */}
          <Card hoverable className={classes.contact_card}>
            <div className={classes.contact_card__icon}>
              <Package size={32} />
            </div>
            <div className={classes.contact_card__content}>
              <Heading size='md' className={classes.contact_card__title}>{t('warehouse.title')}</Heading>
              <div className={classes.contact_card__info}>
                <div className={classes.contact_item}>
                  <MapPin size={18} />
                  <span>{t('warehouse.address')}</span>
                </div>
                <div className={classes.contact_item}>
                  <Phone size={18} />
                  <span>{t('warehouse.phone')}</span>
                </div>
                <div className={classes.contact_item}>
                  <Clock size={18} />
                  <span>{t('warehouse.hours')}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Поддержка */}
          <Card hoverable className={classes.contact_card}>
            <div className={classes.contact_card__icon}>
              <MessageCircle size={32} />
            </div>
            <div className={classes.contact_card__content}>
              <Heading size='md' className={classes.contact_card__title}>{t('support.title')}</Heading>
              <div className={classes.contact_card__info}>
                <div className={classes.contact_item}>
                  <Phone size={18} />
                  <span>{t('support.phone')}</span>
                </div>
                <div className={classes.contact_item}>
                  <Mail size={18} />
                  <span>{t('support.email')}</span>
                </div>
                <div className={classes.contact_item}>
                  <MessageCircle size={18} />
                  <span>{t('support.telegram')}</span>
                </div>
                <div className={classes.contact_item}>
                  <Clock size={18} />
                  <span>{t('support.hours')}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}; 