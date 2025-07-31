import { Users } from "@/components/admin/pages/users";

interface LocaleUsersPageParams {
  params: Promise<{ locale_id: string }>;
}

export default async function Page({ params }: LocaleUsersPageParams) {
  const { locale_id } = await params;
  return <Users locale_id={locale_id} />;
} 