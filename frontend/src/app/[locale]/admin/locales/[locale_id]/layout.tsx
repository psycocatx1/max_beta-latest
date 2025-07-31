import { Layout } from "@/components/admin/pages/locales/locale/Layout";

interface LayoutProps {
  params: Promise<{
    locale_id: string;
  }>;
  children: React.ReactNode;
}

export default async function layout({ params, children }: LayoutProps) {
  const { locale_id } = await params;

  return (
    <Layout locale_id={locale_id}>
      {children}
    </Layout>
  );
}