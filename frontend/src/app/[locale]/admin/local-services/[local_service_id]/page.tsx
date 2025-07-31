import { Info } from "@/components/admin/pages//local-services/local-service";

export default async function Page({ params }: { params: Promise<{ local_service_id: string }> }) {
  const { local_service_id } = await params;
  return <Info local_service_id={local_service_id} />
}
