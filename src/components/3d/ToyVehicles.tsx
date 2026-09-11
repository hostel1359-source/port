'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Outlines } from '@react-three/drei';

/* ─── Toy Supercar ─── */
function ToySupercar({
  color,
  accentColor,
  scale = 1,
}: {
  color: string;
  accentColor: string;
  scale?: number;
}) {
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.6 }), [color]);
  const glassMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#88ccff', roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.6 }), []);
  const wheelMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.9 }), []);
  const rimMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c0c0c0', roughness: 0.2, metalness: 0.8 }), []);
  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.4, metalness: 0.5 }), [accentColor]);
  const tailMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ff2222', emissive: '#ff0000', emissiveIntensity: 0.3 }), []);
  const headMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#ffffcc', emissiveIntensity: 0.2 }), []);

  const s = scale;

  return (
    <group scale={[s, s, s]}>
      {/* Main body — low sleek profile */}
      <mesh position={[0, 0.08, 0]} material={bodyMat}>
        <boxGeometry args={[0.22, 0.07, 0.55]} />
        <Outlines thickness={0.012} color="#1a1a1a" />
      </mesh>

      {/* Hood — tapered front */}
      <mesh position={[0, 0.1, -0.22]} material={bodyMat} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.2, 0.04, 0.15]} />
      </mesh>

      {/* Cabin / windshield area */}
      <mesh position={[0, 0.14, 0.02]} material={glassMat}>
        <boxGeometry args={[0.18, 0.06, 0.2]} />
        <Outlines thickness={0.008} color="#1a1a1a" />
      </mesh>

      {/* Rear spoiler */}
      <mesh position={[0, 0.16, 0.25]} material={accentMat}>
        <boxGeometry args={[0.24, 0.015, 0.04]} />
        <Outlines thickness={0.008} color="#1a1a1a" />
      </mesh>
      {/* Spoiler pillars */}
      <mesh position={[-0.08, 0.13, 0.25]} material={accentMat}>
        <boxGeometry args={[0.015, 0.05, 0.015]} />
      </mesh>
      <mesh position={[0.08, 0.13, 0.25]} material={accentMat}>
        <boxGeometry args={[0.015, 0.05, 0.015]} />
      </mesh>

      {/* Side accent stripes */}
      <mesh position={[0.115, 0.08, 0]} material={accentMat}>
        <boxGeometry args={[0.005, 0.02, 0.45]} />
      </mesh>
      <mesh position={[-0.115, 0.08, 0]} material={accentMat}>
        <boxGeometry args={[0.005, 0.02, 0.45]} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.08, 0.09, -0.28]} material={headMat}>
        <boxGeometry args={[0.04, 0.02, 0.01]} />
      </mesh>
      <mesh position={[0.08, 0.09, -0.28]} material={headMat}>
        <boxGeometry args={[0.04, 0.02, 0.01]} />
      </mesh>

      {/* Tail lights */}
      <mesh position={[-0.08, 0.09, 0.275]} material={tailMat}>
        <boxGeometry args={[0.04, 0.025, 0.01]} />
      </mesh>
      <mesh position={[0.08, 0.09, 0.275]} material={tailMat}>
        <boxGeometry args={[0.04, 0.025, 0.01]} />
      </mesh>

      {/* Wheels — 4 corners */}
      {[
        [-0.12, 0.03, -0.17],
        [0.12, 0.03, -0.17],
        [-0.12, 0.03, 0.17],
        [0.12, 0.03, 0.17],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={wheelMat}>
            <cylinderGeometry args={[0.035, 0.035, 0.025, 12]} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={rimMat}>
            <cylinderGeometry args={[0.02, 0.02, 0.028, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── Track marks on the floor ─── */
function TrackMarks() {
  const trackMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#6b5d4d', transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
    []
  );

  // Two parallel dashed lines running along the corridor
  const marks: JSX.Element[] = [];
  for (let z = 0; z > -170; z -= 3) {
    marks.push(
      <group key={z}>
        {/* Left track */}
        <mesh position={[-1.2, 0.005, z]} rotation={[-Math.PI / 2, 0, 0]} material={trackMat}>
          <planeGeometry args={[0.08, 1.8]} />
        </mesh>
        {/* Right track */}
        <mesh position={[1.2, 0.005, z]} rotation={[-Math.PI / 2, 0, 0]} material={trackMat}>
          <planeGeometry args={[0.08, 1.8]} />
        </mesh>
      </group>
    );
  }

  return <group>{marks}</group>;
}

/* ─── Individual animated vehicle ─── */
interface VehicleConfig {
  color: string;
  accentColor: string;
  lane: number;        // X offset (-1.2 = left lane, 1.2 = right lane)
  speed: number;       // units per second
  startZ: number;      // initial Z position
  scale: number;
  direction: 1 | -1;   // 1 = toward -Z, -1 = toward +Z
}

function AnimatedVehicle({ config }: { config: VehicleConfig }) {
  const ref = useRef<THREE.Group>(null);
  const zRef = useRef(config.startZ);

  const corridorStart = 8;
  const corridorEnd = -168;
  const corridorLen = corridorStart - corridorEnd; // 176

  useFrame((_, delta) => {
    if (!ref.current) return;

    zRef.current -= config.speed * delta * config.direction;

    // Seamless loop
    if (config.direction === 1 && zRef.current < corridorEnd) {
      zRef.current = corridorStart;
    } else if (config.direction === -1 && zRef.current > corridorStart) {
      zRef.current = corridorEnd;
    }

    ref.current.position.z = zRef.current;
    ref.current.position.x = config.lane;
    ref.current.position.y = 0;

    // Slight wobble for realism
    ref.current.position.x += Math.sin(zRef.current * 2) * 0.02;
    ref.current.rotation.y = config.direction === 1 ? 0 : Math.PI;

    // Tiny tilt on "curves"
    ref.current.rotation.z = Math.sin(zRef.current * 0.5) * 0.02;
  });

  return (
    <group ref={ref}>
      <ToySupercar color={config.color} accentColor={config.accentColor} scale={config.scale} />
    </group>
  );
}

/* ─── Main export ─── */
export default function ToyVehicles() {
  const vehicles: VehicleConfig[] = useMemo(
    () => [
      // Left lane — heading deeper into corridor
      { color: '#e63946', accentColor: '#ffd60a', lane: -1.5, speed: 4, startZ: 0, scale: 1.0, direction: 1 },
      { color: '#457b9d', accentColor: '#a8dadc', lane: -1.0, speed: 3.2, startZ: -40, scale: 0.85, direction: 1 },
      { color: '#2d6a4f', accentColor: '#95d5b2', lane: -1.8, speed: 5, startZ: -80, scale: 0.9, direction: 1 },
      { color: '#7209b7', accentColor: '#f72585', lane: -1.3, speed: 3.8, startZ: -120, scale: 0.95, direction: 1 },
      { color: '#f4a261', accentColor: '#264653', lane: -1.6, speed: 4.3, startZ: -25, scale: 0.88, direction: 1 },
      { color: '#06d6a0', accentColor: '#118ab2', lane: -1.1, speed: 3.5, startZ: -95, scale: 0.92, direction: 1 },

      // Right lane — coming back toward entrance
      { color: '#ff6700', accentColor: '#ffd166', lane: 1.5, speed: 3.5, startZ: -20, scale: 0.9, direction: -1 },
      { color: '#023e8a', accentColor: '#48cae4', lane: 1.0, speed: 4.5, startZ: -60, scale: 1.0, direction: -1 },
      { color: '#dc2f02', accentColor: '#ffba08', lane: 1.8, speed: 2.8, startZ: -100, scale: 0.8, direction: -1 },
      { color: '#370617', accentColor: '#e85d04', lane: 1.3, speed: 3.0, startZ: -150, scale: 0.85, direction: -1 },
      { color: '#9b2226', accentColor: '#ee9b00', lane: 1.6, speed: 4.8, startZ: -35, scale: 0.93, direction: -1 },
      { color: '#3a0ca3', accentColor: '#4cc9f0', lane: 1.1, speed: 3.3, startZ: -130, scale: 0.87, direction: -1 },

      // Center weaving — fast ones darting through
      { color: '#ffb703', accentColor: '#1a1a1a', lane: -0.3, speed: 6.0, startZ: -10, scale: 0.75, direction: 1 },
      { color: '#e5383b', accentColor: '#f5f3f4', lane: 0.3, speed: 5.5, startZ: -70, scale: 0.78, direction: -1 },
      { color: '#00b4d8', accentColor: '#0077b6', lane: -0.5, speed: 5.8, startZ: -140, scale: 0.72, direction: 1 },
      { color: '#8338ec', accentColor: '#ff006e', lane: 0.5, speed: 6.2, startZ: -50, scale: 0.7, direction: -1 },
    ],
    []
  );

  return (
    <group>
      <TrackMarks />
      {vehicles.map((v, i) => (
        <AnimatedVehicle key={i} config={v} />
      ))}
    </group>
  );
}
