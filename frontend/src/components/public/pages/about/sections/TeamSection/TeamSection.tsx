import { getTranslations } from 'next-intl/server';
import classes from './TeamSection.module.scss';
import { Brain, BookOpen, Users } from 'lucide-react';
import { Badge, Card, Container, Paragraph, Section, Heading } from '@/components/styles';

export const TeamSection = async () => {
  const t = await getTranslations('public.pages.about.team');

  const features = [
    {
      icon: Brain,
      title: t('expertise.title'),
      description: t('expertise.description'),
    },
    {
      icon: BookOpen,
      title: t('training.title'),
      description: t('training.description'),
    },
    {
      icon: Users,
      title: t('cooperation.title'),
      description: t('cooperation.description'),
    },
  ];

  return (
    <Section className={classes.team}>
      <Container>
        <div className={classes.team__header}>
          <Badge variant='primary' className={classes.team__badge}>{t('badge')}</Badge>
          <Heading size='xl' className={classes.team__title}>{t('title')}</Heading>
          <Paragraph size='lg' className={classes.team__description}>{t('description')}</Paragraph>
        </div>

        <div className={classes.team__features}>
          {features.map((feature, index) => (
            <Card hoverable key={index} className={classes.team__feature}>
              <div className={classes.team__feature_icon}>
                <feature.icon size={40} />
              </div>
              <div className={classes.team__feature_content}>
                <Heading size='md' className={classes.team__feature_title}>{feature.title}</Heading>
                <Paragraph size='md' className={classes.team__feature_description}>{feature.description}</Paragraph>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}; 