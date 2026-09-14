import type { MutableRefObject } from 'react';
export type WorldRoom = 'entrance' | 'corridor' | 'about' | 'work' | 'studio' | 'contact';
export type DoorPosition = { x: number; z: number };
export type JourneyCommand = { id: number; to: WorldRoom; door?: DoorPosition };
export type JourneyInput = MutableRefObject<{ progress: number; lookX: number; lookY: number }>;
export const DOORS: { room: WorldRoom; label: string; x: number; z: number; note: string }[] = [
  { room: 'work', label: 'THE GALLERY', x: -3.48, z: -10, note: '04 projects' },
  { room: 'studio', label: 'THE STUDIO', x: 3.48, z: -22, note: 'tools & experiments' },
  { room: 'about', label: 'ABOUT ME', x: -3.48, z: -34, note: 'the curious human' },
  { room: 'contact', label: 'SAY HELLO', x: 3.48, z: -46, note: 'let’s build something' },
];
