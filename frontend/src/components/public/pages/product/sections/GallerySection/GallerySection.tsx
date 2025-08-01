import { getImageUrl } from '@/lib/api';
import { Image } from '@/components/common/Image';
import classes from './GallerySection.module.scss';
import { useTranslations } from 'next-intl';
import { ItemImage } from '@/lib/api';

interface GallerySectionProps {
  selected_image_index: number;
  name: string;
  is_discounted?: boolean;
  images: ItemImage[];
  setSelectedImageIndex: (index: number) => void;
}

export const GallerySection = ({ is_discounted, name, images, selected_image_index, setSelectedImageIndex }: GallerySectionProps) => {
  const t = useTranslations('public.pages.product.detail');
  console.log(images)

  return (
    <div className={classes.gallery}>
      <div className={classes.gallery__main_image}>
        <Image
          src={getImageUrl(images[selected_image_index].image)}
          alt={name}
          width={600}
          height={400}
          className={classes.gallery__image}
        />
        {is_discounted && (
          <div className={classes.gallery__discount_badge}>
            {t('discount')}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className={classes.gallery__thumbnails}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`${classes.gallery__thumbnail} ${index === selected_image_index ? classes.gallery__thumbnail_active : ''
                }`}
            >
              <Image
                src={getImageUrl(image.image)}
                alt={`${name} ${index + 1}`}
                width={80}
                height={80}
                className={classes.gallery__thumbnail_image}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}