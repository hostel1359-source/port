'use client';

import React, { useMemo, useState, useEffect } from 'react';
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
  const [openProject, setOpenProject] = useState<number | null>(null);

  // Listen for door click events
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const idx = PROJECTS.findIndex(p => p.id === e.detail.projectId);
      if (idx >= 0) setOpenProject(idx);
    };
    window.addEventListener('openProjectRoom' as string, handler as EventListener);
    return () => window.removeEventListener('openProjectRoom' as string, handler as EventListener);
  }, []);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenProject(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const activeWindow = useMemo(() => {
    return PROJECT_WINDOWS.find(
      (w) => scrollProgress >= w.start && scrollProgress <= w.end
    ) || null;
  }, [scrollProgress]);

  // Fullscreen project room
  if (openProject !== null) {
    const project = PROJECTS[openProject];
    if (!project) return null;

    return (
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9000,
          background: 'rgba(10, 8, 6, 0.95)',
          backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'roomFadeIn 0.4s ease-out',
          cursor: 'default',
        }}
        onClick={() => setOpenProject(null)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '780px', width: '90%', maxHeight: '85vh',
            overflowY: 'auto', padding: '50px 60px',
            fontFamily: 'Inter, -apple-system, sans-serif',
            color: '#e8e0d0', position: 'relative',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setOpenProject(null)}
            style={{
              position: 'absolute', top: '10px', right: '10px',
              background: 'none', border: '1px solid rgba(255,255,255,0.2)',
              color: '#999', fontSize: '18px', cursor: 'pointer',
              width: '36px', height: '36px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#999'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          >
            ✕
          </button>

          {/* Number */}
          <div style={{
            fontSize: '64px', fontWeight: 800, color: project.accentColor,
            opacity: 0.15, position: 'absolute', top: '20px', left: '60px',
            fontFamily: '"Gloria Hallelujah", cursive',
          }}>
            {(openProject + 1).toString().padStart(2, '0')}
          </div>

          {/* Accent line */}
          <div style={{
            width: '60px', height: '3px', background: project.accentColor,
            marginBottom: '24px', borderRadius: '2px',
          }} />

          {/* Title */}
          <h1 style={{
            fontSize: '2.8rem', fontWeight: 800, color: '#ffffff',
            margin: '0 0 8px', lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            {project.title}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.1rem', fontWeight: 400, color: project.accentColor,
            marginBottom: '32px', letterSpacing: '0.02em',
          }}>
            {project.description}
          </p>

          {/* Divider */}
          <div style={{
            height: '1px', background: 'rgba(255,255,255,0.1)',
            marginBottom: '28px',
          }} />

          {/* Long description */}
          <p style={{
            fontSize: '1rem', fontWeight: 300, color: '#c0b8a8',
            lineHeight: 1.8, marginBottom: '36px',
          }}>
            {project.longDescription}
          </p>

          {/* Tech stack */}
          <div style={{ marginBottom: '36px' }}>
            <h3 style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#8a7560', marginBottom: '14px',
            }}>
              Tech Stack
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.technologies.map((tech) => (
                <span key={tech} style={{
                  padding: '6px 16px', fontSize: '0.8rem', fontWeight: 500,
                  color: '#e8e0d0', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '4px', letterSpacing: '0.03em',
                  background: 'rgba(255,255,255,0.04)',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 28px', fontSize: '0.8rem', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#0a0806', background: '#e8e0d0', textDecoration: 'none',
                borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#e8e0d0'; }}
            >
              View on GitHub ↗
            </a>
            <button
              onClick={() => setOpenProject(null)}
              style={{
                padding: '12px 28px', fontSize: '0.8rem', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#e8e0d0', background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.25)',
                borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              Back to Corridor
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Auto side panel (when not in fullscreen mode)
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
          borderRadius: '14px', padding: '36px 40px', maxWidth: '420px', width: '380px',
          color: '#e8e0d0', fontFamily: 'Inter, -apple-system, sans-serif',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 16px 60px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '16px', fontWeight: 600, color: project.accentColor, opacity: 0.7 }}>
            {(activeWindow.projectIndex + 1).toString().padStart(2, '0')}
          </span>
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          {project.title}
        </h2>
        <p style={{ fontSize: '0.9rem', fontWeight: 300, fontStyle: 'italic', color: '#d0c8b8', lineHeight: 1.7, marginBottom: '20px' }}>
          {project.longDescription}
        </p>
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
        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href={project.githubUrl} target="_blank" rel="noopener noreferrer"
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
          <button
            onClick={() => setOpenProject(activeWindow.projectIndex)}
            style={{
              padding: '10px 22px', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#0a0806', background: '#e8e0d0',
              border: 'none', borderRadius: '5px', cursor: 'pointer',
            }}
          >
            ENTER ROOM
          </button>
        </div>
      </div>
    </div>
  );
}
