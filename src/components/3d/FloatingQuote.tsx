'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingQuoteProps {
  text: string;
  author?: string;
  position: [number, number, number];
  triggerDistance?: number;
}

export default function FloatingQuote({ text, author, position, triggerDistance = 12 }: FloatingQuoteProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentX = useRef(-5);
  const currentOpacity = useRef(0);
  const htmlRef = useRef<HTMLDivElement>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const camZ = state.camera.position.z;
    const dist = Math.abs(camZ - position[2]);

    let targetX = -5;
    let targetOpacity = 0;

    if (dist < triggerDistance) {
      const t = 1 - dist / triggerDistance;
      const eased = t * t * (3 - 2 * t);
      targetX = THREE.MathUtils.lerp(-5, 0, eased);
      targetOpacity = eased;
    }

    currentX.current += (targetX - currentX.current) * 0.06;
    currentOpacity.current += (targetOpacity - currentOpacity.current) * 0.06;

    groupRef.current.position.x = currentX.current;
    groupRef.current.visible = currentOpacity.current > 0.01;

    if (htmlRef.current) {
      htmlRef.current.style.opacity = String(currentOpacity.current);
    }
  });

  return (
    <group position={[position[0], position[1], position[2]]}>
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
              background: 'rgba(240, 235, 227, 0.8)',
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
