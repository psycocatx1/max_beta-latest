import { getTranslations } from 'next-intl/server';
import { Image } from '@/components/common/Image';
import classes from './HeroSection.module.scss';
import home_hero_main_image from '@/../public/public/home/hero-main.png';
import { ArrowRight } from 'lucide-react';
import { Badge, Button, Card, Container, Heading, Paragraph, Section } from '@/components/styles';

export const HeroSection = async () => {
  const t = await getTranslations('public.pages.home.hero');

  return (
    <Section hero className={classes.hero}>
      <Container className={classes.hero__container}>
        <div className={classes.hero__content}>
          <Card className={classes.hero__text_content}>
            <Badge variant='primary' className={classes.hero__badge}>{t('badge')}</Badge>
            <Heading size='xl' className={classes.hero__title}>
              <span data-intl-key="public.pages.root.hero.title">{t('title')} </span>
              <span className={classes.hero__title_accent} data-intl-key="public.pages.root.hero.title_accent">{t('title_accent')}</span>
            </Heading>
            <Paragraph size='lg' className={classes.hero__description} data-intl-key="public.pages.root.hero.description">
              {t('description')}
            </Paragraph>
            <div className={classes.hero__actions}>
              <Button href='/contacts' variant='primary' className={classes.hero__button}>
                <span>{t('buttons.quote')}</span>
                <ArrowRight size={20} />
              </Button>
            </div>
          </Card>
          <div className={classes.hero__visual} >
            <Image
              src={home_hero_main_image.src}
              alt="Fulfillment boxes"
              width={700}
              height={500}
              priority
              quality={100}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}; 