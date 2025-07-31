import { getImageUrl } from "@/lib/api/image-url";
import { CategoryWithCounts } from "@lib/api/services/types/categories.types";
import { useTranslations } from 'next-intl';
import { CategoryType } from '@prisma/client';
import { useRouter } from "@hooks/useRouting";
import styles from './Category.module.scss';
import { Image } from '@/components/Image';
import { useState } from 'react';
import { ChevronDown } from "lucide-react";

interface CategoryProps {
  category: CategoryWithCounts;
  level?: number;
  showChildren?: boolean;
}

export const Category = ({ category, level = 0, showChildren = true }: CategoryProps) => {
  const tCategories = useTranslations('admin.categories');
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const onView = () => {
    if (category.type === CategoryType.PRODUCT) {
      router.push({ pathname: `/admin/product-categories/[category_id]`, params: { category_id: category.id } });
    } else {
      router.push({ pathname: `/admin/service-categories/[category_id]`, params: { category_id: category.id } });
    }
  };

  const hasChildren = category.children && category.children.length > 0;
  const childrenCount = category.children?.length || 0;

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.category_container}>
      <div className={styles.category_content} onClick={onView}>
        {category.image && (
          <Image
            src={getImageUrl(category.image)}
            alt={category.name}
            className={styles.category_image}
            width={96}
            height={96}
          />
        )}
        <div className={styles.category_info}>
          <div className={styles.category_title}>
            {category.name}
            {hasChildren && (
              <button
                className={`${styles.category_toggle} ${isExpanded ? styles.category_toggle_expanded : ''}`}
                onClick={handleToggleClick}
              >
                <ChevronDown size={16} />
              </button>
            )}
          </div>
          <div className={styles.category_description}>
            <span>{category.description || tCategories('no_description')}</span>
            {childrenCount > 0 && (
              <span className={styles.category_counts}>
                {tCategories('children_count', { count: childrenCount })}
              </span>
            )}
            {category._count && (
              <span className={styles.category_counts}>
                {category.type === CategoryType.PRODUCT
                  ? tCategories('counts_products_text', { products: category._count.products })
                  : tCategories('counts_services_text', { services: category._count.services })
                }
              </span>
            )}
          </div>
        </div>
      </div>

      {showChildren && hasChildren && (
        <div className={`${styles.category_children} ${isExpanded ? styles.category_children_expanded : styles.category_children_collapsed}`}>
          {category.children!.map((child: CategoryWithCounts) => (
            <div key={child.id} className={styles.category_child}>
              <Category
                category={child}
                level={level + 1}
                showChildren={showChildren}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};