import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  disabled?: boolean;
}

export const useIntersectionObserver = (options: UseIntersectionObserverOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true, disabled = false } = options;
  // Если disabled или нет window (SSR), то считаем элемент видимым
  const [isIntersecting, setIsIntersecting] = useState(disabled || typeof window === 'undefined');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Если disabled или нет IntersectionObserver (например, в SSR), не создаем observer
    if (disabled || typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsIntersecting(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);

        if (isElementIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, disabled]);

  return { ref, isIntersecting };
}; 