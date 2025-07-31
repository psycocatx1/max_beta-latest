import { LocalItemDescription } from '@prisma/client';
import { Video } from 'lucide-react';
import styles from './LocalItemDescriptionCard.module.scss';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export const Content = ({ item }: { item: LocalItemDescription }) => {
  const [is_content_expanded, setIsContentExpanded] = useState(false);
  const tLocalItemDescriptions = useTranslations('admin.local_item_descriptions');

  const renderContent = () => {
    switch (item.type) {
      case 'TEXT':
        const content = item.content || '';
        const is_long = content.length > 150;
        const display_content = is_long && !is_content_expanded
          ? content.substring(0, 150) + '...'
          : content;

        return (
          <div className={styles.card__content}>
            <p className={styles.card__text}>{display_content}</p>
            {is_long && (
              <button
                onClick={() => setIsContentExpanded(!is_content_expanded)}
                className={styles.card__expand_button}
              >
                {tLocalItemDescriptions(is_content_expanded ? 'show_less' : 'show_more')}
              </button>
            )}
          </div>
        );

      case 'VIDEO':
        return (
          <div className={styles.card__content}>
            <div className={styles.card__video_placeholder}>
              <Video className={styles.card__video_icon} />
              <span className={styles.card__video_text}>{tLocalItemDescriptions('video_content')}</span>
            </div>
          </div>
        );

      case 'LINK':
        return (
          <div className={styles.card__content}>
            <a
              href={item.content}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card__link}
            >
              {item.content}
            </a>
          </div>
        );

      case 'TEXT':
        return (
          <div className={styles.card__content}>
            <p className={styles.card__text}>{item.content}</p>
          </div>
        );
    }
  };
  return (
    <>
      {renderContent()}
    </>
  );
};