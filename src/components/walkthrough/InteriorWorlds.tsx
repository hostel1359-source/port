'use client';

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Edges, useCursor } from '@react-three/drei';
import { BufferGeometry, DoubleSide, Float32BufferAttribute, type Group } from 'three';
import { PERSONAL } from '@/data/personal';
import { PROJECTS } from '@/data/projects';
import { SKILLS, SKILL_CATEGORIES, type SkillCategory } from '@/data/skills';
import { SketchBox, SketchLabel, PencilLine, Cloud } from './SketchPrimitives';

type Point = [number, number, number];
type InteriorRoom = 'about' | 'work' | 'studio' | 'contact';
type ContactAction = 'email' | 'github' | 'copy';

interface InteriorWorldsProps {
  room: InteriorRoom;
  progress: MutableRefObject<number>;
  motion: boolean;
  onProject: (index: number) => void;
  onDetails: (room: 'about' | 'work' | 'contact') => void;
  onContact: (action: ContactAction) => void;
}

const PAPER = '#f3f2ec';
const INK = '#45443e';
const SOFT_INK = '#99978c';
const WOOD = '#d7c7a7';
const YELLOW = '#eed15d';
const MINT = '#c8cfbd';

function circlePoints(radius: number, z = 0, count = 40, start = 0, end = Math.PI * 2): Point[] {
  return Array.from({ length: count + 1 }, (_, i) => {
    const angle = start + (i / count) * (end - start);
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, z];
  });
}

function useHotspot(onClick: () => void) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  return {
    hovered,
    events: {
      onPointerOver: (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); setHovered(true); },
      onPointerOut: () => setHovered(false),
      onClick: (event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onClick(); },
    },
  };
}

function OutlinedCylinder({ position = [0, 0, 0], radius, height, color = PAPER, radialSegments = 16 }: {
  position?: Point; radius: number; height: number; color?: string; radialSegments?: number;
}) {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[radius, radius, height, radialSegments]} />
      <meshBasicMaterial color={color} />
      <Edges color={INK} threshold={18} />
    </mesh>
  );
}

function Pin({ position }: { position: Point }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.045, 8, 6]} />
      <meshBasicMaterial color={INK} />
    </mesh>
  );
}

