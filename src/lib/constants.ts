export const COLORS = {
  void: '#050510',
  voidLight: '#0a0a1a',
  surface: '#12121f',
  elevated: '#1a1a2e',
  accentBlue: '#4f9cf5',
  accentViolet: '#8b5cf6',
  accentCyan: '#38bdf8',
  text: '#e2e8f0',
  textMuted: '#64748b',
} as const;

export const SECTION_IDS = [
  'hero',
  'about',
  'projects',
  'skills',
  'github',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const SECTION_LABELS: Record<SectionId, string> = {
  hero: 'Home',
  about: 'About',
  projects: 'Projects',
  skills: 'Skills',
  github: 'GitHub',
  contact: 'Contact',
};

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

export const PERFORMANCE_CONFIG = {
  high: { dpr: 1.5, particles: 1, postprocessing: true },
  medium: { dpr: 1.25, particles: 0.5, postprocessing: true },
  low: { dpr: 1, particles: 0.25, postprocessing: false },
} as const;

export type PerformanceTier = keyof typeof PERFORMANCE_CONFIG;
