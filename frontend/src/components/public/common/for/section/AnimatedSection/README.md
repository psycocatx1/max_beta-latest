# AnimatedSection Component

Серверный компонент для анимации секций при скроллинге с поддержкой нативных CSS анимаций.

## Особенности

- ✅ **Серверный компонент** - нет React хуков
- ✅ **Нативные CSS анимации** - максимальная производительность
- ✅ **Intersection Observer API** - оптимизированное отслеживание видимости
- ✅ **Поддержка prefers-reduced-motion** - доступность
- ✅ **CSS-only анимации** - без JavaScript для максимальной производительности

## Использование

### Базовое использование (transition-based анимации)

```tsx
import { AnimatedSection } from '@/components/public/common/for/section/AnimatedSection';

<AnimatedSection animation="fadeInUp" delay={200}>
  <h2>Заголовок секции</h2>
  <p>Содержимое секции</p>
</AnimatedSection>
```

### CSS-only анимации (максимальная производительность)

```tsx
<AnimatedSection 
  animation="fadeInUp" 
  delay={200} 
  duration={0.8}
  useCssOnly={true}
>
  <h2>Заголовок секции</h2>
  <p>Содержимое секции</p>
</AnimatedSection>
```

### Без анимаций

```tsx
<AnimatedSection enableAnimations={false}>
  <h2>Заголовок секции</h2>
  <p>Содержимое секции</p>
</AnimatedSection>
```

## Пропсы

| Проп | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `children` | `ReactNode` | - | Содержимое секции |
| `animation` | `'fadeInUp' \| 'fadeInDown' \| 'fadeInLeft' \| 'fadeInRight' \| 'fadeIn' \| 'scaleIn'` | `'fadeInUp'` | Тип анимации |
| `delay` | `number` | `0` | Задержка анимации в миллисекундах |
| `duration` | `number` | `0.6` | Длительность анимации в секундах |
| `className` | `string` | - | Дополнительные CSS классы |
| `enableAnimations` | `boolean` | `true` | Включить/выключить анимации |
| `useCssOnly` | `boolean` | `false` | Использовать CSS-only анимации |

## Типы анимаций

- `fadeInUp` - появление снизу вверх
- `fadeInDown` - появление сверху вниз
- `fadeInLeft` - появление слева направо
- `fadeInRight` - появление справа налево
- `fadeIn` - простое появление
- `scaleIn` - появление с масштабированием

## Staggered анимации для дочерних элементов

Для создания каскадных анимаций добавьте класс `stagger-child` к дочерним элементам:

```tsx
<AnimatedSection animation="fadeInUp">
  <div className="stagger-child">Элемент 1</div>
  <div className="stagger-child">Элемент 2</div>
  <div className="stagger-child">Элемент 3</div>
</AnimatedSection>
```

## Производительность

### CSS-only анимации (`useCssOnly={true}`)
- ✅ Максимальная производительность
- ✅ Анимации запускаются автоматически при появлении в viewport
- ✅ Нет дополнительных JavaScript обработчиков
- ❌ Меньше контроля над точкой запуска

### Transition-based анимации (`useCssOnly={false}`)
- ✅ Больше контроля над анимацией
- ✅ Точное отслеживание через Intersection Observer
- ✅ Возможность отключения observer после срабатывания
- ❌ Небольшие накладные расходы на JavaScript

## Доступность

Компонент автоматически учитывает настройки пользователя:
- При `prefers-reduced-motion: reduce` анимации отключаются
- Сохраняется только плавное появление с opacity

## Техническая реализация

1. **Серверный рендеринг** - компонент рендерится на сервере
2. **Глобальный Intersection Observer** - инициализируется один раз в `AnimationInitializer`
3. **CSS переменные** - для настройки delay и duration
4. **Модульные стили** - изоляция CSS классов
5. **Оптимизация** - observer отключается после срабатывания 