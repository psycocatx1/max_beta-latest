export const products_pathnames = {
  '/admin/product-categories': {
    ru: '/admin/категории-товаров',
    pl: '/admin/kategorie-towarów',
    ua: '/admin/категорії-товарів'
  },
  '/admin/product-categories/[category_id]': {
    ru: '/admin/категории-товаров/[category_id]',
    pl: '/admin/kategorie-towarów/[category_id]',
    ua: '/admin/категорії-товарів/[category_id]'
  },
  '/admin/product-categories/[category_id]/locales': {
    ru: '/admin/категории-товаров/[category_id]/локализации',
    pl: '/admin/kategorie-towarów/[category_id]/lokalizacje',
    ua: '/admin/категорії-товарів/[category_id]/локалізації'
  },
  '/admin/product-categories/[category_id]/products': {
    ru: '/admin/категории-товаров/[category_id]/продукты',
    pl: '/admin/kategorie-towarów/[category_id]/produkty',
    ua: '/admin/категорії-товарів/[category_id]/продукти'
  },
  '/admin/products': {
    ru: '/admin/товары',
    pl: '/admin/produkty',
    ua: '/admin/товари'
  },
  '/admin/products/[product_id]': {
    ru: '/admin/товары/[product_id]',
    pl: '/admin/produkty/[product_id]',
    ua: '/admin/товари/[product_id]'
  },
  '/admin/products/[product_id]/locales': {
    ru: '/admin/товары/[product_id]/локализации',
    pl: '/admin/produkty/[product_id]/lokalizacje',
    ua: '/admin/товари/[product_id]/локалізації'
  },
  '/admin/products/[product_id]/images': {
    ru: '/admin/товары/[product_id]/изображения',
    pl: '/admin/produkty/[product_id]/obrazy',
    ua: '/admin/товари/[product_id]/зображення'
  },
  '/admin/products/[product_id]/local-descriptions': {
    ru: '/admin/товары/[product_id]/локальные-описания',
    pl: '/admin/produkty/[product_id]/lokalne-opisania',
    ua: '/admin/товари/[product_id]/локальні-опис'
  },
  '/admin/local-products': {
    ru: '/admin/локализованные-товары',
    pl: '/admin/lokalizowane-produkty',
    ua: '/admin/локалізовані-товари'
  },
  '/admin/local-products/[local_product_id]': {
    ru: '/admin/локализованные-товары/[local_product_id]',
    pl: '/admin/lokalizowane-produkty/[local_product_id]',
    ua: '/admin/локалізовані-товари/[local_product_id]'
  },
  '/admin/local-products/[local_product_id]/local-descriptions': {
    ru: '/admin/локализованные-товары/[local_product_id]/локальные-описания',
    pl: '/admin/lokalizowane-produkty/[local_product_id]/lokalne-opisania',
    ua: '/admin/локалізовані-товари/[local_product_id]/локальні-опис'
  },
} as const;
