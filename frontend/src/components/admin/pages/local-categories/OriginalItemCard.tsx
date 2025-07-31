import { useRouter } from '@/hooks/useRouting';
import { ExtendedLocalCategory } from '@/lib/api/services/types/local-categories.types';
import { CategoryType } from '@prisma/client';
import { OriginalItem as CommonOriginalItem } from '@/components/admin/common/ListPage/OriginalItem';
import { useTranslations } from 'next-intl';

interface OriginalItemProps {
  item: ExtendedLocalCategory;
  root: 'locale' | 'category'
  type: CategoryType
}

export const OriginalItem = ({ item, root, type }: OriginalItemProps) => {
  const router = useRouter();
  const tFields = useTranslations('admin.common.form.fields');

  const handleNavigate = () => {
    if (root === 'locale' && type === CategoryType.PRODUCT) {
      router.push({ pathname: `/admin/product-categories/[category_id]`, params: { category_id: item.category.id } });
    } else if (root === 'locale' && type === CategoryType.SERVICE) {
      router.push({ pathname: `/admin/service-categories/[category_id]`, params: { category_id: item.category.id } });
    } else if (root === 'category' && type === CategoryType.PRODUCT) {
      router.push({ pathname: `/admin/locales/[locale_id]`, params: { locale_id: item.locale.id } });
    } else if (root === 'category' && type === CategoryType.SERVICE) {
      router.push({ pathname: `/admin/locales/[locale_id]`, params: { locale_id: item.locale.id } });
    }
  };

  const data = {
    id: root === 'locale' ? item.category.id : item.locale.id,
    name: root === 'locale' ? item.category.name : item.locale.name,
    description: root === 'locale' ? item.category.description : undefined,
    language: root === 'category' ? item.locale.language : undefined,
    image: root === 'locale' ? item.category.image : item.locale.image,
  };

  return (
    <CommonOriginalItem
      data={data}
      label={tFields(root === 'locale' ? 'original_category_label' : 'original_locale_label')}
      onClick={handleNavigate}
    />
  );
};