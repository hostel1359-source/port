'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '@/lib/utils';

interface HolographicPanelProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  width: number;
  height: number;
  color: string;
  active: boolean;
  children: React.ReactNode;
}

export default function HolographicPanel({ position, rotation = [0, 0, 0], width, height, color, active, children }: HolographicPanelProps) {
  const panelMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const borderMaterialRef = useRef<THREE.LineBasicMaterial>(null);

  const edges = useMemo(() => {
    const geometry = new THREE.BoxGeometry(width, height, 0.02);
    return new THREE.EdgesGeometry(geometry);
  }, [width, height]);

  useFrame((state, delta) => {
    if (panelMaterialRef.current) {
      const targetOpacity = active ? 0.15 : 0.08;
      panelMaterialRef.current.opacity = lerp(
        panelMaterialRef.current.opacity,
        targetOpacity,
        delta * 5
      );
      
      const targetGlow = active ? 0.5 : 0.0;
      panelMaterialRef.current.emissiveIntensity = lerp(
        panelMaterialRef.current.emissiveIntensity,
        targetGlow,
        delta * 5
      );
    }
    
    if (borderMaterialRef.current) {
      const targetOpacity = active ? 0.8 : 0.4;
      borderMaterialRef.current.opacity = lerp(
        borderMaterialRef.current.opacity,
        targetOpacity,
        delta * 5
      );
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial
          ref={panelMaterialRef}
          color={color}
          transparent
          roughness={0.5}
          metalness={0.8}
          emissive={color}
        />
      </mesh>
      
      <lineSegments geometry={edges}>
        <lineBasicMaterial
          ref={borderMaterialRef}
          color={color}
          transparent
        />
      </lineSegments>

      <Html transform distanceFactor={8} position={[0, 0, 0.03]} zIndexRange={[100, 0]} pointerEvents="none">
        {children}
      </Html>
    </group>
  );
}
