import { LocalServices } from '@/components/admin/pages//local-services';


export default async function LocalesPage({ params }: { params: Promise<{ service_id: string }> }) {
  const { service_id } = await params;
  return <LocalServices root="service" service_id={service_id} />
}
