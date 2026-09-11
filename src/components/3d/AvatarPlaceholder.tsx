'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const targetLookAt = new THREE.Vector3();

interface AvatarPlaceholderProps {
  position: [number, number, number];
  mouseRef: React.RefObject<{ x: number; y: number }>;
}

export default function AvatarPlaceholder({ position, mouseRef }: AvatarPlaceholderProps) {
  const headRef = useRef<THREE.Mesh>(null);
  const torsoRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (torsoRef.current) {
      torsoRef.current.scale.y = Math.sin(time * 2) * 0.02 + 1;
    }

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.05;
    }

    if (headRef.current && mouseRef.current) {
      const maxAngle = 0.5;
      targetLookAt.set(
        mouseRef.current.x * 2,
        mouseRef.current.y * 2,
        5
      );
      
      const currentRotation = new THREE.Euler().copy(headRef.current.rotation);
      const targetRotation = new THREE.Euler().setFromVector3(
        new THREE.Vector3().subVectors(targetLookAt, headRef.current.position).normalize()
      );
      
      headRef.current.rotation.x = THREE.MathUtils.lerp(currentRotation.x, THREE.MathUtils.clamp(targetRotation.x, -maxAngle, maxAngle), delta * 5);
      headRef.current.rotation.y = THREE.MathUtils.lerp(currentRotation.y, THREE.MathUtils.clamp(targetRotation.y, -maxAngle, maxAngle), delta * 5);
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef}>
          {/* Head */}
          <mesh ref={headRef} position={[0, 0.45, 0]}>
            <icosahedronGeometry args={[0.25, 1]} />
            <meshStandardMaterial color="#1a1a2e" emissive="#4f9cf5" emissiveIntensity={0.3} />
          </mesh>

          {/* Torso */}
          <mesh ref={torsoRef} position={[0, -0.05, 0]}>
            <boxGeometry args={[0.35, 0.5, 0.25]} />
            <meshStandardMaterial color="#1a1a2e" emissive="#4f9cf5" emissiveIntensity={0.3} />
          </mesh>

          {/* Arms */}
          <mesh position={[-0.25, 0.05, 0]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.08, 0.4, 0.08]} />
            <meshStandardMaterial color="#1a1a2e" emissive="#4f9cf5" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[0.25, 0.05, 0]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.08, 0.4, 0.08]} />
            <meshStandardMaterial color="#1a1a2e" emissive="#4f9cf5" emissiveIntensity={0.3} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
