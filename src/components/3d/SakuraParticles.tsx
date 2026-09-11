'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COLORS = ['#ffb7c5', '#ffd1dc', '#fff0f5', '#ffc0cb', '#ff8fa3'];
const COUNT = 200;

interface Petal {
  x: number; y: number; z: number;
  speedY: number; speedX: number; speedZ: number;
  rotX: number; rotY: number; rotZ: number;
  rotSpeedX: number; rotSpeedY: number; rotSpeedZ: number;
  phase: number;
  colorIndex: number;
}

export default function SakuraParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo<Petal[]>(() => {
    const temp: Petal[] = [];
    for (let i = 0; i < COUNT; i++) {
      temp.push({
        x: Math.random() * 8 - 4,
        y: Math.random() * 4 + 0.5,
        z: Math.random() * -165,
        speedY: 0.003 + Math.random() * 0.005,
        speedX: (Math.random() - 0.5) * 0.003,
        speedZ: (Math.random() - 0.5) * 0.002,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.015,
        phase: Math.random() * Math.PI * 2,
        colorIndex: Math.floor(Math.random() * COLORS.length),
      });
    }
    return temp;
  }, []);

  const petalGeo = useMemo(() => {
    // Heart-shaped petal
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.04, 0.04, 0.08, 0.02, 0.06, -0.02);
    shape.bezierCurveTo(0.04, -0.06, 0, -0.04, 0, -0.02);
    shape.bezierCurveTo(0, -0.04, -0.04, -0.06, -0.06, -0.02);
    shape.bezierCurveTo(-0.08, 0.02, -0.04, 0.04, 0, 0);
    const geo = new THREE.ShapeGeometry(shape);
    geo.scale(1.5, 1.5, 1.5); // Bigger petals
    return geo;
  }, []);

  const material = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#ffb7c5',
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < COUNT; i++) {
      const p = particles[i];

      // Drift
      p.x += p.speedX + Math.sin(time * 0.5 + p.phase) * 0.002;
      p.y -= p.speedY;
      p.z += p.speedZ;

      // Rotate
      p.rotX += p.rotSpeedX;
      p.rotY += p.rotSpeedY;
      p.rotZ += p.rotSpeedZ;

      // Reset if below floor
      if (p.y < -0.5) {
        p.y = 4 + Math.random();
        p.x = Math.random() * 8 - 4;
      }

      // Sway
      const sway = Math.sin(time + p.phase) * 0.3;

      dummy.position.set(p.x + sway, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.setScalar(0.8 + Math.sin(time * 2 + p.phase) * 0.2);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Per-instance color
      const color = new THREE.Color(COLORS[p.colorIndex]);
      meshRef.current.setColorAt(i, color);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[petalGeo, material, COUNT]} frustumCulled={false} />
  );
}
