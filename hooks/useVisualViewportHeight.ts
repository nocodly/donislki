'use client';

import { useEffect } from 'react';

/**
 * Sets a `--vvh` CSS custom property (in px) tracking the real visible
 * viewport height, including when the on-screen keyboard opens on iOS
 * Safari / Android Chrome. iOS doesn't shrink the layout viewport for the
 * keyboard, so `100dvh` alone isn't enough — components that must never
 * sit behind the keyboard (the AI bottom sheet) use `var(--vvh)` instead.
 */
export function useVisualViewportHeight() {
  useEffect(() => {
    const root = document.documentElement;

    function sync() {
      const vv = window.visualViewport;
      const height = vv ? vv.height : window.innerHeight;
      root.style.setProperty('--vvh', `${height}px`);
    }

    sync();

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', sync);
      window.visualViewport.addEventListener('scroll', sync);
      return () => {
        window.visualViewport?.removeEventListener('resize', sync);
        window.visualViewport?.removeEventListener('scroll', sync);
      };
    }

    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);
}
