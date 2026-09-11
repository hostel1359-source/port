'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';

function PaperAirplane({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff', side: THREE.DoubleSide }), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, Math.PI / 4, 0]}>
      {/* Simple airplane shape using cones/boxes */}
      <mesh material={material} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.2, 0.6, 3]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
    </group>
  );
}

function PottedPlant({ position }: { position: [number, number, number] }) {
  const potMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f0ebe3' }), []);
  const plantMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a1a1a' }), []);

  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]} material={potMaterial}>
        <cylinderGeometry args={[0.2, 0.15, 0.4]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0.6, 0]} material={plantMaterial}>
        <coneGeometry args={[0.3, 0.6, 4]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
    </group>
  );
}

export default function DecorativeObjects() {
  return (
    <group>
      <PaperAirplane position={[2, 3, -5]} />
      <PaperAirplane position={[-2, 3.5, -25]} />
      
      <PottedPlant position={[-3.5, 0, -10]} />
      <PottedPlant position={[3.5, 0, -30]} />
      <PottedPlant position={[-3.5, 0, -85]} />
      
      {/* Hanging lights along ceiling */}
      {Array.from({ length: 10 }).map((_, i) => (
        <group key={`light-${i}`} position={[0, 5, -i * 15 - 5]}>
          <mesh material={new THREE.MeshStandardMaterial({ color: '#1a1a1a' })} position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
          </mesh>
          <mesh material={new THREE.MeshStandardMaterial({ color: '#f0ebe3', emissive: '#fff5e6', emissiveIntensity: 0.5 })} position={[0, -0.4, 0]}>
            <coneGeometry args={[0.3, 0.4, 8]} />
            <Outlines thickness={0.02} color="#1a1a1a" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
