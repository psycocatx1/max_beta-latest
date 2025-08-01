import { getTranslations } from 'next-intl/server';
import classes from './ServicesSection.module.scss';
import delivery_icon from '@/../public/public/home/services-delivery.png';
import international_icon from '@/../public/public/home/services-international.png';
import repackaging_icon from '@/../public/public/home/services-repackaging.png';
import storaging_icon from '@/../public/public/home/services-storaging.jpg';
import { Image } from '@/components/common/Image';
import { Badge, Card, Container, Heading, Paragraph, Section } from '@/components/styles';

export const ServicesSection = async () => {
  const t = await getTranslations('public.pages.root.services');

  return (
    <Section className={classes.services}>
      <Container className={classes.services__container}>
        <Card className={classes.services__header}>
          <Badge variant='primary' className={classes.services__badge}>{t('badge')}</Badge>
          <Heading size='xl' className={classes.services__title}>
            {t('title')}
          </Heading>
          <Paragraph size='lg' className={classes.services__description}>
            {t('description')}
          </Paragraph>
        </Card>
        <div className={classes.services__grid}>
          <Card hoverable className={classes.services__card}>
            <div className={classes.services__card_header}>
              <div className={classes.services__card_icon}>
                <Image src={storaging_icon.src} alt="Storaging" width={400} height={300} />
              </div>
              <Heading size='md' className={classes.services__card_title}>{t('warehouse.title')}</Heading>
            </div>
            <Paragraph size='md' className={classes.services__card_description}>
              {t('warehouse.description')}
            </Paragraph>
            <div className={classes.services__card_features}>
              <span>{t('warehouse.features.automation')}</span>
              <span>{t('warehouse.features.climate')}</span>
              <span>{t('warehouse.features.monitoring')}</span>
            </div>
          </Card>

          <Card hoverable className={classes.services__card}>
            <div className={classes.services__card_header}>
              <div className={classes.services__card_icon}>
                <Image src={delivery_icon.src} alt="Delivery" width={400} height={300} />
              </div>
              <Heading size='md' className={classes.services__card_title}>{t('express.title')}</Heading>
            </div>
            <Paragraph size='md' className={classes.services__card_description}>
              {t('express.description')}
            </Paragraph>
            <div className={classes.services__card_features}>
              <span>{t('express.features.time')}</span>
              <span>{t('express.features.tracking')}</span>
              <span>{t('express.features.guarantee')}</span>
            </div>
          </Card>

          <Card hoverable className={classes.services__card}>
            <div className={classes.services__card_header}>
              <div className={classes.services__card_icon}>
                <Image src={international_icon.src} alt="International" width={400} height={300} />
              </div>
              <Heading size='md' className={classes.services__card_title}>{t('international.title')}</Heading>
            </div>
            <Paragraph size='md' className={classes.services__card_description}>
              {t('international.description')}
            </Paragraph>
            <div className={classes.services__card_features}>
              <span>{t('international.features.countries')}</span>
              <span>{t('international.features.customs')}</span>
              <span>{t('international.features.insurance')}</span>
            </div>
          </Card>

          <Card hoverable className={classes.services__card}>
            <div className={classes.services__card_header}>
              <div className={classes.services__card_icon}>
                <Image src={repackaging_icon.src} alt="Repackaging" width={400} height={300} />
              </div>
              <Heading size='md' className={classes.services__card_title}>{t('repackaging.title')}</Heading>
            </div>
            <Paragraph size='md' className={classes.services__card_description}>
              {t('repackaging.description')}
            </Paragraph>
            <div className={classes.services__card_features}>
              <span>{t('repackaging.features.eco')}</span>
              <span>{t('repackaging.features.protection')}</span>
              <span>{t('repackaging.features.branding')}</span>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}; 