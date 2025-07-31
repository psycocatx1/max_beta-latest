import { Layout } from '@/components/admin/pages//services/service';

export default async function ServiceLayout({ children, params }: { children: React.ReactNode, params: Promise<{ service_id: string }> }) {
  const { service_id } = await params;
  return <Layout service_id={service_id}>{children}</Layout>;
}