import { Info } from "@/components/admin/pages/users/user";

interface PageProps {
  params: Promise<{ user_id: string }>;
}

export default async function page({ params }: PageProps) {
  const { user_id } = await params;
  return <Info user_id={user_id} />;
}