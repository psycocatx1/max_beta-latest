import { getTranslations } from 'next-intl/server';
import { GoogleMap } from '@/components/public/common';
import classes from './MapSection.module.scss';
import { Heading } from '@/components/styles';

export const MapSection = async () => {
  const t = await getTranslations('public.pages.contacts');

  // Получаем координаты из переводов как числа
  const officeCoordinates = {
    lat: 55.7558, // Координаты Москвы (можно будет получать из переводов когда будет настроен бэкенд)
    lng: 37.6176
  };

  return (
    <section className={classes.map_section}>
      <div className={classes.map_section__container}>
        <Heading size='lg' className={classes.map_section__title}>{t('map.title')}</Heading>
        <GoogleMap
          lat={officeCoordinates.lat}
          lng={officeCoordinates.lng}
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