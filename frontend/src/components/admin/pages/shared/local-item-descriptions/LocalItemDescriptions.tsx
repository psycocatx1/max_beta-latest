'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CategoryType } from '@prisma/client';
import { useToast } from '@/hooks/useToast/useToast';
import { AdminPage } from '@/components/admin/common/AdminPage';
import { LocalItemDescriptionFormModal } from '@/components/admin/common/Modal/Forms/LocalItemDescriptionFormModal';
import { useLocalItemDescriptions, useLocalItemDescriptionsFilters } from '@/hooks/admin/shared';
import { CreateLocalItemDescriptionFormData, UpdateLocalItemDescriptionFormData } from '@lib/api/services/types/local-item-descriptions.types';
import { DraggableLocalItemDescriptionsList } from './components/DraggableLocalItemDescriptions/DraggableLocalItemDescriptionsList';
import { Switch } from './components/Switch/Switch';
import { LocalItemDescriptionsList } from './components/LocalItemDescriptionsList/LocalItemDescriptionsList';

interface LocalItemDescriptionsProps {
  local_item_id?: string;
  item_id?: string;
  type: CategoryType;
}

export const LocalItemDescriptions = ({ local_item_id, item_id, type }: LocalItemDescriptionsProps) => {
  const [is_modal_open, setIsModalOpen] = useState(false);
  const [use_drag_and_drop, setUseDragAndDrop] = useState(true); // Переключатель режимов
  const toast = useToast();
  const tLocalItemDescriptions = useTranslations('admin.local_item_descriptions');
  const tCommon = useTranslations('common');
  const local_item_filter_key = type === CategoryType.PRODUCT ? 'local_product_id' : 'local_service_id';
  const item_filter_key = type === CategoryType.PRODUCT ? 'product_id' : 'service_id';
  const create_mutation = useLocalItemDescriptions().useCreate();

  const { filters, current_page, updateFilters, resetFilters, setPage } = useLocalItemDescriptionsFilters({
    permanent_fields: { [local_item_filter_key]: local_item_id, [item_filter_key]: item_id }
  });

  const { data: descriptions, isLoading: is_loading } = useLocalItemDescriptions().useGet(filters);

  const handleCreateDescription = async (data: CreateLocalItemDescriptionFormData | UpdateLocalItemDescriptionFormData) => {
    try {
      await create_mutation.mutateAsync(data as CreateLocalItemDescriptionFormData);
      setIsModalOpen(false);
      toast.success(tCommon('saved_successfully'));
    } catch {
      toast.error(tCommon('error_while_saving'));
      console.error(create_mutation.error);
    }
  };

  return (
    <AdminPage
      title={tLocalItemDescriptions(`info_title_${type}`)}
      onCreateClick={() => setIsModalOpen(true)}
      create_button_text={tLocalItemDescriptions('create_title')}
      is_loading={is_loading}
      additional_button={<Switch use_drag_and_drop={use_drag_and_drop} setUseDragAndDrop={setUseDragAndDrop} />}
    >
      {use_drag_and_drop ? (
        <DraggableLocalItemDescriptionsList
          local_item_id={local_item_id}
          item_id={item_id}
          type={type}
        />
      ) : (
        <>
          <LocalItemDescriptionsList
            type={type}
            filters={filters}
            updateFilters={updateFilters}
            resetFilters={resetFilters}
            setPage={setPage}
            current_page={current_page}
            is_loading={is_loading}
            descriptions={descriptions || { items: [], total: 0, skip: 0, take: 0 }}
          />
          <LocalItemDescriptionFormModal
            is_open={is_modal_open}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateDescription}
            is_loading={create_mutation.isPending}
            type={type}
            initial_data={{ local_item_id, item_id }}
          />
        </>
      )}
    </AdminPage>
  );
}; 