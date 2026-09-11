'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Outlines } from '@react-three/drei';

export default function CorridorEnvironment() {
  const corridorLength = 180;
  const corridorWidth = 8;
  const wallHeight = 5;

  const floorMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#8B7355', roughness: 0.9 }), []);
  const wallMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f0ebe3', roughness: 0.8 }), []);
  const ceilingMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#faf5ee', roughness: 1.0 }), []);

  return (
    <group>
      {/* Lights */}
      <ambientLight intensity={0.8} color="#fff5e6" />
      <directionalLight position={[0, 4, 0]} intensity={0.6} color="#ffffff" />

      {/* Point lights along the corridor for even illumination */}
      {Array.from({ length: 12 }).map((_, i) => (
        <pointLight key={i} position={[0, 3, -i * 15]} intensity={0.5} distance={20} color="#fff5e6" />
      ))}

      {/* Fog to hide distant ends and add depth */}
      <fog attach="fog" args={['#f5f0eb', 15, 65]} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -corridorLength / 2 + 10]} material={floorMaterial}>
        <planeGeometry args={[corridorWidth, corridorLength]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      {/* Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-corridorWidth / 2, wallHeight / 2, -corridorLength / 2 + 10]} material={wallMaterial}>
        <planeGeometry args={[corridorLength, wallHeight]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      {/* Right Wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[corridorWidth / 2, wallHeight / 2, -corridorLength / 2 + 10]} material={wallMaterial}>
        <planeGeometry args={[corridorLength, wallHeight]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, wallHeight, -corridorLength / 2 + 10]} material={ceilingMaterial}>
        <planeGeometry args={[corridorWidth, corridorLength]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
    </group>
  );
}
