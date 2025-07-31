import { Info } from '@/components/admin/pages//categories/category';
import { CategoryType } from '@prisma/client';

interface PageProps {
  params: Promise<{
    category_id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { category_id } = await params;
  return <Info category_id={category_id} type={CategoryType.PRODUCT} />;
}
