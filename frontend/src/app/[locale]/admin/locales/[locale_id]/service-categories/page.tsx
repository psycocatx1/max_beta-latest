import { LocalCategories } from "@/components/admin/pages//local-categories";
import { CategoryType } from "@prisma/client";

interface PageProps {
  params: Promise<{ locale_id: string }>
}

export default async function page({ params }: PageProps) {
  const { locale_id } = await params;
  return <LocalCategories locale_id={locale_id} type={CategoryType.SERVICE} root="locale" />
}

