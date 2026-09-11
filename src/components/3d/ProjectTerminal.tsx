'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '@/lib/utils';
// Assumes Project type from projects.ts is something like:
import type { Project } from '@/data/projects';

const scratchVector = new THREE.Vector3();

interface ProjectTerminalProps {
  project: Project;
  position: [number, number, number];
  index: number;
  active: boolean;
  onHover: (idx: number) => void;
  onUnhover: (idx: number) => void;
}

export default function ProjectTerminal({ project, position, index, active, onHover, onUnhover }: ProjectTerminalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.1 * delta;
      
      const targetScale = hovered ? 1.08 : 1.0;
      groupRef.current.scale.lerp(scratchVector.set(targetScale, targetScale, targetScale), delta * 5);
    }
    
    if (screenMaterialRef.current) {
      const targetIntensity = active || hovered ? 2.0 : 0.3;
      screenMaterialRef.current.emissiveIntensity = lerp(
        screenMaterialRef.current.emissiveIntensity,
        targetIntensity,
        delta * 5
      );
    }
  });

  return (
    <group position={position}>
      <group
        ref={groupRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHover(index); }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); onUnhover(index); }}
      >
        <mesh>
          <boxGeometry args={[1.8, 1.2, 0.05]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.7} />
        </mesh>
        
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[1.7, 1.1]} />
          <meshStandardMaterial
            ref={screenMaterialRef}
            color="#000"
            emissive={project.accentColor}
            toneMapped={false}
          />
        </mesh>
      </group>
      
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5]} />
        <meshStandardMaterial color="#2d3748" metalness={0.8} />
      </mesh>

      <Html position={[0, -0.9, 0]} center zIndexRange={[100, 0]} occlude={false}>
        <div style={{ fontSize: '10px', fontFamily: 'monospace', color: hovered ? '#fff' : '#64748b', whiteSpace: 'nowrap', pointerEvents: 'none', transition: 'color 0.2s' }}>
          {project.title}
        </div>
      </Html>
    </group>
  );
}
