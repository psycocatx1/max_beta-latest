import { Card } from "@/components/admin/common/ListPage/Card";
import { getImageUrl } from "@/lib/api/image-url";
import { useLocale, useTranslations } from "next-intl";
import { ExtendedService } from "@lib/api/services/types";
import { useRouter } from "@hooks/useRouting";


interface ServiceCardProps {
  service: ExtendedService;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const locale = useLocale();
  const tFields = useTranslations('admin.common.form.fields');
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const onView = () => {
    router.push({ pathname: `/admin/services/[service_id]`, params: { service_id: service.id } });
  };

  return (
    <Card
      key={service.id}
      title={service.name}
      subtitle={service.description ? (service.description.length > 100
        ? service.description.substring(0, 100) + '...'
        : service.description)
        : tFields('no_description')}
      onView={onView}
      image={getImageUrl(service.image)}
      imageAlt={service.name}
    >
      <div>
        <p>{tFields('price_label')}: {formatPrice(service.price_USD)}</p>
        {service.discount_price_USD && (
          <p>{tFields('discount_label')}: {formatPrice(service.discount_price_USD)}</p>
        )}
      </div>
    </Card>
  );
}; 