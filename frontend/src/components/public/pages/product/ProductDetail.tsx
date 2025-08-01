'use client'
import { useTranslations } from 'next-intl';
import { ExtendedProduct, Locale } from '@/lib/api';
import classes from './ProductDetail.module.scss';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GallerySection, InfoSection, DescriptionSection } from './sections';
import { formatExtendedProduct } from './localized-product';
import { useRouter } from '@hooks/useRouting';
import { Button } from '@/components/styles';
import { useProducts } from '@hooks/admin/products';

interface ProductDetailProps {
  locale: Locale;
  initial_product: ExtendedProduct;
  product_id: string;
}

export const ProductDetail = ({ locale, initial_product, product_id }: ProductDetailProps) => {
  const t = useTranslations('public.pages.product.detail');
  const [selected_image_index, setSelectedImageIndex] = useState(0);

  const { data: product, refetch } = useProducts().useFind({ id: product_id, locale_id: locale.id, initial_data: initial_product })

  useEffect(() => { refetch() })

  const localized_product = formatExtendedProduct(product || initial_product, locale);
  const router = useRouter();

  console.log("localized_product", localized_product)


  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: localized_product.name,
        text: localized_product.description || '',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className={classes.detail}>
      <div className={classes.detail__container}>
        <Button
          variant='secondary'
          onClick={router.back}
          className={classes.detail__back_button}
        >
          <ArrowLeft size={20} />
          {t('back_to_products')}
        </Button>

        <div className={classes.detail__content}>
          <GallerySection
            selected_image_index={selected_image_index}
            is_discounted={localized_product.is_discounted}
            name={localized_product.name}
            images={localized_product.images || []}
            setSelectedImageIndex={setSelectedImageIndex}
          />
          <InfoSection
            localized_product={localized_product}
            handleShare={handleShare}
          />
        </div>

        {localized_product.item_descriptions.length > 0 && (
          <DescriptionSection descriptions={localized_product.item_descriptions} />
        )}
      </div>
    </div >
  );
}; 