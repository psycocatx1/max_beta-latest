import { Products } from '@/components/admin/pages//products/root';

interface PageProps {
  params: Promise<{
    category_id: string;
  }>;
}
export default async function page({ params }: PageProps) {
  const { category_id } = await params;
  return <Products category_id={category_id} />;
} 