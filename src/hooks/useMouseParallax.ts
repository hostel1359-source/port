'use client';

import { useRef, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

export function useMouseParallax(): React.RefObject<MousePosition> {
  const position = useRef<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    position.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    position.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return position;
}
