'use client';

import { Locale } from '@prisma/client';
import { Card } from '@/components/admin/common/ListPage/Card';
import { useRouter } from '@hooks/useRouting';
import { useTranslations } from 'next-intl';

export const LocaleCard = ({ locale }: { locale: Locale }) => {
  const router = useRouter()
  const tFields = useTranslations('admin.common.form.fields');

  return (
    <Card
      key={locale.id}
      title={locale.name}
      subtitle={locale.language}
      image={locale.image}
      onView={() => router.push({ pathname: '/admin/locales/[locale_id]', params: { locale_id: locale.id } })}
    >
      <div>
        <p>{tFields('symbol_label')}: {locale.symbol}</p>
        <p>{tFields('currency_label')}: {locale.currency} ({locale.currency_symbol})</p>
        <p>{tFields('phone_code_label')}: {locale.phone_code}</p>
      </div>
    </Card>
  )
};