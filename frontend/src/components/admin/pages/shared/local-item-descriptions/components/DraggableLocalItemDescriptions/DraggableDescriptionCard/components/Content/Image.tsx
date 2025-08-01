import { getImageUrl } from '@/lib/api';
import { Image as CommonImage } from '@/components/common';
import classes from '../../DraggableDescriptionCard.module.scss'

type ImageProps = {
  content: string;
  title: string | null;
}

export const Image = ({ content, title }: ImageProps) => (
  <div className={classes.card_image_container}>
    <CommonImage
      src={getImageUrl(content) || ''}
      alt={title || ''}
      width={200}
      height={120}
      style={{ objectFit: 'cover' }}
      className={classes.card_image}
    />
  </div>
);