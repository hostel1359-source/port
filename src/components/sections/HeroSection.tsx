'use client';
import { PERSONAL } from '@/data/personal';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const mottoRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Wait for loading screen to finish
    const timer = setTimeout(() => {
      setRevealed(true);
      const tl = gsap.timeline();

      // Ink-brush reveal: each letter appears with stagger
      if (titleRef.current) {
        const letters = titleRef.current.querySelectorAll('.hero-letter');
        tl.fromTo(
          letters,
          { opacity: 0, y: 40, rotationX: -90, scale: 0.5 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'back.out(1.7)',
          },
          0
        );
      }

      // Subtitle fades in with brush sweep
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, x: -30, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.out' },
          0.6
        );
      }

      // Motto fades in
      if (mottoRef.current) {
        tl.fromTo(
          mottoRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          1.0
        );
      }

      // Scroll hint
      if (scrollHintRef.current) {
        tl.fromTo(
          scrollHintRef.current,
          { opacity: 0, y: -10 },
          { opacity: 0.7, y: 0, duration: 0.5, ease: 'power2.out' },
          1.3
        );
      }
    }, 2800); // After loading screen finishes

    return () => clearTimeout(timer);
  }, []);

  const titleText = 'MANVESH';

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative w-full pointer-events-none px-6">
      <div className="flex flex-col items-center text-center z-10 pointer-events-auto">
        {/* Ink brush decoration behind title */}
        <div style={{ position: 'relative' }}>
          {/* Brush stroke behind text */}
          <svg
            viewBox="0 0 400 60"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120%',
              height: '120%',
              opacity: revealed ? 0.06 : 0,
              transition: 'opacity 1s ease',
              pointerEvents: 'none',
            }}
          >
            <path
              d="M10,30 C80,10 160,50 200,30 C240,10 320,50 390,30"
              stroke="#1a1a1a"
              strokeWidth="40"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-gloria), "Gloria Hallelujah", cursive',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: '#ffffff',
              letterSpacing: '0.15em',
              lineHeight: 1,
              textShadow: '2px 2px 8px rgba(0,0,0,0.4)',
              display: 'flex',
              perspective: '600px',
            }}
          >
            {titleText.split('').map((letter, i) => (
              <span
                key={i}
                className="hero-letter"
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  transformStyle: 'preserve-3d',
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#e0d8c8',
            marginTop: '14px',
            letterSpacing: '0.1em',
            textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
            opacity: 0,
          }}
        >
          &lt; creative developer /&gt;
        </p>

        <p
          ref={mottoRef}
          style={{
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
            fontWeight: 300,
            color: '#d0c8b8',
            marginTop: '20px',
            maxWidth: '420px',
            lineHeight: 1.6,
            textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
            opacity: 0,
          }}
        >
          {PERSONAL.motto}
        </p>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto hover:opacity-100 transition-opacity"
        style={{ opacity: 0 }}
      >
        <span
          style={{
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontSize: '0.7rem',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: '#d0c8b8',
            textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          scroll to explore
        </span>
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="#d0c8b8" strokeWidth="1.5" strokeLinecap="round" className="animate-bounce">
          <line x1="7" y1="1" x2="7" y2="15" />
          <polyline points="2 11 7 16 12 11" />
        </svg>
      </div>
    </section>
  );
}
