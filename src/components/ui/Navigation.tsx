'use client';
import { useState } from 'react';
import { SECTION_IDS, SECTION_LABELS, type SectionId } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface NavigationProps {
  scrollProgress: number;
}

export default function Navigation({ scrollProgress }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getActiveIndex = () => {
    if (scrollProgress < 0.15) return 0;
    if (scrollProgress < 0.3) return 1;
    if (scrollProgress < 0.65) return 2;
    if (scrollProgress < 0.8) return 3;
    if (scrollProgress < 0.9) return 4;
    return 5;
  };

  const activeIndex = getActiveIndex();
  const getLabel = (index: number): string => SECTION_LABELS[SECTION_IDS[index] as SectionId] ?? '';

  const handleNavClick = (index: number) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(SECTION_IDS[index]);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="hidden md:flex flex-col gap-4 fixed right-8 top-1/2 -translate-y-1/2 z-50" aria-label="Section navigation">
        {SECTION_IDS.map((id, index) => (
          <button
            key={id}
            aria-label={`Scroll to ${getLabel(index)}`}
            className={cn('hud-dot group relative', activeIndex === index && 'active')}
            onClick={() => handleNavClick(index)}
          >
            <span className="hud-dot-label">{getLabel(index)}</span>
          </button>
        ))}
      </nav>

      <button
        className="md:hidden fixed top-6 right-6 z-50 text-ink p-2 bg-paper/80 backdrop-blur-sm rounded-sm border border-ink/10"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileMenuOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
          </svg>
        )}
      </button>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-sm flex flex-col items-center justify-center md:hidden">
          <div className="flex flex-col gap-6 text-center">
            {SECTION_IDS.map((id, index) => (
              <button
                key={id}
                className={cn(
                  'font-display text-2xl uppercase tracking-widest transition-colors',
                  activeIndex === index ? 'text-ink' : 'text-ink-muted hover:text-ink'
                )}
                onClick={() => handleNavClick(index)}
              >
                {getLabel(index)}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
