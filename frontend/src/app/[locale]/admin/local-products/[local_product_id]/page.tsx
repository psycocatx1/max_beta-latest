import { Info } from "@/components/admin/pages//local-products";

export default async function Page({ params }: { params: Promise<{ local_product_id: string }> }) {
  const { local_product_id } = await params;
  return <Info local_product_id={local_product_id} />
}
