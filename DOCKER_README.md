# Docker Setup for Max Beta Project

Этот проект содержит контейнеризованную версию бэкенда (NestJS) и фронтенда (Next.js).

## Структура

```
max_beta/
├── backend/          # NestJS backend
│   ├── Dockerfile
│   ├── .dockerignore
│   └── ...
├── frontend/         # Next.js frontend
│   ├── Dockerfile
│   ├── .dockerignore
│   └── ...
├── docker-compose.yml
├── .env             # Environment variables
└── ...
```

## Быстрый старт

1. Убедитесь, что у вас установлен Docker и Docker Compose
2. Настройте переменные окружения в файле `.env`
3. Запустите все сервисы:

```bash
docker-compose up --build
```

## Сервисы

### База данных (PostgreSQL)
- **Порт**: 5433 (внешний), 5432 (внутренний)
- **База данных**: max
- **Пользователь**: postgres

### Redis
- **Порт**: 6379

### Backend (NestJS)
- **Порт**: 3001
- **API endpoint**: http://localhost:3001/api

### Frontend (Next.js)
- **Порт**: 3000
- **URL**: http://localhost:3000

## Переменные окружения

Все переменные окружения определены в файле `.env` в корне проекта:

- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DATABASE` - настройки PostgreSQL
- `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET` - JWT секреты
- `REDIS_PASSWORD` - пароль Redis
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - API ключ Google Maps
- `GOOGLE_MAPS_API_KEY` - тот же ключ для docker-compose

## Команды

### Сборка и запуск всех сервисов
```bash
docker-compose up --build
```

### Запуск в фоне
```bash
docker-compose up -d --build
```

### Остановка сервисов
```bash
docker-compose down
```

### Просмотр логов
```bash
docker-compose logs -f [service_name]
```

### Пересборка конкретного сервиса
```bash
docker-compose up --build backend
docker-compose up --build frontend
```

## Особенности

- **Multi-stage builds**: Оптимизированные образы для production
- **Health checks**: Автоматическая проверка здоровья всех сервисов
- **Service dependencies**: Сервисы запускаются только после того, как зависимые сервисы готовы
- **Volume mounts**: Загрузки сохраняются в папке `backend/uploads`
- **Database migrations**: Автоматически применяются при запуске backend
- **Non-root users**: Контейнеры запускаются от имени непривилегированных пользователей
- **Redis authentication**: Redis защищен паролем для безопасности

## Разработка

Для разработки рекомендуется использовать локальные установки Node.js и запускать сервисы базы данных через Docker:

```bash
docker-compose up db redis
```

Затем в отдельных терминалах:
```bash
cd backend && npm run start:dev
cd frontend && npm run dev
```
