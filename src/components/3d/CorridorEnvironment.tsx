'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Outlines } from '@react-three/drei';

export default function CorridorEnvironment() {
  const corridorLength = 180;
  const corridorWidth = 8;
  const wallHeight = 5;

  // itomdev-style: warm cream paper walls, light wood floor, sketch outlines
  const floorMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d4c8b0', roughness: 0.9 }), []);
  const wallMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f0ebe3', roughness: 0.85 }), []);
  const ceilingMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f5f0eb', roughness: 1.0 }), []);

  return (
    <group>
      {/* Soft warm ambient — like paper in daylight */}
      <ambientLight intensity={0.9} color="#fff8f0" />
      <directionalLight position={[0, 4, 0]} intensity={0.5} color="#ffffff" />

      {/* Warm point lights along corridor */}
      {Array.from({ length: 12 }).map((_, i) => (
        <pointLight key={i} position={[0, 3.5, -i * 15]} intensity={0.4} distance={20} color="#fff5e6" />
      ))}

      {/* White fog — itomdev fades to white in distance */}
      <fog attach="fog" args={['#f5f0eb', 15, 65]} />

      {/* Floor — light wood plank color */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -corridorLength / 2 + 10]} material={floorMaterial}>
        <planeGeometry args={[corridorWidth, corridorLength]} />
        <Outlines thickness={0.015} color="#aaa095" />
      </mesh>

      {/* Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-corridorWidth / 2, wallHeight / 2, -corridorLength / 2 + 10]} material={wallMaterial}>
        <planeGeometry args={[corridorLength, wallHeight]} />
        <Outlines thickness={0.015} color="#c0b8a8" />
      </mesh>

      {/* Right Wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[corridorWidth / 2, wallHeight / 2, -corridorLength / 2 + 10]} material={wallMaterial}>
        <planeGeometry args={[corridorLength, wallHeight]} />
        <Outlines thickness={0.015} color="#c0b8a8" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, wallHeight, -corridorLength / 2 + 10]} material={ceilingMaterial}>
        <planeGeometry args={[corridorWidth, corridorLength]} />
        <Outlines thickness={0.015} color="#d0c8b8" />
      </mesh>
    </group>
  );
}
