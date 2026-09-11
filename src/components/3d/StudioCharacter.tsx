'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Outlines } from '@react-three/drei';

interface StudioCharacterProps {
  position: [number, number, number];
  mouseRef: React.RefObject<{ x: number; y: number }>;
}

const _lookTarget = new THREE.Vector3();
const _charPos = new THREE.Vector3();

export default function StudioCharacter({ position, mouseRef }: StudioCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const hairRef = useRef<THREE.Group>(null);

  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f0ebe3', roughness: 0.6 }), []);
  const hairMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2a1f14', roughness: 0.8 }), []);
  const eyeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#1a1a1a' }), []);
  const mouthMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#c4756e' }), []);
  const clothMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3d2e22', roughness: 0.7 }), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Head tracks camera
    if (headRef.current) {
      _charPos.set(position[0], position[1] + 1.65, position[2]);
      _lookTarget.copy(state.camera.position);
      _lookTarget.y = _charPos.y;

      const dx = _lookTarget.x - _charPos.x;
      const dz = _lookTarget.z - _charPos.z;
      const targetRotY = Math.atan2(dx, dz);
      const clampedRotY = THREE.MathUtils.clamp(targetRotY, -Math.PI * 0.6, Math.PI * 0.6);
      const mouseY = mouseRef.current ? mouseRef.current.y * 0.15 : 0;

      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, clampedRotY, 0.04);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -mouseY, 0.05);
    }

    // Body breathing - pronounced
    if (bodyRef.current) {
      const breathe = Math.sin(time * 1.8) * 0.03;
      bodyRef.current.scale.y = 1 + breathe;
      bodyRef.current.scale.x = 1 - breathe * 0.3;
      bodyRef.current.rotation.y = THREE.MathUtils.lerp(
        bodyRef.current.rotation.y,
        headRef.current ? headRef.current.rotation.y * 0.3 : 0,
        0.03
      );
    }

    // Arms idle sway
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.PI / 7 + Math.sin(time * 1.2) * 0.08;
      leftArmRef.current.rotation.x = Math.sin(time * 0.8 + 1) * 0.05;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -Math.PI / 7 + Math.sin(time * 1.2 + Math.PI) * 0.08;
      rightArmRef.current.rotation.x = Math.sin(time * 0.8 + 2) * 0.05;
    }

    // Legs subtle weight shift
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(time * 0.6) * 0.03;
      rightLegRef.current.rotation.x = Math.sin(time * 0.6 + Math.PI) * 0.03;
    }

    // Hair wind effect
    if (hairRef.current) {
      hairRef.current.rotation.z = Math.sin(time * 2) * 0.05;
      hairRef.current.rotation.x = Math.sin(time * 1.5) * 0.02;
    }

    // Whole body gentle bob
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.65, 0]} material={skinMat}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <Outlines thickness={0.025} color="#1a1a1a" />
      </mesh>

      {/* Hair */}
      <group ref={hairRef} position={[0, 1.75, 0]}>
        {/* Main hair volume */}
        <mesh position={[0, 0.05, -0.05]} material={hairMat}>
          <sphereGeometry args={[0.24, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        </mesh>
        {/* Side bangs */}
        <mesh position={[-0.18, -0.08, 0.08]} material={hairMat}>
          <boxGeometry args={[0.06, 0.18, 0.06]} />
        </mesh>
        <mesh position={[0.18, -0.08, 0.08]} material={hairMat}>
          <boxGeometry args={[0.06, 0.18, 0.06]} />
        </mesh>
      </group>

      {/* Eyes */}
      <mesh position={[-0.07, 1.67, 0.2]} material={eyeMat}>
        <sphereGeometry args={[0.03, 8, 8]} />
      </mesh>
      <mesh position={[0.07, 1.67, 0.2]} material={eyeMat}>
        <sphereGeometry args={[0.03, 8, 8]} />
      </mesh>

      {/* Mouth - small smile */}
      <mesh position={[0, 1.58, 0.2]} material={mouthMat} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.03, 0.008, 8, 12, Math.PI]} />
      </mesh>

      {/* Body / Jacket */}
      <mesh ref={bodyRef} position={[0, 1.0, 0]} material={clothMat}>
        <capsuleGeometry args={[0.22, 0.65, 4, 8]} />
        <Outlines thickness={0.025} color="#1a1a1a" />
      </mesh>

      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.35, 1.15, 0]} rotation={[0, 0, Math.PI / 7]} material={skinMat}>
        <capsuleGeometry args={[0.05, 0.55, 4, 8]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.35, 1.15, 0]} rotation={[0, 0, -Math.PI / 7]} material={skinMat}>
        <capsuleGeometry args={[0.05, 0.55, 4, 8]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.1, 0.35, 0]} material={clothMat}>
        <capsuleGeometry args={[0.07, 0.5, 4, 8]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.1, 0.35, 0]} material={clothMat}>
        <capsuleGeometry args={[0.07, 0.5, 4, 8]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      {/* Shoes */}
      <mesh position={[-0.1, 0.08, 0.04]} material={eyeMat}>
        <boxGeometry args={[0.1, 0.06, 0.16]} />
      </mesh>
      <mesh position={[0.1, 0.08, 0.04]} material={eyeMat}>
        <boxGeometry args={[0.1, 0.06, 0.16]} />
      </mesh>
    </group>
  );
}
