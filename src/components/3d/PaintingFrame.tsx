'use client';

import React, { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import { Outlines } from '@react-three/drei';
import * as THREE from 'three';

interface PaintingFrameProps {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
  imagePath: string;
  label: string;
}

export default function PaintingFrame({ position, rotation, width, height, imagePath, label }: PaintingFrameProps) {
  const texture = useTexture(imagePath);
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3d2e22', roughness: 0.5 }), []);

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh position={[0, 0, -0.03]} material={frameMat}>
        <boxGeometry args={[width + 0.2, height + 0.2, 0.06]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      {/* Canvas/painting */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
