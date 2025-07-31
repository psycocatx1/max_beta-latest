'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { CategoryType, LocalItemDescription } from '@prisma/client';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useToast } from '@/hooks/useToast/useToast';
import { useLocalItemDescriptions } from '@/hooks/admin/shared';
import { DraggableDescriptionCard } from './DraggableDescriptionCard';
import { LocalItemDescriptionFormModal } from '@/components/admin/common/Modal/Forms/LocalItemDescriptionFormModal';
import { CreateLocalItemDescriptionFormData, UpdateLocalItemDescriptionFormData, LocalItemDescriptionsApi } from '@lib/api/services';
import { query_client } from '@lib/api';
import { QUERY_KEYS } from '@/hooks/admin/query-keys';
import styles from './DraggableLocalItemDescriptionsList.module.scss';

interface DraggableLocalItemDescriptionsListProps {
  local_item_id?: string;
  item_id?: string;
  type: CategoryType;
}

export const DraggableLocalItemDescriptionsList = ({
  local_item_id,
  item_id,
  type
}: DraggableLocalItemDescriptionsListProps) => {
  const [is_modal_open, setIsModalOpen] = useState(false);
  const [active_id, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [is_updating_order, setIsUpdatingOrder] = useState(false);
  const [optimistic_descriptions, setOptimisticDescriptions] = useState<LocalItemDescription[]>([]);

  const toast = useToast();
  const tLocalItemDescriptions = useTranslations('admin.local_item_descriptions');
  const tCommon = useTranslations('common');

  const local_item_filter_key = type === CategoryType.PRODUCT ? 'local_product_id' : 'local_service_id';
  const item_filter_key = type === CategoryType.PRODUCT ? 'product_id' : 'service_id';

  // Получаем описания без пагинации и сортируем по order
  const { data: descriptions_data, isLoading } = useLocalItemDescriptions().useGet({
    [local_item_filter_key]: local_item_id,
    [item_filter_key]: item_id,
    take: 100, // Получаем больше элементов для drag-and-drop
    skip: 0,
  });

  // Сортируем описания по order, используя оптимистические данные если есть
  const sorted_descriptions = useMemo(() => {
    const source_items = optimistic_descriptions.length > 0
      ? optimistic_descriptions
      : descriptions_data?.items || [];

    if (!source_items.length) return [];
    return [...source_items].sort((a, b) => a.order - b.order);
  }, [descriptions_data?.items, optimistic_descriptions]);

  const items_ids = useMemo(() =>
    sorted_descriptions.map(item => item.id),
    [sorted_descriptions]
  );

  // Синхронизируем оптимистические данные с сервером
  useEffect(() => {
    if (descriptions_data?.items) {
      setOptimisticDescriptions([]);
    }
  }, [descriptions_data?.items]);

  // Мутации
  const create_mutation = useLocalItemDescriptions().useCreate();

  // Настройки сенсоров для drag-and-drop
  const mouse_sensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8, // 8px минимальное расстояние перед началом drag
    },
  });

  const touch_sensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200, // 200ms задержка для touch устройств
      tolerance: 8,
    },
  });

  const sensors = useSensors(mouse_sensor, touch_sensor);

  // Обработчик начала перетаскивания
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  // Обработчик завершения перетаскивания
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) {
      return;
    }

    const active_index = sorted_descriptions.findIndex(item => item.id === active.id);
    const over_index = sorted_descriptions.findIndex(item => item.id === over.id);

    if (active_index === -1 || over_index === -1) {
      return;
    }

    // Оптимистическое обновление: сразу обновляем UI
    const reordered_items = arrayMove(sorted_descriptions, active_index, over_index);
    setOptimisticDescriptions(reordered_items);

    setIsUpdatingOrder(true);

    try {
      // Определяем целевую позицию (order) на основе позиции в массиве
      let target_order: number;

      if (over_index === 0) {
        // Перемещаем в начало
        target_order = reordered_items[1]?.order ? reordered_items[1].order - 1 : 1;
      } else if (over_index === reordered_items.length - 1) {
        // Перемещаем в конец
        target_order = reordered_items[over_index - 1]?.order ? reordered_items[over_index - 1].order + 1 : over_index + 1;
      } else {
        // Вставляем между элементами
        const prev_order = reordered_items[over_index - 1]?.order || 0;
        const next_order = reordered_items[over_index + 1]?.order || prev_order + 2;
        target_order = (prev_order + next_order) / 2;
      }

      // Обновляем оптимистические данные с правильным order
      const updated_items = reordered_items.map(item =>
        item.id === active.id
          ? { ...item, order: target_order }
          : item
      );
      setOptimisticDescriptions(updated_items);

      // Обновляем порядок через API
      await LocalItemDescriptionsApi.updateOrder(active.id as string, target_order);

      // Инвалидируем запросы для обновления списка
      query_client.invalidateQueries({
        queryKey: QUERY_KEYS.local_item_descriptions(),
        exact: false
      });

      toast.success(tCommon('updated_successfully'));
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error(tCommon('error_while_updating'));

      // В случае ошибки возвращаем исходные данные
      setOptimisticDescriptions([]);
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  // Обработчик создания описания
  const handleCreateDescription = async (data: CreateLocalItemDescriptionFormData) => {
    try {
      await create_mutation.mutateAsync(data);
      setIsModalOpen(false);
      toast.success(tCommon('saved_successfully'));

      // Сбрасываем оптимистические данные после успешного создания
      setOptimisticDescriptions([]);
    } catch {
      toast.error(tCommon('error_while_saving'));
      console.error(create_mutation.error);
    }
  };

  const handleSubmit = (data: CreateLocalItemDescriptionFormData | UpdateLocalItemDescriptionFormData) => {
    handleCreateDescription(data as CreateLocalItemDescriptionFormData);
  };

  // Находим активный элемент для DragOverlay
  const active_item = sorted_descriptions.find(item => item.id === active_id);

  if (isLoading) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.loading_spinner}></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className={styles.draggable_descriptions_container}>
      {sorted_descriptions.length === 0 ? (
        <div className={styles.empty_state}>
          <p>{tLocalItemDescriptions(`empty_message_${type}`)}</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className={styles.descriptions_container}>
            <SortableContext items={items_ids} strategy={verticalListSortingStrategy}>
              {sorted_descriptions.map((item) => (
                <DraggableDescriptionCard
                  key={item.id}
                  item={item}
                  type={type}
                  is_disabled={is_updating_order}
                />
              ))}
            </SortableContext>
          </div>

          <DragOverlay>
            {active_item && (
              <DraggableDescriptionCard
                item={active_item}
                type={type}
                is_dragging
                is_disabled={false}
              />
            )}
          </DragOverlay>
        </DndContext>
      )}

      {is_updating_order && (
        <div className={styles.updating_overlay}>
          <div className={styles.updating_message}>
            Обновление порядка...
          </div>
        </div>
      )}

      <LocalItemDescriptionFormModal
        is_open={is_modal_open}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        is_loading={create_mutation.isPending}
        type={type}
        initial_data={{ local_item_id, item_id }}
      />
    </div>
  );
}; 