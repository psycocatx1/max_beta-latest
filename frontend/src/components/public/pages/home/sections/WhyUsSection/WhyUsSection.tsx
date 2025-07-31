import { getTranslations } from 'next-intl/server';
import classes from './WhyUsSection.module.scss';
import { Zap, Shield, Users, Lock, Cpu, BarChart3 } from 'lucide-react';
import { Card, Container, Heading, Paragraph, Section } from '@/components/styles';

export const WhyUsSection = async () => {
  const t = await getTranslations('public.pages.root.why_us');

  const features = [
    {
      icon: Zap,
      title: t('features.speed.title'),
      description: t('features.speed.description'),
    },
    {
      icon: Shield,
      title: t('features.quality.title'),
      description: t('features.quality.description'),
    },
    {
      icon: Users,
      title: t('features.support.title'),
      description: t('features.support.description'),
    },
    {
      icon: Lock,
      title: t('features.safety.title'),
      description: t('features.safety.description'),
    },
    {
      icon: Cpu,
      title: t('features.api.title'),
      description: t('features.api.description'),
    },
    {
      icon: BarChart3,
      title: t('features.reporting.title'),
      description: t('features.reporting.description'),
    },
  ];

  return (
    <Section className={classes.whyus}>
      <Container>
        <Heading size='xl' className={classes.whyus__title}>
          {t('title')}
        </Heading>
        <div className={classes.whyus__grid}>
          {features.map((feature, index) => (
            <Card hoverable key={index} className={classes.whyus__card}>
              <div className={classes.whyus__card_icon}>
                <feature.icon size={24} />
              </div>
              <Heading size='md' className={classes.whyus__card_title}>{feature.title}</Heading>
              <Paragraph size='md' className={classes.whyus__card_description}>{feature.description}</Paragraph>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};