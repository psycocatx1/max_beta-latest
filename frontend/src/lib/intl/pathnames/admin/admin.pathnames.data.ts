import { locales_pathnames } from './locales.pathnames.data';
import { products_pathnames } from './products.pathnames.data';
import { services_pathnames } from './services.pathnames.data';
import { users_pathnames } from './users.pathnames.data';
import { local_categories_pathnames } from './local-categories.pathnames.data';
import { forms_pathnames } from './forms.pathnames.data';

export const admin_pathnames = {
  '/admin': {
    pl: '/admin',
    ru: '/admin',
    uk: '/admin',
  },
  ...locales_pathnames,
  ...products_pathnames,
  ...services_pathnames,
  ...users_pathnames,
  ...local_categories_pathnames,
  ...forms_pathnames,
};
