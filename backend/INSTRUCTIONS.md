# ИНСТРУКЦИЯ: Backend Max Beta - NestJS API

## 🏗️ АРХИТЕКТУРА BACKEND

### ✅ ИЗОЛИРОВАННАЯ АРХИТЕКТУРА (01.01.2025)

### Структура:
```
backend/
├── src/
│   ├── shared-section/ (общие модули)
│   │   ├── local-item-descriptions/
│   │   └── item-images/
│   ├── products-section/
│   │   ├── products/
│   │   └── local-products/
│   ├── services-section/
│   │   ├── services/
│   │   └── local-services/
│   ├── categories-section/
│   │   ├── categories/
│   │   └── local-categories/
│   ├── locales-section/
│   │   └── locales/
│   ├── users-section/
│   │   └── users/
│   ├── auth/
│   ├── files/
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── seeds/
└── libs/
    └── redis/
```

## 🗃️ МОДУЛЬНАЯ СТРУКТУРА

### Паттерн модуля:
```
[domain]/
├── controller.ts (REST endpoints)
├── module.ts (DI container)
├── dto/ (валидация данных)
│   ├── create-[entity].dto.ts
│   ├── update-[entity].dto.ts
│   └── filters.dto.ts
├── services/
│   ├── crud.service.ts (CRUD операции)
│   └── list.service.ts (получение списков)
└── example.data.ts (mock данные)
```

### API структура:
```
/api/[domain]/
├── GET / (список с фильтрами)
├── GET /:id (один элемент)
├── POST / (создание)
├── PUT /:id (обновление)
└── DELETE /:id (удаление)
```

## 🌐 СИСТЕМА ПЕРЕВОДОВ И ВАЛИДАЦИИ

### Translations Module (Создан 09.07.2025):
```
locales-section/
├── translations/
│   ├── controller.ts (REST API для переводов)
│   ├── service.ts (основной сервис переводов)
│   ├── validation.service.ts (валидация файлов)
│   ├── sync.service.ts (синхронизация файлов)
│   └── module.ts
└── locales/
    └── services/
        └── crud.service.ts (автосоздание файлов при создании локали)
```

### API эндпоинты переводов:
```
GET /translations/messages/:locale_symbol - получение переводов для приложения
GET /translations/:locale_symbol/:module - получение переводов для редактирования
PUT /translations/:locale_symbol/:module - обновление переводов
GET /translations/validation/status - статус валидации всех файлов
POST /translations/sync/all - синхронизация всех файлов с шаблонами
POST /translations/sync/:locale_symbol - создание файлов для локали
POST /translations/repair/:locale_symbol/:module - восстановление файла
```

### Структура файлов переводов:
```
modules/
├── admin/
│   ├── admin.main.json (шаблон)
│   ├── admin.ru.json
│   ├── admin.ua.json
│   └── admin.pl.json
├── common/
│   ├── common.main.json (шаблон)
│   └── [локали].json
└── public/
    ├── public.main.json (шаблон)
    └── [локали].json
```

### ValidationService возможности:
- Проверка соответствия файлов переводов шаблонам
- Выявление отсутствующих ключей
- Обнаружение пустых значений
- Выявление избыточных ключей
- Глобальная статистика по всем локализациям

### SyncService возможности:
- Автоматическое создание файлов переводов при создании локали
- Синхронизация структуры файлов с шаблонами
- Восстановление поврежденных файлов
- Удаление файлов при удалении локали

### Интеграция с локализациями:
- При создании Locale автоматически создаются файлы переводов
- При удалении Locale файлы переводов удаляются
- Валидация использует данные из базы для проверки существующих локалей

## 🔧 ТИПИЗАЦИЯ И ПАТТЕРНЫ

### Типизация Request с cookies:
```typescript
interface RequestWithCookies extends Request {
  cookies: {
    refresh_token?: string;
    access_token?: string;
  };
}

// Использование в контроллерах
async refresh(@Req() req: RequestWithCookies, @Res() res: Response) {
  const refreshToken = req.cookies.refresh_token;
  // ...
}
```

