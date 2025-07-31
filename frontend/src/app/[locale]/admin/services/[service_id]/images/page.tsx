import { Images } from "@/components/admin/pages//shared";
import { CategoryType } from "@prisma/client";

export default async function page({ params }: { params: Promise<{ service_id: string }> }) {
  const { service_id } = await params;
  return <Images type={CategoryType.SERVICE} item_id={service_id} />
}