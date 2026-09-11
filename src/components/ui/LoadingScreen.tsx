'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { PROJECTS } from '@/data/projects';

interface FloatingCard {
  id: string;
  title: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0);
  const [hide, setHide] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const floatingCards: FloatingCard[] = useMemo(() => [
    { id: PROJECTS[0].id, title: PROJECTS[0].title, color: PROJECTS[0].accentColor, x: 15, y: 20, rotation: -12, scale: 0.9, delay: 0.2 },
    { id: PROJECTS[1].id, title: PROJECTS[1].title, color: PROJECTS[1].accentColor, x: 70, y: 15, rotation: 8, scale: 0.85, delay: 0.4 },
    { id: PROJECTS[2].id, title: PROJECTS[2].title, color: PROJECTS[2].accentColor, x: 20, y: 65, rotation: 6, scale: 0.8, delay: 0.6 },
    { id: PROJECTS[3].id, title: PROJECTS[3].title, color: PROJECTS[3].accentColor, x: 72, y: 60, rotation: -10, scale: 0.85, delay: 0.8 },
  ], []);

  useEffect(() => {
    const t = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(t);
          setTimeout(() => setHide(true), 400);
          setTimeout(() => onComplete?.(), 2200);
          return 100;
        }
        return p + 1;
      });
    }, 25);
    return () => clearInterval(t);
  }, [onComplete]);

  // Float-in animation for cards
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 60, rotation: floatingCards[i].rotation + 20, scale: 0.3 },
        { opacity: 1, y: 0, rotation: floatingCards[i].rotation, scale: 1, duration: 1.2, delay: floatingCards[i].delay, ease: 'back.out(1.4)' }
      );

      // Continuous float
      gsap.to(card, {
        y: '+=15',
        rotation: `+=${Math.random() > 0.5 ? 3 : -3}`,
        duration: 2 + Math.random() * 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: floatingCards[i].delay + 1,
      });
    });
  }, [floatingCards]);

  // Exit animation
  useEffect(() => {
    if (hide && containerRef.current) {
      const tl = gsap.timeline();

      // Cards fly outward
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const angle = (i / 4) * Math.PI * 2;
        tl.to(card, {
          x: Math.cos(angle) * 300,
          y: Math.sin(angle) * 300,
          opacity: 0,
          scale: 0.2,
          rotation: floatingCards[i].rotation + (Math.random() > 0.5 ? 180 : -180),
          duration: 0.8,
          ease: 'power3.in',
        }, 0);
      });

      // Ink wash wipe
      tl.to(containerRef.current, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.0,
        ease: 'power3.inOut',
      }, 0.4);

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
      }, 1.3);
    }
  }, [hide, floatingCards]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, #f5ede0 0%, #e8dcc8 50%, #d4c4a8 100%)',
        pointerEvents: hide ? 'none' : 'auto',
        clipPath: 'circle(150% at 50% 50%)',
        overflow: 'hidden',
      }}
    >
      {/* Animated ink texture background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
        opacity: 0.4,
      }} />

      {/* Floating project cards */}
      {floatingCards.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => { cardsRef.current[i] = el; }}
          style={{
            position: 'absolute',
            left: `${card.x}%`,
            top: `${card.y}%`,
            transform: `rotate(${card.rotation}deg) scale(${card.scale})`,
            opacity: 0,
            width: '180px',
            cursor: 'default',
          }}
        >
          {/* Card frame */}
          <div style={{
            background: '#faf5ee',
            border: '3px solid #3d2e22',
            borderRadius: '6px',
            padding: '16px',
            boxShadow: `8px 8px 0 ${card.color}40, 12px 12px 30px rgba(0,0,0,0.15)`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Color accent bar */}
            <div style={{
              height: '4px',
              background: card.color,
              borderRadius: '2px',
              marginBottom: '12px',
            }} />

            {/* Project number */}
            <div style={{
              fontFamily: 'var(--font-gloria), "Gloria Hallelujah", cursive',
              fontSize: '28px',
              fontWeight: 700,
              color: card.color,
              opacity: 0.3,
              position: 'absolute',
              top: '8px',
              right: '12px',
            }}>
              {(i + 1).toString().padStart(2, '0')}
            </div>

            {/* Project title */}
            <div style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: '6px',
            }}>
              {card.title}
            </div>

            {/* Decorative sketch lines */}
            <svg width="100%" height="20" style={{ opacity: 0.2 }}>
              <line x1="0" y1="5" x2="100%" y2="5" stroke="#3d2e22" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="0" y1="12" x2="70%" y2="12" stroke="#3d2e22" strokeWidth="1" strokeDasharray="4 3" />
            </svg>
          </div>
        </div>
      ))}

      {/* Center content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-gloria), "Gloria Hallelujah", cursive',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: '#2a2218',
            margin: '0 0 8px',
            letterSpacing: 4,
            textShadow: '2px 2px 0 rgba(255,255,255,0.5)',
          }}
        >
          MANVESH
        </h1>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#8a7560',
          marginBottom: '30px',
        }}>
          Creative Developer
        </p>

        {/* Progress bar */}
        <div style={{
          width: 220,
          height: 3,
          border: '1px solid #8a7560',
          borderRadius: 3,
          overflow: 'hidden',
          margin: '0 auto',
        }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #4f9cf5, #8b5cf6)',
            transition: 'width 0.05s linear',
            borderRadius: 3,
          }} />
        </div>

        <p style={{
          fontFamily: 'var(--font-caveat), "Caveat", cursive',
          fontSize: '1.2rem',
          color: '#8a7560',
          marginTop: 12,
        }}>
          {pct < 100 ? 'preparing the studio...' : 'welcome!'}
        </p>
      </div>
    </div>
  );
}
