# ИНСТРУКЦИЯ: Проект Max Beta - Логистическая система

## 🏗️ АРХИТЕКТУРА ПРОЕКТА

### Структура проекта:
```
max_beta/
├── frontend/ (Next.js 15 + TypeScript)
│   ├── src/
│   │   ├── app/ (App Router)
│   │   ├── components/ (admin/, public/)
│   │   ├── hooks/ (admin/, public/, filters/, useAuth/, useToast/)
│   │   ├── lib/ 
│   │   │   ├── intl/ (переводы)
│   │   │   ├── api/ (axios, пути)
│   │   │   └── services/ (🆕 НОВАЯ АРХИТЕКТУРА сервисов /api, /types (типы брать отсюда))
│   │   ├── providers/ (ToastProvider, AccountContext)
│   │   └── store/ (useUIStore)
│   ├── prisma/schema.prisma (Frontend copy)
│   └── public/
└── backend/ (NestJS + Prisma + PostgreSQL)
    ├── src/ (modules по доменам)
    ├── prisma/schema.prisma (Main)
    └── libs/redis/

```

### Структура типов:
```
frontend/src/lib/types/
├── index.ts (центральный экспорт)
├── base.ts (BaseListResult, BaseFilterDto, пагинация)
├── auth.ts (LoginDto, RegisterDto, User, UserRole)
├── locales.ts (Locale, Session типы)
├── categories.ts (Category, LocalCategory)
├── products.ts (Product, LocalProduct, Extended)
├── services.ts (Service, LocalService, Extended)
└── shared.ts (ItemImage, LocalItemDescription)
```

### Паттерн импорта типов:
```tsx
// ✅ ПРАВИЛЬНО:
import { 
  User, 
  CreateProductDto, 
  BaseListResult,
  ProductFiltersDto 
} from '@lib/types';

```

### Form data типы для файлов:
```tsx
// Типы с File объектами для форм:
interface CreateItemImageFormData {
  image?: string;
  product_id?: string;
  service_id?: string;
  file?: File; // 🆕 для загрузки файлов
}

interface CreateLocalItemDescriptionFormData {
  item_id: string;
  locale_id: string;
  title: string;
  description?: string;
  file?: File; // 🆕 для загрузки файлов
}
```

## 🗃️ БАЗА ДАННЫХ (Prisma Schema)

### Основные модели:
- **User** - Пользователи (роли: USER, ADMIN, MODERATOR)
- **Locale** - Локализации (us, gb, ru, ua, pl)
- **Category** - Категории (PRODUCT/SERVICE + иерархия)
- **LocalCategory** - Переводы категорий
- **Product/Service** - Товары/услуги (базовые на английском)
- **LocalProduct/LocalService** - Локализованные версии
- **ItemImage** - Изображения товаров/услуг
- **LocalItemDescription** - Описания (TEXT/IMAGE/VIDEO/LINK)
- **Session** - Сессии пользователей

### Связи:
- Category -> LocalCategory (1:N)
- Product -> LocalProduct (1:N)
- Service -> LocalService (1:N)
- Locale -> Local* (1:N)

### Паттерн использования переводов:
```tsx
const tCategories = useTranslations('admin.categories');
const tCommon = useTranslations('common');
```

## 🔍 СИСТЕМА ВАЛИДАЦИИ ПЕРЕВОДОВ (Создано 01.01.2025)

### Компоненты валидации:

## 🎬 АНИМИРОВАННЫЕ КОМПОНЕНТЫ (Создано 01.01.2025)

### AnimatedSection - Серверный компонент анимаций:

#### Особенности:
- ✅ **Серверный рендеринг** - нет React хуков
- ✅ **Нативные CSS анимации** - максимальная производительность  
- ✅ **Intersection Observer API** - оптимизированное отслеживание
- ✅ **CSS-only анимации** - без JavaScript для максимальной производительности
- ✅ **Поддержка prefers-reduced-motion** - доступность

#### Паттерн использования:
```tsx
// Базовое использование (transition-based)
<AnimatedSection animation="fadeInUp" delay={200}>
  <h2>Заголовок секции</h2>
</AnimatedSection>

// CSS-only анимации (максимальная производительность)
<AnimatedSection 
  animation="fadeInUp" 
  delay={200} 
  duration={0.8}
  useCssOnly={true}
>
  <h2>Заголовок секции</h2>
</AnimatedSection>

// Staggered анимации для дочерних элементов
<AnimatedSection animation="fadeInUp">
  <div className="stagger-child">Элемент 1</div>
  <div className="stagger-child">Элемент 2</div>
  <div className="stagger-child">Элемент 3</div>
</AnimatedSection>
```

#### Архитектура:
```
src/
├── components/public/common/for/section/AnimatedSection/
│   ├── AnimatedSection.tsx (серверный компонент)
│   ├── AnimatedSection.module.scss (стили + @keyframes)
│   └── README.md (документация)
├── components/common/AnimationInitializer.tsx (клиентский инициализатор)
└── lib/animation-observer.ts (глобальный Intersection Observer)
```

#### Типы анимаций:
- `fadeInUp` - появление снизу вверх
- `fadeInDown` - появление сверху вниз  
- `fadeInLeft` - появление слева направо
- `fadeInRight` - появление справа налево
- `fadeIn` - простое появление
- `scaleIn` - появление с масштабированием

#### Пропсы:
```tsx
interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';
  delay?: number; // миллисекунды
  duration?: number; // секунды
  className?: string;
  enableAnimations?: boolean;
  useCssOnly?: boolean; // CSS-only анимации
}
```

#### Производительность:
- **CSS-only**: максимальная производительность, автоматический запуск
- **Transition-based**: больше контроля, точное отслеживание через Intersection Observer
- **Глобальный observer**: инициализируется один раз, отключается после срабатывания
```
components/admin/pages/dashboard/
└── TranslationStatus/ (компонент статуса переводов на dashboard)
    ├── TranslationStatus.tsx
    ├── TranslationStatus.module.scss
    └── index.ts
```

