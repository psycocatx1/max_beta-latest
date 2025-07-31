export const users_pathnames = {
  '/admin/users': {
    ru: '/admin/пользователи',
    pl: '/admin/użytkownicy',
    ua: '/admin/користувачі'
  },
  '/admin/users/[user_id]': {
    ru: '/admin/пользователи/[user_id]',
    pl: '/admin/użytkownicy/[user_id]',
    ua: '/admin/користувачі/[user_id]'
  },
  '/admin/users/[user_id]/sessions': {
    ru: '/admin/пользователи/[user_id]/сессии',
    pl: '/admin/użytkownicy/[user_id]/sesje',
    ua: '/admin/користувачі/[user_id]/сесії'
  },
} as const;
