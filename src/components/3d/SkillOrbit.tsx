'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '@/lib/utils';
// Assume SKILLS exists
import { SKILLS } from '@/data/skills';

interface SkillOrbitProps {
  position: [number, number, number];
  active: boolean;
}

export default function SkillOrbit({ position, active }: SkillOrbitProps) {
  const centerMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const ringMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  const uniqueRadii = useMemo(() => {
    const radii = new Set<number>();
    SKILLS.forEach(skill => radii.add(skill.orbitRadius));
    return Array.from(radii);
  }, []);

  useFrame((state, delta) => {
    if (centerMaterialRef.current) {
      centerMaterialRef.current.emissiveIntensity = lerp(
        centerMaterialRef.current.emissiveIntensity,
        active ? 1.5 : 0.5,
        delta * 5
      );
    }
    
    if (ringMaterialRef.current) {
      ringMaterialRef.current.opacity = lerp(
        ringMaterialRef.current.opacity,
        active ? 0.3 : 0.1,
        delta * 5
      );
    }

    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        if (child.userData.isSkill) {
          const skill = SKILLS[i];
          if (skill) {
            child.position.x = skill.orbitRadius * Math.cos(time * skill.orbitSpeed + skill.orbitOffset);
            child.position.z = skill.orbitRadius * Math.sin(time * skill.orbitSpeed + skill.orbitOffset);
            child.position.y = Math.sin(time * 0.5 + skill.orbitOffset) * 0.3;
          }
        }
      });
    }
  });

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          ref={centerMaterialRef}
          color="#000"
          emissive="#4f9cf5"
          toneMapped={false}
        />
      </mesh>

      {uniqueRadii.map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
          <meshBasicMaterial ref={i === 0 ? ringMaterialRef : undefined} color="#4f9cf5" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}

      <group ref={groupRef}>
        {SKILLS.map((skill, i) => (
          <mesh key={i} userData={{ isSkill: true }}>
            <icosahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial color="#000" emissive={skill.color} emissiveIntensity={active ? 1.2 : 0.6} toneMapped={false} />
            <Html center occlude={false} style={{ fontSize: '9px', fontFamily: 'monospace', color: '#64748b', whiteSpace: 'nowrap', pointerEvents: 'none', opacity: active ? 1 : 0, transition: 'opacity 0.3s' }}>
              {skill.name}
            </Html>
          </mesh>
        ))}
      </group>
    </group>
  );
}