### API для валидации:
```
lib/api/services/
├── api/translations.api.ts (новые методы валидации)
├── types/translations.types.ts (типы ValidationResult, GlobalValidationStatus)
└── hooks/admin/translations/
    ├── useValidation.ts (хук для валидации)
    └── index.ts (экспорт)
```

### Возможности системы:
- **Статус валидации**: Отображение состояния всех файлов переводов
- **Автоматическая синхронизация**: Кнопка синхронизации всех файлов
- **Восстановление файлов**: Восстановление отдельных поврежденных файлов
- **Детальная диагностика**: Показ отсутствующих ключей и пустых значений
- **Обновление в реальном времени**: Автообновление статуса каждые 30 секунд

### Интеграция с Dashboard:
- Компонент TranslationStatus добавлен на главную страницу админки
- Отображает проблемы с переводами с возможностью исправления
- Показывает общую статистику и статус шаблонных файлов

### API методы валидации:
```typescript
TranslationsApi.getValidationStatus() // получение статуса
TranslationsApi.syncAllTranslations() // синхронизация всех файлов
TranslationsApi.createLocaleFiles(locale) // создание файлов для локали
TranslationsApi.repairTranslationFile(locale, module) // восстановление файла
```

## 🎯 КОМПОНЕНТНАЯ АРХИТЕКТУРА

### Admin компоненты:
```
components/admin/
├── common/ (переиспользуемые)
│   ├── Modal/Forms/ (модальные формы)
│   ├── Form/FormSections/ (секции форм)
│   ├── ListPage/ (списки с фильтрами)
│   └── SecondaryLayout/ (боковая панель)
└── pages/ (страницы админки)
    ├── manage/ (управление сущностями)
    │   ├── items/ (🆕 универсальные компоненты)
    │   │   ├── root/Items.tsx
    │   │   └── item/Layout.tsx, Info.tsx, Images/
    │   ├── local-items/ (🆕 локализованные компоненты)
    │   │   └── root/LocalItems.tsx
    │   ├── products/, services/, categories/
    │   └── local-products/, local-services/, local-categories/
    └── locales/ (по локалям)
```

### Public компоненты:
```
components/public/
├── common/ (Header, Footer, LanguageSelector)
└── pages/ (страницы сайта)
    ├── root/
    ├── about/
    ├── categories/
    └── auth/
```

### Hooks архитектура:
```
hooks/
├── admin/ (по доменам: categories, products, services, locales, users)
│   └── [domain]/
│       ├── use[Domain].ts
│       └── use[Domain]Filters.ts
├── public/ (categories, locales)
├── filters/ (общие фильтры)
├── useAuth/ (аутентификация)
└── useToast/ (уведомления)
```


## 🚨 НАЙДЕННЫЕ ПРОБЛЕМЫ И ХАРДКОД

### 1. КРИТИЧЕСКИЕ ПРОБЛЕМЫ С ПЕРЕВОДАМИ:

#### ContentTypeSection.tsx - ПОЛНОСТЬЮ ХАРДКОД:
```tsx
// ПРОБЛЕМА: Все тексты хардкод
label="Тип контента"
placeholder="Выберите тип контента"
label="Заголовок"
hint="Опционально"
label="Текст описания"
placeholder="Введите текст описания"
label="Изображение"

// РЕШЕНИЕ: Добавить в admin.common:
const t = useTranslations('admin.common.content_type');
```

#### FormSections с хардкодом:
- **NameSection.tsx**: `'Название'`, `'Введите название'`, `'обязательно'`
- **DescriptionSection.tsx**: `'Описание'`, `'Введите описание'`
- **TextareaField.tsx**: `'Поле ${label} обязательно'`
- **InputField.tsx**: `'Поле ${label} обязательно'`

#### Admin Pages с хардкодом:
- **users/root/Page.tsx**: `title="Управление пользователями"`
- **SecondaryLayout configs**: `'Управление услугой'`, `'Информация'`, etc.

### 2. ARIA-LABELS И ACCESSIBILITY:

#### Header.tsx:
```tsx
aria-label="Меню" // ХАРДКОД
```

#### LanguageSelector.tsx:
```tsx
aria-label="Выбрать язык" // ХАРДКОД
```

#### Pagination.tsx:
```tsx
aria-label="Предыдущая страница" // ХАРДКОД
aria-label="Следующая страница" // ХАРДКОД
```

### Компонентные паттерны:
```tsx
// Modal формы:
<BaseFormModal
  title={t('form.create_title')}
  saveButtonText={t('form.create_button')}
  loadingText={t('creating')}
>
  <NameSection
    label={t('form.name_label')}
    placeholder={t('form.name_placeholder')}
  />
</BaseFormModal>
```

### 🆕 Импорт типов:
```tsx
// ✅ НОВЫЙ ПАТТЕРН:
import type { 
  User, 
  CreateProductDto,
  BaseListResult,
  ProductFiltersDto 
} from '@lib/types';

// Для type-only экспортов:
export type { CreateItemImageFormData, UpdateItemImageFormData } from '@lib/types';
```

## 🔧 ИНСТРУМЕНТЫ И НАСТРОЙКИ

### TypeScript конфигурация:
```json
// tsconfig.json - paths:
{
  "paths": {
    "@/*": ["./src/*"],
    "@lib/*": ["./src/lib/*"],
    "@hooks/*": ["./src/hooks/*"]
    // ❌ УДАЛЕН: "@backend/*": ["../backend/*"]
  }
}
```

