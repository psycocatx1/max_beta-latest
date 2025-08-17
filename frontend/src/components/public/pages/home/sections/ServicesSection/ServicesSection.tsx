import { getTranslations } from 'next-intl/server';
import classes from './ServicesSection.module.scss';
import delivery_icon from '@/../public/public/home/services-delivery.png';
import international_icon from '@/../public/public/home/services-international.png';
import repackaging_icon from '@/../public/public/home/services-repackaging.png';
import storaging_icon from '@/../public/public/home/services-storaging.jpg';
import { Image } from '@/components/common/Image';
import { Badge, Card, Container, Heading, Paragraph, Section } from '@/components/styles';

export const ServicesSection = async () => {
  const t = await getTranslations('public.pages.home.services');

  const serviceIcons = [
    storaging_icon.src,
    delivery_icon.src,
    international_icon.src,
    repackaging_icon.src
  ];

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
          {t.raw('items').map((service: { title: string, description: string, features: string[] }, index: number) => (
            <Card hoverable key={index} className={classes.services__card}>
              <div className={classes.services__card_header}>
                <div className={classes.services__card_icon}>
                  <Image src={serviceIcons[index]} alt={service.title} width={400} height={300} />
                </div>
                <Heading size='md' className={classes.services__card_title}>{service.title}</Heading>
              </div>
              <Paragraph size='md' className={classes.services__card_description}>
                {service.description}
              </Paragraph>
              <div className={classes.services__card_features}>
                {service.features.map((feature: string, featureIndex: number) => (
                  <span key={featureIndex}>{feature}</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}; 