function PaperPlane({ progress, motion }: Pick<InteriorWorldsProps, 'progress' | 'motion'>) {
  const group = useRef<Group>(null);
  const geometry = useMemo(() => {
    const result = new BufferGeometry();
    result.setAttribute('position', new Float32BufferAttribute([
      0, 0, -1.1, -0.85, 0.03, 0.75, -0.09, 0.18, 0.4,
      0, 0, -1.1, -0.09, 0.18, 0.4, 0, -0.11, 0.8,
      0, 0, -1.1, 0, -0.11, 0.8, 0.09, 0.18, 0.4,
      0, 0, -1.1, 0.09, 0.18, 0.4, 0.85, 0.03, 0.75,
    ], 3));
    result.computeVertexNormals();
    return result;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame(({ camera, clock }) => {
    if (!group.current) return;
    const t = motion ? clock.elapsedTime : 0;
    group.current.position.set(camera.position.x + 1.5 + Math.sin(progress.current * 12) * 0.15, camera.position.y - 1.0 + Math.sin(t * 1.3) * 0.07, camera.position.z - 4.3);
    group.current.rotation.set(0.15, -0.18, motion ? Math.sin(t * 0.8) * 0.09 : 0);
  });
  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={PAPER} side={DoubleSide} />
        <Edges color={INK} threshold={8} />
      </mesh>
      <PencilLine points={[[0, -0.11, 0.8], [0, 0, -1.1], [-0.09, 0.18, 0.4]]} width={1.3} />
      {[0, 1, 2].map((i) => <PencilLine key={i} points={[[-0.2 + i * 0.2, 0, 1 + i * 0.16], [-0.23 + i * 0.23, 0.02, 1.5 + i * 0.18]]} color={SOFT_INK} />)}
    </group>
  );
}

function AboutNote({ position, number, title, lines, onClick }: {
  position: Point; number: string; title: string; lines: string[]; onClick: () => void;
}) {
  const { hovered, events } = useHotspot(onClick);
  return (
    <group position={position} {...events}>
      <SketchBox size={[4.2, 2.75, 0.075]} kind="paper" color={hovered ? '#f1e5b6' : PAPER} rotation={[0, 0, -0.035]} />
      <SketchBox size={[0.72, 0.22, 0.035]} color={WOOD} position={[0, 1.36, 0.08]} rotation={[0, 0, 0.09]} />
      <SketchLabel lines={[number]} width={0.45} height={0.28} position={[-1.63, 1.04, 0.09]} fontSize={28} />
      <SketchLabel lines={[title]} width={3.65} height={0.52} position={[0, 0.58, 0.1]} fontSize={44} handwritten />
      <PencilLine points={[[-1.65, 0.21, 0.12], [1.63, 0.23, 0.12]]} color={SOFT_INK} />
      <SketchLabel lines={lines} width={3.55} height={1.08} position={[0, -0.43, 0.11]} fontSize={25} />
      <SketchLabel lines={['A LITTLE MORE ABOUT ME  ↗']} width={2.65} height={0.2} position={[0, -1.11, 0.11]} fontSize={21} color={INK} />
    </group>
  );
}

function SkillBalloon({ position, lines, tint, motion, index }: {
  position: Point; lines: string[]; tint: string; motion: boolean; index: number;
}) {
  const group = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = position[1] + (motion ? Math.sin(clock.elapsedTime * 0.65 + index) * 0.15 : 0);
    group.current.rotation.z = motion ? Math.sin(clock.elapsedTime * 0.45 + index) * 0.035 : 0;
  });
  return (
    <group ref={group} position={position}>
      <mesh scale={[1.25, 0.98, 0.48]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshBasicMaterial color={tint} />
        <Edges color={SOFT_INK} threshold={24} />
      </mesh>
      <SketchLabel lines={lines} width={1.96} height={0.68} position={[0, 0.04, 0.5]} fontSize={30} handwritten />
      <PencilLine points={[[0, -0.98, 0], [0.14, -1.5, 0], [-0.11, -2.1, 0.1], [0.03, -2.8, 0]]} color={SOFT_INK} />
      <mesh position={[0, -1, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.12, 0.16, 5]} />
        <meshBasicMaterial color={tint} />
        <Edges color={INK} />
      </mesh>
    </group>
  );
}

function AboutWorld({ progress, motion, onDetails }: Pick<InteriorWorldsProps, 'progress' | 'motion' | 'onDetails'>) {
  return (
    <group>
      <SketchLabel lines={['ABOUT ME']} position={[0, 4.65, -3]} width={5.8} height={0.85} fontSize={72} handwritten />
      <AboutNote position={[-0.8, 2.35, -3]} number="01" title={`HEY, I'M ${PERSONAL.name.toUpperCase()}.`} lines={[
        'A developer with a curious streak.',
        'I build tools, optimize systems,',
        'and experiment with new tech.',
      ]} onClick={() => onDetails('about')} />
      <AboutNote position={[1.1, 2.3, -19]} number="02" title='FOLLOW THE CURIOSITY.' lines={[
        'AI-powered developer tools.',
        'Blockchain and on-chain analytics.',
        'Quantitative finance systems.',
      ]} onClick={() => onDetails('about')} />
      <AboutNote position={[-0.9, 2.35, -36]} number="03" title='MAKE SOMETHING WORK.' lines={[
        'System optimization and performance.',
        'Real-time communication.',
        'Open-source building.',
      ]} onClick={() => onDetails('about')} />
      <SketchLabel lines={['A FEW THINGS IN MY TOOLBOX']} position={[0, 5.1, -44]} width={6} height={0.7} fontSize={52} handwritten />
      <SkillBalloon position={[-2.4, 2.7, -44]} lines={['Python', 'TypeScript']} tint={PAPER} motion={motion} index={0} />
      <SkillBalloon position={[0.45, 3, -45.3]} lines={['React', 'Next.js']} tint={YELLOW} motion={motion} index={1} />
      <SkillBalloon position={[3.2, 2.3, -44.2]} lines={['AI tools', 'WebSocket']} tint={MINT} motion={motion} index={2} />
      <SketchLabel lines={['STILL CURIOUS.', 'STILL BUILDING.']} position={[0, 2.9, -55]} width={5} height={1.8} fontSize={65} handwritten onClick={() => onDetails('about')} />
      <SketchLabel lines={['EXPLORE THE FULL TOOLBOX  ↗']} position={[0, 1.4, -55]} width={3.8} height={0.35} fontSize={28} onClick={() => onDetails('about')} />
      {Array.from({ length: 22 }, (_, i) => <Cloud key={i} position={[(i % 2 ? 1 : -1) * (4.8 + Math.sin(i * 2.3) * 1.8), 0.1 + (i % 3) * 2.7, 1 - i * 2.9]} scale={1.0 + (i % 4) * 0.25} />)}
      {[8, 24, 40, 53].map((z, i) => <Cloud key={z} position={[0.3, -2.1, -z]} scale={2.5 + i * 0.1} />)}
      <PaperPlane progress={progress} motion={motion} />
    </group>
  );
}

