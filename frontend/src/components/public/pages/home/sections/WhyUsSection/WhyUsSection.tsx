import { getTranslations } from 'next-intl/server';
import classes from './WhyUsSection.module.scss';
import { Zap, Shield, Users, Lock, Cpu, BarChart3 } from 'lucide-react';
import { Card, Container, Heading, Paragraph, Section } from '@/components/styles';

export const WhyUsSection = async () => {
  const t = await getTranslations('public.pages.home.why_us');

  const icons = [Zap, Shield, Users, Lock, Cpu, BarChart3];

  return (
    <Section className={classes.whyus}>
      <Container>
        <Heading size='xl' className={classes.whyus__title}>
          {t('title')}
        </Heading>
        <div className={classes.whyus__grid}>
          {t.raw('features').map((feature: any, index: number) => {
            const IconComponent = icons[index];
            return (
              <Card hoverable key={index} className={classes.whyus__card}>
                <div className={classes.whyus__card_icon}>
                  <IconComponent size={24} />
                </div>
                <Heading size='md' className={classes.whyus__card_title}>{feature.title}</Heading>
                <Paragraph size='md' className={classes.whyus__card_description}>{feature.description}</Paragraph>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};