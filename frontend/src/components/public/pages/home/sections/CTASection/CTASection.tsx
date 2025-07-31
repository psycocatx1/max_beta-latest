import { getTranslations } from 'next-intl/server';
import classes from './CTASection.module.scss';
import { Phone, CheckCircle } from 'lucide-react';
import { Button, Container, Heading, Paragraph, Section } from '@/components/styles';

export const CTASection = async () => {
  const t = await getTranslations('public.pages.root.cta');

  return (
    <Section className={classes.cta}>
      <div className={classes.cta__background}>
        <div className={classes.cta__gradient}></div>
      </div>
      <Container className={classes.cta__container}>
        <div className={classes.cta__content}>
          <Heading size='xl' className={classes.cta__title}>
            {t('title')}
          </Heading>
          <Paragraph size='lg' className={classes.cta__description}>
            {t('description')}
          </Paragraph>

          <div className={classes.cta__actions}>
            <Button variant='primary' className={classes.cta__button_primary}>
              {t('buttons.quote')}
            </Button>
            <Button variant='secondary' href={`tel:${t('phone.number')}`} className={classes.cta__button_secondary}>
              <Phone size={20} className={classes.cta__phone_icon} />
              {t('phone.display')}
            </Button>
          </div>

          <div className={classes.cta__features}>
            <div className={classes.cta__feature}>
              <div className={classes.cta__feature_icon}>
                <CheckCircle size={24} />
              </div>
              {t('features.consultation')}
            </div>
            <div className={classes.cta__feature}>
              <div className={classes.cta__feature_icon}>
                <CheckCircle size={24} />
              </div>
              {t('features.calculation')}
            </div>
            <div className={classes.cta__feature}>
              <div className={classes.cta__feature_icon}>
                <CheckCircle size={24} />
              </div>
              {t('features.individual')}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}; 