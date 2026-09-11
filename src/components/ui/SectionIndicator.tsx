'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { SECTION_IDS, SECTION_LABELS, type SectionId } from '@/lib/constants';

interface SectionIndicatorProps {
  scrollProgress: number;
}

function getSectionLabel(progress: number): string {
  if (progress < 0.15) return SECTION_LABELS[SECTION_IDS[0] as SectionId];
  if (progress < 0.3) return SECTION_LABELS[SECTION_IDS[1] as SectionId];
  if (progress < 0.65) return SECTION_LABELS[SECTION_IDS[2] as SectionId];
  if (progress < 0.8) return SECTION_LABELS[SECTION_IDS[3] as SectionId];
  if (progress < 0.9) return SECTION_LABELS[SECTION_IDS[4] as SectionId];
  return SECTION_LABELS[SECTION_IDS[5] as SectionId];
}

export default function SectionIndicator({ scrollProgress }: SectionIndicatorProps) {
  const [activeSection, setActiveSection] = useState('Home');
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSection = getSectionLabel(scrollProgress);
    if (newSection !== activeSection && textRef.current) {
      const el = textRef.current;
      gsap.timeline()
        .to(el, { y: 15, opacity: 0, duration: 0.15, ease: 'power2.in' })
        .call(() => setActiveSection(newSection))
        .set(el, { y: -15 })
        .to(el, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' });
    }
    if (lineRef.current) {
      const scaled = (scrollProgress * 10) % 1;
      gsap.to(lineRef.current, { scaleX: 0.4 + scaled * 0.6, duration: 0.1 });
    }
  }, [scrollProgress, activeSection]);

  return (
    <div className="fixed bottom-8 left-8 z-40 hidden md:flex flex-col items-start pointer-events-none">
      <div ref={lineRef} className="w-10 h-[2px] bg-white/30 mb-2 origin-left" />
      <div className="overflow-hidden h-5">
        <div
          ref={textRef}
          style={{
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontSize: '0.7rem',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: '#d0c8b8',
          }}
        >
          {activeSection}
        </div>
      </div>
    </div>
  );
}
