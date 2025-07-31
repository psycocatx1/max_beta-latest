import { auth_pathnames } from './auth.pathnames.data';
import { info_pathnames } from './info.pathnames.data';
import { products_pathnames } from './products.pathnames.data';
import { services_pathnames } from './services.pathnames.data';

export const public_pathnames = {
  ...auth_pathnames,
  ...info_pathnames,
  ...products_pathnames,
  ...services_pathnames,
} as const;