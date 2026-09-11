'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { PROJECTS } from '@/data/projects';

interface ProjectSidePanelProps {
  scrollProgress: number;
}

const PROJECT_WINDOWS = [
  { start: 0.32, end: 0.42, projectIndex: 0, side: 'left' as const },
  { start: 0.45, end: 0.54, projectIndex: 1, side: 'right' as const },
  { start: 0.56, end: 0.64, projectIndex: 2, side: 'left' as const },
  { start: 0.66, end: 0.74, projectIndex: 3, side: 'right' as const },
];

export default function ProjectSidePanel({ scrollProgress }: ProjectSidePanelProps) {
  const [insideProject, setInsideProject] = useState<number | null>(null);

  // Listen for camera-entered-door event (after fly-through completes)
  useEffect(() => {
    const handleEntered = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const idx = PROJECTS.findIndex(p => p.id === detail.projectId);
      if (idx >= 0) setInsideProject(idx);
    };
    window.addEventListener('doorEntered', handleEntered);
    return () => window.removeEventListener('doorEntered', handleEntered);
  }, []);

  // Escape to exit
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && insideProject !== null) {
        setInsideProject(null);
        window.dispatchEvent(new CustomEvent('doorExit'));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [insideProject]);

  const handleExit = useCallback(() => {
    setInsideProject(null);
    // Tell CameraRig to fly back
    window.dispatchEvent(new CustomEvent('doorExit'));
  }, []);

  // ---- INSIDE A PROJECT ROOM ----
  if (insideProject !== null) {
    const project = PROJECTS[insideProject];
    if (!project) return null;

    return (
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'roomFadeIn 0.5s ease-out',
          pointerEvents: 'auto',
        }}
      >
        {/* Semi-transparent backdrop */}
        <div
          onClick={handleExit}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(10, 8, 6, 0.85)',
            backdropFilter: 'blur(12px)',
          }}
        />

        {/* Content card */}
        <div
          style={{
            position: 'relative', zIndex: 1,
            maxWidth: '700px', width: '90%', maxHeight: '80vh',
            overflowY: 'auto', padding: '48px 56px',
            background: 'rgba(30, 27, 22, 0.95)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            fontFamily: 'Inter, -apple-system, sans-serif',
            color: '#e8e0d0',
          }}
        >
          {/* Big number watermark */}
          <div style={{
            position: 'absolute', top: '16px', left: '56px',
            fontSize: '72px', fontWeight: 800, color: project.accentColor,
            opacity: 0.1, fontFamily: '"Gloria Hallelujah", cursive',
            lineHeight: 1,
          }}>
            {(insideProject + 1).toString().padStart(2, '0')}
          </div>

          {/* Accent line */}
          <div style={{
            width: '50px', height: '3px', background: project.accentColor,
            marginBottom: '20px', borderRadius: '2px',
          }} />

          {/* Title */}
          <h1 style={{
            fontSize: '2.4rem', fontWeight: 800, color: '#ffffff',
            margin: '0 0 6px', lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            {project.title}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1rem', fontWeight: 400, color: project.accentColor,
            marginBottom: '28px', letterSpacing: '0.02em',
          }}>
            {project.description}
          </p>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '24px' }} />

          {/* Description */}
          <p style={{
            fontSize: '0.95rem', fontWeight: 300, color: '#b8b0a0',
            lineHeight: 1.8, marginBottom: '32px',
          }}>
            {project.longDescription}
          </p>

          {/* Tech stack */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#8a7560', marginBottom: '12px',
            }}>
              Built With
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.technologies.map((tech) => (
                <span key={tech} style={{
                  padding: '5px 14px', fontSize: '0.78rem', fontWeight: 500,
                  color: '#d8d0c0', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '4px', background: 'rgba(255,255,255,0.03)',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '11px 26px', fontSize: '0.78rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#0a0806', background: '#e8e0d0', textDecoration: 'none',
                borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#e8e0d0'; }}
            >
              View Source ↗
            </a>
            <button
              onClick={handleExit}
              style={{
                padding: '11px 26px', fontSize: '0.78rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#e8e0d0', background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.2)',
                borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- NORMAL CORRIDOR: auto side panel on scroll proximity ----
  const activeWindow = PROJECT_WINDOWS.find(
    (w) => scrollProgress >= w.start && scrollProgress <= w.end
  ) || null;

  if (!activeWindow) return null;

  const project = PROJECTS[activeWindow.projectIndex];
  if (!project) return null;

  const fadeIn = Math.min(1, (scrollProgress - activeWindow.start) / 0.02);
  const fadeOut = Math.min(1, (activeWindow.end - scrollProgress) / 0.02);
  const opacity = Math.min(fadeIn, fadeOut);
  const isLeft = activeWindow.side === 'left';

  return (
    <div
      style={{
        position: 'fixed', top: '50%', transform: 'translateY(-50%)',
        [isLeft ? 'left' : 'right']: '32px', zIndex: 50, opacity,
        transition: 'opacity 0.3s ease',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(60, 55, 48, 0.88)', backdropFilter: 'blur(16px)',
          borderRadius: '14px', padding: '32px 36px', maxWidth: '380px', width: '340px',
          color: '#e8e0d0', fontFamily: 'Inter, -apple-system, sans-serif',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 16px 60px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ marginBottom: '14px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: project.accentColor, opacity: 0.7 }}>
            {(activeWindow.projectIndex + 1).toString().padStart(2, '0')}
          </span>
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', margin: '0 0 10px 0', lineHeight: 1.2 }}>
          {project.title}
        </h2>
        <p style={{ fontSize: '0.85rem', fontWeight: 300, fontStyle: 'italic', color: '#d0c8b8', lineHeight: 1.7, marginBottom: '18px' }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} style={{
              padding: '3px 10px', fontSize: '0.7rem', fontWeight: 500,
              color: '#d0c8b8', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '3px',
            }}>
              {tech}
            </span>
          ))}
        </div>
        <p style={{
          fontSize: '0.65rem', fontWeight: 500, color: '#8a7560',
          letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>
          Click the door to enter →
        </p>
      </div>
    </div>
  );
}
