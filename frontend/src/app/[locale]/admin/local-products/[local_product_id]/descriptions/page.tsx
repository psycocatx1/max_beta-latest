import { LocalItemDescriptions } from "@/components/admin/pages/shared/local-item-descriptions";
import { CategoryType } from "@prisma/client";

export default async function Page({ params }: { params: Promise<{ local_product_id: string }> }) {
  const { local_product_id } = await params;
  return <LocalItemDescriptions local_item_id={local_product_id} type={CategoryType.PRODUCT} />
}
