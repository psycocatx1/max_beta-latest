import { Info } from '@/components/admin/pages//products/product'

export default async function page({ params }: { params: Promise<{ product_id: string }> }) {
  const { product_id } = await params;
  return <Info product_id={product_id} />
}