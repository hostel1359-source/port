'use client';

import { useState, useEffect } from 'react';
import type { PerformanceTier } from '@/lib/constants';

export function useDeviceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>('high');

  useEffect(() => {
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 4;
    const isMobile = window.innerWidth < 768;
    const dpr = window.devicePixelRatio ?? 1;

    let score = 0;

    // Memory scoring
    if (memory >= 8) score += 3;
    else if (memory >= 4) score += 2;
    else score += 1;

    // Core scoring
    if (cores >= 8) score += 3;
    else if (cores >= 4) score += 2;
    else score += 1;

    // Mobile penalty
    if (isMobile) score -= 1;

    // High DPR penalty (rendering more pixels)
    if (dpr > 2) score -= 1;

    if (score >= 5) setTier('high');
    else if (score >= 3) setTier('medium');
    else setTier('low');
  }, []);

  return tier;
}
