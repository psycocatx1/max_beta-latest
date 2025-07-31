'use client'
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin } from 'lucide-react';
import classes from './GoogleMap.module.scss';

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
  className?: string;
  markerTitle?: string;
  showDirectionsButton?: boolean;
  onDirectionsClick?: () => void;
}

export const GoogleMap = ({
  lat,
  lng,
  zoom = 15,
  height = '400px',
  className,
  markerTitle = 'Местоположение',
  showDirectionsButton = false,
  onDirectionsClick
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
          version: 'weekly',
          libraries: ['places']
        });

        const { Map } = await loader.importLibrary('maps');
        const { AdvancedMarkerElement } = await loader.importLibrary('marker');

        if (!mapRef.current) return;

        const mapOptions = {
          center: { lat, lng },
          zoom,
          mapId: 'logitrans-map',
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        };

        const map = new Map(mapRef.current, mapOptions);

        // Создаем маркер
        new AdvancedMarkerElement({
          map,
          position: { lat, lng },
          title: markerTitle,
        });

        setIsLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке Google Maps:', err);
        setError('Не удалось загрузить карту');
        setIsLoading(false);
      }
    };

    initMap();
  }, [lat, lng, zoom, markerTitle]);

  const handleDirectionsClick = () => {
    if (onDirectionsClick) {
      onDirectionsClick();
    } else {
      // Открываем Google Maps с маршрутом
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, '_blank');
    }
  };

  if (error) {
    return (
      <div className={`${classes.error} ${className || ''}`} style={{ height }}>
        <MapPin size={48} />
        <p>{error}</p>
        <p>Координаты: {lat}, {lng}</p>
      </div>
    );
  }

  return (
    <div className={`${classes.map_container} ${className || ''}`} style={{ height }}>
      {isLoading && (
        <div className={classes.loading}>
          <div className={classes.spinner}></div>
          <p>Загрузка карты...</p>
        </div>
      )}

      <div
        ref={mapRef}
        className={classes.map}
        style={{ height: '100%', width: '100%' }}
      />

      {showDirectionsButton && (
        <button
          className={classes.directions_button}
          onClick={handleDirectionsClick}
          type="button"
        >
          <MapPin size={16} />
          Построить маршрут
        </button>
      )}
    </div>
  );
}; 