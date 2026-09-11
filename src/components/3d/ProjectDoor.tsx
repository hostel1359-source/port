'use client';

import React, { useMemo, useRef, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Outlines } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectDoorProps {
  projectId: string;
  title: string;
  icon: string;
  index: number;
  accentColor: string;
  position: [number, number, number];
  rotation: [number, number, number];
  onDoorClick: (projectId: string) => void;
}

export default function ProjectDoor({
  projectId,
  title,
  index,
  accentColor,
  position,
  rotation,
  onDoorClick,
}: ProjectDoorProps) {
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3d2e22', roughness: 0.6 }), []);
  const doorMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#5c4a3a', roughness: 0.7 }), []);
  const handleMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#8a7560', roughness: 0.4, metalness: 0.3 }), []);

  const doorRef = useRef<THREE.Group>(null);
  const currentOpen = useRef(0);
  const hovered = useRef(false);

  const doorWidth = 1.4;
  const doorHeight = 2.8;
  const isLeftWall = rotation[1] > 0;

  // Door swings open on camera proximity
  useFrame((state) => {
    if (!doorRef.current) return;
    const camZ = state.camera.position.z;
    const doorZ = position[2];
    const dist = Math.abs(camZ - doorZ);

    // Open based on proximity + extra open on hover
    let targetOpen = 0;
    if (dist < 8) {
      targetOpen = Math.max(0, 1 - dist / 8);
    }
    if (hovered.current) {
      targetOpen = Math.max(targetOpen, 0.7);
    }

    currentOpen.current += (targetOpen - currentOpen.current) * 0.08;

    const swingAngle = currentOpen.current * (Math.PI / 3);
    doorRef.current.rotation.y = isLeftWall ? swingAngle : -swingAngle;
  });

  const handleClick = useCallback((e: THREE.Event) => {
    if (e && 'stopPropagation' in e) (e as { stopPropagation: () => void }).stopPropagation();

    // Dispatch doorEnter event for CameraRig
    window.dispatchEvent(new CustomEvent('doorEnter', {
      detail: {
        projectId,
        doorX: position[0],
        doorZ: position[2],
        isLeft: isLeftWall,
      },
    }));

    onDoorClick(projectId);
  }, [projectId, position, isLeftWall, onDoorClick]);

  return (
    <group position={position} rotation={rotation}>
      {/* Door frame */}
      <mesh position={[-doorWidth / 2 - 0.08, doorHeight / 2, 0]} material={frameMat}>
        <boxGeometry args={[0.15, doorHeight + 0.15, 0.15]} />
        <Outlines thickness={0.015} color="#1a1a1a" />
      </mesh>
      <mesh position={[doorWidth / 2 + 0.08, doorHeight / 2, 0]} material={frameMat}>
        <boxGeometry args={[0.15, doorHeight + 0.15, 0.15]} />
        <Outlines thickness={0.015} color="#1a1a1a" />
      </mesh>
      <mesh position={[0, doorHeight + 0.08, 0]} material={frameMat}>
        <boxGeometry args={[doorWidth + 0.3, 0.15, 0.15]} />
        <Outlines thickness={0.015} color="#1a1a1a" />
      </mesh>

      {/* Wall fill behind door */}
      <mesh position={[0, doorHeight / 2, -0.15]}>
        <planeGeometry args={[doorWidth, doorHeight]} />
        <meshStandardMaterial color="#f0ebe3" roughness={0.8} />
      </mesh>

      {/* Door panel — pivots from left edge */}
      <group ref={doorRef} position={[-doorWidth / 2, 0, 0]}>
        <mesh
          position={[doorWidth / 2, doorHeight / 2, 0]}
          material={doorMat}
          onClick={handleClick}
          onPointerOver={() => { hovered.current = true; document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { hovered.current = false; document.body.style.cursor = 'auto'; }}
        >
          <boxGeometry args={[doorWidth, doorHeight, 0.08]} />
          <Outlines thickness={0.015} color="#1a1a1a" />
        </mesh>

        {/* Door handle */}
        <mesh position={[doorWidth - 0.2, doorHeight / 2, 0.06]} material={handleMat}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <Outlines thickness={0.01} color="#1a1a1a" />
        </mesh>

        {/* Accent strip */}
        <mesh position={[doorWidth / 2, doorHeight - 0.1, 0.045]} material={handleMat}>
          <boxGeometry args={[doorWidth - 0.1, 0.08, 0.02]} />
        </mesh>

        {/* Door face label */}
        <Html position={[doorWidth / 2, doorHeight / 2, 0.06]} transform center distanceFactor={5}>
          <div
            onClick={() => handleClick({} as THREE.Event)}
            style={{
              textAlign: 'center',
              cursor: 'pointer',
              pointerEvents: 'auto',
              userSelect: 'none',
              padding: '16px',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 600, color: accentColor, marginBottom: '8px' }}>
              {(index + 1).toString().padStart(2, '0')}
            </div>
            <div style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#f0ebe3',
              marginBottom: '12px',
              textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
            }}>
              {title}
            </div>
            <div style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: '#d0c8b8',
              padding: '5px 12px',
              border: '1px solid rgba(240,235,227,0.25)',
              borderRadius: '3px',
              display: 'inline-block',
            }}>
              CLICK TO ENTER
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
