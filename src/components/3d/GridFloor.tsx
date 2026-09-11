'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { lerp } from '@/lib/utils';

interface GridFloorProps {
  position: [number, number, number];
  size?: number;
  active: boolean;
}

export default function GridFloor({ position, size = 20, active }: GridFloorProps) {
  const materialRef = useRef<THREE.Material | THREE.Material[]>(null);

  useFrame((state, delta) => {
    if (materialRef.current) {
      const targetOpacity = active ? 0.15 : 0.05;
      if (Array.isArray(materialRef.current)) {
        materialRef.current.forEach(mat => {
          mat.opacity = lerp(mat.opacity, targetOpacity, delta * 2);
        });
      } else {
        materialRef.current.opacity = lerp(materialRef.current.opacity, targetOpacity, delta * 2);
      }
    }
  });

  return (
    <group position={position}>
      <gridHelper 
        args={[size, 20, '#1a1a2e', '#12121f']} 
        position={[0, 0, 0]}
      >
        <lineBasicMaterial ref={materialRef as any} transparent opacity={0.05} vertexColors={true} />
      </gridHelper>
    </group>
  );
}
