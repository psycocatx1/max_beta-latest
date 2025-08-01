import { Heading } from '@/components/styles/text/Heading';
import { Image } from '@/components/common/Image';
import classes from './ImageContent.module.scss';

type ImageContentProps = {
  content: string;
  title: string | null;
}

export const ImageContent = ({ content, title }: ImageContentProps) => {
  return (
    <div className={classes.image}>
      <Image
        src={content}
        alt={title || content}
        width={400}
        height={300}
        className={classes.image__img}
      />
      <Heading size='md' className={classes.image__title}>{title}</Heading>
    </div>
  );
}