import { Heading, Paragraph, Container, Section } from '@/components';
import classes from './HeroSection.module.scss';
import { useTranslations } from 'next-intl';

export const HeroSection = () => {
  const t = useTranslations('public.pages.services');

  return <Section hero className={classes.hero}>
    <Container className={classes.hero__container}>
      <Heading size='xl' className={classes.hero__title}>
        {t('title')}
      </Heading>
      <Paragraph size='xl' className={classes.hero__description}>
        {t('description')}
      </Paragraph>
    </Container>
  </Section>;
};