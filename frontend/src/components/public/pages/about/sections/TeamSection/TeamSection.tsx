import { getTranslations } from 'next-intl/server';
import classes from './TeamSection.module.scss';
import { Brain, BookOpen, Users } from 'lucide-react';
import { Badge, Card, Container, Paragraph, Section, Heading } from '@/components/styles';

export const TeamSection = async () => {
  const t = await getTranslations('public.pages.about.team');

  const icons = [Brain, BookOpen, Users];

  return (
    <Section className={classes.team}>
      <Container>
        <div className={classes.team__header}>
          <Badge variant='primary' className={classes.team__badge}>{t('badge')}</Badge>
          <Heading size='xl' className={classes.team__title}>{t('title')}</Heading>
          <Paragraph size='lg' className={classes.team__description}>{t('description')}</Paragraph>
        </div>

        <div className={classes.team__features}>
          {t.raw('items').map((feature: any, index: number) => {
            const IconComponent = icons[index];
            return (
              <Card hoverable key={index} className={classes.team__feature}>
                <div className={classes.team__feature_icon}>
                  <IconComponent size={40} />
                </div>
                <div className={classes.team__feature_content}>
                  <Heading size='md' className={classes.team__feature_title}>{feature.title}</Heading>
                  <Paragraph size='md' className={classes.team__feature_description}>{feature.description}</Paragraph>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}; 