### Типизация для authenticated запросов:
```typescript
interface AuthenticatedRequest extends Request {
  user: {
    user_id: string;
    email: string;
    session_id: string;
    role: Role;
  };
}

// Использование в контроллерах
async logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
  const user_id = req.user.user_id;
  // ...
}
```

### JWT стратегия с типизированными cookies:
```typescript
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly redisSessionService: RedisSessionService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: RequestWithCookies) => {
          const token: string | undefined = request?.cookies?.access_token;
          return token;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("ACCESS_TOKEN_SECRET") || "default-secret",
    });
  }
}
```

### Необходимые типы для passport-jwt:
```bash
npm install --save-dev @types/passport-jwt
```

### Импорт argon2:
```typescript
// ПРАВИЛЬНЫЙ способ импорта argon2
import * as argon2 from 'argon2';

// Использование
const hash = await argon2.hash(password);
const isValid = await argon2.verify(hashedPassword, plainTextPassword);
```

### Паттерн хеширования паролей:
```typescript
private async hashPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}

private async comparePasswords(
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await argon2.verify(hashedPassword, plainTextPassword);
}
```

### Исправление ошибок типизации в List Services:
```typescript
// НЕПРАВИЛЬНО - дженерик в findWithPagination
const { items, count } = await this.prisma.findWithPagination<ExtendedType>(
  this.prisma.model,
  queryOptions,
  { relations: true }
);

// ПРАВИЛЬНО - без дженерика, с приведением типов
const { items, count } = await this.prisma.findWithPagination(
  this.prisma.model,
  queryOptions,
  { relations: true }
);

const typedItems = items as ExtendedType[];
return {
  items: typedItems,
  total: count,
  skip: queryOptions.skip,
  take: queryOptions.take,
};
```

### Типизация PrismaService.findWithPagination:
```typescript
async findWithPagination<T = any>(
  model: {
    findMany: (options: any) => Promise<T[]>;
    count: (options: any) => Promise<number>;
  },
  query_options: {
    skip: number;
    take: number;
    where: unknown;
    orderBy: unknown;
  },
  include: Record<string, unknown> = {},
): Promise<{ items: T[]; count: number }> {
  // Реализация
}
```

## 🔧 ОСНОВНЫЕ СЕРВИСЫ

### CrudService паттерн:
```typescript
export class CrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesService: FilesService
  ) {}

  async create(data: CreateDto, file?: Express.Multer.File) { }
  async findOne(id: string) { }
  async update(id: string, data: UpdateDto, file?: Express.Multer.File) { }
  async delete(id: string) { }
}
```

### ListService паттерн:
```typescript
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  async get[Entity]s(filters: FiltersDto): Promise<BaseListResult<Entity>> {
    const { skip = 0, take = 10, search, ...otherFilters } = filters;
    
    const where = {
      is_excluded: false,
      ...(search && { name: { contains: search, mode: 'insensitive' } }),
      ...otherFilters
    };

    const [items, total] = await Promise.all([
      this.prisma.[entity].findMany({ where, skip, take }),
      this.prisma.[entity].count({ where })
    ]);

    return { items, total, skip, take };
  }
}
```

## 📁 ФАЙЛОВАЯ СИСТЕМА

### FilesService:
```typescript
export class FilesService {
  saveImage(file: Express.Multer.File, model_name: string): string
  deleteImage(imagePath: string): void
  isValidImage(file: Express.Multer.File): boolean
  isValidSize(file: Express.Multer.File, maxSizeInMB: number): boolean
}
```

### Структура uploads:
```
uploads/
├── categories/
├── products/
├── services/
├── locales/
└── users/
```

## 🗄️ БАЗА ДАННЫХ

### Основные модели:
- **User** (id, email, phone, role, created, updated, is_excluded)
- **Session** (id, user_id, access_token, refresh_token, expires)
- **Locale** (id, name, language, symbol, currency, phone_code, icon)
- **Category** (id, name, description, type, parent_id, url, image_type)
- **LocalCategory** (id, category_id, locale_id, name, description)
- **Product/Service** (id, name, description, price, discount_price, category_id, url, image_type)
- **LocalProduct/LocalService** (id, [item]_id, locale_id, name, description, price, discount_price)
- **ItemImage** (id, item_id, item_type, url, image_type, position)
- **LocalItemDescription** (id, local_[item]_id, type, title, content)

