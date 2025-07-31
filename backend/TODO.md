# TODO: Backend Max Beta - Проблемы и задачи

---

## ✅ ИСПРАВЛЕННЫЕ ПРОБЛЕМЫ

### 1. Несоответствие подсчета товаров в категориях
**Дата исправления:** 2025-01-05
**Проблема:** Родительская категория "Логистическое оборудование" показывала 10 товаров, но дочерние категории показывали 0 товаров каждая.
**Решение:** 
- Выявлено, что товары находились в родительской категории, но должны были быть распределены по дочерним категориям
- Перемещены товары в правильные категории:
  - Паллеты и тележки → "Складские тележки" (4 товара)
  - Весы → "Весовое оборудование" (1 товар)
  - Стеллаж → "Стеллажи и полки" (1 товар)
- Рекурсивный подсчет теперь работает правильно: родительская категория показывает общее количество товаров включая дочерние

### 2. Проблемы с импортом argon2 и типизацией
**Дата исправления:** 2025-01-09
**Проблема:** 
- Ошибки линтера в JWT стратегии из-за неправильной типизации
- Ошибка сидирования базы данных: "Cannot read properties of undefined (reading 'hash')"
- Проблемы с импортом argon2 в TypeScript

**Решение:**
- Установлены типы для passport-jwt: `npm install --save-dev @types/passport-jwt`
- Исправлен импорт argon2 во всех файлах: `import * as argon2 from 'argon2';`
- Добавлена правильная типизация Request с cookies в JWT стратегии
- Исправлена функция извлечения токена из cookies (возвращает `string | null` вместо `string | undefined`)
- Обновлены паттерны типизации в INSTRUCTIONS.md

---

## 🚨 КРИТИЧЕСКИЕ ПРОБЛЕМЫ

### 1. Русские сообщения ошибок

#### FilesService
**Файл:** `backend/src/files/files.service.ts`
**Проблемы:**
```typescript
// Строка 27:
throw new Error('Недопустимый формат файла. Разрешены только JPEG, PNG и WebP');

// Строка 28:
throw new Error('Размер файла не должен превышать 5 МБ');
```

#### Local Item Descriptions CrudService
**Файл:** `backend/src/shared-section/local-item-descriptions/services/crud.service.ts`
**Проблемы:**
```typescript
// Строка 41:
throw new BadRequestException('Необходимо указать либо local_product_id, либо local_service_id');

// Строка 42:
throw new BadRequestException('Нельзя указывать одновременно local_product_id и local_service_id');

// Строка 47:
throw new BadRequestException('Для типа IMAGE необходимо загрузить файл изображения или указать URL');

// Строка 50:
throw new BadRequestException('Для типа TEXT необходимо указать content');
```

### 2. Русские console.log

#### Main.ts
**Файл:** `backend/src/main.ts`
```typescript
// Строка 49:
console.log(`Приложение запущено на порту ${port}`);

// Строка 50:
console.log(`Статические файлы доступны по адресу http://localhost:${port}/static/`);
```

#### Seed файлы
**Файлы:**
- `backend/prisma/seed.ts`
- `backend/prisma/seeds/locales.seed.ts`
- `backend/prisma/seeds/categories.seed.ts`
- `backend/prisma/seeds/localized-data.seed.ts`

**Примеры проблем:**
```typescript
console.log('🌱 Начинаю заполнение базы данных...');
console.log('🎉 Заполнение базы данных завершено успешно!');
console.log('🌍 Начинаю создание локализаций...');
console.log(`⚠️  Локализация ${locale_data.name} уже существует, пропускаю...`);
console.log(`✅ Создана локализация: ${created_locale.name}`);
```

#### Redis Module
**Файл:** `backend/libs/redis/src/redis.module.ts`
```typescript
// Строка 28:
console.log('✅ Redis подключен успешно');

// Строка 36:
console.log('🔄 Переподключение к Redis...');
```

### 3. Русские комментарии JSDoc

#### API Documentation
**Проблемы в:**
- `backend/src/shared-section/local-item-descriptions/services/crud.service.ts`
- `backend/src/hooks/admin/shared/api/item-images.api.ts`
- `backend/src/hooks/admin/shared/api/local-item-descriptions.api.ts`

**Примеры:**
```typescript
/**
 * @param data - данные для создания или обновления описания объекта
 * @param file - файл изображения
 * @param existingDescription - существующее описание объекта
 */

/**
 * @param filters - Фильтры для получения изображений товаров и услуг
 */

/**
 * @param id - ID изображения товара или услуги
 */
```

### 4. Ошибки типизации в List Services

#### Local Products List Service
**Файл:** `backend/src/products-section/local-products/services/list.service.ts`
**Проблемы:**
```typescript
// Строка 53: Несоответствие типов в findWithPagination
await this.prisma.findWithPagination<ExtendedLocalProduct>(
  this.prisma.localProduct,  // Несоответствие типов
  queryOptions,
  {
    local_item_descriptions: true,
    product: true,
    locale: true,
  }
);

