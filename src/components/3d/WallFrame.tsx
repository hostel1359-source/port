'use client';

import React, { useMemo } from 'react';
import { Html, Outlines } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface WallFrameProps {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
  color: string;
  label: string;
}

export default function WallFrame({ position, rotation, width, height, color, label }: WallFrameProps) {
  const frameMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color }), [color]);
  const backMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff' }), []);
  const thickness = 0.05;
  const frameWidth = 0.1;

  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow, very subtle float
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[2]) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Top frame */}
      <mesh position={[0, height / 2 - frameWidth / 2, thickness / 2]} material={frameMaterial}>
        <boxGeometry args={[width, frameWidth, thickness]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
      {/* Bottom frame */}
      <mesh position={[0, -height / 2 + frameWidth / 2, thickness / 2]} material={frameMaterial}>
        <boxGeometry args={[width, frameWidth, thickness]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
      {/* Left frame */}
      <mesh position={[-width / 2 + frameWidth / 2, 0, thickness / 2]} material={frameMaterial}>
        <boxGeometry args={[frameWidth, height - frameWidth * 2, thickness]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
      {/* Right frame */}
      <mesh position={[width / 2 - frameWidth / 2, 0, thickness / 2]} material={frameMaterial}>
        <boxGeometry args={[frameWidth, height - frameWidth * 2, thickness]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      {/* Backing */}
      <mesh position={[0, 0, 0]} material={backMaterial}>
        <planeGeometry args={[width, height]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      <Html position={[0, -height / 2 - 0.2, 0]} center transform distanceFactor={10}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '14px',
          color: '#1a1a1a',
          background: '#f0ebe3',
          padding: '4px 8px',
          border: '1px solid #1a1a1a',
          whiteSpace: 'nowrap'
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}
