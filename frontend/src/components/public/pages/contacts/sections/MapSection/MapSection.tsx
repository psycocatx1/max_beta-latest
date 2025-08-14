import { getTranslations } from 'next-intl/server';
import { GoogleMap } from '@/components/public/common';
import classes from './MapSection.module.scss';
import { Heading } from '@/components/styles';

export const MapSection = async () => {
  const t = await getTranslations('public.pages.contacts');

  return (
    <section className={classes.map_section}>
      <div className={classes.map_section__container}>
        <Heading size='lg' className={classes.map_section__title}>{t('map.title')}</Heading>
        <GoogleMap
          lat={Number(t('map.coordinates.lat'))}
          lng={Number(t('map.coordinates.lng'))}
          zoom={16}
          height="450px"
          markerTitle={t('map.office_marker')}
          showDirectionsButton={true}
          className={classes.map_section__map}
        />
      </div>
    </section>
  );
}; 