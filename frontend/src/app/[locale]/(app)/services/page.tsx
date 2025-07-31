import { Services } from "@/components/public/pages/services/Services";
import { ExtendedService, getImageUrl, Locale, LocalesApi, ServicesApi } from "@/lib/api";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Params { params: Promise<{ locale: string }> }

async function apiRequest({ params }: Params): Promise<{ locale: Locale, initial_services: ExtendedService[] }> {
  const { locale } = await params;

  const locale_data = await LocalesApi.get({ search: locale.toUpperCase(), skip: 0, take: 1 });
  const locale_id = locale_data.data.items[0].id

  const services_data = await ServicesApi.get({ skip: 0, take: 1000, locale_id });
  const initial_services = services_data.data.items
  return {
    locale: locale_data.data.items[0],
    initial_services
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { initial_services } = await apiRequest({ params });
  const tMetadata = await getTranslations('public.pages.services.metadata')

  return {
    title: tMetadata(`title`),
    description: tMetadata(`description`),
    openGraph: {
      title: tMetadata(`title`),
      description: tMetadata(`description`),
      images: [{
        url: getImageUrl(initial_services[0]?.image) || ''
      }]
    }
  }
}

export default async function page({ params }: Params) {
  const { locale, initial_services } = await apiRequest({ params });
  return <Services locale={locale} initial_services={initial_services} />
}