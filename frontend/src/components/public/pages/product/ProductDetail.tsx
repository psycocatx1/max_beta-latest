'use client'
import { useTranslations } from 'next-intl';
import { ExtendedProduct, Locale } from '@/lib/api';
import classes from './ProductDetail.module.scss';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { GallerySection, InfoSection, DescriptionSection } from './sections';
import { formatExtendedProduct } from './localized-product';
import { useRouter } from '@hooks/useRouting';
import { Button, Container } from '@/components/styles';

interface ProductDetailProps {
  locale: Locale;
  product: ExtendedProduct;
}

export const ProductDetail = ({ locale, product }: ProductDetailProps) => {
  const t = useTranslations('public.pages.product.detail');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const localized_product = formatExtendedProduct(product, locale);
  const router = useRouter();


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
      <Container>
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
            localized_product={localized_product}
            selectedImageIndex={selectedImageIndex}
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
      </Container>
    </div >
  );
}; 