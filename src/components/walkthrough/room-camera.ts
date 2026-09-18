import type { WorldRoom } from './types';

type RoomPose = { position: [number, number, number]; look: [number, number, number] };

// Shared by the room view and its doorway, so crossing the threshold keeps the same perspective.
export function getRoomPose(room: WorldRoom, progress: number): RoomPose {
  switch (room) {
    case 'entrance': return { position: [0, 2.25, 12], look: [0, 2.45, 4] };
    case 'corridor': return { position: [0, 1.85, 2 - 50 * progress], look: [0, 1.85, -4 - 50 * progress] };
    case 'about': return { position: [0, 2, 7 - 54 * progress], look: [0, 2, -3 - 54 * progress] };
    case 'work': return { position: [-6.3 + 12.6 * progress, 2.2, 7], look: [-6.3 + 12.6 * progress, 2.2, -4] };
    case 'studio': return { position: [Math.sin(progress * Math.PI * 2) * 10, 3, Math.cos(progress * Math.PI * 2) * 10], look: [0, 2.6, 0] };
    case 'contact': return { position: [Math.sin(progress * 1.5 - .75) * 2, 2.4, 7 - progress * 2], look: [0, .9, -3] };
  }
}
