import { User as UserType } from "@prisma/client";
import { Card } from "@/components/admin/common/ListPage/Card";
import { useRouter } from "@/lib/intl";
import { useTranslations } from 'next-intl';
import default_avatar from '@/../public/default-avatar.png'

interface UserProps {
  user: UserType;
}

export const User = ({ user }: UserProps) => {
  const router = useRouter();
  const tFields = useTranslations('admin.common.form.fields');
  return (
    <Card
      image={user.image || default_avatar.src}
      title={user.email}
      subtitle={`${user.first_name || ''} ${user.last_name || ''}`}
      onView={() => {
        router.push({ pathname: '/admin/users/[user_id]', params: { user_id: user.id } });
      }}
    >
      <div>
        <p>{tFields('role_label')}: {user.role}</p>
        <p>{tFields('phone_number_label')}: {user.phone_number || tFields('not_specified')}</p>
        {user.is_banned && <p style={{ color: 'var(--danger)' }}>{tFields('is_banned_label')}</p>}
      </div>
    </Card>
  );
}