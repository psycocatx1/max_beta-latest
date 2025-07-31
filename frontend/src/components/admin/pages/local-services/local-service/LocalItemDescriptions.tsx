'use client';

import { LocalItemDescriptions } from '@/components/admin/pages//shared/local-item-descriptions';
import { CategoryType } from '@prisma/client';

interface LocalServiceDescriptionsProps {
  local_service_id: string;
}

export const LocalServiceDescriptions = ({ local_service_id }: LocalServiceDescriptionsProps) => {
  return (
    <LocalItemDescriptions
      local_item_id={local_service_id}
      type={CategoryType.SERVICE}
    />
  );
}; 