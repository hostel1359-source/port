'use client';

import React, { useEffect, useState } from 'react';

interface SpeedLinesProps {
  scrollVelocity: number;
}

export default function SpeedLines({ scrollVelocity }: SpeedLinesProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  if (prefersReducedMotion) return null;

  const opacity = Math.min(scrollVelocity * 3, 0.4);

  const lines = Array.from({ length: 12 }).map((_, i) => {
    const angle = i * 30;
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '2px',
          height: '60vh',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)',
          transformOrigin: 'top center',
          transform: `translate(-50%, 0) rotate(${angle}deg)`,
        }}
      />
    );
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 55,
        pointerEvents: 'none',
        opacity: opacity,
        transition: 'opacity 0.2s ease-out',
        overflow: 'hidden',
      }}
    >
      {lines}
    </div>
  );
}
