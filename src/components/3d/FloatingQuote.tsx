'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingQuoteProps {
  text: string;
  position: [number, number, number]; // target center position
  triggerDistance?: number;
}

export default function FloatingQuote({ text, position, triggerDistance = 12 }: FloatingQuoteProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentX = useRef(-6); // starts off to the left
  const currentOpacity = useRef(0);
  const htmlRef = useRef<HTMLDivElement>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const camZ = state.camera.position.z;
    const dist = Math.abs(camZ - position[2]);

    // Slide in when camera is within triggerDistance
    let targetX = -6; // off-screen left
    let targetOpacity = 0;

    if (dist < triggerDistance) {
      const t = 1 - dist / triggerDistance;
      const eased = t * t * (3 - 2 * t); // smoothstep
      targetX = THREE.MathUtils.lerp(-6, 0, eased);
      targetOpacity = eased;
    }

    // Smooth interpolation
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
          distanceFactor={8}
          zIndexRange={[200, 0]}
        >
          <div
            ref={htmlRef}
            style={{
              fontFamily: '"Caveat", "Gloria Hallelujah", cursive',
              fontSize: '28px',
              fontWeight: 700,
              color: '#3d2e22',
              whiteSpace: 'pre-line',
              lineHeight: 1.6,
              textAlign: 'center',
              maxWidth: '500px',
              padding: '24px 32px',
              background: 'rgba(240, 235, 227, 0.85)',
              borderRadius: '8px',
              border: '2px solid rgba(60, 46, 34, 0.15)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div style={{
              fontSize: '48px',
              lineHeight: 1,
              marginBottom: '12px',
              color: 'rgba(60, 46, 34, 0.2)',
            }}>
              ❝
            </div>
            {text}
            <div style={{
              marginTop: '16px',
              fontSize: '14px',
              fontStyle: 'italic',
              color: 'rgba(60, 46, 34, 0.45)',
              fontFamily: 'Inter, -apple-system, sans-serif',
            }}>
              — Martin Fowler
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
