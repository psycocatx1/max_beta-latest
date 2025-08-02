import { Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Heading, Paragraph } from '@/components';
import { handleShare } from '@/lib/api';
import classes from './DataSection.module.scss';

export const DataSection = ({ name, description }: { name: string, description: string | null }) => {
  const t = useTranslations('public.pages.product.detail');
  return (
    <>
      <div className={classes.section}>
        <div className={classes.section__wrapper}>
          <Heading size='xl'>{name}</Heading>
        </div>
        <div className={classes.section__actions}>
          <button
            onClick={() => handleShare({ title: name, text: description, url: window.location.href })}
            className={classes.section__actions_button}
            aria-label={t('share')}
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
      <Paragraph size='lg'>{description}</Paragraph>
    </>
  )
};