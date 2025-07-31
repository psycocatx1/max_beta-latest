import { Info } from '@/components/admin/pages//services/service'

export default async function page({ params }: { params: Promise<{ service_id: string }> }) {
  const { service_id } = await params;
  return <Info service_id={service_id} />
}