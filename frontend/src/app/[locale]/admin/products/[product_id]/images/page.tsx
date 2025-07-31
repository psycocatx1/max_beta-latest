import { Images } from "@/components/admin/pages//shared";
import { CategoryType } from "@prisma/client";

export default async function page({ params }: { params: Promise<{ product_id: string }> }) {
  const { product_id } = await params;
  return <Images type={CategoryType.PRODUCT} item_id={product_id} />
}