'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  splitBy?: 'words' | 'chars';
}

export default function AnimatedText({ 
  text, 
  as: Component = 'p', 
  className = '', 
  delay = 0,
  splitBy = 'words'
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement | any>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    const elements = el.querySelectorAll('.animate-item');

    gsap.fromTo(elements, 
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        }
      }
    );
  }, [delay, prefersReducedMotion]);

  const parts = splitBy === 'words' ? text.split(' ') : text.split('');

  return (
    <Component ref={containerRef} className={className}>
      {parts.map((part, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 mr-[0.25em]">
          <span className={`inline-block ${prefersReducedMotion ? '' : 'animate-item'}`}>
            {part === ' ' ? '\u00A0' : part}
          </span>
        </span>
      ))}
    </Component>
  );
}
