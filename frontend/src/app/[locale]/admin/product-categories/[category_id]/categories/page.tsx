import { Categories } from "@/components/admin/pages//categories/root/Categories";
import { CategoryType } from "@prisma/client";

interface CategoriesPageProps {
  params: Promise<{
    category_id: string;
  }>;
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { category_id } = await params;
  return <Categories type={CategoryType.PRODUCT} parent_id={category_id} />;
}