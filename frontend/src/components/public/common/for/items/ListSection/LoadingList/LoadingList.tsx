import { Section, Container, Paragraph } from '@/components';
import classes from './LoadingList.module.scss';
import { useTranslations } from 'next-intl';

export const LoadingList = () => {
  const tCommon = useTranslations('common');
  return (
    <Section className={classes.list}>
      <Container className={classes.list__container}>
        <Paragraph size='md' className={classes.list__loading}>
          {tCommon('loading')}
        </Paragraph>
      </Container>
    </Section>
  );
};