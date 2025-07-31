# Настройка Google Maps

## Быстрый старт

1. **Получение API ключа**
   - Перейдите на [Google Cloud Console](https://console.cloud.google.com/)
   - Создайте новый проект или выберите существующий
   - Включите "Maps JavaScript API"
   - Создайте credentials (API key)

2. **Настройка проекта**
   ```bash
   # Скопируйте файл окружения
   cp .env.example .env.local
   
   # Добавьте ваш API ключ
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

3. **Рекомендации по безопасности**
   - Ограничьте API ключ по доменам в Google Cloud Console
   - Ограничьте API только необходимыми сервисами (Maps JavaScript API)

## Использование

### Компонент GoogleMap

```tsx
import { GoogleMap } from '@/components/public/common';

<GoogleMap
  lat={55.7558}
  lng={37.6176}
  zoom={16}
  height="450px"
  markerTitle="Офис LogiTrans"
  showDirectionsButton={true}
/>
```

### Текущая интеграция

- **Страница контактов**: Полноразмерная карта с маркером офиса
- **Футер**: Мини-карта с кратким обзором локации

### Координаты офиса

Текущие координаты указывают на центр Москвы:
- Широта: 55.7558
- Долгота: 37.6176

Для изменения координат отредактируйте значения в:
- `frontend/src/components/public/pages/contacts/sections/MapSection/MapSection.tsx`
- `frontend/src/components/public/common/Footer/Footer.tsx`

## Troubleshooting

### Карта не загружается
- Проверьте правильность API ключа
- Убедитесь, что Maps JavaScript API включен в Google Cloud Console
- Проверьте console браузера на наличие ошибок

### Ошибки доступа
- Проверьте ограничения API ключа по доменам
- Убедитесь, что ключ имеет права на Maps JavaScript API

### Карта отображается серой
- Проверьте, что у вас есть активный биллинг аккаунт в Google Cloud
- Убедитесь, что не превышены квоты API

## Дополнительные возможности

Компонент GoogleMap поддерживает:
- Настраиваемый зум
- Кастомные маркеры
- Кнопку построения маршрута
- Адаптивный дизайн
- Темную тему 