#### 🏗️ Layout компоненты:
```tsx
// local-products/local-product/Layout.tsx
interface LayoutProps {
  local_product_id: string;
  children: React.ReactNode;
}

export const Layout = ({ local_product_id, children }: LayoutProps) => {
  const { data: local_product, isLoading } = useLocalProducts().useFind(local_product_id);
  const delete_mutation = useLocalProducts().useDelete(local_product_id);
  
  return (
    <SecondaryLayout
      item_id={local_product_id}
      title={local_product.name}
      sidebar_config={localProductSidebarConfig}
      delete_button={{
        title: t('form.title'),
        onDelete: handleDeleteLocalProduct,
        confirm_message: t('confirm.delete')
      }}
    >
      {children}
    </SecondaryLayout>
  );
};
```

#### 📋 Info компоненты:
```tsx
// Паттерн для Info компонентов local items:
export const Info = ({ local_item_id }: { local_item_id: string }) => {
  const { data: local_item, isLoading } = useLocalItems().useFind(local_item_id);
  const update_mutation = useLocalItems().useUpdate(local_item_id);
  
  return (
    <InfoDisplay
      title={t('local_item_info')}
      fields={fields}
      onEdit={() => setIsModalOpen(true)}
    >
      <LocalItemFormModal
        isOpen={is_modal_open}
        onSubmit={handleUpdate}
        initial_data={local_item}
      />
    </InfoDisplay>
  );
};
```

### 🎯 Структура экспортов:
```
local-products/
├── root/LocalProducts.tsx (списки)
├── local-product/
│   ├── Layout.tsx (главный layout)
│   ├── Info.tsx (информация)
│   ├── LocalItemDescriptions.tsx (описания)
│   └── index.ts (экспорты)
└── index.ts (главный экспорт)

local-services/
├── root/LocalServices.tsx
├── local-service/
│   ├── Layout.tsx
│   ├── Info.tsx  
│   ├── LocalItemDescriptions.tsx
│   └── index.ts
└── index.ts
```

### 🔧 Sidebar конфигурации:
```tsx
// В configs.ts:
export const localProductSidebarConfig: SecondarySidebarConfig = {
  title: 'admin.sidebar.local_product_management',
  placeholder_key: 'local_product_id',
  nav_items: [
    {
      id: 'info',
      label: 'admin.sidebar.information',
      icon: FileText,
      path: '/admin/local-products/[local_product_id]'
    },
    {
      id: 'descriptions',
      label: 'admin.sidebar.descriptions',
      icon: ScrollText,
      path: '/admin/local-products/[local_product_id]/descriptions'
    }
  ] as LocalItemNavItem[]
};
```

#### 🔧 Layout и Info для товаров:
```tsx
// products/product/Layout.tsx - индивидуальная страница товара
export const Layout = ({ product_id, children }: LayoutProps) => {
  const { data: product } = useProducts().useFind(product_id);
  const delete_mutation = useProducts().useDelete(product_id);
  
  return (
    <SecondaryLayout
      item_id={product_id}
      title={product.name}
      sidebar_config={productSidebarConfig}
      delete_button={{
        title: t('delete_title'),
        onDelete: handleDeleteProduct
      }}
    >
      {children}
    </SecondaryLayout>
  );
};

// products/product/Info.tsx - информация о товаре с редактированием
export const Info = ({ product_id }: { product_id: string }) => {
  const { data: product } = useProducts().useFind(product_id);
  const update_mutation = useProducts().useUpdate(product_id);
  
  return (
    <InfoDisplay
      title={t('info.title')}
      image={product?.image}
      fields={fields}
      onEdit={() => setIsEditing(true)}
    >
      <ProductFormModal
        is_open={is_editing}
        onSubmit={handleSubmitForm}
        initial_data={initial_data}
      />
    </InfoDisplay>
  );
};
```

#### 🛠️ Services аналогично:
```tsx
// services/service/Layout.tsx и services/service/Info.tsx
// Идентичная структура с использованием useServices() хуков
// и serviceSidebarConfig конфигурации
```

### 📷 Images управление:

#### 🎨 Полноценное управление изображениями:
```tsx
// items/item/Images/Images.tsx - замена заглушки
export const Images = ({ item_id, type }: ImagesProps) => {
  const filter_key = type === 'product' ? 'product_id' : 'service_id';
  const { data: images } = useItemImages().useGet({
    [filter_key]: item_id
  });
  
  return (
    <AdminPage
      title={t('images.title')}
      onCreateClick={handleCreateClick}
    >
      <List
        items={images?.items || []}
        renderItem={(item) => (
          <ItemImageCard item={item} type={type} />
        )}
      />
      
      <ItemImageFormModal
        is_open={is_modal_open}
        type={type}
        item_id={item_id}
      />
    </AdminPage>
  );
};

// items/item/Images/ItemImageCard.tsx - карточка изображения
export const ItemImageCard = ({ item, type }: ItemImageCardProps) => {
  const delete_mutation = useItemImages().useDelete(item.id);
  const update_mutation = useItemImages().useUpdate(item.id);
  
  return (
    <Card
      title={t('images.card_title')}
      image={getImageUrl(item.image)}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
```

### 📁 Архитектура экспортов:
```
products/
├── root/Products.tsx (списки всех товаров)
├── product/
│   ├── Layout.tsx (layout отдельного товара)
│   ├── Info.tsx (информация о товаре)
│   ├── LocalProducts.tsx (локализации товара)  
│   └── index.ts
└── index.ts

services/
├── root/Services.tsx
├── service/
│   ├── Layout.tsx 
│   ├── Info.tsx
│   ├── LocalServices.tsx
│   └── index.ts
└── index.ts

items/item/Images/
├── Images.tsx (управление изображениями)
├── ItemImageCard.tsx (карточка изображения)
└── index.ts
```

### ⚠️ КРИТИЧНО: НИКОГДА НЕ ИСПОЛЬЗУЙТЕ `<img />` ТЕГИ!

**Всегда используйте компонент `Image` из `@/components/Image`**

