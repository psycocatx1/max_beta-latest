import { Heading, Paragraph, Container, Section } from '@/components';
import classes from './HeroSection.module.scss';

export const HeroSection = ({ title, description }: { title: string, description: string }) => {
  return <Section hero className={classes.hero}>
    <Container className={classes.hero__container}>
      <Heading size='xl' className={classes.hero__title}>
        {title}
      </Heading>
      <Paragraph size='xl' className={classes.hero__description}>
        {description}
      </Paragraph>
    </Container>
  </Section>;
};