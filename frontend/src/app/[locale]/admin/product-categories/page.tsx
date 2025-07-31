import { Categories } from "@/components/admin/pages//categories";
import { CategoryType } from "@prisma/client";

export default function page() {
  return <Categories type={CategoryType.PRODUCT} />;
}
