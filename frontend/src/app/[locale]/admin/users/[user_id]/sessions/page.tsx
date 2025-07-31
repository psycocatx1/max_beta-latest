import { Sessions } from '@/components/admin/pages/users/user/Sessions/Sessions';

interface PageProps {
  params: Promise<{
    user_id: string;
  }>;
}

export default async function page({ params }: PageProps) {
  const { user_id } = await params;
  return (
    <Sessions user_id={user_id} />
  );
} 