function ProjectDrawing({ index }: { index: number }) {
  if (index === 0) return (
    <group>
      <SketchBox size={[2.43, 1.3, 0.14]} color={WOOD} />
      <SketchBox size={[2.22, 1.08, 0.055]} color={PAPER} position={[0, 0.01, 0.11]} />
      <PencilLine points={[[-1.1, 0.3, 0.15], [1.1, 0.3, 0.15]]} />
      {[-0.92, -0.77, -0.62].map((x) => <Pin key={x} position={[x, 0.43, 0.16]} />)}
      <SketchLabel lines={['> const idea = build();', '> await ship(idea);', '_']} width={1.88} height={0.67} fontSize={25} position={[0, -0.12, 0.16]} />
      <SketchBox size={[0.12, 0.32, 0.12]} color={WOOD} position={[0, -0.78, -0.01]} />
      <SketchBox size={[0.9, 0.06, 0.36]} color={WOOD} position={[0, -0.96, 0.08]} />
    </group>
  );
  if (index === 1) return (
    <group>
      {[0.3, 0.61, 0.88].map((radius) => <PencilLine key={radius} points={circlePoints(radius, 0.06)} color={radius === 0.88 ? INK : SOFT_INK} />)}
      <PencilLine points={[[-0.9, 0, 0.06], [0.9, 0, 0.06]]} color={SOFT_INK} />
      <PencilLine points={[[0, -0.9, 0.06], [0, 0.9, 0.06]]} color={SOFT_INK} />
      <PencilLine points={[[0, 0, 0.09], [0.68, 0.58, 0.09]]} width={2.5} />
      {[[0.41, 0.36, 0.1], [-0.36, -0.28, 0.1], [0.2, -0.64, 0.1]].map((position, i) => (
        <mesh key={i} position={position as Point}><circleGeometry args={[i === 0 ? 0.095 : 0.065, 12]} /><meshBasicMaterial color={i === 0 ? YELLOW : INK} /></mesh>
      ))}
      <PencilLine points={[[0.5, 0.44, 0.09], [1.06, 0.78, 0.09], [1.35, 0.78, 0.09]]} color={SOFT_INK} />
      <SketchLabel lines={['ON CHAIN']} width={0.8} height={0.22} position={[1.06, 0.98, 0.12]} fontSize={22} handwritten />
    </group>
  );
  if (index === 2) return (
    <group position={[0, -0.32, 0]}>
      <PencilLine points={circlePoints(1.0, 0.1, 24, 0, Math.PI)} width={2} />
      <PencilLine points={circlePoints(0.82, 0.1, 24, 0, Math.PI)} color={SOFT_INK} />
      <PencilLine points={[[-1.01, 0, 0.1], [1.01, 0, 0.1]]} />
      {[0.2, 0.7, 1.2, 1.7, 2.2, 2.7].map((angle) => <PencilLine key={angle} points={[[Math.cos(angle) * 0.84, Math.sin(angle) * 0.84, 0.12], [Math.cos(angle) * 0.96, Math.sin(angle) * 0.96, 0.12]]} />)}
      <PencilLine points={[[0, 0.09, 0.16], [0.67, 0.58, 0.16]]} width={3} />
      <Pin position={[0, 0.09, 0.18]} />
      <SketchLabel lines={['LESS FRICTION.', 'MORE GO.']} width={2} height={0.48} position={[0, -0.43, 0.13]} fontSize={27} handwritten />
    </group>
  );
  return (
    <group>
      <SketchBox size={[1.75, 0.94, 0.055]} color={MINT} position={[-0.3, 0.2, 0]} />
      <SketchBox size={[1.6, 0.77, 0.055]} color={YELLOW} position={[0.47, -0.28, 0.14]} />
      <PencilLine points={[[-0.98, -0.26, 0.04], [-0.98, -0.53, 0.04], [-0.62, -0.26, 0.04]]} />
      <PencilLine points={[[1.06, -0.67, 0.19], [1.06, -0.89, 0.19], [0.78, -0.67, 0.19]]} />
      <SketchLabel lines={['hello, stranger.']} width={1.48} height={0.31} position={[-0.3, 0.19, 0.05]} fontSize={28} handwritten />
      <SketchLabel lines={['here for a moment.']} width={1.4} height={0.33} position={[0.47, -0.28, 0.19]} fontSize={25} handwritten />
      {[0, 1, 2].map((i) => <SketchBox key={i} size={[0.055, 0.055, 0.025]} color={SOFT_INK} position={[1.02 + i * 0.19, 0.49 + Math.sin(i) * 0.16, 0.02]} />)}
    </group>
  );
}

