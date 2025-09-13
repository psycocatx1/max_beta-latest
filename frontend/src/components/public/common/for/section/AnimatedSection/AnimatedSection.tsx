'use client';
import { ReactNode, useEffect, useRef } from 'react';
import classes from './AnimatedSection.module.scss';
import clsx from 'clsx';
import { observeAnimatedSection } from './animation-observer';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';
  delay?: number;
  duration?: number;
  className?: string;
  enableAnimations?: boolean;
  useCssOnly?: boolean; // Новая опция для CSS-only анимаций
}

export const AnimatedSection = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  className,
  enableAnimations = true,
  useCssOnly = false
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Регистрируем элемент в Intersection Observer при монтировании
  useEffect(() => {
    const element = sectionRef.current;
    if (element && enableAnimations && !useCssOnly) {
      observeAnimatedSection(element);
    }
  }, [enableAnimations, useCssOnly]);

  return (
    <section
      ref={sectionRef}
      className={clsx(
        classes.animated_section,
        {
          // CSS-only анимации (более производительные)
          [`${classes[`css_${animation}`]}`]: enableAnimations && useCssOnly,
          // Transition-based анимации (с Intersection Observer)
          [classes[animation]]: enableAnimations && !useCssOnly,
          [classes.no_animation]: !enableAnimations,
        },
        className
      )}
      style={enableAnimations ? {
        '--animation-delay': `${delay}ms`,
        '--animation-duration': `${duration}s`
      } as React.CSSProperties : undefined}
      data-animation={animation}
      data-delay={delay}
      data-duration={duration}
      data-enable-animations={enableAnimations}
      data-css-only={useCssOnly}
      suppressHydrationWarning
    >
      {children}
    </section>
  );
}; 