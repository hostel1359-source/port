'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getWaypointAtProgress } from '@/lib/camera-waypoints';

interface CameraRigProps {
  scrollProgress: number;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  lookAtOverride: React.MutableRefObject<[number, number, number] | null>;
}

const _targetPos = new THREE.Vector3();
const _lookDir = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3(0, 1.2, 0);
const _overrideLook = new THREE.Vector3();

export default function CameraRig({ scrollProgress, mouseRef, lookAtOverride }: CameraRigProps) {
  const prevProgress = useRef(scrollProgress);

  useFrame((state, delta) => {
    const { position } = getWaypointAtProgress(scrollProgress);

    // Camera position from scroll waypoints (no mouse offset on position)
    _targetPos.copy(position);

    // 360-degree mouse look
    const mx = mouseRef.current ? mouseRef.current.x : 0;
    const my = mouseRef.current ? mouseRef.current.y : 0;

    // Map mouse to yaw/pitch
    // Horizontal: ±60 degrees (enough to look at walls)
    // Vertical: ±20 degrees
    const yaw = mx * Math.PI * 0.35;
    const pitch = my * Math.PI * 0.12;

    // Calculate look direction from yaw/pitch
    // Default forward is -Z
    _lookDir.set(
      Math.sin(yaw),
      pitch,
      -Math.cos(yaw)
    ).normalize().multiplyScalar(5);

    // Target lookAt = camera position + look direction
    const targetLookX = _targetPos.x + _lookDir.x;
    const targetLookY = _targetPos.y + _lookDir.y;
    const targetLookZ = _targetPos.z + _lookDir.z;

    // If there's a lookAt override (clicked a quote/project)
    if (lookAtOverride.current) {
      _overrideLook.set(...lookAtOverride.current);

      // Slowly blend toward override
      _currentLookAt.lerp(_overrideLook, 1 - Math.exp(-2 * delta));

      // Clear override if user scrolls
      if (Math.abs(scrollProgress - prevProgress.current) > 0.005) {
        lookAtOverride.current = null;
      }
    } else {
      // Normal mouse-driven look
      _currentLookAt.x += (targetLookX - _currentLookAt.x) * (1 - Math.exp(-4 * delta));
      _currentLookAt.y += (targetLookY - _currentLookAt.y) * (1 - Math.exp(-4 * delta));
      _currentLookAt.z += (targetLookZ - _currentLookAt.z) * (1 - Math.exp(-4 * delta));
    }

    // Smooth position
    const posLambda = 1 - Math.exp(-3 * delta);
    state.camera.position.lerp(_targetPos, posLambda);
    state.camera.lookAt(_currentLookAt);

    prevProgress.current = scrollProgress;
  });

  return null;
}
