import { Filters } from '@/components/admin/common/ListPage/Filters';
import { FilterField } from '@/components/admin/common/ListPage/Filters/FilterField';
import { List } from '@/components/admin/common/ListPage/List';
import { LocalItemDescriptionsFiltersDto } from '@/hooks/admin/shared';
import { CategoryType, LocalItemDescription } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { LocalItemDescriptionCard } from './LocalItemDescriptionCard/LocalItemDescriptionCard';
import { BaseListResult } from '@/lib/api';

type LocalItemDescriptionsListProps = {
  type: CategoryType;
  filters: LocalItemDescriptionsFiltersDto;
  updateFilters: (filters: Partial<LocalItemDescriptionsFiltersDto>) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  current_page: number;
  is_loading: boolean;
  descriptions: BaseListResult<LocalItemDescription>;
}

export const LocalItemDescriptionsList = ({ type, filters, updateFilters, resetFilters, setPage, current_page, is_loading, descriptions }: LocalItemDescriptionsListProps) => {
  const tLocalItemDescriptions = useTranslations('admin.local_item_descriptions');
  const tFilters = useTranslations('admin.common.list_page.filters');
  const tFields = useTranslations('admin.common.form.fields');

  const handleFilterChange = (name: string, value: unknown) => {
    updateFilters({ [name]: value });
  };

  return (
    <>
      <Filters
        filters={filters}
        onUpdateFilters={updateFilters}
        onResetFilters={resetFilters}
        is_loading={is_loading}
      >
        <FilterField
          name="type"
          label={tFilters('content_type_label')}
          placeholder={tFilters('content_type_placeholder')}
          type="select"
          value={filters.type || ''}
          onChange={handleFilterChange}
          options={[
            { value: '', label: tFields('content_types.all_content_types') },
            { label: tFields('content_types.TEXT'), value: 'TEXT' },
            { label: tFields('content_types.IMAGE'), value: 'IMAGE' },
            { label: tFields('content_types.VIDEO'), value: 'VIDEO' },
            { label: tFields('content_types.LINK'), value: 'LINK' },
          ]}
        />
      </Filters>

      <List<LocalItemDescription>
        items={descriptions?.items || []}
        total={descriptions?.total || 0}
        loading={is_loading}
        current_page={current_page}
        page_size={filters.take}
        onPageChange={setPage}
        renderItem={(item) => (
          <LocalItemDescriptionCard
            key={item.id}
            item={item}
            type={type}
          />
        )}
        empty_message={tLocalItemDescriptions(`empty_message_${type}`)}
        items_label={tLocalItemDescriptions(`items_label_${type}`)}
      />
    </>
  );
}