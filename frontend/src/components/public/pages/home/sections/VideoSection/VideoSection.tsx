import { getTranslations } from 'next-intl/server';
import classes from './VideoSection.module.scss';
import { Button, Container, Heading, Paragraph, Section } from '@/components/styles';

export const VideoSection = async () => {
  const t = await getTranslations('public.pages.root.video');

  // Получаем переводы заранее и проверяем их наличие
  const title = t('title') || '';
  const videoUrl = t('video_url') || '';
  const infoTitle = t('info.title') || '';
  const infoText = t.raw('info.text') || '';
  const infoButton = t('info.button') || '';

  return (
    <Section className={classes.video}>
      <Container>
        <Heading size='xl' className={classes.video__title}>
          {title}
        </Heading>
        <div className={classes.video__content}>
          <div className={classes.video__player}>
            {videoUrl && (
              <iframe
                src={videoUrl}
                title="Company Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          <div className={classes.video__info}>
            <Heading size='lg' className={classes.video__info_title}>
              {infoTitle}
            </Heading>
            <Paragraph dangerouslySetInnerHTML={{ __html: infoText }} size='md' className={classes.video__text} />
            <Button variant='primary'>
              {infoButton}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}; 