### Связи:
- User 1:N Session
- Locale 1:N LocalCategory, LocalProduct, LocalService
- Category 1:N LocalCategory, Product, Service
- Category 1:N Category (parent_id)
- Product/Service 1:N LocalProduct/LocalService
- Product/Service 1:N ItemImage
- LocalProduct/LocalService 1:N LocalItemDescription

## 🚨 НАЙДЕННЫЕ ПРОБЛЕМЫ В BACKEND

### 1. РУССКИЕ СООБЩЕНИЯ ОШИБОК:
```typescript
// В files.service.ts:
throw new Error('Недопустимый формат файла. Разрешены только JPEG, PNG и WebP');
throw new Error('Размер файла не должен превышать 5 МБ');

// В crud.service.ts:
throw new BadRequestException('Необходимо указать либо local_product_id, либо local_service_id');
throw new BadRequestException('Нельзя указывать одновременно local_product_id и local_service_id');
```

### 2. РУССКИЕ CONSOLE.LOG:
```typescript
// В main.ts:
console.log(`Приложение запущено на порту ${port}`);
console.log(`Статические файлы доступны по адресу http://localhost:${port}/static/`);

// В seeds:
console.log('🌱 Начинаю заполнение базы данных...');
console.log('🎉 Заполнение базы данных завершено успешно!');
```

### 3. КОММЕНТАРИИ НА РУССКОМ:
Много комментариев JSDoc на русском языке в API методах.

## 🔧 ИСПРАВЛЕНИЯ BACKEND

### 1. Создать ErrorMessagesService:
```typescript
@Injectable()
export class ErrorMessagesService {
  getInvalidFileFormatMessage(): string {
    return 'Invalid file format. Only JPEG, PNG and WebP are allowed';
  }
  
  getFileTooLargeMessage(maxSize: number): string {
    return `File size should not exceed ${maxSize} MB`;
  }
}
```

### 2. Использовать константы для сообщений:
```typescript
// constants/error-messages.ts
export const ERROR_MESSAGES = {
  INVALID_FILE_FORMAT: 'Invalid file format. Only JPEG, PNG and WebP are allowed',
  FILE_TOO_LARGE: (size: number) => `File size should not exceed ${size} MB`,
  FIELD_REQUIRED: (field: string) => `${field} is required`,
  MUTUAL_EXCLUSIVE_FIELDS: (field1: string, field2: string) => 
    `Cannot specify both ${field1} and ${field2} simultaneously`
} as const;
```

### 3. Логирование:
```typescript
// Заменить русские console.log на английские
console.log(`Application started on port ${port}`);
console.log(`Static files available at http://localhost:${port}/static/`);
```

## 📋 ВАЛИДАЦИЯ И DTO

### BaseFilterDto:
```typescript
export class BaseFilterDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  take?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}
```

### Паттерн Create/Update DTO:
```typescript
export class Create[Entity]Dto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}

