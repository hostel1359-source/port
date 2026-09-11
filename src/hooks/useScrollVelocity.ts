'use client';
import { useRef, useEffect, useState } from 'react';

export default function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(Date.now());
  const rafId = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    lastScroll.current = window.scrollY || window.pageYOffset;
    lastTime.current = Date.now();
    
    const update = () => {
      const now = Date.now();
      const dt = Math.max(now - lastTime.current, 1);
      const currentScroll = window.scrollY || window.pageYOffset;
      const delta = Math.abs(currentScroll - lastScroll.current);
      const v = delta / dt;
      setVelocity((prev) => prev * 0.85 + v * 0.15); // smooth
      lastScroll.current = currentScroll;
      lastTime.current = now;
      rafId.current = requestAnimationFrame(update);
    };
    rafId.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return velocity;
}
