import { Container, Heading, Paragraph, Section } from '@/components';
import { Package } from 'lucide-react';
import classes from './EmptyList.module.scss';

export const EmptyList = ({ title, description }: { title: string, description: string }) => {
  return (
    <Section className={classes.list}>
      <Container className={classes.list__container}>
        <div className={classes.list__empty_content}>
          <Package size={64} className={classes.list__empty_icon} />
          <Heading size='md' className={classes.list__empty_title}>{title}</Heading>
          <Paragraph size='md' className={classes.list__empty_description}>{description}</Paragraph>
        </div>
      </Container>
    </Section>
  );
};