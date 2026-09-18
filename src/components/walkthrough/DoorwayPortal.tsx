'use client';

import { useMemo, useRef } from 'react';
import { MeshPortalMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FrontSide, Matrix4, PerspectiveCamera, type Group, type Mesh } from 'three';
import InteriorWorlds from './InteriorWorlds';
import { getRoomPose } from './room-camera';
import type { WorldRoom } from './types';

type InteriorRoom = Exclude<WorldRoom, 'entrance' | 'corridor'>;

const ignoreInteraction = () => {};

/** Show the destination through the open frame before the camera crosses it. */
export default function DoorwayPortal({ room, motion }: { room: InteriorRoom; motion: boolean }) {
  const progress = useRef(0);
  const aperture = useRef<Mesh>(null);
  const interior = useRef<Group>(null);
  const roomTransform = useMemo(() => {
    const pose = getRoomPose(room, 0);
    const destinationCamera = new PerspectiveCamera();
    destinationCamera.position.set(...pose.position);
    destinationCamera.lookAt(...pose.look);
    destinationCamera.updateMatrixWorld(true);

    // Match the doorway's threshold view to the room's initial camera view.
    return new Matrix4()
      .makeTranslation(0, 0.1, 0.29)
      .multiply(destinationCamera.matrixWorld.clone().invert());
  }, [room]);

  useFrame(() => {
    if (!aperture.current || !interior.current) return;
    aperture.current.updateWorldMatrix(true, false);
    interior.current.matrix.multiplyMatrices(aperture.current.matrixWorld, roomTransform);
    interior.current.updateMatrixWorld(true);
  }, -0.5);

  return (
    <mesh ref={aperture} position={[0, 1.7, -0.11]}>
      <planeGeometry args={[2.04, 3.4]} />
      <MeshPortalMaterial events={false} worldUnits side={FrontSide}>
        <color attach="background" args={['#f2f2ee']} />
        <fog attach="fog" args={['#f2f2ee', 35, 110]} />
        <group ref={interior} matrixAutoUpdate={false}>
          <InteriorWorlds
            room={room}
            progress={progress}
            motion={motion}
            onProject={ignoreInteraction}
            onDetails={ignoreInteraction}
            onContact={ignoreInteraction}
          />
        </group>
      </MeshPortalMaterial>
    </mesh>
  );
}
