import {
  Category,
  CategoryType,
  BaseListResult,
  LocalCategory,
  Product,
  Service,
} from "@lib/prisma";
import { example_product } from "src/products-section/products/example.data";
import { example_local_category } from "../local-categories/example.data";

export const example_category: Category = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "Название категории",
  description: "Описание категории",
  image: "https://example.com/image.jpg",
  type: CategoryType.PRODUCT,
  created: new Date(),
  updated: new Date(),
  is_excluded: false,
  parent_id: null,
};

export type ExtendedCategory = Category & {
  parent: Category | null;
  children: CategoryWithCounts[];
  ancestors: CategoryWithCounts[];
  products: Product[];
  services: Service[];
  local_categories: LocalCategory[];
};

export type CategoryWithCounts = Category & {
  _count: {
    products: number;
    services: number;
  };
  children?: CategoryWithCounts[];
  local_categories?: LocalCategory[];
};

export const example_extended_category: ExtendedCategory = {
  ...example_category,
  parent: null,
  ancestors: [],
  children: [
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      name: "Подкатегория 1",
      description: "Описание подкатегории",
      image: "https://example.com/subcategory1.jpg",
      type: CategoryType.PRODUCT,
      created: new Date(),
      updated: new Date(),
      is_excluded: false,
      parent_id: "123e4567-e89b-12d3-a456-426614174000",
      _count: {
        products: 5,
        services: 0,
      },
    },
  ],
  products: [example_product],
  services: [],
  local_categories: [example_local_category],
};

export const example_categories_list_result: BaseListResult<CategoryWithCounts> =
  {
    items: [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Категория 1",
        description: "Описание категории 1",
        image: "https://example.com/category1.jpg",
        type: CategoryType.PRODUCT,
        created: new Date(),
        updated: new Date(),
        is_excluded: false,
        parent_id: null,
        _count: {
          products: 10,
          services: 0,
        },
        children: [
          {
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "Подкатегория 1.1",
            description: "Описание подкатегории 1.1",
            image: "https://example.com/subcategory1_1.jpg",
            type: CategoryType.PRODUCT,
            created: new Date(),
            updated: new Date(),
            is_excluded: false,
            parent_id: "123e4567-e89b-12d3-a456-426614174000",
            _count: {
              products: 5,
              services: 0,
            },
          },
        ],
      },
      {
        id: "123e4567-e89b-12d3-a456-426614174002",
        name: "Категория 2",
        description: "Описание категории 2",
        image: "https://example.com/category2.jpg",
        type: CategoryType.SERVICE,
        created: new Date(),
        updated: new Date(),
        is_excluded: false,
        parent_id: null,
        _count: {
          products: 0,
          services: 8,
        },
        children: [],
      },
    ],
    total: 2,
    skip: 0,
    take: 10,
  };
