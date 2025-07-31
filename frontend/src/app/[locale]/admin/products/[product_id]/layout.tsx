import { Layout } from '@/components/admin/pages//products/product';

export default async function ProductLayout({ children, params }: { children: React.ReactNode, params: Promise<{ product_id: string }> }) {
  const { product_id } = await params;
  return <Layout product_id={product_id}>{children}</Layout>;
}