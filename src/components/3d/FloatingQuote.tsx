'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingQuoteProps {
  text: string;
  author?: string;
  position: [number, number, number];
  side?: 'left' | 'right';
  triggerDistance?: number;
}

export default function FloatingQuote({ text, author, position, side = 'left', triggerDistance = 12 }: FloatingQuoteProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wallX = side === 'left' ? -3.5 : 3.5;
  const slideToX = side === 'left' ? -1.2 : 1.2;
  const currentX = useRef(wallX);
  const currentOpacity = useRef(0);
  const htmlRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const camZ = state.camera.position.z;
    const dist = Math.abs(camZ - position[2]);

    // Quote is always visible on wall (faint), slides out when near
    let targetX = wallX;
    let slideProgress = 0;

    if (dist < triggerDistance) {
      const t = 1 - dist / triggerDistance;
      slideProgress = t * t * (3 - 2 * t); // smoothstep
      targetX = THREE.MathUtils.lerp(wallX, slideToX, slideProgress);
    }

    currentX.current += (targetX - currentX.current) * 0.06;
    currentOpacity.current += (slideProgress - currentOpacity.current) * 0.06;

    groupRef.current.position.x = currentX.current;

    // Wall text fades out as slide-out text fades in
    if (wallRef.current) {
      wallRef.current.style.opacity = String(Math.max(0, 0.35 - currentOpacity.current * 0.35));
    }
    if (htmlRef.current) {
      htmlRef.current.style.opacity = String(currentOpacity.current);
    }
  });

  const rotY = side === 'left' ? Math.PI / 2 : -Math.PI / 2;

  return (
    <group position={[0, position[1], position[2]]}>
      {/* Faint text on the wall — always visible */}
      <Html
        position={[side === 'left' ? -3.84 : 3.84, 0, 0]}
        rotation={[0, rotY, 0]}
        transform
        center
        distanceFactor={5}
        zIndexRange={[50, 0]}
      >
        <div
          ref={wallRef}
          style={{
            fontFamily: '"Caveat", "Gloria Hallelujah", cursive',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(90, 80, 65, 0.35)',
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
            textAlign: side === 'left' ? 'left' : 'right',
            maxWidth: '200px',
            padding: '6px',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {text}
        </div>
      </Html>

      {/* Slide-out card — appears when near */}
      <group ref={groupRef}>
        <Html
          transform
          center
          distanceFactor={6}
          zIndexRange={[200, 0]}
        >
          <div
            ref={htmlRef}
            style={{
              fontFamily: '"Caveat", "Gloria Hallelujah", cursive',
              fontSize: '18px',
              fontWeight: 600,
              color: '#3d2e22',
              whiteSpace: 'pre-line',
              lineHeight: 1.5,
              textAlign: 'center',
              maxWidth: '320px',
              padding: '14px 20px',
              background: 'rgba(240, 235, 227, 0.85)',
              borderRadius: '6px',
              border: '1.5px solid rgba(60, 46, 34, 0.12)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {text}
            {author && (
              <div style={{
                marginTop: '8px',
                fontSize: '11px',
                fontStyle: 'italic',
                color: 'rgba(60, 46, 34, 0.4)',
                fontFamily: 'Inter, -apple-system, sans-serif',
              }}>
                — {author}
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
}
