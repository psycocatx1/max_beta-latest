import { LocalCategories } from '@/components/admin/pages//local-categories';
import { CategoryType } from '@prisma/client';

interface PageProps {
  params: Promise<{
    category_id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { category_id } = await params;
  return <LocalCategories category_id={category_id} type={CategoryType.PRODUCT} root='category' />;
};