### 🎯 Возможности компонента Image:
```tsx
import { Image } from '@/components/Image';

// Базовое использование:
<Image 
  src="/path/to/image.jpg" 
  alt="Описание изображения" 
/>

// Полный набор опций:
<Image
  src={product.image}                    // URL изображения или null
  static_import={avatarImage}            // Статический импорт
  alt="Изображение товара"              // Alt текст (обязательно)
  width={300}                           // Ширина (по умолчанию: 150)
  height={200}                          // Высота (по умолчанию: 150)
  priority={true}                       // Приоритетная загрузка
  fallback="/default-product.png"       // Fallback изображение
  fill={true}                          // Заполнить контейнер
  quality={90}                         // Качество (по умолчанию: 80)
  className={styles.product_image}      // CSS класс
/>
```

### 🔧 Особенности:
- **Автоматический fallback:** При ошибке загрузки показывает fallback изображение
- **Оптимизация Next.js:** Использует Next.js Image для оптимизации
- **Обработка URL:** Автоматически обрабатывает пути через `getImageUrl()`
- **Типизация:** Полная TypeScript типизация
- **Responsive:** Адаптивные размеры по умолчанию

### 📝 Паттерны использования:

#### В админке для превью:
```tsx
<Image
  src={item.image}
  alt={tCommon('image_preview')}
  width={150}
  height={150}
  className={styles.preview_image}
/>
```

#### Для карточек товаров/услуг:
```tsx
<Image
  src={product.image}
  alt={product.name}
  width={300}
  height={200}
  priority={is_first_item}
/>
```

#### Для аватаров пользователей:
```tsx
<Image
  src={user.avatar}
  alt={`${user.name} avatar`}
  width={64}
  height={64}
  fallback="/default-avatar.png"
  className={styles.user_avatar}
/>
```

# Инструкции по разработке

## Структура компонентов

### Страницы
- Страницы находятся в `src/app/[locale]`
- Для админ панели используется префикс `/admin`
- Для публичной части сайта используется префикс `/(app)`
- Каждая страница должна иметь свой компонент в `src/components/admin/pages` или `src/components/public/pages`

### Компоненты
- Все компоненты должны быть в папке `src/components`
- Компоненты админ панели в `admin/`
- Компоненты публичной части в `public/`
- Общие компоненты в `common/`
- Каждый компонент должен иметь свою папку с файлами:
  - `index.ts` - для экспорта
  - `ComponentName.tsx` - основной файл компонента
  - `ComponentName.module.scss` - стили
  - `types.ts` - типы (если нужно)
  - `utils.ts` - утилиты (если нужно)
  - `constants.ts` - константы (если нужно)

### Стили
- Используем CSS модули (`.module.scss`)
- Используем BEM-подобную структуру с `&_` для вложенности
- Используем переменные из `:root` src/globals.css для цветов и размеров
- **ВАЖНО: Новый синтаксис Sass** - CSS свойства после вложенных правил должны быть обернуты в `& {}`

#### Правила написания SCSS:
```scss
// ❌ НЕПРАВИЛЬНО (вызывает предупреждения):
.component {
  @include mix.section;
  background-color: vars.$bg-color; // CSS свойство после миксина
  
  &__item {
    @include mix.card;
    padding: vars.$spacing-lg; // CSS свойство после миксина
  }
}

// ✅ ПРАВИЛЬНО:
.component {
  @include mix.section;
  
  & {
    background-color: vars.$bg-color;
  }
  
  &__item {
    @include mix.card;
    
    & {
      padding: vars.$spacing-lg;
    }
  }
}
```

#### Импорт модулей:
```scss
@use '../../../../styles/variables' as vars;
@use '../../../../styles/mixins' as mix;
@use 'sass:math'; // Для математических операций
```

#### Деление в Sass:
```scss
// ❌ УСТАРЕВШЕЕ:
@include mix.aspect-ratio(16/9);

// ✅ СОВРЕМЕННОЕ:
@include mix.aspect-ratio(math.div(16, 9));
```

### Хуки
- Хуки находятся в `src/hooks`
- Для админ панели в `admin/`
- Общие хуки в корне
- Каждый хук должен иметь свою папку с файлами:
  - `index.ts` - для экспорта
  - `useHookName.ts` - основной файл

### Переводы
- Переводы находятся в `src/lib/intl/locales`
- Разделены по модулям (admin, public)
- Используем `useTranslations` из `next-intl`
- Ключи должны быть структурированы по разделам
- Пример структуры:
```json
{
  "admin": {
    "pages": {
      "users": {
        "title": "Пользователи",
        "fields": {
          "name": "Имя"
        }
      }
    }
  }
}
```

### API
- API клиент находится в `src/lib/services/api`
- Используем axios
- Типы запросов и ответов в `src/lib/services/types/`
- Сервисы разделены по модулям

### Формы
- Используем react-hook-form
- Валидация через yup
- Общие компоненты форм в `components/common/Form`
- Модальные формы в `components/common/Modal/Forms`

### Модальные окна
- Используем компонент Modal из `components/common/Modal`
- Формы для модальных окон в `Forms/`
- Подтверждения в `Confirm/`

### Таблицы и списки
- Используем компоненты из `components/common/ListPage`
- Фильтры в `Filters/`
- Карточки элементов в папке компонента

### Навигация
- Используем Next.js App Router
- Конфигурация в `src/lib/intl/pathnames`
- Middleware для локализации
- Guard для проверки прав доступа

### Состояние
- Используем Zustand для глобального состояния
- Хуки для работы с API
- Контекст для специфичного состояния (например, аккаунт)

### Утилиты
- Общие утилиты в `src/lib/utils`
- Специфичные утилиты в папках компонентов/хуков


#### Правила для query keys:
Всегда используйте централизованные ключи** из `QUERY_KEYS`

