import { useTranslations } from 'next-intl';
import classes from '../../DraggableDescriptionCard.module.scss'
import { Iframe } from '@/components/common';

type VideoProps = {
  content: string;
  title: string | null;
}

export const Video = ({ content, title }: VideoProps) => {
  const t = useTranslations('admin.local_item_descriptions');

  return (
    <div className={classes.card_video}>
      <Iframe url={content} title={title || t('content_types.VIDEO')} className={classes.card_video_iframe} />
    </div>
  );
};