const PROJECT_TITLES = [['DevOS'], ['Solana Memecoin', 'Scanner'], ['PotatoBoost'], ['Ephemeral Chat']];
const PROJECT_SUBTITLES = [
  ['AI-powered developer', 'operating system'],
  ['Autonomous on-chain', 'alpha intelligence'],
  ['Low-level Windows', 'performance optimizer'],
  ['Self-destructing', 'encrypted chat rooms'],
];

function HangingProject({ index, onProject, motion }: { index: number; onProject: (index: number) => void; motion: boolean }) {
  const { hovered, events } = useHotspot(() => onProject(index));
  const card = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (card.current) card.current.rotation.z = motion ? Math.sin(clock.elapsedTime * 0.45 + index * 1.9) * 0.012 : 0;
  });
  return (
    <group position={[(index - 1.5) * 4.2, 2.6, -3]}>
      {[-1.12, 1.12].map((x) => <PencilLine key={x} points={[[x, 2.04, 0], [x, 4.25, 0]]} color={INK} width={1.25} />)}
      <group ref={card} {...events}>
        <SketchBox size={[3.5, 4.15, 0.15]} color={WOOD} kind="paper" />
        <SketchBox size={[3.29, 3.94, 0.035]} position={[0, 0, 0.101]} color={hovered ? '#f3e8b9' : PAPER} kind="paper" />
        <Pin position={[-1.12, 1.92, 0.16]} /><Pin position={[1.12, 1.92, 0.16]} />
        <SketchLabel lines={[`0${index + 1} / SELECTED WORK`]} width={2.75} height={0.25} position={[0, 1.7, 0.15]} fontSize={24} />
        <SketchLabel lines={PROJECT_TITLES[index] ?? [PROJECTS[index].title]} width={2.9} height={0.73} position={[0, 1.13, 0.15]} fontSize={43} handwritten />
        <group position={[0, -0.02, 0.21]} scale={0.83}><ProjectDrawing index={index} /></group>
        <SketchLabel lines={PROJECT_SUBTITLES[index]} width={2.76} height={0.52} position={[0, -1.19, 0.15]} fontSize={27} />
        <PencilLine points={[[-1.31, -1.58, 0.15], [1.3, -1.56, 0.15]]} color={SOFT_INK} />
        <SketchLabel lines={['OPEN PROJECT  ↗']} width={2.12} height={0.25} position={[0, -1.78, 0.15]} fontSize={25} color={INK} />
      </group>
    </group>
  );
}