#### Как избежать в будущем:
1. **Проверяйте соответствие** query key и сущности
2. **Используйте только централизованные ключи** из QUERY_KEYS
3. **Тестируйте пагинацию** после изменений в хуках
4. **Проверяйте инвалидацию** - она должна соответствовать сущности

# Инструкции для Frontend

## Паттерны компонентов авторизации

### Структура компонентов авторизации
```typescript
// Общие компоненты в frontend/src/components/public/pages/auth/common/
- AuthLayout.tsx      // Общий layout для страниц авторизации
- AuthForm.tsx        // Компонент формы
- AuthField.tsx       // Компонент поля ввода
- AuthButton.tsx      // Компонент кнопки
```

### Пример использования AuthLayout
```typescript
import { AuthLayout } from '../common';

export function MyAuthPage() {
  return (
    <AuthLayout title="Заголовок страницы" subtitle="Подзаголовок (опционально)">
      {/* Содержимое страницы */}
    </AuthLayout>
  );
}
```

### Пример использования AuthForm
```typescript
import { AuthForm } from '../common';

const footer = (
  <p>
    Текст{' '}
    <Link href="/path" style={{ color: 'var(--primary)' }}>
      Ссылка
    </Link>
  </p>
);

<AuthForm 
  onSubmit={handleSubmit} 
  error={error} 
  footer={footer}
>
  {/* Поля формы */}
</AuthForm>
```

### Пример использования AuthField
```typescript
import { AuthField } from '../common';

<AuthField
  id="email"
  type="email"
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="example@domain.com"
  required
  autoComplete="email"
  error={fieldError} // Опционально
/>
```

### Пример использования AuthButton
```typescript
import { AuthButton } from '../common';

<AuthButton
  type="submit"
  loading={isLoading}
  loadingText="Отправка..."
  disabled={!isFormValid()}
  variant="primary" // или "secondary"
>
  Отправить
</AuthButton>
```

### Валидация полей
```typescript
const [validation_errors, setValidationErrors] = useState<{
  password?: string;
  email?: string;
}>({});

const validatePassword = (password: string): string | undefined => {
  if (password.length > 0 && password.length < 8) {
    return t('validation.password_length');
  }
  return undefined;
};

const handlePasswordChange = (value: string) => {
  setPassword(value);
  const error = validatePassword(value);
  setValidationErrors(prev => ({ ...prev, password: error }));
};
```

### Стили компонентов
- Все компоненты используют CSS переменные из `globals.css`
- Используется модульная система стилей `.module.scss`
- Анимации и переходы для улучшения UX
- Responsive дизайн для мобильных устройств

### Переводы
- Все тексты через `useTranslations()` hook
- Структура переводов: `public.pages.auth.login/register`
- Валидационные сообщения: `public.pages.auth.register.validation`

### Принципы дизайна
- Использование CSS переменных для цветов и размеров
- Gradient фоны для улучшения визуального восприятия
- Анимации загрузки и переходов
- Декоративные элементы для создания атмосферы
- Семантическая доступность (labels, autoComplete, etc.)

### Рекомендации
- Всегда используйте общие компоненты для консистентности
- Применяйте валидацию в реальном времени
- Используйте правильные autoComplete атрибуты
- Добавляйте loading состояния для лучшего UX
- Следуйте принципам responsive дизайна

## 🆕 СИСТЕМА РЕДАКТИРОВАНИЯ ПЕРЕВОДОВ (01.01.2025)

### Архитектура редактора переводов:
- **Backend API**: `TranslationsController` - эндпоинты для чтения/записи JSON файлов переводов
- **Frontend**: JSON редактор с визуальным интерфейсом для редактирования вложенной структуры
- **Модули**: admin, common, public - каждый редактируется отдельно
- **Локали**: RU, UA, PL, GB - символы локалей из базы данных

### Компоненты:
```tsx
// Основной редактор JSON структуры
<JsonEditor 
  data={translations} 
  onChange={handleChange} 
  readOnly={false} 
/>

// Редактор для конкретного модуля локали
<TranslationEditor 
  locale_symbol="RU" 
  module="admin" 
/>
```

### API эндпоинты:
```
GET /translations/:locale_symbol/:module
PUT /translations/:locale_symbol/:module
```

### Навигация:
- В сайдбаре локалей добавлены ссылки на редакторы каждого модуля
- Пути: `/admin/locales/[locale_id]/translations/{admin|common|public}`

### Безопасность:
- Автоматическое создание резервных копий при сохранении
- Валидация JSON структуры
- Права доступа только для ADMIN/MODERATOR

## 🆕 ОБНОВЛЕНИЕ СИСТЕМЫ СТИЛЕЙ (CLSX)

### Новый подход к импорту стилей:
Вместо системы импорта общих стилей в SCSS модулях с использованием `@import` и `@extend`, 
теперь мы используем прямой импорт стилей в компоненты и объединяем их с помощью функции `cn()`.

### Установка и настройка:
```bash
npm install --save clsx
```

### Утилита cn():
```tsx
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}
```

### Пример использования:
```tsx
// Компонент с импортом общих и специфичных стилей
import { cn } from '@/lib/utils';
import componentClasses from './Component.module.scss';
import sectionClasses from '../Section.module.scss';

export const MyComponent = () => {
  return (
    <div className={componentClasses.container}>
      <h1 className={cn(componentClasses.title, sectionClasses.section__title)}>
        Заголовок
      </h1>
      <p className={cn(componentClasses.description, sectionClasses.section__description)}>
        Описание компонента
      </p>
    </div>
  );
};
```

### Преимущества нового подхода:
1. **Прозрачность** - явное указание всех используемых стилей
2. **Гибкость** - возможность комбинировать классы из разных модулей
3. **Типобезопасность** - TypeScript поддержка для всех импортируемых стилей
4. **Читаемость** - понятная структура без скрытых зависимостей
5. **Производительность** - отсутствие дублирования стилей в CSS бандле

