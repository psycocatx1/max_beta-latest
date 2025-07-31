import { Camera, Link } from 'lucide-react';
import styles from '../ImageUploader.module.scss';
import { useTranslations } from 'next-intl';

interface SwitchProps {
  image_type: 'file' | 'url';
  handleTypeChange: (type: 'file' | 'url') => void;
  is_loading: boolean;
}

const Switch = ({ image_type, handleTypeChange, is_loading }: SwitchProps) => {
  const tFields = useTranslations('admin.common.form.fields');

  return (
    <div className={styles.image_uploader_type_switcher}>
      <button
        type="button"
        className={`${styles.image_uploader_type_button} ${image_type === 'file' ? styles.image_uploader_type_button_active : ''}`}
        onClick={() => handleTypeChange('file')}
        disabled={is_loading}
      >
        <Camera size={16} />
        {tFields('file_type')}
      </button>
      <button
        type="button"
        className={`${styles.image_uploader_type_button} ${image_type === 'url' ? styles.image_uploader_type_button_active : ''}`}
        onClick={() => handleTypeChange('url')}
        disabled={is_loading}
      >
        <Link size={16} />
        {tFields('url_type')}
      </button>
    </div>
  );
};

export default Switch;
