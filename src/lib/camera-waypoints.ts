import * as THREE from 'three';

export interface Waypoint {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  threshold: number;
}

// Camera path through the corridor
// Thresholds are scroll percentages (0-1)
// Total scroll: Hero(200vh) + About(200vh) + Projects(500vh) + Skills(200vh) + GitHub(100vh) + Contact(100vh) = ~1300vh
export const WAYPOINT_SEQUENCE: Waypoint[] = [
  // 0%: Standing at entrance
  { position: new THREE.Vector3(0, 1.6, 5), lookAt: new THREE.Vector3(0, 1.2, 0), threshold: 0 },
  // 8%: Through Welcome door, book should be visible ahead
  { position: new THREE.Vector3(0, 1.6, -4), lookAt: new THREE.Vector3(0, 1.2, -10), threshold: 0.08 },
  // 14%: At the book (z=-11), reading it
  { position: new THREE.Vector3(0, 1.6, -9), lookAt: new THREE.Vector3(0, 1.2, -12), threshold: 0.14 },
  // 22%: Past the book, heading toward projects
  { position: new THREE.Vector3(0, 1.6, -20), lookAt: new THREE.Vector3(0, 1.2, -25), threshold: 0.22 },
  // 30%: Approaching first door (DevOS at z=-40)
  { position: new THREE.Vector3(0, 1.6, -35), lookAt: new THREE.Vector3(0, 1.2, -40), threshold: 0.30 },
  // 38%: At DevOS door
  { position: new THREE.Vector3(0, 1.6, -42), lookAt: new THREE.Vector3(0, 1.2, -47), threshold: 0.38 },
  // 44%: Between DevOS and Solana (z=-50)
  { position: new THREE.Vector3(0, 1.6, -48), lookAt: new THREE.Vector3(0, 1.2, -53), threshold: 0.44 },
  // 50%: At Solana door
  { position: new THREE.Vector3(0, 1.6, -52), lookAt: new THREE.Vector3(0, 1.2, -57), threshold: 0.50 },
  // 55%: Between Solana and Quantum (z=-60)
  { position: new THREE.Vector3(0, 1.6, -58), lookAt: new THREE.Vector3(0, 1.2, -63), threshold: 0.55 },
  // 60%: At Quantum door
  { position: new THREE.Vector3(0, 1.6, -62), lookAt: new THREE.Vector3(0, 1.2, -67), threshold: 0.60 },
  // 65%: Between Quantum and Ephemeral (z=-70)
  { position: new THREE.Vector3(0, 1.6, -68), lookAt: new THREE.Vector3(0, 1.2, -73), threshold: 0.65 },
  // 70%: At Ephemeral door
  { position: new THREE.Vector3(0, 1.6, -72), lookAt: new THREE.Vector3(0, 1.2, -77), threshold: 0.70 },
  // 76%: Past doors, into skills area (z=-90)
  { position: new THREE.Vector3(0, 2, -88), lookAt: new THREE.Vector3(0, 1.2, -93), threshold: 0.76 },
  // 82%: At GitHub desk (z=-120)
  { position: new THREE.Vector3(0, 1.6, -115), lookAt: new THREE.Vector3(0, 1.2, -120), threshold: 0.82 },
  // 90%: Approaching Let's Build door (z=-140)
  { position: new THREE.Vector3(0, 1.6, -137), lookAt: new THREE.Vector3(0, 1.2, -142), threshold: 0.90 },
  // 100%: At contact wall (z=-155)
  { position: new THREE.Vector3(0, 1.6, -152), lookAt: new THREE.Vector3(0, 1.4, -157), threshold: 1.0 },
];

const _posResult = new THREE.Vector3();
const _lookResult = new THREE.Vector3();

const smoothstep = (min: number, max: number, value: number): number => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

export const getWaypointAtProgress = (progress: number): { position: THREE.Vector3; lookAt: THREE.Vector3 } => {
  if (progress <= 0) return { position: WAYPOINT_SEQUENCE[0].position.clone(), lookAt: WAYPOINT_SEQUENCE[0].lookAt.clone() };
  if (progress >= 1) return { position: WAYPOINT_SEQUENCE[WAYPOINT_SEQUENCE.length - 1].position.clone(), lookAt: WAYPOINT_SEQUENCE[WAYPOINT_SEQUENCE.length - 1].lookAt.clone() };

  let startIndex = 0;
  for (let i = 0; i < WAYPOINT_SEQUENCE.length - 1; i++) {
    if (progress >= WAYPOINT_SEQUENCE[i].threshold && progress <= WAYPOINT_SEQUENCE[i + 1].threshold) {
      startIndex = i;
      break;
    }
  }

  const start = WAYPOINT_SEQUENCE[startIndex];
  const end = WAYPOINT_SEQUENCE[startIndex + 1];

  const localProgress = (progress - start.threshold) / (end.threshold - start.threshold);
  const easedProgress = smoothstep(0, 1, localProgress);

  _posResult.lerpVectors(start.position, end.position, easedProgress);
  _lookResult.lerpVectors(start.lookAt, end.lookAt, easedProgress);

  return { position: _posResult, lookAt: _lookResult };
};
