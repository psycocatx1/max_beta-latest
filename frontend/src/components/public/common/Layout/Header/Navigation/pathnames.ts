export type HeaderPathnames = '/products' | '/services' | '/about' | '/contacts' | '/'

export const header_pathnames: { name: string, href: HeaderPathnames }[] = [
  {
    name: 'home',
    href: '/',
  },
  {
    name: 'products',
    href: '/products',
  },
  {
    name: 'services',
    href: '/services',
  },
  {
    name: 'about',
    href: '/about',
  },
  {
    name: 'contacts',
    href: '/contacts',
  }
]