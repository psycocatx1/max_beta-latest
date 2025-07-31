export const services_pathnames = {
  '/admin/service-categories': {
    ru: '/admin/категории-услуг',
    pl: '/admin/kategorie-usług',
    ua: '/admin/категорії-послуг'
  },
  '/admin/service-categories/[category_id]': {
    ru: '/admin/категории-услуг/[category_id]',
    pl: '/admin/kategorie-usług/[category_id]',
    ua: '/admin/категорії-послуг/[category_id]'
  },
  '/admin/service-categories/[category_id]/locales': {
    ru: '/admin/категории-услуг/[category_id]/локализации',
    pl: '/admin/kategorie-usług/[category_id]/lokalizacje',
    ua: '/admin/категорії-послуг/[category_id]/локалізації'
  },
  '/admin/service-categories/[category_id]/services': {
    ru: '/admin/категории-услуг/[category_id]/услуги',
    pl: '/admin/kategorie-usług/[category_id]/usługi',
    ua: '/admin/категорії-послуг/[category_id]/послуги'
  },
  '/admin/services': {
    ru: '/admin/услуги',
    pl: '/admin/usługi',
    ua: '/admin/послуги'
  },
  '/admin/services/[service_id]': {
    ru: '/admin/услуги/[service_id]',
    pl: '/admin/usługi/[service_id]',
    ua: '/admin/послуги/[service_id]'
  },
  '/admin/services/[service_id]/locales': {
    ru: '/admin/услуги/[service_id]/локализации',
    pl: '/admin/usługi/[service_id]/lokalizacje',
    ua: '/admin/послуги/[service_id]/локалізації'
  },
  '/admin/services/[service_id]/images': {
    ru: '/admin/услуги/[service_id]/изображения',
    pl: '/admin/usługi/[service_id]/obrazy',
    ua: '/admin/послуги/[service_id]/зображення'
  },
  '/admin/services/[service_id]/local-descriptions': {
    ru: '/admin/услуги/[service_id]/локальные-описания',
    pl: '/admin/usługi/[service_id]/lokalne-opisania',
    ua: '/admin/послуги/[service_id]/локальні-опис'
  },
  '/admin/local-services': {
    ru: '/admin/локализованные-услуги',
    pl: '/admin/lokalizowane-usługi',
    ua: '/admin/локалізовані-послуги'
  },
  '/admin/local-services/[local_service_id]': {
    ru: '/admin/локализованные-услуги/[local_service_id]',
    pl: '/admin/lokalizowane-usługi/[local_service_id]',
    ua: '/admin/локалізовані-послуги/[local_service_id]'
  },
  '/admin/local-services/[local_service_id]/local-descriptions': {
    ru: '/admin/локализованные-услуги/[local_service_id]/локальные-описания',
    pl: '/admin/lokalizowane-usługi/[local_service_id]/lokalne-opisania',
    ua: '/admin/локалізовані-послуги/[local_service_id]/локальні-опис'
  }
} as const;
