import { Layout } from '@/components/admin/pages//categories/category/Layout';
import { CategoryType } from '@prisma/client';

interface LayoutProps {
  params: Promise<{
    category_id: string;
  }>;
  children: React.ReactNode;
}

export default async function layout({ children, params }: LayoutProps) {
  const { category_id } = await params;
  return <Layout category_id={category_id} type={CategoryType.SERVICE}>{children}</Layout>;
}
