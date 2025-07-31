'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useUsers } from '@/hooks/admin/users/useUsers';
import { InfoDisplay } from '@/components/admin/common/InfoDisplay';
import { formatDate } from '@/lib/intl/format-date';
import default_avatar from '@/../public/default-avatar.png';

export const Info = ({ user_id }: { user_id: string }) => {
  const current_locale = useLocale();
  const tUsers = useTranslations('admin.users');
  const tFields = useTranslations('admin.common.form.fields');
  const tRoles = useTranslations('admin.common.form.fields.roles');
  const { data: user, isLoading: is_loading } = useUsers().useFind({ id: user_id });

  // Подготавливаем поля для отображения
  const fields = user ? [
    { label: tFields('first_name_label'), value: user.first_name || tFields('not_specified') },
    { label: tFields('last_name_label'), value: user.last_name || tFields('not_specified') },
    { label: tFields('email_label'), value: user.email },
    { label: tFields('phone_number_label'), value: user.phone_number || tFields('not_specified') },
    { label: tFields('role_label'), value: tRoles(user.role) },
    { label: tFields('is_banned_label'), value: user.is_banned ? tFields('banned_label') : tFields('not_specified') },
    {
      label: tFields('created_date_label'),
      value: formatDate({ date: user.created, locale: current_locale })
    },
    {
      label: tFields('updated_date_label'),
      value: formatDate({ date: user.updated, locale: current_locale })
    },
  ] : [];

  return (
    <InfoDisplay
      title={tUsers('info_title')}
      image_alt={tFields('avatar_alt')}
      image={user?.image || default_avatar.src}
      fields={fields}
      is_loading={is_loading}
      is_editing={false}
      onEdit={() => { }}
    />
  );
}; 