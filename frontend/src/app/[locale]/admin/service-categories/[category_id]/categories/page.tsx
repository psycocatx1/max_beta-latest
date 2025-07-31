import { Categories } from "@/components/admin/pages//categories";
import { CategoryType } from "@/lib/api/services/types";

export default async function Page({ params }: { params: Promise<{ category_id: string }> }) {
  const { category_id } = await params;
  return <Categories parent_id={category_id} type={CategoryType.SERVICE} />;
}