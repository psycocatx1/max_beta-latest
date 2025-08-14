import { getTranslations } from 'next-intl/server';
import classes from './HeroSection.module.scss';
import { Badge, Card, Container, Heading, Paragraph, Section } from '@/components/styles';

export const HeroSection = async () => {
  const t = await getTranslations('public.pages.about.hero');

  return (
    <Section hero className={classes.hero}>
      <Container narrow className={classes.hero__container}>
        <Badge variant="primary">{t('badge')}</Badge>
        <Heading size="xl" className={classes.hero__title}>
          {t('title')}
          <span className={classes.hero__title_accent}> {t('title_accent')}</span>
        </Heading>
        <Paragraph size="xl" className={classes.hero__description}>
          {t('description')}
        </Paragraph>
        <div className={classes.hero__stats}>
          {t.raw('stats').map((stat: any, index: number) => (
            <Card hoverable key={index} className={classes.hero__stat}>
              <Heading size="xl" className={classes.hero__stat_number}>{stat.number}</Heading>
              <Paragraph size="sm" className={classes.hero__stat_label}>{stat.label}</Paragraph>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}; 