### Правила перехода:
1. Удаляем `@import` и `@extend` из SCSS модулей
2. Импортируем необходимые стили напрямую в компонент
3. Используем `cn()` для объединения классов
4. Комментируем удаленные стили в SCSS файлах для облегчения миграции

### Пример миграции стилей:
```scss
// СТАРЫЙ ПОДХОД
@import '../CommonStyles.module.scss';

.component {
  &__title {
    @extend .common__title;
    color: var(--primary);
  }
}

// НОВЫЙ ПОДХОД
.component {
  &__title {
    // Стили будут объединены через cn()
    color: var(--primary);
  }
}
```

### Примечания:
- Следует импортировать общие стили как `sectionClasses` или другие понятные имена
- При использовании нескольких классов для одного элемента всегда используйте `cn()`
- При объединении классов помещайте более специфичные стили после базовых
- Рекомендуется начинать с импорта собственных стилей, затем добавлять общие стили

### Google Maps Интеграция

#### Компонент GoogleMap
Переиспользуемый компонент для отображения карт Google Maps.

**Расположение:** `src/components/public/common/GoogleMap/`

**Пропсы:**
- `lat: number` - широта
- `lng: number` - долгота  
- `zoom?: number` - уровень масштабирования (по умолчанию 15)
- `height?: string` - высота карты (по умолчанию '400px')
- `className?: string` - дополнительные CSS классы
- `markerTitle?: string` - заголовок маркера
- `showDirectionsButton?: boolean` - показать кнопку маршрута
- `onDirectionsClick?: () => void` - обработчик клика по кнопке маршрута

**Пример использования:**
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

#### Настройка API ключа
1. Получите API ключ на https://developers.google.com/maps/documentation/javascript/get-api-key
2. Добавьте в `.env.local`:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

#### Координаты в переводах
Координаты офисов и других локаций хранятся в файлах переводов:
```json
{
  "pages": {
    "contacts": {
      "main_office": {
        "coordinates": {
          "lat": 55.7558,
          "lng": 37.6176
        }
      }
    }
  }
}
```

**Получение координат в компонентах:**
```tsx
const t = useTranslations('public.pages.contacts');
const coordinates = {
  lat: parseFloat(t('main_office.coordinates.lat')),
  lng: parseFloat(t('main_office.coordinates.lng'))
};
```

#### Стили
- Компонент использует модули SCSS с CSS переменными
- Адаптивный дизайн для мобильных устройств
- Поддержка светлой/темной темы через CSS переменные
- Анимации загрузки и hover эффекты

## 🚨 ПРЕДОТВРАЩЕНИЕ ПРОБЛЕМ С ГИДРАТАЦИЕЙ

### Основные причины ошибок гидратации:
1. **Клиентские проверки в компонентах:** Использование `typeof window !== 'undefined'` или `useState` для проверки клиентской стороны
2. **Различное содержимое на сервере и клиенте:** Переводы, даты, случайные значения
3. **Асинхронная загрузка данных:** Компоненты, которые полагаются на API
4. **Неправильное использование `dangerouslySetInnerHTML`:** Разное HTML содержимое на сервере и клиенте

### ✅ ПРАВИЛЬНЫЕ ПАТТЕРНЫ:

#### Анимации без проверок на клиента:
```tsx
// ❌ НЕПРАВИЛЬНО - вызывает ошибки гидратации:
const [isClient, setIsClient] = useState(false);
useEffect(() => {
  setIsClient(true);
}, []);

// ✅ ПРАВИЛЬНО - без клиентских проверок:
const [shouldAnimate, setShouldAnimate] = useState(false);
useEffect(() => {
  if (enableAnimations) {
    const timer = setTimeout(() => setShouldAnimate(true), 100);
    return () => clearTimeout(timer);
  }
}, [enableAnimations]);
```

#### Безопасная работа с переводами:
```tsx
// ❌ НЕПРАВИЛЬНО - может вызвать проблемы:
<Paragraph dangerouslySetInnerHTML={{ __html: t.raw('info.text') }} />

// ✅ ПРАВИЛЬНО - предварительная проверка:
const infoText = t('info.text') || '';
<Paragraph>{infoText}</Paragraph>

// ✅ ПРАВИЛЬНО - для HTML контента с проверками:
const htmlContent = t.raw('info.text') || '';
if (htmlContent) {
  return <Paragraph dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
return <Paragraph>{t('info.text')}</Paragraph>;
```

#### Intersection Observer с SSR поддержкой:
```tsx
// ✅ ПРАВИЛЬНО - с поддержкой SSR:
const [isIntersecting, setIsIntersecting] = useState(
  disabled || typeof window === 'undefined'
);

useEffect(() => {
  if (disabled || typeof window === 'undefined' || !window.IntersectionObserver) {
    setIsIntersecting(true);
    return;
  }
  // ... observer logic
}, [disabled]);
```

#### Условный рендеринг контента:
```tsx
// ✅ ПРАВИЛЬНО - предварительные проверки:
const videoUrl = t('video_url') || '';
return (
  <div>
    {videoUrl && (
      <iframe src={videoUrl} />
    )}
  </div>
);
```

### 🛡️ ПРОФИЛАКТИЧЕСКИЕ МЕРЫ:

1. **Всегда проверяйте переводы на наличие значений**
2. **Используйте fallback значения для всех динамических данных**
3. **Избегайте `typeof window` проверок в компонентах**
4. **Тестируйте с отключенным JavaScript для проверки SSR**
5. **Используйте `'use client'` только когда действительно необходимо**

### 🧪 ТЕСТИРОВАНИЕ ГИДРАТАЦИИ:

1. **Отключите JavaScript в браузере** - страница должна отображаться корректно
2. **Проверьте консоль браузера** на наличие ошибок гидратации
3. **Используйте React DevTools** для анализа различий между сервером и клиентом
4. **Тестируйте в режиме production** - `npm run build && npm start`

