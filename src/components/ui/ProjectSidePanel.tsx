'use client';

import React, { useMemo } from 'react';
import { PROJECTS } from '@/data/projects';

interface ProjectSidePanelProps {
  scrollProgress: number;
}

// Match camera waypoints: camera is at each door's Z for these scroll ranges
const PROJECT_WINDOWS = [
  { start: 0.32, end: 0.42, projectIndex: 0, side: 'left' as const },   // DevOS
  { start: 0.45, end: 0.54, projectIndex: 1, side: 'right' as const },  // Solana
  { start: 0.56, end: 0.64, projectIndex: 2, side: 'left' as const },   // Quantum
  { start: 0.66, end: 0.74, projectIndex: 3, side: 'right' as const },  // Ephemeral
];

export default function ProjectSidePanel({ scrollProgress }: ProjectSidePanelProps) {
  const activeWindow = useMemo(() => {
    return PROJECT_WINDOWS.find(
      (w) => scrollProgress >= w.start && scrollProgress <= w.end
    ) || null;
  }, [scrollProgress]);

  if (!activeWindow) return null;

  const project = PROJECTS[activeWindow.projectIndex];
  if (!project) return null;

  // Calculate fade: fade in at start, fade out at end
  const fadeIn = Math.min(1, (scrollProgress - activeWindow.start) / 0.02);
  const fadeOut = Math.min(1, (activeWindow.end - scrollProgress) / 0.02);
  const opacity = Math.min(fadeIn, fadeOut);

  const isLeft = activeWindow.side === 'left';

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        [isLeft ? 'left' : 'right']: '32px',
        zIndex: 50,
        opacity,
        transition: 'opacity 0.3s ease',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(60, 55, 48, 0.88)',
          backdropFilter: 'blur(16px)',
          borderRadius: '14px',
          padding: '36px 40px',
          maxWidth: '420px',
          width: '380px',
          color: '#e8e0d0',
          fontFamily: 'Inter, -apple-system, sans-serif',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 16px 60px rgba(0,0,0,0.35)',
        }}
      >
        {/* Number */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '16px', fontWeight: 600, color: project.accentColor, opacity: 0.7 }}>
            {(activeWindow.projectIndex + 1).toString().padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '1.6rem', fontWeight: 700, color: '#ffffff',
          margin: '0 0 12px 0', lineHeight: 1.2,
        }}>
          {project.title}
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '0.9rem', fontWeight: 300, fontStyle: 'italic',
          color: '#d0c8b8', lineHeight: 1.7, marginBottom: '20px',
        }}>
          {project.longDescription}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} style={{
              padding: '4px 12px', fontSize: '0.75rem', fontWeight: 500,
              color: '#d0c8b8', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '3px', letterSpacing: '0.02em',
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* View Source */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '10px 22px', fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#e8e0d0', textDecoration: 'none',
            border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: '5px',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          VIEW SOURCE ↗
        </a>
      </div>
    </div>
  );
}
