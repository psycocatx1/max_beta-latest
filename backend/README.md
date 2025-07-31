# E-Commerce Backend

Серверная часть приложения электронной коммерции, написанная на NestJS с использованием архитектуры MVC.

## Технологии

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT аутентификация
- Swagger документация

## Установка

```bash
npm install
```

## Настройка окружения

Создайте файл `.env` в корне проекта со следующими переменными:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce?schema=public"
ACCESS_TOKEN_SECRET="your-access-token-secret"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

## Настройка базы данных

```bash
# Генерация клиента Prisma
npx prisma generate

# Миграция базы данных
npx prisma migrate dev
```

## Запуск приложения

```bash
# Режим разработки
npm run start:dev

# Режим продакшн
npm run build
npm run start:prod
```

## Документация API

После запуска приложения документация Swagger будет доступна по адресу:

```
http://localhost:3001/api
```

## Архитектура проекта

Проект организован по модульной архитектуре NestJS с использованием паттерна MVC:

- **Controller (Контроллер)** - обрабатывает HTTP-запросы и возвращает ответы
- **Service (Сервис)** - содержит бизнес-логику
- **Model (Модель)** - представлена схемой Prisma

### Структура директорий

```
backend/
├── prisma/              # Модуль Prisma и схема базы данных
├── auth/                # Модуль аутентификации
│   ├── dto/             # Data Transfer Objects
│   ├── guards/          # Guards для защиты маршрутов
│   ├── strategies/      # Стратегии аутентификации
├── users/               # Модуль пользователей
├── products/            # Модуль товаров
├── categories/          # Модуль категорий
├── orders/              # Модуль заказов
├── common/              # Общие компоненты (декораторы, guards и т.д.)
├── app.module.ts        # Корневой модуль приложения
└── index.ts             # Точка входа в приложение
``` 