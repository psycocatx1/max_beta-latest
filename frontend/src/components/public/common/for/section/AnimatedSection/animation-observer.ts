// Глобальный скрипт для инициализации Intersection Observer для анимированных секций
export const initAnimationObserver = () => {
  // Проверяем, не инициализирован ли уже observer
  if (typeof window === 'undefined' || (window as unknown as { animatedSectionsObserver: IntersectionObserver }).animatedSectionsObserver) {
    return
  }

  // Создаем глобальный observer для всех анимированных секций
  (window as unknown as { animatedSectionsObserver: IntersectionObserver }).animatedSectionsObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const isCssOnly = element.getAttribute('data-css-only') === 'true';

          if (!isCssOnly) {
            // Для transition-based анимаций добавляем класс visible
            element.classList.add('visible');
          }
          // Для CSS-only анимаций ничего не делаем - они запускаются автоматически

          // Отключаем observer после срабатывания для оптимизации
          (window as unknown as { animatedSectionsObserver: IntersectionObserver }).animatedSectionsObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  );

  // Наблюдаем за уже существующими элементами (только для transition-based анимаций)
  const animatedSections = document.querySelectorAll('[data-enable-animations="true"]:not([data-css-only="true"]):not(.no_animation)');
  animatedSections.forEach((el) => {
    if (!el.classList.contains('visible')) {
      (window as unknown as { animatedSectionsObserver: IntersectionObserver }).animatedSectionsObserver.observe(el);
    }
  });
};

// Функция для добавления нового элемента в observer
export const observeAnimatedSection = (element: Element) => {
  if (typeof window === 'undefined' || !(window as unknown as { animatedSectionsObserver: IntersectionObserver }).animatedSectionsObserver) {
    return;
  }

  const observer = (window as unknown as { animatedSectionsObserver: IntersectionObserver }).animatedSectionsObserver;
  const isCssOnly = element.getAttribute('data-css-only') === 'true';

  // Наблюдаем только за transition-based анимациями
  if (!isCssOnly && !element.classList.contains('visible')) {
    observer.observe(element);
  }
};

// Инициализация при загрузке страницы
if (typeof window !== 'undefined') {
  // Инициализируем сразу, если DOM уже готов
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimationObserver);
  } else {
    initAnimationObserver();
  }
} 