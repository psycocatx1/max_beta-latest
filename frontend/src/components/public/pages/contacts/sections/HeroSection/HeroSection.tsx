import { getTranslations } from 'next-intl/server';
import classes from './HeroSection.module.scss';
import { Badge, Container, Heading, Paragraph, Section } from '@/components/styles';

export const HeroSection = async () => {
  const t = await getTranslations('public.pages.contacts.hero');

  return (
    <Section className={classes.hero}>
      <Container narrow>
        <div className={classes.hero__content}>
          <Badge variant='primary' className={classes.hero__badge}>{t('badge')}</Badge>
          <Heading size='xl' className={classes.hero__title}>
            {t('title')}
            <span className={classes.hero__title_accent}>{t('title_accent')}</span>
          </Heading>
          <Paragraph size='xl' className={classes.hero__description}>
            {t('description')}
          </Paragraph>
        </div>
      </Container>
    </Section>
  );
}; 