'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { getWaypointAtProgress } from '@/lib/camera-waypoints';

interface CameraRigProps {
  scrollProgress: number;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  lookAtOverride: React.MutableRefObject<[number, number, number] | null>;
}

// Door positions for auto-glance
const DOOR_POSITIONS = [
  { x: -3.9, z: -40, side: 'left' },   // DevOS
  { x: 3.9,  z: -50, side: 'right' },  // Solana
  { x: -3.9, z: -60, side: 'left' },   // PotatoBoost
  { x: 3.9,  z: -70, side: 'right' },  // Ephemeral
];

const _targetPos = new THREE.Vector3();
const _lookDir = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3(0, 1.2, 0);
const _overrideLook = new THREE.Vector3();

export default function CameraRig({ scrollProgress, mouseRef, lookAtOverride }: CameraRigProps) {
  const prevProgress = useRef(scrollProgress);
  const enteringDoor = useRef(false);
  const savedPos = useRef(new THREE.Vector3());
  const savedLookAt = useRef(new THREE.Vector3());
  const { camera } = useThree();

  // Listen for door-enter / door-exit events
  useEffect(() => {
    const handleEnter = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const doorX = detail.doorX as number;
      const doorZ = detail.doorZ as number;
      const isLeft = detail.isLeft as boolean;

      // Save current camera state
      savedPos.current.copy(camera.position);
      savedLookAt.current.copy(_currentLookAt);
      enteringDoor.current = true;

      // GSAP animate camera: fly to face the door, then INTO it
      const faceDoorX = isLeft ? -2 : 2;
      const lookX = isLeft ? -3.9 : 3.9;

      const tl = gsap.timeline();

      // Step 1: Slide to face the door (0.5s)
      tl.to(camera.position, {
        x: faceDoorX,
        y: 1.6,
        z: doorZ,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 0);
      tl.to(_currentLookAt, {
        x: lookX,
        y: 1.5,
        z: doorZ,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 0);

      // Step 2: Fly through the door (0.4s)
      tl.to(camera.position, {
        x: doorX,
        y: 1.6,
        z: doorZ,
        duration: 0.4,
        ease: 'power2.in',
      });
      tl.to(_currentLookAt, {
        x: doorX + (isLeft ? -2 : 2),
        y: 1.5,
        z: doorZ,
        duration: 0.4,
        ease: 'power2.in',
      }, '<');

      // Step 3: At destination - dispatch "entered" event
      tl.call(() => {
        window.dispatchEvent(new CustomEvent('doorEntered', { detail: { projectId: detail.projectId } }));
      });
    };

    const handleExit = () => {
      // Fly camera back to corridor
      const tl = gsap.timeline();
      tl.to(camera.position, {
        x: savedPos.current.x,
        y: savedPos.current.y,
        z: savedPos.current.z,
        duration: 0.6,
        ease: 'power2.inOut',
      });
      tl.to(_currentLookAt, {
        x: savedLookAt.current.x,
        y: savedLookAt.current.y,
        z: savedLookAt.current.z,
        duration: 0.6,
        ease: 'power2.inOut',
      }, '<');
      tl.call(() => {
        enteringDoor.current = false;
      });
    };

    window.addEventListener('doorEnter', handleEnter);
    window.addEventListener('doorExit', handleExit);
    return () => {
      window.removeEventListener('doorEnter', handleEnter);
      window.removeEventListener('doorExit', handleExit);
    };
  }, [camera]);

  useFrame((state, delta) => {
    // When entering/inside a door, don't update camera from scroll
    if (enteringDoor.current) {
      state.camera.lookAt(_currentLookAt);
      return;
    }

    const { position } = getWaypointAtProgress(scrollProgress);
    _targetPos.copy(position);

    // Mouse look
    const mx = mouseRef.current ? mouseRef.current.x : 0;
    const my = mouseRef.current ? mouseRef.current.y : 0;

    const yaw = mx * Math.PI * 0.35;
    const pitch = my * Math.PI * 0.12;

    _lookDir.set(
      Math.sin(yaw),
      pitch,
      -Math.cos(yaw)
    ).normalize().multiplyScalar(5);

    let targetLookX = _targetPos.x + _lookDir.x;
    let targetLookY = _targetPos.y + _lookDir.y;
    let targetLookZ = _targetPos.z + _lookDir.z;

    // === AUTO-GLANCE: subtly turn camera toward nearby doors ===
    const camZ = _targetPos.z;
    let glanceStrength = 0;
    let glanceX = 0;

    for (const door of DOOR_POSITIONS) {
      const dist = Math.abs(camZ - door.z);
      if (dist < 6) {
        // Peak glance at 2 units distance, ease in/out
        const t = 1 - dist / 6;
        const eased = t * t * (3 - 2 * t); // smoothstep
        if (eased > glanceStrength) {
          glanceStrength = eased;
          glanceX = door.x * 0.4; // Glance 40% toward the door wall
        }
      }
    }

    if (glanceStrength > 0.01) {
      targetLookX += glanceX * glanceStrength;
    }

    // lookAt override (from quotes etc)
    if (lookAtOverride.current) {
      _overrideLook.set(...lookAtOverride.current);
      _currentLookAt.lerp(_overrideLook, 1 - Math.exp(-2 * delta));
      if (Math.abs(scrollProgress - prevProgress.current) > 0.005) {
        lookAtOverride.current = null;
      }
    } else {
      const blend = 1 - Math.exp(-4 * delta);
      _currentLookAt.x += (targetLookX - _currentLookAt.x) * blend;
      _currentLookAt.y += (targetLookY - _currentLookAt.y) * blend;
      _currentLookAt.z += (targetLookZ - _currentLookAt.z) * blend;
    }

    const posLambda = 1 - Math.exp(-3 * delta);
    state.camera.position.lerp(_targetPos, posLambda);
    state.camera.lookAt(_currentLookAt);

    prevProgress.current = scrollProgress;
  });

  return null;
}
