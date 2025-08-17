'use client'

import { getImageUrl } from '@/lib/api';
import { Image } from '@/components/common/Image';
import classes from './GallerySection.module.scss';
import { useTranslations } from 'next-intl';
import { ItemImage } from '@/lib/api';
import { useState } from 'react';

interface GallerySectionProps {
  name: string;
  is_discounted?: boolean;
  images: ItemImage[];
}

export const GallerySection = ({ is_discounted, name, images }: GallerySectionProps) => {
  const [selected_image_index, setSelectedImageIndex] = useState(0);

  const t = useTranslations('public.pages.product.detail');

  if (!images || images.length === 0) {
    return (
      <div className={classes.gallery}>
        <div className={classes.gallery__main_image}>
          <div className={classes.gallery__placeholder}>
            <span>{t('no_image')}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.gallery}>
      {/* Основное изображение */}
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

      {/* Горизонтальный список миниатюр */}
      {images.length > 1 && (
        <div className={classes.gallery__thumbnails}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`${classes.gallery__thumbnail} ${index === selected_image_index ? classes.gallery__thumbnail_active : ''
                }`}
              aria-label={`${t('select_image')} ${index + 1}`}
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