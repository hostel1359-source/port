'use client';

import { useState, useRef, useCallback, lazy, Suspense } from 'react';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { useDeviceTier } from '@/hooks/useDeviceTier';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Navigation from '@/components/ui/Navigation';
import CustomCursor from '@/components/ui/CustomCursor';
import SectionIndicator from '@/components/ui/SectionIndicator';
import WebGLFallback from '@/components/ui/WebGLFallback';
import ProjectSidePanel from '@/components/ui/ProjectSidePanel';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import GitHubSection from '@/components/sections/GitHubSection';
import ContactSection from '@/components/sections/ContactSection';

const Scene = lazy(() => import('@/components/3d/Scene'));

const PROJECT_COLORS = ['#4f9cf5', '#38bdf8', '#8b5cf6', '#ef4444'];

function ColorWash({ scrollProgress }: { scrollProgress: number }) {
  // Map scroll ranges to project accent colors
  const ranges = [
    { start: 0.30, peak: 0.38, end: 0.44 },
    { start: 0.44, peak: 0.50, end: 0.56 },
    { start: 0.56, peak: 0.60, end: 0.66 },
    { start: 0.66, peak: 0.70, end: 0.76 },
  ];

  let color = 'transparent';
  let opacity = 0;

  for (let i = 0; i < ranges.length; i++) {
    const r = ranges[i];
    if (scrollProgress >= r.start && scrollProgress <= r.end) {
      const distFromPeak = Math.abs(scrollProgress - r.peak);
      const halfWidth = (r.end - r.start) / 2;
      opacity = Math.max(0, 1 - distFromPeak / halfWidth) * 0.12;
      color = PROJECT_COLORS[i];
      break;
    }
  }

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 5,
        background: `radial-gradient(ellipse at center, ${color}, transparent 70%)`,
        opacity,
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}

function PortfolioContent() {
  const scrollProgress = useScrollProgress();
  const mouseRef = useMouseParallax();
  const { supported: webglSupported } = useWebGLSupport();
  const deviceTier = useDeviceTier();
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (!webglSupported) {
    return <WebGLFallback />;
  }

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={handleLoadComplete} />}
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true" />

      <div ref={containerRef} className="relative min-h-screen">
        <div className="canvas-container" aria-hidden="true">
          <Suspense fallback={null}>
            <Scene
              scrollProgress={scrollProgress}
              mouseRef={mouseRef}
              performanceTier={deviceTier}
            />
          </Suspense>
        </div>

        <Navigation scrollProgress={scrollProgress} />
        <SectionIndicator scrollProgress={scrollProgress} />

        <main className="relative z-10 pointer-events-none">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <GitHubSection />
          <ContactSection />
        </main>
      </div>

      {/* Color wash overlay — tint shifts near each door */}
      <ColorWash scrollProgress={scrollProgress} />

      {/* Auto-appearing project side panels + fullscreen rooms */}
      <ProjectSidePanel scrollProgress={scrollProgress} />
    </>
  );
}

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <PortfolioContent />
    </SmoothScrollProvider>
  );
}
