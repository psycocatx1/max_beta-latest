import { Layout } from "@/components/admin/pages/local-products";
import { ReactNode } from "react";

interface LayoutProps {
  params: Promise<{ local_product_id: string }>;
  children: ReactNode;
}

export default async function layout({ params, children }: LayoutProps) {
  const { local_product_id } = await params;
  return <Layout local_product_id={local_product_id}>{children}</Layout>
}