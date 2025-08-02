'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import classes from './AnimatedSection.module.scss';
import clsx from 'clsx';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';
  delay?: number;
  duration?: number;
  className?: string;
  enableAnimations?: boolean;
}

export const AnimatedSection = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  className,
  enableAnimations = true
}: AnimatedSectionProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Включаем анимации только после монтирования компонента
  useEffect(() => {
    if (enableAnimations) {
      const timer = setTimeout(() => setShouldAnimate(true), 100);
      return () => clearTimeout(timer);
    }
  }, [enableAnimations]);

  // Используем Intersection Observer только когда анимации включены
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    disabled: !enableAnimations || !shouldAnimate
  };

  const { ref, isIntersecting } = useIntersectionObserver(observerOptions);

  // Определяем видимость элемента
  // На сервере и без анимаций - элемент сразу видимый
  // С анимациями - только когда shouldAnimate и isIntersecting
  const isVisible = !enableAnimations || !shouldAnimate || isIntersecting;

  return (
    <section
      ref={ref}
      className={clsx(
        classes.animated_section,
        {
          // Элемент видимый если нет анимаций или если анимация должна быть показана
          [classes.visible]: isVisible,
          // Анимация применяется только когда включена и shouldAnimate = true
          [classes[animation]]: enableAnimations && shouldAnimate,
        },
        className
      )}
      style={enableAnimations && shouldAnimate ? {
        '--animation-delay': `${delay}ms`,
        '--animation-duration': `${duration}s`
      } as React.CSSProperties : undefined}
    >
      {children}
    </section>
  );
}; 