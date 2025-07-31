import { getImageUrl } from '@/lib/api';
import { Image } from '@/components/Image';
import classes from './GallerySection.module.scss';
import { useTranslations } from 'next-intl';
import { LocalizedProduct } from '../../localized-product';

interface GallerySectionProps {
  selectedImageIndex: number;
  localized_product: LocalizedProduct;
  setSelectedImageIndex: (index: number) => void;
}

export const GallerySection = ({ localized_product, selectedImageIndex, setSelectedImageIndex }: GallerySectionProps) => {
  const t = useTranslations('public.pages.product.detail');

  return (
    <div className={classes.gallery}>
      <div className={classes.gallery__main_image}>
        <Image
          src={getImageUrl(localized_product.image)}
          alt={localized_product.name}
          width={600}
          height={400}
          className={classes.gallery__image}
        />
        {localized_product.is_discounted && (
          <div className={classes.gallery__discount_badge}>
            {t('discount')}
          </div>
        )}
      </div>

      {localized_product.images.length > 1 && (
        <div className={classes.gallery__thumbnails}>
          {localized_product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`${classes.gallery__thumbnail} ${index === selectedImageIndex ? classes.gallery__thumbnail_active : ''
                }`}
            >
              <Image
                src={getImageUrl(image.image)}
                alt={`${localized_product.name} ${index + 1}`}
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