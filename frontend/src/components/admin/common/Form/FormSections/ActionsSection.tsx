'use client';

import { FormStyles } from '@/components/admin/common/Form';
import { Save, X, Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ActionsSectionProps {
  is_loading: boolean;
  is_valid: boolean;
  handleClose: () => void;
  save_button_text?: string;
  loading_text?: string;
  cancel_text?: string;
}

export const ActionsSection = ({
  is_loading,
  is_valid,
  handleClose,
  save_button_text,
  loading_text,
  cancel_text
}: ActionsSectionProps) => {
  const tCommon = useTranslations('common');
  const defaultSaveButtonText = save_button_text || tCommon('save');
  const defaultLoadingText = loading_text || tCommon('saving');
  const defaultCancelText = cancel_text || tCommon('cancel');

  return (
    <div className={FormStyles.admin_form_actions}>
      <button
        type="button"
        className={`${FormStyles.admin_form_button} ${FormStyles.admin_form_button_secondary}`}
        onClick={handleClose}
        disabled={is_loading}
        data-intl-default-key="common.actions.cancel"
      >
        <X size={16} />
        {defaultCancelText}
      </button>
      <button
        type="submit"
        className={`${FormStyles.admin_form_button} ${FormStyles.admin_form_button_primary}`}
        disabled={is_loading || !is_valid}
        data-intl-default-key="common.actions.save"
      >
        {is_loading ? (
          <>
            <Loader className={FormStyles.admin_form_spinner} size={16} />
            <span data-intl-default-key="common.actions.saving">{defaultLoadingText}</span>
          </>
        ) : (
          <>
            <Save size={16} />
            <span data-intl-default-key="common.actions.save">{defaultSaveButtonText}</span>
          </>
        )}
      </button>
    </div>
  );
}; 