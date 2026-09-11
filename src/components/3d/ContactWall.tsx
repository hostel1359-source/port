'use client';

import React, { useState, useMemo } from 'react';
import { Html, Outlines } from '@react-three/drei';
import * as THREE from 'three';
import { PERSONAL } from '@/data/personal';

interface ContactWallProps {
  position: [number, number, number];
}

export default function ContactWall({ position }: ContactWallProps) {
  const [showEmail, setShowEmail] = useState(false);
  const boardMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f0ebe3', roughness: 0.6 }), []);

  return (
    <group position={position}>
      <pointLight position={[0, 3.5, 0]} intensity={1.5} distance={15} color="#fff5e6" />
      <pointLight position={[-2, 2.5, 0]} intensity={0.5} distance={10} color="#fff5e6" />
      <pointLight position={[2, 2.5, 0]} intensity={0.5} distance={10} color="#fff5e6" />

      {/* Large board */}
      <mesh position={[0, 2, -3]} material={boardMat}>
        <boxGeometry args={[6, 4, 0.08]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      {/* Content — using occlude={false} and high zIndex for clickability */}
      <Html
        position={[0, 2, -2.85]}
        transform
        center
        distanceFactor={4}
        zIndexRange={[200, 100]}
        style={{ pointerEvents: 'auto' }}
      >
        <div style={{
          width: '500px',
          textAlign: 'center',
          fontFamily: 'Inter, -apple-system, sans-serif',
          position: 'relative',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-gloria), "Gloria Hallelujah", cursive',
            fontSize: '34px',
            color: '#333',
            marginBottom: '10px',
          }}>
            Got an idea?
          </h2>

          <p style={{
            fontFamily: 'var(--font-caveat), "Caveat", cursive',
            fontSize: '22px',
            color: '#555',
            marginBottom: '32px',
          }}>
            Let&apos;s make it happen.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
            {/* GitHub button */}
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); window.open(PERSONAL.github, '_blank'); }}
              style={{
                fontFamily: 'Inter, -apple-system, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                color: '#333',
                textDecoration: 'none',
                padding: '12px 32px',
                border: '2px solid #333',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'inline-block',
                transition: 'all 0.2s',
                background: 'transparent',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#333'; e.currentTarget.style.color = '#f0ebe3'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#333'; }}
            >
              GitHub ↗
            </a>

            {/* Email button */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowEmail(true); }}
              style={{
                fontFamily: 'Inter, -apple-system, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                color: '#333',
                background: 'transparent',
                padding: '12px 32px',
                border: '2px solid #333',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#333'; e.currentTarget.style.color = '#f0ebe3'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#333'; }}
            >
              Email
            </button>
          </div>

          {/* Email popup overlay */}
          {showEmail && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}>
              {/* Backdrop */}
              <div
                onClick={() => setShowEmail(false)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.3)',
                }}
              />
              {/* Modal */}
              <div style={{
                position: 'relative',
                background: '#ffffff',
                border: '2px solid #333',
                borderRadius: '12px',
                padding: '32px 40px',
                boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
                minWidth: '320px',
                textAlign: 'center',
              }}>
                {/* X close button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setShowEmail(false); }}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#999',
                    cursor: 'pointer',
                    lineHeight: 1,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#333'; e.currentTarget.style.background = '#f0f0f0'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#999'; e.currentTarget.style.background = 'none'; }}
                >
                  ✕
                </button>

                <p style={{ fontSize: '11px', fontWeight: 600, color: '#888', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: '10px' }}>
                  My Email
                </p>
                <p style={{
                  fontFamily: 'var(--font-gloria), "Gloria Hallelujah", cursive',
                  fontSize: '20px',
                  fontWeight: 400,
                  color: '#333',
                  marginBottom: '16px',
                }}>
                  {PERSONAL.email}
                </p>
                <a
                  href={`mailto:${PERSONAL.email}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#fff',
                    background: '#333',
                    textDecoration: 'none',
                    padding: '10px 24px',
                    borderRadius: '6px',
                    display: 'inline-block',
                    letterSpacing: '0.08em',
                  }}
                >
                  Send Email ↗
                </a>
              </div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
