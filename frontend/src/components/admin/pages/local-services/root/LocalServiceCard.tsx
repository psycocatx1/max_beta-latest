'use client';

import { useState } from 'react';
import styles from './LocalServiceCard.module.scss';
import { LocalServiceFormModal } from '@/components/admin/common/Modal/Forms/LocalServiceFormModal';
import { useToast } from '@/hooks/useToast/useToast';
import { useLocalServices } from '@/hooks/admin/services';
import { ExtendedLocalService, UpdateLocalServiceDto } from '@lib/api/services/types/local-services.types';
import { Card } from '@/components/admin/common/ListPage';
import { OriginalItem } from './OriginalItemCard';
import { formatDate } from '@/lib/intl';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@hooks/useRouting';

interface LocalServiceCardProps {
  root: 'locale' | 'service' | 'none'
  service: ExtendedLocalService;
}

export const LocalServiceCard = ({ service, root }: LocalServiceCardProps) => {
  const [is_edit_modal_open, setIsEditModalOpen] = useState(false);
  const update_mutation = useLocalServices().useUpdate(service.id);
  const delete_mutation = useLocalServices().useDelete(service.id);
  const toast = useToast();
  const locale = useLocale();
  const tLocalServices = useTranslations('admin.local_services');
  const tCommon = useTranslations('common');
  const tFields = useTranslations('admin.common.form.fields');
  const router = useRouter();

  if (!service.service || !service.locale) return null;

  const handleUpdate = async (data: UpdateLocalServiceDto) => {
    try {
      await update_mutation.mutateAsync(data);
      setIsEditModalOpen(false);
      toast.success(tCommon('updated_successfully'));
    } catch {
      toast.error(tCommon('error_while_updating'));
      console.error(update_mutation.error);
    }
  };

  const handleDelete = async () => {
    if (!confirm(tLocalServices('confirm_delete'))) {
      return;
    }

    try {
      await delete_mutation.mutateAsync();
      toast.success(tCommon('deleted_successfully'));
    } catch {
      toast.error(tCommon('error_while_deleting'));
      console.error(delete_mutation.error);
    }
  };

  const handleView = () => {
    router.push({ pathname: `/admin/local-services/[local_service_id]`, params: { local_service_id: service.id } });
  };

  return (
    <div className={styles.local_service_item}>
      <Card
        title={service.name}
        subtitle={service.description || ''}
        onEdit={() => setIsEditModalOpen(true)}
        onDelete={handleDelete}
        onView={handleView}
      >
        <div className={styles.local_service_item_price}>
          {tFields('price_label')}: {service.price} {service.locale.currency_symbol}
        </div>
        {renderOriginalItem(service, root)}

        <div className={styles.local_service_item_meta}>
          <span className={styles.local_service_item_date}>
            {tFields('created_date_label')}: {formatDate({ date: service.created, locale })}
          </span>
          <span className={styles.local_service_item_date}>
            {tFields('updated_date_label')}: {formatDate({ date: service.updated, locale })}
          </span>
        </div>
      </Card>

      <LocalServiceFormModal
        is_open={is_edit_modal_open}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        initial_data={{
          name: service.name,
          description: service.description,
          price: service.price,
          locale_id: service.locale_id,
          service_id: service.service_id,
        }}
        is_excluded={service.is_excluded}
        is_loading={update_mutation.isPending}
        locale={service.locale}
        is_edit
      />
    </div>
  );
};

function renderOriginalItem(service: ExtendedLocalService, root: 'locale' | 'service' | 'none') {
  switch (root) {
    case 'locale':
      return <OriginalItem service={service} root={root} />;
    case 'service':
      return <OriginalItem service={service} root={root} />;
    case 'none':
      return [
        <OriginalItem service={service} root={'service'} key={`${service.id}-service`} />,
        <OriginalItem service={service} root={'locale'} key={`${service.id}-locale`} />,
      ]
  }
}