import { useEffect, useRef } from 'react';
import '../liquid-glass-main/liquid-glass.js';

export function useLiquidGlass(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined' || !window.liquidGlass) return;

    const instance = window.liquidGlass(ref.current, {
      scale: -112,
      chroma: 6,
      border: 0.07,
      mapBlur: 12,
      blur: 12,
      saturate: 1.6,
      fallbackBlur: 16,
      ...options,
    });

    return () => {
      if (instance && typeof instance.destroy === 'function') {
        instance.destroy();
      }
    };
  }, [options]);

  return ref;
}
