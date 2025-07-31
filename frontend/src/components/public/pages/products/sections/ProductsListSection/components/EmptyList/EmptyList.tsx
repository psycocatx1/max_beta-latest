import { Container, Heading, Paragraph, Section } from '@/components';
import { Package } from 'lucide-react';
import classes from './EmptyList.module.scss';
import { useTranslations } from 'next-intl';

export const EmptyList = () => {
  const t = useTranslations('public.pages.products.list');
  return (
    <Section className={classes.list}>
      <Container className={classes.list__container}>
        <div className={classes.list__empty_content}>
          <Package size={64} className={classes.list__empty_icon} />
          <Heading size='md' className={classes.list__empty_title}>{t('no_products')}</Heading>
          <Paragraph size='md' className={classes.list__empty_description}>{t('no_products_description')}</Paragraph>
        </div>
      </Container>
    </Section>
  );
};