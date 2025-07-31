import { CategoryType, Category, LocalCategory, Service, Product } from '@prisma/client';
import { CategoryFiltersDto, CreateCategoryDto, UpdateCategoryDto } from '@/../../backend/src/categories-section/categories';
export type { CategoryFiltersDto, CreateCategoryDto, Category };
export { CategoryType };
/**
 * Поля для создания категории
 */
export interface CreateCategoryFormData extends CreateCategoryDto {
  file?: File;
}
/**
 * Поля для обновления категории
 */
export interface UpdateCategoryFormData extends UpdateCategoryDto {
  file?: File;
}
/** 
 * Дублирование типа категорий для решения проблемы потери данных при реэкспорте 
 */
export type CategoryWithCounts = Category & {
  _count: {
    products: number;
    services: number;
  };
  children?: CategoryWithCounts[];
  local_categories?: LocalCategory[];
};

export type ExtendedCategory = Category & {
  parent: Category | null;
  children: CategoryWithCounts[];
  ancestors: CategoryWithCounts[];
  products: Product[];
  services: Service[];
  local_categories: LocalCategory[];
};
/**
 * Интерфейс для плоского представления категории с отступами
 */
export interface FlatCategoryOption {
  value: string;
  label: string;
  level: number;
}
/**
 * Преобразует древовидную структуру категорий в плоский список с отступами
 * @param categories - массив категорий с детьми
 * @param level - текущий уровень вложенности (по умолчанию 0)
 * @param productLabel - перевод для типа "Товар"
 * @param serviceLabel - перевод для типа "Услуга"
 * @returns плоский массив категорий с отступами
 */
export const flattenCategoriesForSelect = (
  categories: CategoryWithCounts[],
  level: number = 0,
  productLabel?: string,
  serviceLabel?: string
): FlatCategoryOption[] => {
  const result: FlatCategoryOption[] = [];
  categories.forEach(category => {
    let prefix = '';
    if (level > 0) {
      prefix = '  '.repeat(level) + '└─ ';
    }
    const label = `${prefix}${category.name} ${category.type === CategoryType.PRODUCT && productLabel ? `(${productLabel})` : category.type === CategoryType.SERVICE && serviceLabel ? `(${serviceLabel})` : ''}`;
    result.push({
      value: category.id,
      label,
      level
    });
    if (category.children && category.children.length > 0) {
      result.push(...flattenCategoriesForSelect(category.children, level + 1, productLabel, serviceLabel));
    }
  });
  return result;
};