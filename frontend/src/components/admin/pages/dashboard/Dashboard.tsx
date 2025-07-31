import { TranslationStatus } from './TranslationStatus';
import { EntityTranslations } from './EntityTranslations';
import styles from './page.module.scss';

export const Dashboard = () => {
  return (
    <div className={styles.container}>
      <TranslationStatus />
      <EntityTranslations />
    </div>
  );
};