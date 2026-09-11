'use client';

import { useEffect, useRef } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      const lenis = lenisRef.current?.lenis;
      if (lenis) {
        lenis.raf(time * 1000);
      }
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => {
      ScrollTrigger.update();
    };

    const timer = setTimeout(() => {
      const lenis = lenisRef.current?.lenis;
      if (lenis) {
        lenis.on('scroll', onScroll);
        ScrollTrigger.refresh();
      }
    }, 100);

    return () => {
      gsap.ticker.remove(update);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 2.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.5,
        touchMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
