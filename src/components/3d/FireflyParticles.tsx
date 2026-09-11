'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CLUSTERS = [-8, -18, -28, -48, -58, -68, -88, -108, -128, -140];
const PARTICLES_PER_CLUSTER = 6;
const TOTAL = CLUSTERS.length * PARTICLES_PER_CLUSTER;

interface Firefly {
  baseX: number; baseY: number; baseZ: number;
  phaseX: number; phaseY: number; phaseZ: number;
  speedX: number; speedY: number; speedZ: number;
  ampX: number; ampY: number; ampZ: number;
  opacityPhase: number;
}

export default function FireflyParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, fireflies } = useMemo(() => {
    const posArr = new Float32Array(TOTAL * 3);
    const ffArr: Firefly[] = [];

    let idx = 0;
    CLUSTERS.forEach((cz) => {
      for (let i = 0; i < PARTICLES_PER_CLUSTER; i++) {
        const side = Math.random() > 0.5 ? 1 : -1;
        const bx = side * (2.5 + Math.random() * 1.2);
        const by = 1 + Math.random() * 2.5;
        const bz = cz + (Math.random() - 0.5) * 4;

        posArr[idx * 3] = bx;
        posArr[idx * 3 + 1] = by;
        posArr[idx * 3 + 2] = bz;

        ffArr.push({
          baseX: bx, baseY: by, baseZ: bz,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          phaseZ: Math.random() * Math.PI * 2,
          speedX: 0.3 + Math.random() * 0.5,
          speedY: 0.4 + Math.random() * 0.6,
          speedZ: 0.2 + Math.random() * 0.3,
          ampX: 0.3 + Math.random() * 0.4,
          ampY: 0.2 + Math.random() * 0.3,
          ampZ: 0.2 + Math.random() * 0.3,
          opacityPhase: Math.random() * Math.PI * 2,
        });

        idx++;
      }
    });

    return { positions: posArr, fireflies: ffArr };
  }, []);

  const sizes = useMemo(() => new Float32Array(TOTAL).fill(0.15), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;

    for (let i = 0; i < TOTAL; i++) {
      const f = fireflies[i];
      posAttr.setXYZ(
        i,
        f.baseX + Math.sin(time * f.speedX + f.phaseX) * f.ampX,
        f.baseY + Math.sin(time * f.speedY + f.phaseY) * f.ampY,
        f.baseZ + Math.sin(time * f.speedZ + f.phaseZ) * f.ampZ,
      );
    }
    posAttr.needsUpdate = true;

    // Pulse opacity
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.6 + Math.sin(time * 1.5) * 0.3;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffd700"
        size={0.15}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
