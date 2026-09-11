'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'ghost';
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = 'primary',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = buttonRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.1);
      yTo(y * 0.1);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const baseStyle: React.CSSProperties = {
    fontFamily: 'Inter, -apple-system, sans-serif',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '0.75rem 1.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      border: '1.5px solid rgba(255,255,255,0.4)',
      color: '#ffffff',
      background: 'transparent',
    },
    ghost: {
      border: '1px solid rgba(255,255,255,0.15)',
      color: '#d0c8b8',
      background: 'transparent',
    },
  };

  const mergedStyle = { ...baseStyle, ...variantStyles[variant] };

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        style={mergedStyle}
        className={cn('hover:bg-white/10', className)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      style={mergedStyle}
      className={cn('hover:bg-white/10', className)}
    >
      {children}
    </button>
  );
}