function Skyline() {
  return (
    <group position={[0, -0.9, -21]}>
      {Array.from({ length: 21 }, (_, i) => {
        const height = 1.7 + ((i * 7) % 11) * 0.37;
        const width = 0.75 + (i % 3) * 0.26;
        return (
          <group key={i} position={[(i - 10) * 1.6, height / 2, Math.sin(i * 5.3) * 1.4]}>
            <SketchBox size={[width, height, 0.7]} color={i % 3 ? '#e6e4dc' : '#dcdcd3'} kind="wall" />
            {Array.from({ length: Math.floor(height / 0.7) }, (_, row) => (
              <group key={row} position={[0, -height / 2 + 0.45 + row * 0.67, 0.37]}>
                <SketchBox size={[0.14, 0.25, 0.025]} position={[-width * 0.25, 0, 0]} color={SOFT_INK} />
                <SketchBox size={[0.14, 0.25, 0.025]} position={[width * 0.25, 0, 0]} color={SOFT_INK} />
              </group>
            ))}
            {i % 5 === 0 && <PencilLine points={[[0, height / 2, 0], [0, height / 2 + 0.8, 0]]} color={SOFT_INK} />}
          </group>
        );
      })}
    </group>
  );
}

function GalleryWorld({ onProject, motion }: Pick<InteriorWorldsProps, 'onProject' | 'motion'>) {
  return (
    <group>
      <SketchBox position={[0, -0.65, -1.8]} size={[27, 0.25, 16]} kind="floor" color={PAPER} />
      <SketchBox position={[0, 6.88, -3]} size={[23, 0.14, 0.17]} color={WOOD} />
      <SketchBox position={[0, 1.27, -6.6]} size={[28, 0.11, 0.13]} color={PAPER} />
      <SketchBox position={[0, -0.35, -6.6]} size={[28, 0.1, 0.11]} color={PAPER} />
      {Array.from({ length: 29 }, (_, i) => <SketchBox key={i} position={[i - 14, 0.44, -6.6]} size={[0.065, 1.65, 0.065]} color={PAPER} />)}
      {PROJECTS.map((project, index) => <HangingProject key={project.id} index={index} onProject={onProject} motion={motion} />)}
      <SketchLabel lines={['THE WORKSHOP']} position={[-6.3, 5.5, -3.1]} width={5.3} height={0.73} fontSize={68} handwritten />
      <SketchLabel lines={['IDEAS, MADE REAL.']} position={[6.3, 5.5, -3.1]} width={4.7} height={0.73} fontSize={62} handwritten />
      <Skyline />
      {[-12, -5, 4, 12].map((x, i) => <Cloud key={x} position={[x, 6.7 + (i % 2) * 2, -18 - i * 2]} scale={1.6} />)}
    </group>
  );
}

const CATEGORY_LINES: Record<SkillCategory, string[]> = {
  languages: ['LANGUAGES', 'Python · TypeScript', 'JavaScript · Go · Bash', 'C# · Java'],
  frameworks: ['FRAMEWORKS & RUNTIME', 'React · Next.js · Node.js', 'Flask · Electron'],
  'ai-ml': ['AI & MACHINE LEARNING', 'OpenAI API · Gemini API', 'Ollama · Prompt Eng.'],
  blockchain: ['BLOCKCHAIN & FINANCE', 'Solana · Pine Script', 'DeFi'],
  tools: ['DEVOPS & TOOLS', 'Git · Docker', 'WebSocket'],
};