export class Update[Entity]Dto extends PartialType(Create[Entity]Dto) {}
```

## 🔐 АУТЕНТИФИКАЦИЯ

### JWT стратегия:
- **Access token**: 15 минут
- **Refresh token**: 7 дней
- **Роли**: USER, ADMIN, MODERATOR

### Guards:
- **JwtAuthGuard**: проверка токена
- **RolesGuard**: проверка ролей

## 📝 REDIS CACHE

### Конфигурация:
```typescript
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
})
export class RedisModule {}
```

## 🌱 SEEDS СИСТЕМА

### Порядок заполнения:
1. **locales.seed.ts** - локализации
2. **categories.seed.ts** - категории  
3. **localized-data.seed.ts** - переводы категорий, продукты, услуги

### Паттерн seed:
```typescript
export async function seed[Entity](prisma: PrismaService) {
  console.log('🌱 Starting [entity] seeding...');
  
  for (const data of [entity]_data) {
    const existing = await prisma.[entity].findFirst({
      where: { some_unique_field: data.some_unique_field }
    });

    if (existing) {
      console.log(`⚠️ [Entity] "${data.name}" already exists, skipping...`);
      continue;
    }

    const created = await prisma.[entity].create({ data });
    console.log(`✅ Created [entity]: ${created.name}`);
  }

  console.log('🎉 [Entity] seeding completed!');
}
```

## 🎯 СЛЕДУЮЩИЕ ШАГИ BACKEND

1. **Исправить сообщения ошибок** на английский
2. **Создать ErrorMessagesService** для централизации
3. **Обновить console.log** на английский
4. **Добавить больше валидации** в DTO
5. **Улучшить error handling** в контроллерах
6. **Добавить Swagger документацию**
7. **Оптимизировать запросы** к базе данных

## ✅ УЖЕ ГОТОВО

- ✅ Модульная архитектура
- ✅ CRUD операции для всех сущностей
- ✅ Система файлов
- ✅ JWT аутентификация
- ✅ Redis кеширование
- ✅ Полное заполнение базы данных
- ✅ Валидация DTO
- ✅ Локализованная структура данных 

## API Сессий

### Основные эндпоинты

```typescript
// Получение сессий
GET /api/sessions                    // Получить свои сессии
GET /api/sessions?user_id=UUID      // Получить сессии пользователя (только для админов)
GET /api/sessions/count             // Получить количество своих активных сессий
GET /api/sessions/stats             // Получить статистику сессий (только для админов)
GET /api/sessions/health            // Проверить состояние системы сессий (только для админов)

// Управление сессиями
PATCH /api/sessions/:sessionId/refresh  // Обновить время жизни сессии
DELETE /api/sessions/:sessionId         // Удалить конкретную сессию
DELETE /api/sessions/user/all-other     // Удалить все сессии кроме текущей
```

### Примеры использования

```typescript
// Получение своих сессий
const response = await axios.get('/api/sessions');
const sessions = response.data;

// Получение сессий конкретного пользователя (только для админов)
const response = await axios.get('/api/sessions?user_id=USER_UUID');
const userSessions = response.data;

