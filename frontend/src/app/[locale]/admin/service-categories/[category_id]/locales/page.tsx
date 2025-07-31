import { LocalCategories } from '@/components/admin/pages//local-categories';
import { CategoryType } from '@prisma/client';

export default async function page({ params }: { params: Promise<{ category_id: string }> }) {
  const { category_id } = await params;
  return <LocalCategories category_id={category_id} type={CategoryType.SERVICE} root='category' />;
};
