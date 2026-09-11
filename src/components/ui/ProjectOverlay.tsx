'use client';

import React from 'react';
import { PROJECTS } from '@/data/projects';

interface ProjectOverlayProps {
  projectId: string | null;
  onClose: () => void;
}

export default function ProjectOverlay({ projectId, onClose }: ProjectOverlayProps) {
  if (!projectId) return null;

  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return null;

  const index = PROJECTS.findIndex((p) => p.id === projectId);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.4s ease',
      }}
    >
      {/* Dark backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Back arrow */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '32px',
          left: '32px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="15" y1="10" x2="5" y2="10" />
          <polyline points="10 5 5 10 10 15" />
        </svg>
      </button>

      {/* Project card */}
      <div
        style={{
          position: 'relative',
          background: 'rgba(60, 55, 48, 0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '48px 56px',
          maxWidth: '580px',
          width: '90%',
          color: '#e8e0d0',
          fontFamily: 'Inter, -apple-system, sans-serif',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          animation: 'slideUp 0.5s ease',
        }}
      >
        {/* Number + Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span style={{
            fontSize: '18px',
            fontWeight: 600,
            color: project.accentColor,
            opacity: 0.7,
          }}>
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <span style={{ fontSize: '24px' }}>{project.icon}</span>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 16px 0',
          lineHeight: 1.2,
        }}>
          {project.title}
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '1rem',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#d0c8b8',
          lineHeight: 1.7,
          marginBottom: '28px',
        }}>
          {project.longDescription}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {project.technologies.map((tech) => (
            <span
              key={tech}
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: '#d0c8b8',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '4px',
                letterSpacing: '0.02em',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View Source button */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#e8e0d0',
            textDecoration: 'none',
            border: '1.5px solid rgba(255,255,255,0.25)',
            borderRadius: '6px',
            transition: 'all 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          }}
        >
          VIEW SOURCE ↗
        </a>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