### 📋 ЧЕКЛИСТ ДЛЯ КОМПОНЕНТОВ:

- [ ] Нет проверок `typeof window !== 'undefined'`
- [ ] Все переводы имеют fallback значения
- [ ] `dangerouslySetInnerHTML` используется осторожно
- [ ] Intersection Observer имеет SSR поддержку
- [ ] Анимации не зависят от клиентских проверок
- [ ] Все условные рендеринги безопасны для SSR

Следование этим правилам предотвратит большинство проблем с гидратацией в проекте.

### Примечания:

```

## 🎨 ПАТТЕРНЫ СТИЛИЗАЦИИ КАРТОЧЕК ПРОДУКТОВ (01.01.2025)

### Архитектура стилей карточек:
```scss
// Базовая структура карточки продукта
.card {
  @include mix.modern-card;
  
  & {
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: all vars.$transition-normal vars.$ease-in-out-quart;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: vars.$shadow-deep, vars.$shadow-glow;
  }
}
```

### Структура карточки продукта:
```tsx
<article className={classes.card}>
  {/* Контейнер изображения с декоративными элементами */}
  <div className={classes.card__image_wrapper}>
    <Image />
    {/* Бейдж скидки (если есть) */}
    {is_discounted && <div className={classes.card__discount_badge} />}
    {/* Кнопка быстрого просмотра */}
    <div className={classes.card__actions}>
      <Link className={classes.card__action_button} />
    </div>
  </div>

  {/* Контент карточки */}
  <div className={classes.card__content}>
    <h3 className={classes.card__title} />
    <p className={classes.card__description} />
    
    {/* Секция цены и кнопки */}
    <div className={classes.card__price_section}>
      <div className={classes.card__price} />
      <Link className={classes.card__details_button} />
    </div>
  </div>
</article>
```

### Ключевые компоненты стилизации:

#### 1. Контейнер изображения:
```scss
&__image_wrapper {
  height: 220px; // Фиксированная высота
  background: vars.$gradient-card;
  border-radius: vars.$border-radius-lg vars.$border-radius-lg 0 0;
  overflow: hidden;
  position: relative;
}
```

#### 2. Декоративные элементы:
```scss
// Бейдж скидки с градиентом
&__discount_badge {
  @include mix.badge('error');
  background: vars.$gradient-tertiary;
  border-radius: vars.$border-radius-full;
  box-shadow: vars.$shadow-md;
}

