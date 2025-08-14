import { getTranslations } from 'next-intl/server';
import classes from './TechnologySection.module.scss';
import { Cpu, Smartphone, Globe, Activity } from 'lucide-react';
import { Badge, Card, Container, Paragraph, Section, Heading } from '@/components/styles';

export const TechnologySection = async () => {
  const t = await getTranslations('public.pages.home.technology');

  const features = [
    {
      icon: Cpu,
      title: t('ai.title'),
      description: t('ai.description'),
    },
    {
      icon: Smartphone,
      title: t('mobile.title'),
      description: t('mobile.description'),
    },
    {
      icon: Globe,
      title: t('api.title'),
      description: t('api.description'),
    },
  ];

  return (
    <Section className={classes.technology}>
      <Container className={classes.technology__container}>
        <div className={classes.technology__content}>
          <Badge variant='primary' className={classes.technology__badge}>{t('badge')}</Badge>
          <Heading size='xl' className={classes.technology__title}>{t('title')}</Heading>
          <Paragraph size='lg' className={classes.technology__description}>{t('description')}</Paragraph>

          <div className={classes.technology__features}>
            {features.map((feature, index) => (
              <div key={index} className={classes.technology__feature}>
                <div className={classes.technology__feature_icon}>
                  <feature.icon size={24} />
                </div>
                <div className={classes.technology__feature_content}>
                  <Heading size='sm' className={classes.technology__feature_title}>{feature.title}</Heading>
                  <Paragraph size='md' className={classes.technology__feature_description}>{feature.description}</Paragraph>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className={classes.technology__dashboard}>
          <div className={classes.technology__dashboard_header}>
            <Heading size='lg' className={classes.technology__dashboard_title}>{t('dashboard.title')}</Heading>
            <div className={classes.technology__dashboard_status}>
              <Activity size={16} />
              {t('dashboard.status')}
            </div>
          </div>
          <div className={classes.technology__dashboard_content}>
            <div className={classes.technology__metric}>
              <Paragraph size='md'>{t('dashboard.metrics.active_deliveries')}</Paragraph>
              <Heading size='lg' className={classes.technology__metric_value}>247</Heading>
            </div>
            <div className={classes.technology__metric}>
              <Paragraph size='md'>{t('dashboard.metrics.average_speed')}</Paragraph>
              <Heading size='lg' className={classes.technology__metric_value}>2.4 ч</Heading>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}; 