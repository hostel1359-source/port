'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import { Edges, Line } from '@react-three/drei';
import * as THREE from 'three';
import { createSketchTexture, createLabelTexture } from './sketch-textures';

type Point = [number, number, number];
type Kind = 'wall' | 'floor' | 'door' | 'paper' | 'brick';
const TextureContext = createContext<Record<Kind, THREE.CanvasTexture> | null>(null);

export function SketchProvider({ children }: { children: React.ReactNode }) {
  const textures = useMemo(() => Object.fromEntries(['wall','floor','door','paper','brick'].map(kind => [kind, createSketchTexture(kind as Kind)])) as Record<Kind, THREE.CanvasTexture>, []);
  useEffect(() => () => Object.values(textures).forEach(texture => texture.dispose()), [textures]);
  return <TextureContext.Provider value={textures}>{children}</TextureContext.Provider>;
}

export function SketchBox({ position, rotation, size, color = '#ffffff', kind = 'paper' }: { position?: Point; rotation?: Point; size: Point; color?: string; kind?: Kind }) {
  const textures = useContext(TextureContext);
  const source = textures?.[kind];
  const [sx,sy,sz] = size;
  const map = useMemo(() => {
    if (!source) return undefined;
    if (!['wall','floor','brick'].includes(kind)) return source;
    const repeated = source.clone();
    repeated.repeat.set(Math.max(.25,(kind==='floor'?sx:Math.max(sx,sz))/4),Math.max(.25,(kind==='floor'?sz:sy)/4));
    return repeated;
  },[source,kind,sx,sy,sz]);
  useEffect(()=>()=>{if(map && map!==source)map.dispose();},[map,source]);
  return <mesh position={position} rotation={rotation}>
    <boxGeometry args={size} />
    <meshBasicMaterial map={map} color={color} />
    <Edges color="#66645e" threshold={20} />
  </mesh>;
}

export function SketchLabel({ lines, position, rotation, width, height, fontSize = 54, handwritten = false, color = '#3d3b35', background = '#f4f3ed', onClick }: { lines: string[]; position?: Point; rotation?: Point; width: number; height: number; fontSize?: number; handwritten?: boolean; color?: string; background?: string; onClick?: () => void }) {
  const serialized = JSON.stringify(lines);
  const texture = useMemo(() => createLabelTexture(JSON.parse(serialized), { width: 1024, height: Math.max(128, Math.round(1024 * height / width)), fontSize:fontSize*2.1, handwritten, color, background }), [serialized, width, height, fontSize, handwritten, color, background]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <mesh position={position} rotation={rotation} onClick={onClick ? e => { e.stopPropagation(); onClick(); } : undefined} onPointerOver={onClick ? e => { e.stopPropagation(); document.body.style.cursor = 'pointer'; } : undefined} onPointerOut={onClick ? () => { document.body.style.cursor = ''; } : undefined}>
    <planeGeometry args={[width,height]} />
    <meshBasicMaterial map={texture} transparent side={THREE.FrontSide} toneMapped={false} />
  </mesh>;
}

export function PencilLine({ points, color = '#67645d', width = 1 }: { points: Point[]; color?: string; width?: number }) {
  return <Line points={points} color={color} lineWidth={width} />;
}

export function Cloud({ position, scale = 1 }: { position: Point; scale?: number }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.5, 0); shape.bezierCurveTo(-2.2,.05,-2.2,.7,-1.6,.8);
    shape.bezierCurveTo(-1.6,1.4,-.8,1.6,-.45,1.05);
    shape.bezierCurveTo(-.15,1.8,.9,1.65,1.1,.85);
    shape.bezierCurveTo(2,.85,2.1,0,1.3,0); shape.lineTo(-1.5,0);
    return new THREE.ShapeGeometry(shape);
  }, []);
  const points = useMemo(() => {
    const shape = geometry.parameters.shapes as THREE.Shape;
    const p = shape.getPoints(40);
    return p.map(v => [v.x, v.y, .012] as Point);
  }, [geometry]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <group position={position} scale={scale}><mesh geometry={geometry}><meshBasicMaterial color="#e9e9e5" side={THREE.DoubleSide} /></mesh><PencilLine points={points} color="#99988f" width={1.2} /></group>;
}
