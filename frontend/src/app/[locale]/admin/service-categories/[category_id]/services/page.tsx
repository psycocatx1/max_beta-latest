import { Services } from '@/components/admin/pages//services/root';

export default async function page({ params }: { params: Promise<{ category_id: string }> }) {
  const { category_id } = await params;
  return <Services category_id={category_id} />;
} 