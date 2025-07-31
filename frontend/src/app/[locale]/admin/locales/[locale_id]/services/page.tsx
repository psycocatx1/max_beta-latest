import { LocalServices } from "@/components/admin/pages//local-services";

interface PageProps {
  params: Promise<{ locale_id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { locale_id } = await params;
  return <LocalServices locale_id={locale_id} root="locale" />;
} 