import { Card } from "@/components/admin/common/ListPage/Card";
import { getImageUrl } from "@/lib/api/image-url";
import { useLocale, useTranslations } from "next-intl";
import { ExtendedProduct } from "@lib/api/services/types/products.types";
import { useRouter } from "@hooks/useRouting";

export const ProductCard = ({ product }: { product: ExtendedProduct }) => {
  const locale = useLocale();
  const tFields = useTranslations('admin.common.form.fields');
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Card
      key={product.id}
      title={product.name}
      subtitle={product.description ? (product.description.length > 100
        ? product.description.substring(0, 100) + '...'
        : product.description)
        : tFields('no_description')}
      onView={() => router.push({
        pathname: '/admin/products/[product_id]',
        params: { product_id: product.id }
      })}
      image={getImageUrl(product.image)}
      imageAlt={product.name}
    >
      <div>
        <p>{tFields('price_label')}: {formatPrice(product.price_USD)}</p>
        {product.discount_price_USD && (
          <p>{tFields('discount_label')}: {formatPrice(product.discount_price_USD)}</p>
        )}
        <p>{tFields('category_label')}: {product.category.name}</p>
      </div>
    </Card>
  );
}; 