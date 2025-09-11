import { ServiceDetail } from "@/components/public/pages/service";
import { ExtendedService, getImageUrl, Locale, LocalesApi, ServicesApi } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Params {
  params: Promise<{
    locale: string;
    service_id: string;
  }>
}

async function apiRequest({ params }: Params): Promise<{ locale: Locale, service: ExtendedService }> {
  const { locale, service_id } = await params;

  const locale_data = await LocalesApi.get({ symbol: locale.toUpperCase(), skip: 0, take: 1 });
  const locale_id = locale_data.data.items[0].id;

  try {
    const service = await ServicesApi.find(service_id, locale_id);
    if (!service.data) notFound();
    return {
      locale: locale_data.data.items[0],
      service: service.data,
    };
  } catch {
    notFound();
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service } = await apiRequest({ params });
  const localService = service.local_services?.[0];
  const localName = localService?.name || service.name;
  const localDescription = localService?.description || service.description;

  return {
    title: localName,
    description: localDescription || undefined,
    openGraph: {
      title: localName,
      description: localDescription || undefined,
      images: [{
        url: getImageUrl(service.image) ?? ''
      }]
    }
  };
}

export default async function page({ params }: Params) {
  const { locale, service } = await apiRequest({ params });
  const { service_id } = await params;
  return <ServiceDetail locale={locale} initial_service={service} service_id={service_id} />;
} 