// Строка 65: Отсутствующие свойства в типе T
item.discount_price && item.discount_price < item.price
// T не содержит discount_price и price
```

#### Local Services List Service
**Файл:** `backend/src/services-section/local-services/services/list.service.ts`
**Проблемы:**
```typescript
// Строка 47: Аналогичная проблема с типами
await this.prisma.findWithPagination<ExtendedLocalService>(
  this.prisma.localService,  // Несоответствие типов
  queryOptions,
  {
    local_item_descriptions: true,
    service: true,
    locale: true,
  }
);
```

**Необходимо:**
- Исправить типизацию в PrismaService.findWithPagination
- Обновить типы ExtendedLocalProduct и ExtendedLocalService
- Добавить правильные интерфейсы для работы с расширенными типами

## ⚠️ ВАЖНЫЕ УЛУЧШЕНИЯ

### 1. Централизация сообщений ошибок

**Создать:** `backend/src/common/constants/error-messages.ts`
```typescript
export const ERROR_MESSAGES = {
  FILES: {
    INVALID_FORMAT: 'Invalid file format. Only JPEG, PNG and WebP are allowed',
    FILE_TOO_LARGE: (size: number) => `File size should not exceed ${size} MB`,
    INVALID_MODEL: (model: string) => `Invalid model: ${model}`
  },
  LOCAL_ITEM_DESCRIPTIONS: {
    MISSING_ITEM_ID: 'Either local_product_id or local_service_id must be specified',
    BOTH_ITEM_IDS: 'Cannot specify both local_product_id and local_service_id',
    IMAGE_TYPE_MISSING_FILE: 'For IMAGE type, image file or URL must be provided',
    TEXT_TYPE_MISSING_CONTENT: 'For TEXT type, content must be provided'
  }
} as const;
```

### 2. Улучшение логирования

**Создать:** `backend/src/common/services/logger.service.ts`
```typescript
@Injectable()
export class LoggerService {
  log(message: string, context?: string) {
    console.log(`[${context || 'App'}] ${message}`);
  }
  
  error(message: string, trace?: string, context?: string) {
    console.error(`[${context || 'App'}] ${message}`, trace);
  }
  
  warn(message: string, context?: string) {
    console.warn(`[${context || 'App'}] ${message}`);
  }
}
```

### 3. Валидация и типизация

**Усилить валидацию в DTO:**
```typescript
export class CreateLocalItemDescriptionDto {
  @IsUUID()
  @ValidateIf((o) => !o.local_service_id)
  local_product_id?: string;

  @IsUUID()
  @ValidateIf((o) => !o.local_product_id)
  local_service_id?: string;

  @IsEnum(LocalItemDescriptionType)
  type: LocalItemDescriptionType;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @ValidateIf((o) => o.type === 'TEXT')
  @IsString()
  @IsNotEmpty()
  content?: string;
}
```

## 📝 ЖЕЛАТЕЛЬНЫЕ УЛУЧШЕНИЯ

### 1. Swagger документация
**Добавить в каждый контроллер:**
```typescript
@ApiTags('Local Item Descriptions')
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 404, description: 'Not Found' })
export class LocalItemDescriptionsController {
  @ApiOperation({ summary: 'Create local item description' })
  @ApiBody({ type: CreateLocalItemDescriptionDto })
  async createLocalItemDescription() {}
}
```

### 2. Оптимизация запросов
**Добавить include в запросы:**
```typescript
async findOne(id: string): Promise<LocalItemDescription> {
  return await this.prisma.localItemDescription.findUnique({
    where: { id },
    include: {
      local_product: {
        include: {
          product: true,
          locale: true
        }
      },
      local_service: {
        include: {
          service: true,
          locale: true
        }
      }
    }
  });
}
```

### 3. Caching стратегия
**Добавить кэширование:**
```typescript
@Injectable()
export class CacheService {
  @Cacheable({ key: 'categories-tree', ttl: 600 })
  async getCategoriesTree() {
    // Implementation
  }
}
```

## 🎯 ПЛАН ИСПРАВЛЕНИЙ

### Этап 1: Интернационализация ошибок и логов
1. Создать constants для error messages
2. Заменить русские throw new Error на константы
3. Перевести console.log на английский
4. Обновить JSDoc комментарии

### Этап 2: Качество кода
1. Добавить полноценную Swagger документацию
2. Улучшить валидацию DTO
3. Оптимизировать Prisma запросы
4. Добавить unit тесты

### Этап 3: Performance и масштабирование
1. Внедрить Redis кэширование
2. Оптимизировать N+1 запросы
3. Добавить пагинацию для больших списков
4. Настроить rate limiting

## 📋 СТАТИСТИКА ПРОБЛЕМ

- **✅ Критичных архитектурных проблем:** РЕШЕНО
- **🔥 Русские ошибки:** ~15 файлов
- **⚠️ Console.log:** ~20 мест
- **📝 JSDoc:** ~10 файлов
- **Примерное время исправления:** 4-6 часов

## 🎯 СЛЕДУЮЩИЕ ШАГИ

1. **КРИТИЧНО:** Интернационализация error messages
2. Перевод console.log на английский
3. Обновление JSDoc документации
4. Добавление полной Swagger схемы
5. Улучшение валидации DTO
6. Оптимизация Prisma запросов 