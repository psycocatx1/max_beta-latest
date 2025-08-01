import { Edit, Trash2 } from 'lucide-react';
import classes from '../DraggableDescriptionCard.module.scss';
import { UseMutationResult } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { AxiosResponse } from 'axios';

type ActionsProps = {
  is_disabled: boolean;
  setIsModalOpen: (is_open: boolean) => void;
  handleDelete: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete_mutation: UseMutationResult<AxiosResponse<void, any>, Error, void, unknown>;
}

export const Actions = ({ is_disabled, setIsModalOpen, handleDelete, delete_mutation }: ActionsProps) => {
  const tCommon = useTranslations('common');

  return (
    <div className={classes.card_actions}>
      <button
        onClick={() => setIsModalOpen(true)}
        className={classes.card_actions_edit_button}
        disabled={is_disabled}
        title={tCommon('edit')}
      >
        <Edit size={14} />
      </button>
      <button
        onClick={handleDelete}
        className={classes.card_actions_delete_button}
        disabled={delete_mutation.isPending || is_disabled}
        title={tCommon('delete')}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}