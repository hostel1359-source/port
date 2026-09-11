'use client';

import React, { Suspense, useMemo, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import CorridorEnvironment from './CorridorEnvironment';
import CameraRig from './CameraRig';
import SkillCloud from './SkillCloud';
import DeskSetup from './DeskSetup';
import StudioCharacter from './StudioCharacter';
import DoorFrame from './DoorFrame';
import DecorativeObjects from './DecorativeObjects';
import WallFrame from './WallFrame';
import PaintingFrame from './PaintingFrame';
import WallPoetry from './WallPoetry';
import AboutNotebook from './AboutNotebook';
import ProjectDoor from './ProjectDoor';
import SketchPostProcessing from './SketchPostProcessing';
import ContactWall from './ContactWall';
import SakuraParticles from './SakuraParticles';
import FireflyParticles from './FireflyParticles';
import SharinganWallPiece from './SharinganWallPiece';
import ToyVehicles from './ToyVehicles';
import { PROJECTS } from '@/data/projects';

interface SceneProps {
  scrollProgress: number;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  performanceTier?: 'high' | 'medium' | 'low';
}

function getActiveSection(progress: number): string {
  if (progress < 0.15) return 'hero';
  if (progress < 0.3) return 'about';
  if (progress < 0.65) return 'projects';
  if (progress < 0.8) return 'skills';
  if (progress < 0.9) return 'github';
  return 'contact';
}

export default function Scene({ scrollProgress, mouseRef }: SceneProps) {
  const activeSection = useMemo(() => getActiveSection(scrollProgress), [scrollProgress]);
  const lookAtOverrideRef = useRef<[number, number, number] | null>(null);

  const handleLookAt = useCallback((pos: [number, number, number]) => {
    lookAtOverrideRef.current = pos;
  }, []);

  // Door click just turns camera to face it
  const handleDoorClick = useCallback((projectId: string) => {
    // Find the door position to look at
    const idx = PROJECTS.findIndex(p => p.id === projectId);
    if (idx >= 0) {
      const x = idx % 2 === 0 ? -3.9 : 3.9;
      const z = -40 + -idx * 10;
      lookAtOverrideRef.current = [x, 1.5, z];
    }
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 1.6, 5], fov: 50, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'auto' }}
    >
      <Suspense fallback={null}>
        <CorridorEnvironment />
        <CameraRig scrollProgress={scrollProgress} mouseRef={mouseRef} lookAtOverride={lookAtOverrideRef} />

        {/* --- z=0: ENTRANCE --- */}
        <group position={[0, 0, 0]}>
          <StudioCharacter position={[0, 0, 0]} mouseRef={mouseRef} />
          <DoorFrame position={[0, 0, -2]} label="Welcome" color="#4f9cf5" />
        </group>

        {/* --- z=-9: NOTEBOOK right where camera pauses --- */}
        <AboutNotebook position={[0, 1.6, -9]} scrollProgress={scrollProgress} />

        {/* Naruto art in the corridor — Itachi & Obito only */}
        <PaintingFrame position={[-3.85, 2, -20]} rotation={[0, Math.PI / 2, 0]} width={1.6} height={2.1} imagePath="/itachi.jpg" label="Itachi Uchiha" />
        <PaintingFrame position={[3.85, 2, -28]} rotation={[0, -Math.PI / 2, 0]} width={1.6} height={2.1} imagePath="/obito.jpg" label="Obito Uchiha" />

        {/* --- z=-40 to -70: PROJECT DOORS on walls --- */}
        {PROJECTS.map((project, i) => (
          <ProjectDoor
            key={project.id}
            projectId={project.id}
            title={project.title}
            icon={project.icon}
            index={i}
            accentColor={project.accentColor}
            position={[i % 2 === 0 ? -3.9 : 3.9, 0, -40 + -i * 10]}
            rotation={[0, i % 2 === 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
            onDoorClick={handleDoorClick}
          />
        ))}

        {/* --- z=-78: DOOR before SKILLS --- */}
        <DoorFrame position={[0, 0, -78]} label="Skills Lab" color="#10b981" />

        {/* --- z=-80 to -100: SKILLS scattered along the corridor --- */}
        <SkillCloud position={[0, 1.5, -90]} active={activeSection === 'skills' || activeSection === 'projects'} />

        {/* --- z=-110: DOOR before GITHUB --- */}
        <DoorFrame position={[0, 0, -110]} label="Terminal" color="#f59e0b" />

        {/* --- z=-120: GITHUB TERMINAL --- */}
        <group position={[0, 0, -120]}>
          <DeskSetup position={[0, 0, 0]} />
        </group>

        {/* Paintings between computer and Let's Build door */}
        <PaintingFrame position={[-3.85, 2, -128]} rotation={[0, Math.PI / 2, 0]} width={1.8} height={2.4} imagePath="/mona-lisa.jpg" label="Mona Lisa" />
        <PaintingFrame position={[3.85, 2, -134]} rotation={[0, -Math.PI / 2, 0]} width={1.8} height={2.4} imagePath="/greek-bust.jpg" label="Greek Philosopher" />

        {/* --- z=-140: DOOR before CONTACT --- */}
        <DoorFrame position={[0, 0, -140]} label="Let's Build" color="#8b5cf6" />

        {/* --- z=-155: CONTACT WALL --- */}
        <ContactWall position={[0, 0, -155]} />

        <WallPoetry onQuoteClick={handleLookAt} />
        <DecorativeObjects />
        <ToyVehicles />

        <SketchPostProcessing />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
