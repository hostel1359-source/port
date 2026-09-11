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

      {/* Auto-appearing project side panels */}
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
