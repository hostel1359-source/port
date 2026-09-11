'use client';

import React from 'react';
import { Html } from '@react-three/drei';

interface SharinganWallPieceProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

export default function SharinganWallPiece({ position, rotation }: SharinganWallPieceProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Dark frame */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[1.4, 1.6, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* Python code snippet */}
      <Html
        position={[0, 0, 0.01]}
        transform
        center
        distanceFactor={5}
        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          width: '280px', height: '320px', background: '#0d1117',
          padding: '12px 14px', fontFamily: '"Courier New", monospace',
          fontSize: '10px', lineHeight: 1.6, color: '#c9d1d9',
          borderRadius: '4px', border: '1px solid #30363d',
          boxShadow: '0 0 20px rgba(79,156,245,0.15)',
        }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
            <span style={{ marginLeft: '6px', fontSize: '8px', color: '#6e7681' }}>main.py</span>
          </div>
          <div style={{ color: '#6e7681' }}># Fibonacci Generator</div>
          <div><K>def</K> <F>fibonacci</F>(n):</div>
          <div>&nbsp;&nbsp;a, b = <N>0</N>, <N>1</N></div>
          <div>&nbsp;&nbsp;<K>for</K> _ <K>in</K> <F>range</F>(n):</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;<K>yield</K> a</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;a, b = b, a + b</div>
          <br />
          <div style={{ color: '#6e7681' }}># Quick sort</div>
          <div><K>def</K> <F>qsort</F>(arr):</div>
          <div>&nbsp;&nbsp;<K>if</K> <F>len</F>(arr) {'<='} <N>1</N>:</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;<K>return</K> arr</div>
          <div>&nbsp;&nbsp;p = arr[<N>0</N>]</div>
          <div>&nbsp;&nbsp;lo = [x <K>for</K> x <K>in</K> arr <K>if</K> x {'<'} p]</div>
          <div>&nbsp;&nbsp;hi = [x <K>for</K> x <K>in</K> arr <K>if</K> x {'>'} p]</div>
          <div>&nbsp;&nbsp;<K>return</K> <F>qsort</F>(lo)+[p]+<F>qsort</F>(hi)</div>
          <br />
          <div><K>print</K>(<F>list</F>(<F>fibonacci</F>(<N>10</N>)))</div>
          <div><K>print</K>(<F>qsort</F>([<N>3</N>,<N>1</N>,<N>4</N>,<N>1</N>,<N>5</N>]))</div>
        </div>
      </Html>
    </group>
  );
}

function K({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#ff7b72' }}>{children}</span>;
}
function F({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#d2a8ff' }}>{children}</span>;
}
function N({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#79c0ff' }}>{children}</span>;
}
