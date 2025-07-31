'use client';

import { ReactNode } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { Modal } from '@/components/admin/common/Modal/Modal';
import { ActionsSection, FormStyles } from '@/components/admin/common/Form';
import { useTranslations } from 'next-intl';

interface BaseFormModalProps<T extends FieldValues> {
  is_open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  is_loading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  save_button_text?: string;
  loading_text?: string;
  reset_on_close?: boolean;
}

export const BaseFormModal = <T extends FieldValues>({
  is_open,
  onClose,
  title,
  children,
  form,
  onSubmit,
  is_loading = false,
  size = 'md',
  save_button_text,
  loading_text,
  reset_on_close = true
}: BaseFormModalProps<T>) => {
  const tCommon = useTranslations('common');
  const { handleSubmit, reset, formState: { isValid: is_valid } } = form;

  const default_save_button_text = save_button_text || tCommon('save');
  const default_loading_text = loading_text || tCommon('saving');

  const handleFormSubmit = (data: T) => {
    onSubmit(data);
    handleClose();
  };

  const handleClose = () => {
    if (reset_on_close) {
      reset();
    }
    onClose();
  };

  return (
    <Modal
      isOpen={is_open}
      onClose={handleClose}
      title={title}
      size={size as 'sm' | 'md' | 'lg' | undefined}
    >
      <form
        className={FormStyles.admin_form}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {children}

        <ActionsSection
          is_loading={is_loading}
          is_valid={is_valid}
          handleClose={handleClose}
          save_button_text={default_save_button_text}
          loading_text={default_loading_text}
        />
      </form>
    </Modal>
  );
}; 