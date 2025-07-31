'use client';

import { ExtendedLocalService } from '@lib/api/services/types';
import { useTranslations } from 'next-intl';
import { OriginalItem as CommonOriginalItem } from '@/components/admin/common/ListPage/OriginalItem/OriginalItem';
import { useRouter } from '@hooks/useRouting';

interface OriginalItemProps {
  service: ExtendedLocalService;
  root: 'locale' | 'service';
}

export const OriginalItem = ({ service, root }: OriginalItemProps) => {
  const tFields = useTranslations(`admin.common.form.fields`);
  const router = useRouter();

  const handleNavigate = () => {
    switch (root) {
      case 'locale':
        router.push({ pathname: `/admin/services/[service_id]`, params: { service_id: service.id } });
        break;
      case 'service':
        router.push({ pathname: `/admin/locales/[locale_id]`, params: { locale_id: service.locale.id } });
        break;
    }
  };

  return (
    <CommonOriginalItem
      data={root === 'locale' ? service.service : service.locale}
      label={tFields(`original_${root === 'locale' ? 'service' : 'locale'}_label`)}
      onClick={handleNavigate}
      showPrice={root === 'locale'}
    />
  );
}; 