import classes from '../ProductCard.module.scss';
import { Image } from '@/components/common/Image';
import { getImageUrl } from '@/lib/api';
import { Link } from '@/lib/intl/navigation';
import { Eye } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ImageSectionProps = {
  name: string;
  image: string;
  is_discounted: boolean;
  product_id: string;
}

export const ImageSection = ({ name, image, is_discounted, product_id }: ImageSectionProps) => {
  const t = useTranslations('public.pages.products.card');
  return (
    <div className={classes.card__image_wrapper}>
      <Image
        src={getImageUrl(image)}
        alt={name}
        width={320}
        height={220}
        className={classes.card__image}
      />
      {is_discounted && (
        <div className={classes.card__discount_badge}>
          {t('discount')}
        </div>
      )}
      <div className={classes.card__actions}>
        <Link
          href={{ pathname: '/products/[product_id]', params: { product_id: product_id } }}
          className={classes.card__action_button}
          aria-label={t('view_details')}
        >
          <Eye size={20} />
        </Link>
      </div>
    </div>
  );
}