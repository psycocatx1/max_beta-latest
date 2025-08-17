import { getTranslations } from 'next-intl/server';
import classes from './ValuesSection.module.scss';
import { Lightbulb, Shield, Leaf, Users } from 'lucide-react';
import { Badge, Card, Container, Heading, Paragraph, Section } from '@/components/styles';

export const ValuesSection = async () => {
  const t = await getTranslations('public.pages.about.values');

  const icons = [Lightbulb, Shield, Leaf, Users];

  return (
    <Section className={classes.values}>
      <Container>
        <div className={classes.values__header}>
          <Badge variant='primary' className={classes.values__badge}>{t('badge')}</Badge>
          <Heading size='xl' className={classes.values__title}>{t('title')}</Heading>
          <Paragraph size='lg' className={classes.values__description}>{t('description')}</Paragraph>
        </div>

        <div className={classes.values__grid}>
          {t.raw('items').map((value: { title: string, description: string }, index: number) => {
            const IconComponent = icons[index];
            return (
              <Card hoverable key={index} className={classes.values__card}>
                <div className={classes.values__card_icon}>
                  <IconComponent size={32} />
                </div>
                <Heading size='md' className={classes.values__card_title}>{value.title}</Heading>
                <Paragraph size='md' className={classes.values__card_description}>{value.description}</Paragraph>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}; 