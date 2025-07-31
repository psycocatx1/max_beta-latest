import { Layout } from "@/components/admin/pages/local-services";
import { ReactNode } from "react";

interface LayoutProps {
  params: Promise<{ local_service_id: string }>;
  children: ReactNode;
}

export default async function layout({ params, children }: LayoutProps) {
  const { local_service_id } = await params;
  return <Layout local_service_id={local_service_id}>{children}</Layout>
}