import { LocalProducts } from '@/components/admin/pages//local-products';

export default async function LocalesPage({ params }: { params: Promise<{ product_id: string }> }) {
  const { product_id } = await params;
  return <LocalProducts root="product" product_id={product_id} />
}