// Удаление всех сессий кроме текущей
await axios.delete('/api/sessions/user/all-other');
```

### Права доступа

- Обычные пользователи могут:
  - Получать только свои сессии
  - Управлять только своими сессиями
  
- Администраторы могут:
  - Получать сессии любого пользователя
  - Просматривать статистику сессий
  - Проверять состояние системы сессий

## 🔄 СИСТЕМА УПРАВЛЕНИЯ ПОРЯДКОМ С FLOAT

### Концепция Float-порядка
```typescript
// Используем Float вместо целых чисел для порядка
// Изначальные значения: 1.0, 2.0, 3.0, 4.0...
// Для вставки между элементами вычисляем среднее: (1.0 + 2.0) / 2 = 1.5
// Обновляется только перемещаемый элемент
```

### Основные методы в CrudService:

#### calculateNewOrderForUpdate()
```typescript
private async calculateNewOrderForUpdate(
  currentId: string,
  targetOrder: number,
  local_product_id?: string | null,
  local_service_id?: string | null
): Promise<number> {
  // Получаем все описания кроме текущего
  // Вычисляем оптимальную позицию для вставки
  // Возвращает Float значение для order
}
```

#### checkNeedsReindexing()
```typescript
private async checkNeedsReindexing(
  local_product_id?: string, 
  local_service_id?: string
): Promise<boolean> {
  // Проверяет минимальную разность между order
  // Если разность < REINDEX_THRESHOLD (0.01) - нужна реиндексация
}
```

#### reindexDescriptions()
```typescript
async reindexDescriptions(
  local_product_id?: string, 
  local_service_id?: string
): Promise<void> {
  // Переиндексирует все описания с шагом 1.0
  // Используется когда Float значения становятся слишком близкими
}
```

### Интеграция в update() метод:
```typescript
async update(id: string, data: UpdateLocalItemDescriptionDto, file?: Express.Multer.File) {
  // Обычная логика обновления...
  
  // Обработка изменения порядка
  let finalOrder = existingDescription.order;
  if (data.order !== undefined && data.order !== existingDescription.order) {
    finalOrder = await this.calculateNewOrderForUpdate(
      id, data.order, local_product_id, local_service_id
    );
  }
  
  // Обновление с новым порядком
  const updated = await this.prisma.update({ data: { ...data, order: finalOrder } });
  
  // Автоматическая реиндексация при необходимости
  if (data.order !== undefined) {
    const needsReindexing = await this.checkNeedsReindexing(...);
    if (needsReindexing) {
      await this.reindexDescriptions(...);
      return this.findOne(id); // Возвращаем обновленные данные
    }
  }
  
  return updated;
}
```

### API для реиндексации:
```typescript
// Эндпоинт для принудительной реиндексации
POST /api/local-item-descriptions/reindex
Body: { 
  local_product_id?: string, 
  local_service_id?: string 
}
```

### Константы:
```typescript
private readonly ORDER_PRECISION_THRESHOLD = 0.00001; // Минимальная разница
private readonly REINDEX_THRESHOLD = 0.01; // Порог реиндексации
```

### Принципы работы:
1. **Обновление через PUT**: передаем желаемый order в UpdateDto
2. **Автоматический расчет**: система сама вычисляет оптимальную Float позицию
3. **Умная вставка**: между элементами, в начало или конец списка
4. **Автореиндексация**: при сближении значений автоматически перенумеровывает
5. **Изоляция**: каждый local_product_id/local_service_id имеет свою нумерацию

### Преимущества Float-порядка:
- ✅ Минимальные обновления БД (только 1 запись)
- ✅ Быстрая вставка между элементами
- ✅ Автоматическое управление коллизиями
- ✅ Простота использования через обычный PUT запрос

## 🎯 FRONTEND: DRAG-AND-DROP СИСТЕМА ДЛЯ ОПИСАНИЙ

### Архитектура компонентов:
```
local-item-descriptions/
├── LocalItemDescriptions.tsx (основной компонент с переключателем)
├── DraggableLocalItemDescriptions.tsx (новый drag-and-drop компонент)
├── DraggableDescriptionCard/ (перетаскиваемые карточки)
│   ├── DraggableDescriptionCard.tsx
│   └── DraggableDescriptionCard.module.scss
└── DraggableLocalItemDescriptions.module.scss
```

### Ключевые особенности:

#### 🎮 DraggableLocalItemDescriptions
- **Горизонтальная прокрутка**: карточки расположены горизонтально
- **dnd-kit интеграция**: современная библиотека для drag-and-drop
- **Автоматическое обновление порядка**: использует Float-систему Backend
- **Оптимистичные обновления**: UI реагирует мгновенно
- **Индикатор загрузки**: показывает процесс обновления

#### 🃏 DraggableDescriptionCard
- **Компактный дизайн**: оптимизирован для горизонтального расположения
- **Drag handle**: специальная область для перетаскивания (GripVertical)
- **Отображение порядка**: показывает текущий Float order (#1.5)
- **Превью контента**: сокращенная версия для разных типов
- **Встроенные действия**: редактирование и удаление

### Технические детали:

#### Используемые библиотеки:
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

#### Интеграция с Backend Float-системой:
```typescript
// Вычисление target_order на основе позиции
let target_order: number;
if (over_index === 0) {
  target_order = reordered_items[1]?.order - 1 || 1;
} else if (over_index === length - 1) {
  target_order = reordered_items[over_index - 1]?.order + 1;
} else {
  const prev = reordered_items[over_index - 1]?.order || 0;
  const next = reordered_items[over_index + 1]?.order || prev + 2;
  target_order = (prev + next) / 2;
}

// Прямой API вызов для обновления
await LocalItemDescriptionsApi.update(id, { order: target_order });
```

### Преимущества новой системы:
- ✅ **Интуитивный UX**: перетаскивание карточек мышью/пальцем
- ✅ **Визуальная обратная связь**: анимации и состояния перетаскивания
- ✅ **Мобильная поддержка**: touch-события с правильными задержками
- ✅ **Производительность**: минимальные re-renders, оптимистичные обновления
- ✅ **Совместимость**: работает с существующей Float-системой Backend 