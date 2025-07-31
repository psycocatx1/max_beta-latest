'use client';

import { useForm } from 'react-hook-form';
import { NameSection, PriceSection, ItemSelectSection, LocaleSelectSection, mergeDefaultValues, DescriptionSection } from '@/components/admin/common/Form';
import { BaseFormModal } from './BaseFormModal';
import { CreateLocalServiceDto, UpdateLocalServiceDto, useLocalServices } from '@/hooks/admin/services';
import { useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { CategoryType, Locale, LocalService } from '@prisma/client';

interface LocalServiceFormModalProps {
  is_open: boolean;
  onClose: () => void;
  onSubmit: (data: LocalServiceFormData) => void;
  is_loading?: boolean;
  initial_data?: Partial<LocalServiceFormData>;
  locale?: Locale
  is_edit?: boolean;
  is_excluded?: boolean;
  currency_symbol?: string;
}

export interface LocalServiceFormData extends CreateLocalServiceDto {
  name: string;
  description: string;
  price: number;
  discount_price: number | undefined;
  locale_id: string;
  service_id: string;
  is_excluded: boolean;
}

const DEFAULT_VALUES: Partial<LocalServiceFormData> = {
  name: '',
  description: '',
  price: 0,
  discount_price: undefined,
  locale_id: '',
  service_id: '',
}

export const LocalServiceFormModal = ({
  is_open,
  onClose,
  onSubmit,
  is_loading = false,
  initial_data,
  is_edit = false,
  locale,
  is_excluded = false,
  currency_symbol,
}: LocalServiceFormModalProps) => {
  const tLocalServices = useTranslations('admin.local_services');
  const tFields = useTranslations('admin.common.form.fields');
  const tCommon = useTranslations('common');
  const { data: local_services } = useLocalServices().useGet({
    service_id: initial_data?.service_id || '',
    locale_id: initial_data?.locale_id || '',
    is_excluded,
    skip: 0,
    take: 1,
  }, is_excluded);

  const local_service: LocalService | undefined = useMemo(() => local_services?.items[0], [local_services?.items]);
  const defaultValues = useMemo(() => mergeDefaultValues<LocalServiceFormData, 'service_id'>(DEFAULT_VALUES, initial_data), [initial_data]);
  const form = useForm<LocalServiceFormData>({ mode: 'onChange', defaultValues });
  const { register, formState: { errors }, reset } = form;

  useEffect(() => {
    if (local_service) {
      reset({
        ...defaultValues,
        name: local_service.name,
        description: local_service.description || undefined,
        price: local_service.price,
        discount_price: local_service.discount_price || undefined,
        locale_id: local_service.locale_id,
        service_id: local_service.service_id,
      });
    }
  }, [local_service, reset, defaultValues]);

  const update_mutation = useLocalServices().useUpdate(local_service?.id || '');
  const onUpdate = (data: UpdateLocalServiceDto) => update_mutation.mutate({ ...data, is_excluded: false });

  const handleSubmitWrapper = (data: LocalServiceFormData) => {
    if (local_service) {
      onUpdate(data);
    } else {
      onSubmit(data);
    }
  };

  return (
    <BaseFormModal
      is_open={is_open}
      onClose={onClose}
      title={!!local_service ? tCommon('restore_title') : tLocalServices(is_edit ? 'edit_title' : 'create_title')}
      form={form}
      onSubmit={handleSubmitWrapper}
      is_loading={is_loading}
      save_button_text={!!local_service ? tCommon('restore') : tCommon(is_edit ? 'save' : 'create')}
      loading_text={!!local_service ? tCommon('restoring') : tCommon(is_edit ? 'saving' : 'creating')}
    >
      {!initial_data?.locale_id && <LocaleSelectSection<LocalServiceFormData>
        register={register}
        errors={errors}
        is_loading={is_loading}
        label={tFields('locale_label')}
        field_name="locale_id"
      />}
      {!initial_data?.service_id && <ItemSelectSection<LocalServiceFormData>
        register={register}
        errors={errors}
        field_name="service_id"
        label={tFields('service_label')}
        type={CategoryType.SERVICE}
      />}
      <NameSection
        is_loading={is_loading}
        register={register}
        errors={errors}
        field_name="name"
        label={tFields('name_label')}
        placeholder={tFields('name_placeholder')}
      />
      <DescriptionSection
        is_loading={is_loading}
        register={register}
        errors={errors}
        field_name="description"
        label={tFields('description_label')}
        placeholder={tFields('description_placeholder')}
      />
      <PriceSection<LocalServiceFormData>
        register={register}
        errors={errors}
        is_loading={is_loading}
        price_field_name="price"
        discount_price_field_name="discount_price"
        label={tFields('price_label')}
        discount_label={tFields('discount_label')}
        currency_symbol={locale?.currency_symbol || currency_symbol}
      />
    </BaseFormModal>
  );
}; 