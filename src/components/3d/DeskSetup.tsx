'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Outlines } from '@react-three/drei';

export default function DeskSetup({ position }: { position: [number, number, number] }) {
  const woodMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#5c4a3a' }), []);
  const screenMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a1a1a', emissive: '#4f9cf5', emissiveIntensity: 0.3 }), []);
  const whiteMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff' }), []);

  return (
    <group position={position}>
      {/* Desk Surface */}
      <mesh position={[0, 0.8, 0]} material={woodMaterial}>
        <boxGeometry args={[2, 0.05, 1]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
      {/* Desk Legs */}
      {[-0.9, 0.9].map((x) =>
        [-0.4, 0.4].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.4, z]} material={woodMaterial}>
            <boxGeometry args={[0.05, 0.8, 0.05]} />
            <Outlines thickness={0.02} color="#1a1a1a" />
          </mesh>
        ))
      )}
      {/* Monitor */}
      <group position={[0, 1.2, -0.2]}>
        <mesh material={whiteMaterial}>
          <boxGeometry args={[1.2, 0.8, 0.05]} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0, 0.03]} material={screenMaterial}>
          <planeGeometry args={[1.1, 0.7]} />
        </mesh>
        <mesh position={[0, -0.45, -0.05]} material={whiteMaterial}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
        <mesh position={[0, -0.5, -0.05]} material={whiteMaterial}>
          <boxGeometry args={[0.4, 0.02, 0.3]} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
      </group>
      {/* Chair */}
      <group position={[0, 0.5, 0.6]}>
        <mesh material={whiteMaterial}>
          <boxGeometry args={[0.6, 0.05, 0.5]} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0.4, 0.22]} material={whiteMaterial}>
          <boxGeometry args={[0.6, 0.8, 0.05]} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
        <mesh position={[0, -0.25, 0]} material={whiteMaterial}>
          <cylinderGeometry args={[0.05, 0.05, 0.5]} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
      </group>
      {/* Coffee Mug */}
      <mesh position={[0.7, 0.85, 0]} material={whiteMaterial}>
        <cylinderGeometry args={[0.05, 0.05, 0.1]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
    </group>
  );
}
