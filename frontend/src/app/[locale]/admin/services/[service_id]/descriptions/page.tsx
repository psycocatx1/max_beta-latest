import { LocalItemDescriptions } from "@/components/admin/pages//shared/local-item-descriptions/LocalItemDescriptions";
import { CategoryType } from "@prisma/client";

interface PageProps {
  params: Promise<{ service_id: string }>
}

export default async function page({ params }: PageProps) {
  const { service_id } = await params;
  return <LocalItemDescriptions item_id={service_id} type={CategoryType.SERVICE} />
}