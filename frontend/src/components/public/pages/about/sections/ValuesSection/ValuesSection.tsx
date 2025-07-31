import { getTranslations } from 'next-intl/server';
import classes from './ValuesSection.module.scss';
import { Lightbulb, Shield, Leaf, Users } from 'lucide-react';
import { Badge, Card, Container, Heading, Paragraph, Section } from '@/components/styles';

export const ValuesSection = async () => {
  const t = await getTranslations('public.pages.about.values');

  const values = [
    {
      icon: Lightbulb,
      title: t('innovation.title'),
      description: t('innovation.description'),
    },
    {
      icon: Shield,
      title: t('reliability.title'),
      description: t('reliability.description'),
    },
    {
      icon: Leaf,
      title: t('sustainability.title'),
      description: t('sustainability.description'),
    },
    {
      icon: Users,
      title: t('customer_focus.title'),
      description: t('customer_focus.description'),
    },
  ];

  return (
    <Section className={classes.values}>
      <Container>
        <div className={classes.values__header}>
          <Badge variant='primary' className={classes.values__badge}>{t('badge')}</Badge>
          <Heading size='xl' className={classes.values__title}>{t('title')}</Heading>
          <Paragraph size='lg' className={classes.values__description}>{t('description')}</Paragraph>
        </div>

        <div className={classes.values__grid}>
          {values.map((value, index) => (
            <Card hoverable key={index} className={classes.values__card}>
              <div className={classes.values__card_icon}>
                <value.icon size={32} />
              </div>
              <Heading size='md' className={classes.values__card_title}>{value.title}</Heading>
              <Paragraph size='md' className={classes.values__card_description}>{value.description}</Paragraph>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}; 