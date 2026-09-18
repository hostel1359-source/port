'use client';

import { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { SketchProvider } from './SketchPrimitives';
import CorridorWorld from './CorridorWorld';
import InteriorWorlds from './InteriorWorlds';
import { getRoomPose } from './room-camera';
import type { WorldRoom, JourneyCommand, JourneyInput, DoorPosition } from './types';

type Props = {
  room: WorldRoom; command: JourneyCommand | null; input: JourneyInput; motion: boolean;
  fadeRef: React.RefObject<HTMLDivElement>;
  onArrive: (room:WorldRoom)=>void; onDoor:(room:WorldRoom,door?:DoorPosition)=>void;
  onProject:(index:number)=>void; onDetails:(room:'about'|'work'|'contact')=>void;
  onContact:(action:'email'|'github'|'copy')=>void; onReady:()=>void; onError:()=>void;
  progressBarRef:React.RefObject<HTMLDivElement>;
};

function World({room,command,input,motion,fadeRef,onArrive,onDoor,onProject,onDetails,onContact,onReady,onError,progressBarRef}:Props) {
  const {camera,gl,size} = useThree();
  const progress = useRef(0);
  const flying = useRef(false);
  const look = useRef(new THREE.Vector3());
  const wanted = useRef(new THREE.Vector3());

  useLayoutEffect(()=>{
    const point=getRoomPose(room,input.current.progress);
    camera.position.set(...point.position);
    look.current.set(...point.look);
    camera.lookAt(look.current);
    progress.current=input.current.progress;
    if(camera instanceof THREE.PerspectiveCamera){camera.fov=size.width<700?67:55;camera.updateProjectionMatrix();}
  },[room,camera,input,size.width]);

  useEffect(()=>{
    onReady();
    const lost=(event:Event)=>{event.preventDefault();onError();};
    gl.domElement.addEventListener('webglcontextlost',lost);
    return()=>gl.domElement.removeEventListener('webglcontextlost',lost);
  },[gl,onReady,onError]);

  useEffect(()=>{
    if(!command)return;
    flying.current=true;
    const tl=gsap.timeline({onComplete:()=>{flying.current=false;onArrive(command.to);}});
    const travel=motion?1:0.05;
    if(room==='entrance'&&command.to==='corridor') {
      tl.to(camera.position,{x:0,y:1.85,z:2,duration:1.8*travel,ease:'power2.inOut'},0);
      tl.to(look.current,{x:0,y:1.85,z:-4,duration:1.4*travel,ease:'power2.inOut'},0);
    } else if(room==='corridor'&&command.door) {
      const {x,z}=command.door;
      tl.to(camera.position,{x:Math.sign(x)*1.4,y:1.8,z:z+.4,duration:.8*travel,ease:'power2.inOut'},0);
      tl.to(look.current,{x,y:1.8,z,duration:.65*travel,ease:'power2.inOut'},0);
      // Move all the way into the live doorway before switching to its matching room view.
      tl.to(camera.position,{x:x-Math.sign(x)*.18,y:1.8,z,duration:.85*travel,ease:'power2.inOut'},.8*travel);
      tl.to(look.current,{x:x+Math.sign(x)*4,y:1.8,z,duration:.65*travel},.8*travel);
    } else {
      if(fadeRef.current)tl.to(fadeRef.current,{opacity:1,duration:.35*travel});
      else tl.to({}, {duration:.05});
    }
    return()=>{tl.kill();flying.current=false;};
    // Each command is an immutable, one-shot camera trip.
  },[command,camera,fadeRef,motion,onArrive,room]);

  useFrame((_,delta)=>{
    if(flying.current){camera.lookAt(look.current);return;}
    progress.current=motion?THREE.MathUtils.damp(progress.current,input.current.progress,5,Math.min(delta,.05)):input.current.progress;
    const point=getRoomPose(room,progress.current);
    wanted.current.set(...point.position);
    camera.position.copy(wanted.current);
    wanted.current.set(point.look[0]+input.current.lookX*5,point.look[1]-input.current.lookY*4,point.look[2]);
    if(motion)look.current.lerp(wanted.current,1-Math.exp(-6*Math.min(delta,.05)));else look.current.copy(wanted.current);
    camera.lookAt(look.current);
    if(progressBarRef.current)progressBarRef.current.style.transform=`scaleX(${progress.current})`;
  },-1);

  return <>
    <color attach="background" args={['#f2f2ee']} />
    <fog attach="fog" args={['#f2f2ee',room==='corridor'?15:35,room==='corridor'?42:110]} />
    <SketchProvider>
      {room==='entrance'||room==='corridor'?<CorridorWorld room={room} openingRoom={command?.to||null} motion={motion} onDoor={onDoor}/>:<InteriorWorlds room={room} progress={progress} motion={motion} onProject={onProject} onDetails={onDetails} onContact={onContact}/>}
    </SketchProvider>
  </>;
}

export default function JourneyScene(props:Props) {
  return <Canvas dpr={[1,1.25]} camera={{position:[0,2.25,12],fov:55,near:.08,far:120}} gl={{antialias:false,alpha:false,powerPreference:'high-performance'}} style={{touchAction:'none'}}>
    <Suspense fallback={null}><World {...props}/></Suspense>
  </Canvas>;
}