function StudioMonitor({ category, index, onDetails }: { category: SkillCategory; index: number; onDetails: InteriorWorldsProps['onDetails'] }) {
  const { hovered, events } = useHotspot(() => onDetails('about'));
  const angle = (index / 5) * Math.PI * 2;
  const height = [1.6, 3.6, 2.2, 3.85, 2.35][index];
  const position: Point = [Math.sin(angle) * 2.6, height, Math.cos(angle) * 2.6];
  const standHeight = height - 0.89;
  return (
    <group position={position} rotation={[0, angle, 0]} {...events}>
      <SketchBox size={[2.45, 1.89, 1.06]} color={hovered ? YELLOW : WOOD} />
      <SketchBox position={[0, 0.1, 0.557]} size={[2.11, 1.4, 0.065]} color={INK} />
      <SketchBox position={[0, 0.1, 0.596]} size={[1.96, 1.25, 0.025]} color={PAPER} kind="paper" />
      <SketchLabel lines={CATEGORY_LINES[category]} width={1.79} height={1.08} position={[0, 0.11, 0.62]} fontSize={43} />
      <Pin position={[0.92, -0.73, 0.559]} />
      <PencilLine points={[[-0.95, -0.7, 0.56], [-0.3, -0.7, 0.56]]} color={INK} />
      {[0, 1, 2].map((i) => <PencilLine key={i} points={[[1.232, -0.18 + i * 0.17, -0.29], [1.232, -0.18 + i * 0.17, 0.23]]} color={INK} />)}
      <OutlinedCylinder radius={0.11} height={standHeight} color={SOFT_INK} position={[0, -0.94 - standHeight / 2, 0]} />
      <SketchBox position={[0, -height - 0.03, 0]} size={[1.05, 0.08, 0.75]} color={WOOD} />
      <PencilLine points={[[0, -0.87, -0.55], [0.25, -1.35, -0.75], [0.34, -height + 0.05, -0.6], [0, -height + 0.02, -2.25]]} width={1.4} />
    </group>
  );
}

function StudioWorld({ onDetails }: Pick<InteriorWorldsProps, 'onDetails'>) {
  const categories = Object.keys(SKILL_CATEGORIES) as SkillCategory[];
  return (
    <group>
      <OutlinedCylinder radius={6.2} height={0.14} color={PAPER} position={[0, -0.35, 0]} radialSegments={48} />
      <OutlinedCylinder radius={3.75} height={0.21} color={WOOD} position={[0, -0.14, 0]} radialSegments={40} />
      <OutlinedCylinder radius={0.3} height={5.4} color={PAPER} position={[0, 2.64, 0]} />
      <OutlinedCylinder radius={0.55} height={0.14} color={WOOD} position={[0, 5.4, 0]} />
      {categories.map((category, index) => <StudioMonitor key={category} category={category} index={index} onDetails={onDetails} />)}
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.265, 0]}>
        <PencilLine points={circlePoints(4.35)} color={SOFT_INK} />
        <PencilLine points={circlePoints(5.65)} color={SOFT_INK} />
      </group>
      {[0, 1, 2, 3].map((i) => {
        const angle = i * Math.PI / 2;
        return <SketchLabel key={i} lines={['THE STUDIO', `${SKILLS.length} TOOLS. ENDLESS POSSIBILITIES.`]} position={[Math.sin(angle) * 3, 5.4, Math.cos(angle) * 3]} rotation={[0, angle, 0]} width={4.2} height={1.0} fontSize={47} handwritten />;
      })}
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        return <Cloud key={i} position={[Math.sin(angle) * 13, 3 + (i % 3) * 2, Math.cos(angle) * 13]} scale={1.7} />;
      })}
      <SketchBox size={[1.4, 0.12, 0.56]} position={[0.4, 0.08, 3.35]} color={PAPER} rotation={[0, 0.12, 0]} />
      {[0, 1, 2].map((row) => <PencilLine key={row} points={[[-0.21, 0.15, 3.16 + row * 0.15], [0.98, 0.15, 3.16 + row * 0.15]]} color={SOFT_INK} />)}
    </group>
  );
}

