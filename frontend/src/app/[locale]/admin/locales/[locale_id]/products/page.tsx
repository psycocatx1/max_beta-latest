import { LocalProducts } from "@/components/admin/pages//local-products";

interface PageProps {
  params: Promise<{ locale_id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { locale_id } = await params;
  return <LocalProducts locale_id={locale_id} root="locale" />;
} 