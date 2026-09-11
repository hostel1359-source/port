'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, Outlines } from '@react-three/drei';

interface Skill {
  name: string;
  category: string;
  color: string;
}

const SKILLS: Skill[] = [
  { name: 'React', category: 'frontend', color: '#61dafb' },
  { name: 'Three.js', category: 'frontend', color: '#8b5cf6' },
  { name: 'TypeScript', category: 'language', color: '#3178c6' },
  { name: 'Node.js', category: 'backend', color: '#68a063' },
  { name: 'Next.js', category: 'frontend', color: '#ffffff' },
  { name: 'WebGL', category: 'frontend', color: '#fb7185' },
  { name: 'GraphQL', category: 'backend', color: '#e535ab' },
  { name: 'CSS/Tailwind', category: 'frontend', color: '#38bdf8' },
  { name: 'Python', category: 'language', color: '#ffd43b' },
  { name: 'Solidity', category: 'language', color: '#636890' },
];

interface SkillCloudProps {
  position: [number, number, number];
  active: boolean;
}

const _vec3 = new THREE.Vector3();

export default function SkillCloud({ position, active }: SkillCloudProps) {
  const groupRef = useRef<THREE.Group>(null);

  const skillData = useMemo(() => {
    return SKILLS.map(() => ({
      baseX: (Math.random() - 0.5) * 6,
      baseY: (Math.random() - 0.5) * 3 + 0.5,
      baseZ: (Math.random() - 0.5) * 4,
      speed: Math.random() * 0.5 + 0.3,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const spread = active ? 1.5 : 0.8;
      const t = state.clock.elapsedTime;

      groupRef.current.children.forEach((child, i) => {
        if (i >= skillData.length) return;
        const data = skillData[i];

        const x = data.baseX * spread + Math.sin(t * data.speed + data.offset) * 0.3;
        const y = data.baseY * spread + Math.cos(t * data.speed * 0.8 + data.offset) * 0.3;
        const z = data.baseZ * spread + Math.sin(t * data.speed * 1.2 + data.offset) * 0.3;

        _vec3.set(x, y, z);
        child.position.lerp(_vec3, 0.05);
        child.rotation.y = Math.sin(t * 0.2 + data.offset) * 0.15;
      });
    }
  });

  return (
    <group position={position} ref={groupRef}>
      {SKILLS.map((skill) => (
        <group key={skill.name}>
          {/* Card body */}
          <mesh>
            <boxGeometry args={[1.2, 0.5, 0.05]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
            <Outlines thickness={0.02} color="#1a1a1a" />
          </mesh>
          {/* Colored left strip */}
          <mesh position={[-0.55, 0, 0.01]}>
            <boxGeometry args={[0.1, 0.5, 0.06]} />
            <meshStandardMaterial color={skill.color} />
          </mesh>
          {/* Label */}
          <Html position={[0.05, 0, 0.04]} transform center distanceFactor={6} zIndexRange={[100, 0]}>
            <div style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#1a1a1a',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}>
              {skill.name}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
