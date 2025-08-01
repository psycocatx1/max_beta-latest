import classes from './VideoContent.module.scss';
import { Iframe } from '@/components/common';

type VideoContentProps = {
  content: string;
  title: string | null;
}

export const VideoContent = ({ content, title }: VideoContentProps) => {
  return (
    <div className={classes.video}>
      <Iframe
        url={content}
        title={title || content}
        className={classes.iframe}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}