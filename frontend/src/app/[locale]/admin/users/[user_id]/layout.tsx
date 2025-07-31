import { Layout } from "@/components/admin/pages/users/user";

interface LayoutProps {
  params: Promise<{ user_id: string; locale: string }>;
  children: React.ReactNode;
}

export default async function layout({ params, children }: LayoutProps) {
  const { user_id } = await params;

  return (
    <Layout user_id={user_id}>{children}</Layout>
  );
} 