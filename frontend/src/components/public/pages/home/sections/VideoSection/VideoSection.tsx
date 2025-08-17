import { getTranslations } from 'next-intl/server';
import classes from './VideoSection.module.scss';
import { Button, Container, Heading, Paragraph, Section } from '@/components/styles';
import { Iframe } from '@/components/common/Iframe';

export const VideoSection = async () => {
  const t = await getTranslations('public.pages.home.video');
  const video_url = t('video_url');

  return (
    <Section className={classes.video}>
      <Container>
        <Heading size='xl' className={classes.video__title}>
          {t('title')}
        </Heading>
        <div className={classes.video__content}>
          <div className={classes.video__player}>
            {video_url && <Iframe url={video_url} title="Company Video" />}
          </div>
          <div className={classes.video__info}>
            <Heading size='lg' className={classes.video__info_title}>
              {t('info.title')}
            </Heading>
            <Paragraph dangerouslySetInnerHTML={{ __html: t.raw('info.text') }} size='md' className={classes.video__text} />
            <Button variant='primary'>
              {t('info.button')}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}; 