function ContactBarrel({ position, action, lines, index, motion, onContact }: {
  position: Point; action: ContactAction; lines: string[]; index: number; motion: boolean; onContact: InteriorWorldsProps['onContact'];
}) {
  const group = useRef<Group>(null);
  const { hovered, events } = useHotspot(() => onContact(action));
  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = motion ? clock.elapsedTime : 0;
    group.current.position.y = position[1] + (motion ? Math.sin(time * 0.8 + index * 1.8) * 0.085 : 0);
    group.current.rotation.z = motion ? Math.sin(time * 0.55 + index) * 0.025 : 0;
  });
  return (
    <group ref={group} position={position} {...events}>
      <OutlinedCylinder radius={0.62} height={1.4} color={WOOD} radialSegments={14} />
      {[-0.45, 0.43].map((y) => <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.632, 0.037, 5, 20]} /><meshBasicMaterial color={INK} /></mesh>)}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = i * Math.PI / 6;
        return <PencilLine key={i} points={[[Math.sin(angle) * 0.625, -0.66, Math.cos(angle) * 0.625], [Math.sin(angle) * 0.625, 0.66, Math.cos(angle) * 0.625]]} color={SOFT_INK} />;
      })}
      <SketchBox size={[0.11, 1.31, 0.13]} position={[0, 1.18, 0]} color={WOOD} />
      <SketchBox size={[1.91, 0.91, 0.12]} position={[0, 1.75, 0.05]} color={hovered ? YELLOW : PAPER} kind="paper" rotation={[0, 0, index === 1 ? -0.035 : 0.025]} />
      <SketchLabel lines={lines} width={1.7} height={0.66} position={[0, 1.76, 0.127]} fontSize={70} handwritten />
      <Pin position={[-0.79, 1.77, 0.13]} /><Pin position={[0.79, 1.77, 0.13]} />
      <SketchLabel lines={[action === 'github' ? `@${PERSONAL.username}` : action === 'email' ? 'WRITE A NOTE  ↗' : 'TAKE IT WITH YOU']} width={1.6} height={0.23} position={[0, 0.16, 0.634]} fontSize={23} />
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.69, 0]}>
        <PencilLine points={circlePoints(0.87)} color={SOFT_INK} />
        <PencilLine points={circlePoints(1.07, 0, 24, 0.2, Math.PI * 1.5)} color={SOFT_INK} />
      </group>
    </group>
  );
}

function Lighthouse() {
  return (
    <group position={[9.5, -0.2, -21]}>
      <OutlinedCylinder radius={1.2} height={0.3} color={WOOD} position={[0, -0.03, 0]} radialSegments={12} />
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.42, 0.88, 4, 12]} />
        <meshBasicMaterial color={PAPER} />
        <Edges color={INK} />
      </mesh>
      {[1.15, 2.6].map((height) => <OutlinedCylinder key={height} radius={height === 1.15 ? 0.76 : 0.6} height={0.3} color={WOOD} position={[0, height, 0]} radialSegments={12} />)}
      <OutlinedCylinder radius={0.8} height={0.12} color={INK} position={[0, 4.06, 0]} radialSegments={12} />
      <SketchBox size={[0.94, 0.9, 0.94]} position={[0, 4.55, 0]} color={YELLOW} />
      <mesh position={[0, 5.25, 0]}><coneGeometry args={[0.87, 0.72, 8]} /><meshBasicMaterial color={WOOD} /><Edges color={INK} /></mesh>
      <PencilLine points={[[0, 5.6, 0], [0, 6.3, 0]]} />
    </group>
  );
}