// Кнопка действия с glassmorphism
&__action_button {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

#### 3. Анимации появления:
```scss
// Анимация для карточек с задержкой
.card {
  animation: cardFadeIn 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);

  @for $i from 1 through 12 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}
```

### Адаптивность:
```scss
// Высота изображений по брейкпоинтам
&__image_wrapper {
  height: 220px;
  
  @media (max-width: vars.$breakpoint-md) {
    height: 200px;
  }
  
  @media (max-width: vars.$breakpoint-sm) {
    height: 180px;
  }
}

// Отступы контента
&__content {
  padding: vars.$spacing-xl;
  
  @media (max-width: vars.$breakpoint-md) {
    padding: vars.$spacing-lg;
  }
  
  @media (max-width: vars.$breakpoint-sm) {
    padding: vars.$spacing-md;
  }
}
```

### Стили списка продуктов:
```scss
// Адаптивная сетка с поддержкой разных устройств
&__grid {
  @include mix.responsive-card-grid(320px);
  
  @media (max-width: vars.$breakpoint-lg) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: vars.$breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}
```

### Декоративный фон:
```scss
// Градиентный фон с тонкими акцентами
.list {
  background: vars.$gradient-card;
  
  &::before {
    content: '';
    position: absolute;
    background: 
      radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
  }
}
```

### Используемые миксины:
- `@include mix.modern-card` - современная карточка с градиентом
- `@include mix.responsive-card-grid()` - адаптивная сетка карточек  
- `@include mix.button-icon` - стилизация иконочных кнопок
- `@include mix.modern-button()` - современные кнопки с эффектами
- `@include mix.line-clamp()` - ограничение строк текста
- `@include mix.gradient-text` - градиентный текст

### Ключевые переменные:
```scss
// Цвета
vars.$primary-color
vars.$gradient-primary
vars.$gradient-card
vars.$shadow-deep
vars.$shadow-glow

// Размеры
vars.$spacing-xl
vars.$border-radius-lg
vars.$transition-normal

// Шрифты
vars.$font-weight-bold
vars.$font-size-2xl
```

### Принципы дизайна:
1. **Гармония**: Использование единых миксинов и переменных
2. **Интерактивность**: Hover эффекты с масштабированием и тенями
3. **Современность**: Glassmorphism, градиенты, анимации
4. **Адаптивность**: Responsive подход для всех устройств
5. **Производительность**: CSS анимации вместо JavaScript
6. **Доступность**: Правильная семантика и ARIA атрибуты

## 🛍️ СОВРЕМЕННАЯ СТРАНИЦА ПРОДУКТА (01.01.2025)

### Архитектура страницы продукта:
```
components/public/pages/product/
├── ProductDetail.tsx               // Основной компонент страницы
├── ProductDetail.module.scss       // Стили главной страницы
├── sections/                       // Секции страницы
│   ├── GallerySection/            // Галерея изображений
│   ├── InfoSection/               // Информация о продукте
│   ├── DescriptionSection/        // Секция описаний
│   └── index.ts                   // Экспорты секций
├── localized-product.ts           // Типы и форматирование данных
└── index.ts
```

### Ключевые особенности дизайна:

#### 1. Главная страница (ProductDetail):
```scss
.detail {
  @include mix.section;
  
  // Волнообразный декоративный фон
  &::before {
    background: vars.$gradient-hero;
    opacity: 0.05;
    border-radius: 0 0 50% 50% / 0 0 100px 100px;
  }
  
  // Адаптивная сетка 2 колонки -> 1 колонка
  &__content {
    @include mix.grid(2, vars.$spacing-4xl);
  }
  
  // Анимация появления контента
  &__content > * {
    @include mix.fade-in-animation;
  }
}
```

#### 2. Галерея продукта (GallerySection):
```scss
.gallery {
  // Sticky позиционирование на десктопе
  position: sticky;
  top: vars.$spacing-xl;
  
  &__main_image {
    @include mix.modern-card;
    
    // Hover эффекты с масштабированием
    &:hover {
      transform: translateY(-8px);
      box-shadow: vars.$shadow-xl, 0 0 30px rgba(34, 197, 94, 0.15);
    }
  }
  
  // Современный дизайн миниатюр
  &__thumbnail {
    @include mix.card;
    
    &_active {
      border-color: vars.$primary-color;
      box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
      
      // Индикатор активности
      &::after {
        content: '';
        width: 12px; height: 12px;
        background: vars.$primary-color;
        border-radius: 50%;
      }
    }
  }
}
```

#### 3. Информационная секция (InfoSection):
```scss
.info {
  &__header {
    @include mix.modern-card;
    
    // Цветная полоса сверху
    &::before {
      height: 4px;
      background: vars.$gradient-primary;
    }
  }
  
  // Секция цены с градиентным дизайном
  &__price_section {
    @include mix.modern-card;
    background: vars.$gradient-card;
    
    &::before {
      height: 3px;
      background: vars.$gradient-secondary;
    }
  }
  
  // Градиентная цена
  &__price_current {
    @include mix.gradient-text;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    
    &::after {
      width: 100%; height: 2px;
      background: vars.$gradient-primary;
      opacity: 0.3;
    }
  }
  
  // Интерактивная кнопка заказа
  &__contact_button {
    @include mix.modern-button('primary');
    
    // Анимация заливки
    &::before {
      background: vars.$primary-color;
      transition: left vars.$transition-normal;
    }
    
    &:hover::before {
      left: 0; // Заливка слева направо
    }
  }
}
```

#### 4. Секция описаний (DescriptionSection):
```scss
.description {
  &__local_descriptions {
    @include mix.modern-card;
    
    &::before {
      height: 3px;
      background: vars.$gradient-secondary;
    }
  }
  
  // Интерактивные карточки описаний
  &__description_item {
    @include mix.interactive-card;
    
    // Анимированная цветная полоса
    &::before {
      width: 4px; height: 100%;
      background: vars.$gradient-primary;
      transform: scaleY(0);
      transform-origin: bottom;
    }
    
    &:hover::before {
      transform: scaleY(1);
    }
  }
  
  // Стилизованные ссылки
  &__description_link {
    @include mix.modern-button('primary');
    
    // Анимация стрелки
    &::after {
      content: '→';
      transition: transform vars.$transition-normal;
    }
    
    &:hover::after {
      transform: translateX(4px);
    }
  }
}
```

### Используемые миксины и переменные:

#### Ключевые миксины:
```scss
@include mix.modern-card           // Современные карточки с градиентом
@include mix.interactive-card      // Карточки с hover эффектами
@include mix.modern-button()       // Кнопки с анимациями
@include mix.gradient-text         // Градиентный текст
@include mix.grid()               // Адаптивная сетка
@include mix.fade-in-animation    // Анимации появления
@include mix.flex-column          // Flexbox колонки
@include mix.icon-container()     // Контейнеры для иконок
```

#### Ключевые переменные:
```scss
// Градиенты
vars.$gradient-hero
vars.$gradient-primary  
vars.$gradient-secondary
vars.$gradient-card

// Тени
vars.$shadow-xl
vars.$shadow-deep
vars.$shadow-glow

// Переходы
vars.$transition-normal
vars.$transition-slow
vars.$ease-in-out-quart

// Размеры
vars.$spacing-xl
vars.$spacing-2xl
vars.$spacing-4xl
vars.$border-radius-lg
vars.$border-radius-xl
```

### Адаптивный дизайн:

#### Брейкпоинты:
- **Desktop (1024px+)**: Двухколоночный макет, sticky галерея
- **Tablet (768px-1023px)**: Двухколоночный -> одноколоночный
- **Mobile (767px-)**: Одноколоночный, упрощенные анимации

#### Особенности мобильной версии:
```scss
@media (max-width: vars.$breakpoint-md) {
  .gallery {
    position: static; // Убираем sticky
    
    &__main_image:hover {
      transform: none; // Упрощаем анимации
    }
  }
  
  .info__price_current {
    font-size: clamp(1.2rem, 3vw, 1.8rem); // Меньший размер
  }
}
```

### Интерфейс LocalizedProduct:
```typescript
export interface LocalizedProduct {
  id: string;
  name: string;
  image: string;
  description: string | null;
  price: number;
  discount_price: number | null;
  discount_percentage: number;
  is_discounted: boolean;
  formatted_price: string;
  formatted_discount_price: string | null;
  images: ItemImage[];
  item_descriptions: LocalItemDescription[];
}
```

### Основные принципы:
1. **Современность**: Градиенты, glassmorphism, анимации
2. **Интерактивность**: Hover эффекты, smooth transitions
3. **Адаптивность**: Mobile-first подход
4. **Производительность**: CSS анимации, оптимизированные изображения
5. **Доступность**: Semantic HTML, ARIA атрибуты
6. **Консистентность**: Единая система миксинов и переменных

### Переводы для страницы продукта:
```typescript
const t = useTranslations('public.pages.product.detail');
// Ключи: back_to_products, discount, share, price_negotiable, 
//        contact_for_order, additional_info
```

Страница продукта использует современные техники дизайна и следует принципам интернет-магазинов с улучшенным UX и визуальными эффектами.
