import styles from './Switch.module.scss';
import { useTranslations } from 'next-intl';
import { List, Grid } from 'lucide-react'

type SwitchProps = {
  use_drag_and_drop: boolean;
  setUseDragAndDrop: (value: boolean) => void;
}

export const Switch = ({ use_drag_and_drop, setUseDragAndDrop }: SwitchProps) => {
  const tLocalItemDescriptions = useTranslations('admin.local_item_descriptions.switch');

  return (
    <button
      onClick={() => setUseDragAndDrop(!use_drag_and_drop)}
      className={styles.switch}
    >
      {use_drag_and_drop ? (
        <>
          <List size={20} />
          {tLocalItemDescriptions('to_list')}
        </>
      ) : (
        <>
          <Grid size={20} />
          {tLocalItemDescriptions('to_drag_and_drop')}
        </>
      )}
    </button>
  );
}