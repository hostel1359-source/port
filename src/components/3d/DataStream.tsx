'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { lerp } from '@/lib/utils';

const dummyObject = new THREE.Object3D();
const INSTANCE_COUNT = 30;

interface DataStreamProps {
  points: [number, number, number][];
  active: boolean;
}

export default function DataStream({ points, active }: DataStreamProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const curve = useMemo(() => {
    const vectors = points.map(p => new THREE.Vector3(...p));
    return new THREE.CatmullRomCurve3(vectors);
  }, [points]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.opacity = lerp(
        materialRef.current.opacity,
        active ? 0.6 : 0.0,
        delta * 5
      );
    }

    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      for (let i = 0; i < INSTANCE_COUNT; i++) {
        const t = (i / INSTANCE_COUNT + time * 0.1) % 1;
        const position = curve.getPointAt(t);
        dummyObject.position.copy(position);
        dummyObject.scale.setScalar(1);
        dummyObject.updateMatrix();
        meshRef.current.setMatrixAt(i, dummyObject.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, INSTANCE_COUNT]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#38bdf8"
        emissive="#38bdf8"
        emissiveIntensity={1.0}
        toneMapped={false}
        transparent
        opacity={0}
      />
    </instancedMesh>
  );
}
