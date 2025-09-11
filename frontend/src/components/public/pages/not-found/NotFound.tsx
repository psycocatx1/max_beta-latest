'use client'

import { useTranslations } from 'next-intl';
import { BackButton } from '@/components/public/common/for/item';
import { Button } from '@/components/styles';
import { Search, Home } from 'lucide-react';
import { useRouter } from '@/hooks/useRouting';
import classes from './NotFound.module.scss';

interface NotFoundProps {
  icon: React.ReactNode;
  item: string;
  goTo: 'products' | 'services';
}

export const NotFound = ({ icon, item, goTo }: NotFoundProps) => {
  const t = useTranslations(`public.pages.${item}.not_found`);
  const router = useRouter();

  const handleGoTo = () => {
    router.push(`/${goTo}`);
  };

  const handleGoToHome = () => {
    router.push(`/`);
  };

  return (
    <div className={classes.not_found}>
      <div className={classes.not_found__container}>
        <BackButton text={t(`back_to_${goTo}`)} />

        <div className={classes.not_found__content}>
          <div className={classes.not_found__icon}>
            {icon}
          </div>

          <div className={classes.not_found__text}>
            <h1 className={classes.not_found__title}>
              {t('title')}
            </h1>

            <p className={classes.not_found__description}>
              {t('description')}
            </p>
          </div>

          <div className={classes.not_found__actions}>
            <Button
              variant="primary"
              onClick={handleGoTo}
              className={classes.not_found__action_primary}
            >
              <Search size={20} />
              {t(`browse_${goTo}`)}
            </Button>

            <Button
              variant="secondary"
              onClick={handleGoToHome}
              className={classes.not_found__action_secondary}
            >
              <Home size={20} />
              {t('go_home')}
            </Button>
          </div>

          <div className={classes.not_found__suggestions}>
            <h3 className={classes.not_found__suggestions_title}>
              {t('suggestions_title')}
            </h3>

            <ul className={classes.not_found__suggestions_list}>
              <li className={classes.not_found__suggestion}>
                {t('suggestion_1')}
              </li>
              <li className={classes.not_found__suggestion}>
                {t('suggestion_2')}
              </li>
              <li className={classes.not_found__suggestion}>
                {t('suggestion_3')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
