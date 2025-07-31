'use client';

import { ExtendedForm } from '@lib/api/services/types/forms.types';
import { Card } from '@/components/admin/common/ListPage/Card';
import { useRouter } from '@hooks/useRouting';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/lib/intl/format-date';
import { useLocale } from 'next-intl';

interface FormCardProps {
  form: ExtendedForm;
}

export const FormCard = ({ form }: FormCardProps) => {
  const router = useRouter();
  const current_locale = useLocale();
  const tFields = useTranslations('admin.common.form.fields');
  const tForms = useTranslations('admin.forms');

  const getStatusColor = () => {
    if (form.is_answered) return 'var(--success)';
    if (form.is_read) return 'var(--warning)';
    return 'var(--error)';
  };

  const getStatusText = () => {
    if (form.is_answered) return tForms('status.answered');
    if (form.is_read) return tForms('status.read');
    return tForms('status.new');
  };

  return (
    <Card
      title={form.sender_name}
      subtitle={form.company_name || tForms('no_company')}
      onView={() => router.push({ pathname: '/admin/forms/[form_id]', params: { form_id: form.id } })}
    >
      <div>
        <p><strong>{tFields('email_label')}:</strong> {form.email}</p>
        <p><strong>{tFields('phone_label')}:</strong> {form.phone_number}</p>
        <p>
          <strong>{tForms('status.label')}:</strong>
          <span style={{ color: getStatusColor(), marginLeft: '8px' }}>
            {getStatusText()}
          </span>
        </p>
        <p>
          <strong>{tFields('created_date_label')}:</strong>
          {formatDate({ date: form.created, locale: current_locale })}
        </p>
        <p><strong>{tForms('message_preview')}:</strong></p>
        <p style={{
          fontSize: '0.9em',
          color: 'var(--text-secondary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {form.message}
        </p>
      </div>
    </Card>
  );
}; 