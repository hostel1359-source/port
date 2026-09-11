'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, Outlines } from '@react-three/drei';
import { PERSONAL } from '@/data/personal';

interface AboutNotebookProps {
  position: [number, number, number];
  scrollProgress: number;
}

export default function AboutNotebook({ position, scrollProgress }: AboutNotebookProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftPageRef = useRef<THREE.Group>(null);
  const rightPageRef = useRef<THREE.Group>(null);

  const coverMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a1a2e', roughness: 0.3, metalness: 0.4 }), []);
  const pageMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#16213e', roughness: 0.4 }), []);

  const openStart = 0.06;
  const openFull = 0.12;
  const closeStart = 0.17;
  const closeEnd = 0.20;

  useFrame(() => {
    if (!groupRef.current || !leftPageRef.current || !rightPageRef.current) return;

    const visible = scrollProgress >= openStart && scrollProgress <= closeEnd;
    groupRef.current.visible = visible;
    if (!visible) return;

    let openAmount = 0;
    if (scrollProgress >= openStart && scrollProgress <= openFull) {
      openAmount = (scrollProgress - openStart) / (openFull - openStart);
    } else if (scrollProgress > openFull && scrollProgress <= closeStart) {
      openAmount = 1;
    } else if (scrollProgress > closeStart && scrollProgress <= closeEnd) {
      openAmount = 1 - (scrollProgress - closeStart) / (closeEnd - closeStart);
    }

    openAmount = THREE.MathUtils.clamp(openAmount, 0, 1);
    const eased = openAmount * openAmount * (3 - 2 * openAmount);

    leftPageRef.current.rotation.y = -eased * (Math.PI / 2);
    rightPageRef.current.rotation.y = eased * (Math.PI / 2);

    const s = 0.5 + eased * 0.5;
    groupRef.current.scale.setScalar(s);
  });

  const pageW = 3.0;
  const pageH = 4.0;

  return (
    <group ref={groupRef} position={position}>
      <pointLight position={[0, 0, 3]} intensity={3} distance={8} color="#ffffff" />
      <pointLight position={[-3, 0, 2]} intensity={1.2} distance={6} color="#fff5e6" />
      <pointLight position={[3, 0, 2]} intensity={1.2} distance={6} color="#fff5e6" />

      {/* LEFT PAGE */}
      <group ref={leftPageRef}>
        <mesh position={[-pageW / 2, 0, -0.03]} material={coverMat}>
          <boxGeometry args={[pageW, pageH, 0.04]} />
          <Outlines thickness={0.02} color="#00fff5" />
        </mesh>
        <mesh position={[-pageW / 2, 0, 0.005]}>
          <boxGeometry args={[pageW - 0.1, pageH - 0.1, 0.005]} />
          <meshStandardMaterial color="#0f0f23" />
        </mesh>
        {scrollProgress >= openStart && scrollProgress <= closeEnd && (
          <Html
            position={[-pageW / 2, 0, 0.015]}
            transform
            center
            distanceFactor={1}
            scale={0.85}
            style={{ pointerEvents: 'none' }}
          >
            <div style={{ width: '800px', fontFamily: 'Inter, -apple-system, sans-serif', textAlign: 'left', padding: '50px' }}>
              <h2 style={{
                fontFamily: 'var(--font-gloria), "Gloria Hallelujah", cursive',
                fontSize: '120px', color: '#00fff5', margin: '0 0 30px 0', textAlign: 'center',
                textShadow: '0 0 20px rgba(0, 255, 245, 0.5)',
              }}>About Me</h2>
              <div style={{ width: '100px', height: '6px', background: '#e040fb', margin: '0 auto 40px auto', boxShadow: '0 0 10px #e040fb' }} />
              <p style={{ fontSize: '64px', fontWeight: 400, fontStyle: 'italic', color: '#e0e0ff', lineHeight: 1.5 }}>
                {PERSONAL.bio}
              </p>
            </div>
          </Html>
        )}
      </group>

      {/* RIGHT PAGE */}
      <group ref={rightPageRef}>
        <mesh position={[pageW / 2, 0, -0.03]} material={coverMat}>
          <boxGeometry args={[pageW, pageH, 0.04]} />
          <Outlines thickness={0.02} color="#00fff5" />
        </mesh>
        <mesh position={[pageW / 2, 0, 0.005]}>
          <boxGeometry args={[pageW - 0.1, pageH - 0.1, 0.005]} />
          <meshStandardMaterial color="#0f0f23" />
        </mesh>
        {scrollProgress >= openStart && scrollProgress <= closeEnd && (
          <Html
            position={[pageW / 2, 0, 0.015]}
            transform
            center
            distanceFactor={1}
            scale={0.85}
            style={{ pointerEvents: 'none' }}
          >
            <div style={{ width: '700px', fontFamily: 'Inter, -apple-system, sans-serif', padding: '50px' }}>
              <h3 style={{
                fontFamily: 'var(--font-gloria), "Gloria Hallelujah", cursive',
                fontSize: '100px', color: '#e040fb', margin: '0 0 30px 0', textAlign: 'center',
                textShadow: '0 0 20px rgba(224, 64, 251, 0.5)',
              }}>Interests</h3>
              <div style={{ width: '80px', height: '6px', background: '#00fff5', margin: '0 auto 40px auto', boxShadow: '0 0 10px #00fff5' }} />
              {PERSONAL.interests.map((interest) => (
                <div key={interest} style={{
                  fontSize: '56px', fontWeight: 500, color: '#e0e0ff', marginBottom: '30px',
                  display: 'flex', alignItems: 'center', gap: '20px', lineHeight: 1.4,
                }}>
                  <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#00fff5', flexShrink: 0, boxShadow: '0 0 8px #00fff5' }} />
                  {interest}
                </div>
              ))}
            </div>
          </Html>
        )}
      </group>

      {/* Spine */}
      <mesh material={pageMat} position={[0, 0, -0.03]}>
        <boxGeometry args={[0.08, pageH, 0.08]} />
        <Outlines thickness={0.015} color="#e040fb" />
      </mesh>
    </group>
  );
}
