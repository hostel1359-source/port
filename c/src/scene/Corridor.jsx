/*
 * Corridor.jsx — 3D corridor with sketch-style edges
 *
 * Camera starts at Z=0. Segment group at Z=5 means geometry extends Z=5 to Z=-55.
 * Camera at Z=0 is INSIDE the corridor. ✓
 *
 * Uses meshBasicMaterial + Edges for guaranteed visibility.
 * meshBasicMaterial renders flat colors with NO lighting needed.
 * Edges render dark outlines = pencil sketch look on paper.
 */
import * as THREE from 'three'
import { Edges } from '@react-three/drei'
import Door from './Door'
import { siteConfig } from '../config/siteConfig'

const SEG = 60
const HALF = SEG / 2
const W = 2.8       // corridor half-width
const YF = -1.2     // floor Y
const YC = 2.2      // ceiling Y
const WH = YC - YF  // wall height = 3.4
const MID = (YF + YC) / 2  // wall center Y = 0.5

// Colors — intentionally darker than background (#faf8f3)
const WALL = '#ddd8cf'
const FLOOR = '#ccc5b8'
const CEIL = '#e8e4dc'
const EDGE = '#666'
const FRAME_BG = '#c8c0b0'
const FRAME_IN = '#e0dbd0'
const DS = THREE.DoubleSide

function Segment({ offset }) {
  return (
    <group position={[0, 0, offset]}>
      {/* ── Floor ── */}
      <mesh position={[0, YF, -HALF]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W * 2, SEG, 6, 6]} />
        <meshBasicMaterial color={FLOOR} side={DS} />
        <Edges threshold={15} color={EDGE} />
      </mesh>

      {/* ── Ceiling ── */}
      <mesh position={[0, YC, -HALF]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W * 2, SEG]} />
        <meshBasicMaterial color={CEIL} side={DS} />
      </mesh>

      {/* ── Left Wall ── */}
      <mesh position={[-W, MID, -HALF]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[SEG, WH, 6, 2]} />
        <meshBasicMaterial color={WALL} side={DS} />
        <Edges threshold={15} color={EDGE} />
      </mesh>

      {/* ── Right Wall ── */}
      <mesh position={[W, MID, -HALF]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[SEG, WH, 6, 2]} />
        <meshBasicMaterial color={WALL} side={DS} />
        <Edges threshold={15} color={EDGE} />
      </mesh>

      {/* ── Baseboards (dark strip at bottom of walls) ── */}
      <mesh position={[-W + 0.01, YF + 0.12, -HALF]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[SEG, 0.25]} />
        <meshBasicMaterial color="#8a7e6a" side={DS} />
      </mesh>
      <mesh position={[W - 0.01, YF + 0.12, -HALF]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[SEG, 0.25]} />
        <meshBasicMaterial color="#8a7e6a" side={DS} />
      </mesh>

      {/* ── Ceiling trim line ── */}
      <mesh position={[-W + 0.01, YC - 0.08, -HALF]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[SEG, 0.15]} />
        <meshBasicMaterial color="#b8b0a0" side={DS} />
      </mesh>
      <mesh position={[W - 0.01, YC - 0.08, -HALF]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[SEG, 0.15]} />
        <meshBasicMaterial color="#b8b0a0" side={DS} />
      </mesh>

      {/* ── Picture Frames ── */}
      <Frame pos={[-W + 0.03, 0.5, -10]} rot={[0, Math.PI / 2, 0]} w={1.5} h={1.0} />
      <Frame pos={[W - 0.03, 0.3, -20]} rot={[0, -Math.PI / 2, 0]} w={1.0} h={1.4} />
      <Frame pos={[-W + 0.03, 0.6, -40]} rot={[0, Math.PI / 2, 0]} w={1.3} h={0.9} />
      <Frame pos={[W - 0.03, 0.4, -50]} rot={[0, -Math.PI / 2, 0]} w={1.6} h={1.1} />

      {/* ── Ceiling lamps ── */}
      {[-8, -22, -38, -52].map((z, i) => (
        <group key={i} position={[0, YC - 0.02, z]}>
          <mesh>
            <boxGeometry args={[0.8, 0.03, 0.15]} />
            <meshBasicMaterial color="#f8f5ee" />
            <Edges color="#999" />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.015, 0.15, 0.015]} />
            <meshBasicMaterial color="#888" />
          </mesh>
        </group>
      ))}

      {/* ── Doors ── */}
      {siteConfig.rooms.map((r) => (
        <Door key={r.id} roomId={r.id} label={r.label} z={r.relativeZ} side={r.side} />
      ))}
    </group>
  )
}

function Frame({ pos, rot, w, h }) {
  return (
    <group position={pos} rotation={rot}>
      <mesh>
        <planeGeometry args={[w + 0.12, h + 0.12]} />
        <meshBasicMaterial color={FRAME_BG} side={DS} />
        <Edges color={EDGE} />
      </mesh>
      <mesh position={[0, 0, 0.003]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial color={FRAME_IN} side={DS} />
      </mesh>
    </group>
  )
}

export default function Corridor() {
  return (
    <group>
      {/* Back wall behind camera */}
      <mesh position={[0, MID, 6]}>
        <planeGeometry args={[W * 2, WH]} />
        <meshBasicMaterial color={WALL} side={DS} />
        <Edges color={EDGE} />
      </mesh>

      {/* Three corridor segments */}
      <Segment offset={5} />
      <Segment offset={5 - SEG} />
      <Segment offset={5 - SEG * 2} />
    </group>
  )
}
