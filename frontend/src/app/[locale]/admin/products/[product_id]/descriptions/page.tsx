import { LocalItemDescriptions } from "@/components/admin/pages//shared/local-item-descriptions/LocalItemDescriptions";
import { CategoryType } from "@prisma/client";

interface PageProps {
  params: Promise<{ product_id: string }>
}

export default async function page({ params }: PageProps) {
  const { product_id } = await params;
  return <LocalItemDescriptions item_id={product_id} type={CategoryType.PRODUCT} />
}