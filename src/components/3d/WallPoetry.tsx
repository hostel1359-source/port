'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const WALL_POEMS = [
  { text: '"Code is poetry —\nwrite it like no one\'s watching,\nship it like everyone is."', z: -8, side: 'left' as const },
  { text: '"First, solve the problem.\nThen, write the code."', z: -25, side: 'right' as const },
  { text: '"Any fool can write code\nthat a computer can understand.\nGood programmers write code\nthat humans can understand."', z: -50, side: 'left' as const },
  { text: '"Simplicity is the\nsoul of efficiency."', z: -65, side: 'right' as const },
  { text: '"It\'s not a bug —\nit\'s an undocumented feature."', z: -85, side: 'left' as const },
  { text: '"The best error message\nis the one that\nnever shows up."', z: -95, side: 'right' as const },
  { text: '"Talk is cheap.\nShow me the code."', z: -110, side: 'left' as const },
  { text: '"Code never lies,\ncomments sometimes do."', z: -130, side: 'right' as const },
];

interface WallPoetryProps {
  onQuoteClick?: (lookAt: [number, number, number]) => void;
}

export default function WallPoetry({ onQuoteClick }: WallPoetryProps) {
  return (
    <group>
      {WALL_POEMS.map((poem, i) => {
        const x = poem.side === 'left' ? -3.85 : 3.85;
        const rotY = poem.side === 'left' ? Math.PI / 2 : -Math.PI / 2;
        const quotePos: [number, number, number] = [x, 2.2, poem.z];

        return (
          <Html
            key={i}
            position={quotePos}
            rotation={[0, rotY, 0]}
            transform
            distanceFactor={5}
            zIndexRange={[50, 0]}
          >
            <div
              onClick={() => onQuoteClick?.(quotePos)}
              style={{
                fontFamily: 'var(--font-caveat), "Caveat", cursive',
                fontSize: '18px',
                color: 'rgba(90, 80, 65, 0.5)',
                whiteSpace: 'pre-line',
                lineHeight: 1.5,
                pointerEvents: 'auto',
                cursor: 'pointer',
                textAlign: poem.side === 'left' ? 'left' : 'right',
                maxWidth: '250px',
                padding: '8px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(90, 80, 65, 0.9)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(90, 80, 65, 0.5)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {poem.text}
            </div>
          </Html>
        );
      })}
    </group>
  );
}
