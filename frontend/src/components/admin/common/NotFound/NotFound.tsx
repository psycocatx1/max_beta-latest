import { MessageSquareWarning } from "lucide-react"
import styles from './NotFound.module.scss';
import { useTranslations } from 'next-intl';

export const NotFound = () => {
  const tCommon = useTranslations('common');

  return (
    <div className={styles.not_found}>
      <p>{tCommon('not_found')}</p>
      <MessageSquareWarning size={24} />
    </div>
  );
};
