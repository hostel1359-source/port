'use client';

import React, { useState, useRef, useMemo, useCallback } from 'react';
import { Html, Outlines } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  accentColor: string;
}

interface ProjectBoardProps {
  project: Project;
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
  active: boolean;
  onBoardClick?: (lookAt: [number, number, number]) => void;
}

const _targetScale = new THREE.Vector3();

export default function ProjectBoard({ project, position, rotation, index, active, onBoardClick }: ProjectBoardProps) {
  const [expanded, setExpanded] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  const boardMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.5 }), []);
  const stripMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: project.accentColor, emissive: project.accentColor, emissiveIntensity: 0.3 }), [project.accentColor]);

  const width = 1.8;
  const height = 2.4;
  const depth = 0.05;

  const handleClick = useCallback(() => {
    setExpanded((prev) => !prev);
    // Turn camera to face this board
    if (onBoardClick) {
      onBoardClick(position);
    }
  }, [onBoardClick, position]);

  useFrame(() => {
    if (groupRef.current) {
      const s = expanded ? 1.15 : active ? 1.02 : 1.0;
      _targetScale.set(s, s, s);
      groupRef.current.scale.lerp(_targetScale, 0.08);
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh material={boardMaterial} onClick={handleClick} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
        <boxGeometry args={[width, height, depth]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      <mesh position={[0, height / 2 - 0.1, depth / 2 + 0.01]} material={stripMaterial}>
        <boxGeometry args={[width, 0.2, 0.02]} />
      </mesh>

      <mesh position={[0, height / 2 - 0.1, depth / 2 + 0.03]} material={stripMaterial}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <Outlines thickness={0.02} color="#1a1a1a" />
      </mesh>

      <Html position={[0, 0.1, depth / 2 + 0.02]} transform distanceFactor={6} center>
        <div
          onClick={handleClick}
          style={{
            width: '280px',
            cursor: 'pointer',
            fontFamily: 'Inter, -apple-system, sans-serif',
            color: '#1a1a1a',
            pointerEvents: 'auto',
            userSelect: 'none',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 700, opacity: 0.3, color: project.accentColor, marginBottom: '4px' }}>
            #{String(index + 1).padStart(2, '0')}
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 6px 0', color: '#1a1a1a' }}>
            {project.title}
          </h2>

          <p style={{ fontSize: '11px', fontWeight: 400, fontStyle: 'italic', margin: '0 0 12px 0', color: '#555', lineHeight: 1.4 }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: expanded ? '12px' : '0' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: '#f0ebe3',
                  padding: '3px 8px',
                  fontSize: '10px',
                  fontWeight: 600,
                  border: '1px solid #ccc',
                  borderRadius: '2px',
                  color: '#333',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {expanded && (
            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #ddd' }}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: project.accentColor,
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                VIEW SOURCE ↗
              </a>
            </div>
          )}

          <div style={{ fontSize: '9px', color: '#aaa', marginTop: '8px', textAlign: 'center' }}>
            {expanded ? 'click to close' : 'click to expand'}
          </div>
        </div>
      </Html>
    </group>
  );
}
