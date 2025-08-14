'use client';

import { useEffect } from 'react';
import { initAnimationObserver } from './animation-observer';

export const AnimationInitializer = () => {
  useEffect(() => {
    initAnimationObserver();
  }, []);

  return null;
}; 