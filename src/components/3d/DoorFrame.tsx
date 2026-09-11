'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, Outlines } from '@react-three/drei';

interface DoorFrameProps {
  position: [number, number, number];
  label: string;
  color: string;
}

const REVEAL_DISTANCE = 10;
const FULL_DISTANCE = 4;

export default function DoorFrame({ position, label, color }: DoorFrameProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  const frameMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#5c4a3a', transparent: true, opacity: 0,
  }), []);
  const doorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8B7355', transparent: true, opacity: 0,
  }), []);
  const accentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color, transparent: true, opacity: 0,
  }), [color]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const camZ = state.camera.position.z;
    const doorZ = position[2];
    const dist = Math.abs(camZ - doorZ);

    let opacity = 0;
    if (dist < REVEAL_DISTANCE) {
      opacity = Math.min(1, (REVEAL_DISTANCE - dist) / (REVEAL_DISTANCE - FULL_DISTANCE));
    }

    frameMaterial.opacity = THREE.MathUtils.lerp(frameMaterial.opacity, opacity, 0.08);
    doorMaterial.opacity = THREE.MathUtils.lerp(doorMaterial.opacity, opacity, 0.08);
    accentMaterial.opacity = THREE.MathUtils.lerp(accentMaterial.opacity, opacity, 0.08);

    groupRef.current.visible = frameMaterial.opacity > 0.02;

    const s = 0.7 + frameMaterial.opacity * 0.3;
    groupRef.current.scale.setScalar(s);

    const openAmount = Math.max(0, frameMaterial.opacity);
    const swing = openAmount * (Math.PI / 4);
    if (leftDoorRef.current) leftDoorRef.current.rotation.y = swing;
    if (rightDoorRef.current) rightDoorRef.current.rotation.y = -swing;

    if (htmlRef.current) {
      htmlRef.current.style.opacity = String(frameMaterial.opacity);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Frame Top */}
      <mesh position={[0, 3, 0]} material={frameMaterial}>
        <boxGeometry args={[3.2, 0.2, 0.4]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
      {/* Frame Left */}
      <mesh position={[-1.5, 1.5, 0]} material={frameMaterial}>
        <boxGeometry args={[0.2, 3, 0.4]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
      {/* Frame Right */}
      <mesh position={[1.5, 1.5, 0]} material={frameMaterial}>
        <boxGeometry args={[0.2, 3, 0.4]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      {/* Sign above door */}
      <mesh position={[0, 3.4, 0]} material={accentMaterial}>
        <planeGeometry args={[1.5, 0.5]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>
      <Html position={[0, 3.4, 0.01]} transform center distanceFactor={15}>
        <div ref={htmlRef} style={{
          fontFamily: 'Caveat, "Gloria Hallelujah", cursive',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1a1a1a',
          opacity: 0,
          transition: 'none',
        }}>
          {label}
        </div>
      </Html>

      {/* Left door panel */}
      <group ref={leftDoorRef} position={[-1.4, 1.5, 0]}>
        <mesh position={[0.7, 0, 0]} material={doorMaterial}>
          <boxGeometry args={[1.4, 2.9, 0.1]} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
      </group>

      {/* Right door panel */}
      <group ref={rightDoorRef} position={[1.4, 1.5, 0]}>
        <mesh position={[-0.7, 0, 0]} material={doorMaterial}>
          <boxGeometry args={[1.4, 2.9, 0.1]} />
          <Outlines thickness={0.02} color="#1a1a1a" />
        </mesh>
      </group>
    </group>
  );
}
