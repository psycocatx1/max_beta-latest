import { Section, Container, Paragraph } from '@/components';
import classes from './LoadingList.module.scss';
import { useTranslations } from 'next-intl';

export const LoadingList = () => {
  const t = useTranslations('public.pages.services.list');
  return (
    <Section className={classes.list}>
      <Container className={classes.list__container}>
        <Paragraph size='md' className={classes.list__loading}>
          {t('loading')}
        </Paragraph>
      </Container>
    </Section>
  );
};