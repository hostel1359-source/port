'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Outlines } from '@react-three/drei';

export default function CorridorEnvironment() {
  const corridorLength = 180;
  const corridorWidth = 8;
  const wallHeight = 5;

  // Roblox-style blocky materials with cyberpunk neon colors
  const floorMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a1a2e', roughness: 0.3, metalness: 0.2 }), []);
  const wallMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#16213e', roughness: 0.4, metalness: 0.1 }), []);
  const ceilingMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0f0f23', roughness: 0.5 }), []);
  const trimMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#00fff5', emissive: '#00fff5', emissiveIntensity: 0.3, roughness: 0.2, metalness: 0.8 }), []);

  return (
    <group>
      {/* Ambient - darker for cyberpunk */}
      <ambientLight intensity={0.3} color="#4a00e0" />
      <directionalLight position={[0, 4, 0]} intensity={0.4} color="#e040fb" />

      {/* Neon point lights along corridor */}
      {Array.from({ length: 12 }).map((_, i) => (
        <pointLight key={i} position={[0, 4.2, -i * 15]} intensity={0.8} distance={18} color={i % 2 === 0 ? '#00fff5' : '#e040fb'} />
      ))}

      {/* Cyberpunk fog */}
      <fog attach="fog" args={['#0a0a1a', 20, 70]} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -corridorLength / 2 + 10]} material={floorMaterial}>
        <planeGeometry args={[corridorWidth, corridorLength]} />
        <Outlines thickness={0.025} color="#00fff5" />
      </mesh>

      {/* Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-corridorWidth / 2, wallHeight / 2, -corridorLength / 2 + 10]} material={wallMaterial}>
        <planeGeometry args={[corridorLength, wallHeight]} />
        <Outlines thickness={0.025} color="#e040fb" />
      </mesh>

      {/* Right Wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[corridorWidth / 2, wallHeight / 2, -corridorLength / 2 + 10]} material={wallMaterial}>
        <planeGeometry args={[corridorLength, wallHeight]} />
        <Outlines thickness={0.025} color="#e040fb" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, wallHeight, -corridorLength / 2 + 10]} material={ceilingMaterial}>
        <planeGeometry args={[corridorWidth, corridorLength]} />
        <Outlines thickness={0.025} color="#4a00e0" />
      </mesh>

      {/* Neon floor trim strips (Roblox-style blocky neon bars) */}
      <mesh position={[-corridorWidth / 2 + 0.15, 0.02, -corridorLength / 2 + 10]} rotation={[-Math.PI / 2, 0, 0]} material={trimMaterial}>
        <planeGeometry args={[0.08, corridorLength]} />
      </mesh>
      <mesh position={[corridorWidth / 2 - 0.15, 0.02, -corridorLength / 2 + 10]} rotation={[-Math.PI / 2, 0, 0]} material={trimMaterial}>
        <planeGeometry args={[0.08, corridorLength]} />
      </mesh>

      {/* Ceiling neon trim strips */}
      <mesh position={[-corridorWidth / 2 + 0.15, wallHeight - 0.02, -corridorLength / 2 + 10]} rotation={[Math.PI / 2, 0, 0]} material={trimMaterial}>
        <planeGeometry args={[0.08, corridorLength]} />
      </mesh>
      <mesh position={[corridorWidth / 2 - 0.15, wallHeight - 0.02, -corridorLength / 2 + 10]} rotation={[Math.PI / 2, 0, 0]} material={trimMaterial}>
        <planeGeometry args={[0.08, corridorLength]} />
      </mesh>
    </group>
  );
}
