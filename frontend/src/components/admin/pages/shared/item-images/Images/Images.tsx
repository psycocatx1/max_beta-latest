'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AdminPage } from '@/components/admin/common/AdminPage';
import { Filters, List } from '@/components/admin/common/ListPage';
import { CreateItemImageFormData, useItemImages, useItemImagesFilters } from '@/hooks/admin/shared';
import { ItemImageCard } from './ItemImageCard';
import { ItemImageFormModal } from '@/components/admin/common/Modal';
import { CategoryType, ItemImage } from '@prisma/client';
import { useToast } from '@/hooks/useToast';

interface ImagesProps {
  item_id: string;
  type: CategoryType;
}

export const Images = ({ item_id, type }: ImagesProps) => {
  const [is_modal_open, setIsModalOpen] = useState(false);
  const tItemImages = useTranslations('admin.item_images');
  const tCommon = useTranslations('common');
  const filter_key = type === CategoryType.PRODUCT ? 'product_id' : 'service_id';
  const { current_page, setPage, filters, updateFilters } = useItemImagesFilters({ default_filters: { [filter_key]: item_id, skip: 0, take: 10 } });
  const create_mutation = useItemImages().useCreate();
  const { data: images, isLoading } = useItemImages().useGet(filters);
  const toast = useToast();

  const handleCreate = async (data: CreateItemImageFormData) => {
    try {
      await create_mutation.mutateAsync(data);
      toast.success(tCommon('created_successfully'));
      setIsModalOpen(false);
    } catch {
      toast.error(tCommon('error_while_creating'));
    }
  };

  return (
    <>
      <AdminPage
        title={tItemImages('title')}
        onCreateClick={() => setIsModalOpen(true)}
        create_button_text={tCommon('create')}
        is_loading={isLoading}
      >
        <Filters
          filters={filters}
          onUpdateFilters={updateFilters}
          is_loading={isLoading}
          onResetFilters={() => updateFilters({ skip: 0, take: 10 })}
        />
        <List<ItemImage>
          items={images?.items || []}
          items_label={tItemImages('items_label')}
          renderItem={(item: ItemImage) => <ItemImageCard key={item.id} item={item} type={type} />}
          empty_message={tItemImages('empty_message')}
          total={images?.total || 0}
          current_page={current_page}
          page_size={filters.take}
          onPageChange={setPage}
        />
      </AdminPage>

      <ItemImageFormModal
        is_open={is_modal_open}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        type={type}
        item_id={item_id}
      />
    </>
  );
}; 