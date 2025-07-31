'use client';

import { LocalItemDescriptions } from '@/components/admin/pages//shared/local-item-descriptions';
import { CategoryType } from '@prisma/client';

interface LocalProductDescriptionsProps {
  local_product_id: string;
}

export const LocalProductDescriptions = ({ local_product_id }: LocalProductDescriptionsProps) => {
  return (
    <LocalItemDescriptions
      local_item_id={local_product_id}
      type={CategoryType.PRODUCT}
    />
  );
}; 