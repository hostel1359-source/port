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
  // Languages
  { name: 'TypeScript', category: 'language', color: '#3178c6' },
  { name: 'Python', category: 'language', color: '#ffd43b' },
  { name: 'JavaScript', category: 'language', color: '#f7df1e' },
  { name: 'Go', category: 'language', color: '#00add8' },
  { name: 'Solidity', category: 'language', color: '#636890' },
  { name: 'Pine Script', category: 'language', color: '#2962ff' },
  { name: 'Batch / PS', category: 'language', color: '#4d4d4d' },
  // Frontend
  { name: 'React', category: 'frontend', color: '#61dafb' },
  { name: 'Next.js', category: 'frontend', color: '#ffffff' },
  { name: 'Three.js', category: 'frontend', color: '#8b5cf6' },
  { name: 'Tailwind CSS', category: 'frontend', color: '#38bdf8' },
  { name: 'GSAP', category: 'frontend', color: '#88ce02' },
  { name: 'Electron', category: 'frontend', color: '#47848f' },
  // Backend
  { name: 'Node.js', category: 'backend', color: '#68a063' },
  { name: 'Flask', category: 'backend', color: '#f0ebe3' },
  { name: 'FastAPI', category: 'backend', color: '#009688' },
  { name: 'WebSockets', category: 'backend', color: '#ff6347' },
  // Web3 / DevOps
  { name: 'Solana', category: 'web3', color: '#9945ff' },
  { name: 'Docker', category: 'devops', color: '#2496ed' },
  { name: 'Git', category: 'devops', color: '#f05032' },
  { name: 'OpenAI / LLMs', category: 'ai', color: '#10a37f' },
];

interface SkillCloudProps {
  position: [number, number, number];
  active: boolean;
}

const _vec3 = new THREE.Vector3();

export default function SkillCloud({ position, active }: SkillCloudProps) {
  const groupRef = useRef<THREE.Group>(null);

  const skillData = useMemo(() => {
    // Arrange in a helix/spiral for better distribution
    return SKILLS.map((_, i) => {
      const angle = (i / SKILLS.length) * Math.PI * 4; // 2 full spirals
      const radius = 2.5 + (i % 3) * 0.8;
      const y = (i / SKILLS.length) * 3 - 1.5;
      return {
        baseX: Math.cos(angle) * radius,
        baseY: y,
        baseZ: Math.sin(angle) * radius * 0.6,
        speed: Math.random() * 0.4 + 0.2,
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const spread = active ? 1.2 : 0.6;
      const t = state.clock.elapsedTime;

      groupRef.current.children.forEach((child, i) => {
        if (i >= skillData.length) return;
        const data = skillData[i];

        const x = data.baseX * spread + Math.sin(t * data.speed + data.offset) * 0.2;
        const y = data.baseY * spread + Math.cos(t * data.speed * 0.8 + data.offset) * 0.2;
        const z = data.baseZ * spread + Math.sin(t * data.speed * 1.2 + data.offset) * 0.2;

        _vec3.set(x, y, z);
        child.position.lerp(_vec3, 0.05);
        child.rotation.y = Math.sin(t * 0.2 + data.offset) * 0.1;
      });
    }
  });

  return (
    <group position={position} ref={groupRef}>
      {SKILLS.map((skill) => (
        <group key={skill.name}>
          <mesh>
            <boxGeometry args={[1.1, 0.4, 0.04]} />
            <meshStandardMaterial color="#16213e" roughness={0.3} metalness={0.2} />
            <Outlines thickness={0.015} color="#00fff5" />
          </mesh>
          <mesh position={[-0.5, 0, 0.01]}>
            <boxGeometry args={[0.08, 0.4, 0.05]} />
            <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={0.3} />
          </mesh>
          <Html position={[0.05, 0, 0.03]} transform center distanceFactor={6} zIndexRange={[100, 0]}>
            <div style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              color: '#e0e0ff',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
              textShadow: '0 0 8px rgba(0, 255, 245, 0.3)',
            }}>
              {skill.name}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