function ContactWorld({ motion, onContact }: Pick<InteriorWorldsProps, 'motion' | 'onContact'>) {
  const waves = useMemo(() => Array.from({ length: 31 }, (_, row) => {
    const z = 4 - row * 1.3;
    return Array.from({ length: 24 }, (_, i): Point => [-23 + i * 2, -0.54 + Math.sin(i * 1.7 + row * 0.9) * 0.028, z + Math.sin(i * 1.14 + row) * 0.15]);
  }), []);
  return (
    <group>
      <mesh position={[0, -0.56, -13]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshBasicMaterial color={PAPER} /></mesh>
      {waves.map((points, i) => <PencilLine key={i} points={points} color={i % 4 === 0 ? '#a9aaa0' : '#cccac1'} width={0.75} />)}
      <PencilLine points={[[-42, -0.3, -38], [42, -0.3, -38]]} color={SOFT_INK} />
      {Array.from({ length: 17 }, (_, i) => <SketchBox key={i} size={[2.65, 0.17, 0.4]} position={[0, -0.23, 5.3 - i * 0.43]} color={i % 3 ? WOOD : '#d0bea1'} kind="floor" />)}
      {Array.from({ length: 6 }, (_, i) => <SketchBox key={i} size={[7, 0.17, 0.4]} position={[0, -0.23, -1.88 + i * 0.43]} color={i % 2 ? WOOD : '#d0bea1'} kind="floor" />)}
      {[-3.4, -1.2, 1.2, 3.4].map((x, i) => <OutlinedCylinder key={x} radius={0.095} height={0.92} position={[x, -0.19, i % 2 ? 0.2 : -1.9]} color={WOOD} radialSegments={8} />)}
      <PencilLine points={[[-3.4, 0.24, -1.9], [-2.35, -0.03, -1.9], [-1.2, 0.24, -1.9]]} color={INK} />
      <PencilLine points={[[1.2, 0.24, -1.9], [2.35, -0.03, -1.9], [3.4, 0.24, -1.9]]} color={INK} />
      <ContactBarrel position={[-2.48, 0.18, -3.8]} action="github" lines={['GITHUB ↗']} index={0} motion={motion} onContact={onContact} />
      <ContactBarrel position={[0, 0.18, -4.4]} action="email" lines={['EMAIL ↗']} index={1} motion={motion} onContact={onContact} />
      <ContactBarrel position={[2.48, 0.18, -3.8]} action="copy" lines={['COPY EMAIL']} index={2} motion={motion} onContact={onContact} />
      <SketchLabel lines={['LET’S MAKE WAVES.']} position={[0, 4.45, -7.4]} width={7.8} height={1.08} fontSize={69} handwritten />
      <SketchLabel lines={[PERSONAL.cta]} position={[0, 3.67, -7.4]} width={5.8} height={0.43} fontSize={32} />
      <Lighthouse />
      <Cloud position={[-9, 6.5, -19]} scale={2.6} /><Cloud position={[2, 7.7, -24]} scale={2.2} /><Cloud position={[15, 6.7, -30]} scale={2.6} />
      <group position={[-8.5, -0.3, -14]} rotation={[0, -0.2, 0]}>
        <SketchBox size={[2.3, 0.26, 0.73]} color={WOOD} />
        <PencilLine points={[[0, 0, 0], [0, 2.65, 0]]} width={1.7} />
        <PencilLine points={[[0, 2.55, 0], [-1.05, 0.55, 0], [0, 0.55, 0], [0, 2.55, 0]]} />
        <PencilLine points={[[0.14, 2.08, 0], [1.07, 0.58, 0], [0.14, 0.58, 0], [0.14, 2.08, 0]]} />
      </group>
    </group>
  );
}

export default function InteriorWorlds({ room, progress, motion, onProject, onDetails, onContact }: InteriorWorldsProps) {
  if (room === 'about') return <AboutWorld progress={progress} motion={motion} onDetails={onDetails} />;
  if (room === 'work') return <GalleryWorld onProject={onProject} motion={motion} />;
  if (room === 'studio') return <StudioWorld onDetails={onDetails} />;
  return <ContactWorld motion={motion} onContact={onContact} />;
}

