'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { SketchBox, SketchLabel, PencilLine, Cloud } from './SketchPrimitives';
import { DOORS, type WorldRoom, type DoorPosition } from './types';
import DoorwayPortal from './DoorwayPortal';

function Plant({position,scale=1}:{position:[number,number,number];scale?:number}) {
  return <group position={position} scale={scale}>
    <mesh position={[0,.3,0]}><cylinderGeometry args={[.32,.21,.6,12]} /><meshBasicMaterial color="#ebe9df" /><Edges color="#68675e" /></mesh>
    {[-.5,-.25,0,.28,.5].map((n,i)=><group key={i}>
      <PencilLine points={[[0,.45,0],[n*.6,1.05+i*.11,0],[n,1.45+i*.11,.03]]} />
      <mesh position={[n*.75,1.2+i*.11,0]} rotation={[0,0,-n*1.5]} scale={[.18,.38,.07]}><sphereGeometry args={[1,10,8]} /><meshBasicMaterial color="#d9dbcd" /><Edges color="#66665c" threshold={5} /></mesh>
    </group>)}
  </group>;
}

const ROOM_TINTS:Record<string,string>={work:'#e2d6c0',studio:'#d8cfb8',about:'#d4ddd6',contact:'#cdd8d3'};

function Door({ label, note, position, rotation, opening, motion, destination, openPassage = false, onClick }: {label:string;note:string;position:[number,number,number];rotation:[number,number,number];opening:boolean;motion:boolean;destination?:Exclude<WorldRoom,'entrance'|'corridor'>;openPassage?:boolean;onClick:()=>void}) {
  const hinge = useRef<THREE.Group>(null);
  const [hovered,setHovered] = useState(false);
  useFrame((_,delta)=> {
    if(!hinge.current)return;
    const angle=opening ? -1.38 : motion&&hovered ? -.28 : -.035;
    hinge.current.rotation.y=motion ? THREE.MathUtils.damp(hinge.current.rotation.y,angle,8,delta) : angle;
  });
  return <group position={position} rotation={rotation} onPointerOver={e=>{e.stopPropagation();setHovered(true);document.body.style.cursor='pointer';}} onPointerOut={()=>{setHovered(false);document.body.style.cursor='';}} onClick={e=>{e.stopPropagation();onClick();}}>
    {destination&&(opening||hovered)
      ? <DoorwayPortal room={destination} motion={motion} />
      : !openPassage&&<mesh position={[0,1.7,-.11]}><planeGeometry args={[2.04,3.4]} /><meshBasicMaterial color={destination?ROOM_TINTS[destination]||'#c6c5bc':'#c6c5bc'} /></mesh>}
    <SketchBox position={[-1.08,1.74,0]} size={[.17,3.6,.21]} />
    <SketchBox position={[1.08,1.74,0]} size={[.17,3.6,.21]} />
    <SketchBox position={[0,3.51,0]} size={[2.3,.17,.21]} />
    <SketchBox position={[0,.035,.06]} size={[2.25,.07,.35]} kind="floor" />
    <SketchLabel lines={[label]} position={[0,4.03,.05]} width={2.9} height={.62} fontSize={78} handwritten />
    <PencilLine points={[[-1.35,3.77,.06],[-1.38,4.33,.06],[1.4,4.32,.06],[1.37,3.74,.06],[-1.35,3.77,.06]]} />
    <group ref={hinge} position={[-.96,.05,.05]}>
      <SketchBox position={[.96,1.66,0]} size={[1.92,3.32,.11]} kind="door" color={hovered ? '#f4dab0' : '#e5d7bd'} />
      <SketchBox position={[.96,2.27,.063]} size={[1.53,1.63,.025]} kind="door" />
      <SketchBox position={[.96,.65,.063]} size={[1.53,.9,.025]} kind="door" />
      <SketchLabel lines={[note]} position={[.96,2.83,.091]} width={1.5} height={.4} fontSize={58} handwritten background="#f6f2df" />
      <SketchLabel lines={label.includes('GALLERY') ? ['</>','DevOS • Scanner','PotatoBoost • Chat'] : label.includes('STUDIO') ? ['TS  JS','PY  REACT','THINGS I BUILD WITH'] : label.includes('ABOUT') ? ['HELLO!','I\u2019m Manvesh.','a curious human'] : ['@','YOUR NEXT IDEA','STARTS HERE']} position={[.96,1.97,.097]} width={1.42} height={1.05} fontSize={64} handwritten background={hovered ? '#ecdfab' : '#f1f0e5'} />
      <SketchBox position={[.49,2.57,.11]} rotation={[0,0,-.16]} size={[.55,.14,.017]} color="#c1d5d8" />
      <SketchBox position={[1.42,1.4,.11]} rotation={[0,0,-.18]} size={[.5,.14,.017]} color="#c1d5d8" />
      <mesh position={[1.64,1.51,.13]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.075,.075,.09,12]} /><meshBasicMaterial color="#76756a" /><Edges color="#41413b" /></mesh>
      <SketchBox position={[1.48,1.53,.2]} size={[.37,.055,.06]} color="#a8a08b" />
    </group>
    <SketchLabel lines={['↗']} position={[-1.8,1.8,.06]} width={.5} height={.5} fontSize={190} background="transparent" handwritten />
  </group>;
}

function Avatar() {
  const map = useLoader(THREE.TextureLoader,'/sketch-avatar.svg');
  useEffect(()=>{map.colorSpace=THREE.SRGBColorSpace;return()=>map.dispose();},[map]);
  return <mesh position={[0,1.4,-3]}><planeGeometry args={[1.65,2.8]} /><meshBasicMaterial map={map} transparent side={THREE.DoubleSide} depthWrite={false} /></mesh>;
}

export default function CorridorWorld({room,openingRoom,motion,onDoor}:{room:WorldRoom;openingRoom:WorldRoom|null;motion:boolean;onDoor:(room:WorldRoom,door?:DoorPosition)=>void}) {
  return <group>
    {/* The same physical entrance opens into a continuous 55 metre corridor. */}
    <group>
      <SketchBox position={[-6.4,3,4.2]} size={[9.5,6,.2]} kind="brick" />
      <SketchBox position={[6.4,3,4.2]} size={[9.5,6,.2]} kind="brick" />
      <SketchBox position={[0,5.23,4.2]} size={[3.3,1.55,.2]} kind="brick" />
      <SketchBox position={[0,-.08,10]} size={[24,.15,12]} kind="floor" />
      <group position={[0,0,4.4]} scale={[1.3,1.15,1]}>
        <Door label="MANVESH" note="PORTFOLIO / COME ON IN" position={[0,0,0]} rotation={[0,0,0]} opening={room!=='entrance'||openingRoom==='corridor'} motion={motion} openPassage onClick={()=>onDoor('corridor')} />
      </group>
      <Plant position={[-2.3,0,5]} scale={1.25} />
      <SketchBox position={[3.5,2.7,4.4]} size={[2,1.7,.18]} />
      <SketchBox position={[3.5,2.7,4.51]} size={[1.8,1.5,.04]} color="#d7dddd" />
      <SketchBox position={[3.5,2.7,4.56]} size={[.045,1.5,.02]} />
      <SketchBox position={[3.5,2.7,4.56]} size={[1.8,.045,.02]} />
      <SketchBox position={[3.5,1.78,4.7]} size={[2.3,.13,.5]} kind="door" />
      <Cloud position={[-6,5,2]} scale={1.7} />
    </group>
    <SketchBox position={[0,-.08,-25]} size={[7,.15,59]} kind="floor" />
    {/* Separate wall segments leave real openings for the doors. */}
    {[-1,1].map(side=> {
      const centers=DOORS.filter(d=>Math.sign(d.x)===side).map(d=>d.z).sort((a,b)=>b-a);
      const stops=[4,...centers.flatMap(z=>[z+1.2,z-1.2]),-55];
      return <group key={side}>
        {stops.slice(0,-1).map((start,i)=>i%2===0?<SketchBox key={i} position={[side*3.6,2.5,(start+stops[i+1])/2]} size={[.18,5,start-stops[i+1]]} kind="wall" />:null)}
        {centers.map(z=><SketchBox key={z} position={[side*3.6,4.28,z]} size={[.18,1.44,2.4]} kind="wall" />)}
        <SketchBox position={[side*3.48,.13,-25]} size={[.07,.26,59]} />
        <SketchBox position={[side*3.5,4.88,-25]} size={[.11,.16,59]} />
      </group>;
    })}
    <SketchBox position={[0,5,-25]} size={[7,.12,59]} kind="wall" />
    <SketchBox position={[0,2.5,-55]} size={[7,5,.18]} kind="wall" />
    {[0,-9,-18,-27,-36,-45].map(z=><group key={z}>
      <SketchBox position={[0,4.84,z]} size={[1.6,.08,.55]} color="#deded8" />
      <SketchBox position={[0,4.79,z]} size={[1.4,.03,.37]} color="#ffffff" />
      {[-.5,0,.5].map(x=><PencilLine key={x} points={[[x,4.76,z-.17],[x,4.76,z+.17]]} color="#b0b1a8" />)}
    </group>)}
    <SketchLabel lines={['MANVESH']} position={[0,2.75,-3.35]} width={5.9} height={1.25} fontSize={170} handwritten background="transparent" />
    <SketchLabel lines={['< creative developer />']} position={[0,.55,-2.8]} width={4.6} height={.55} fontSize={76} handwritten background="transparent" />
    <Avatar />
    {DOORS.map(door=><Door key={door.room} label={door.label} note={door.note} position={[door.x,0,door.z]} rotation={[0,door.x<0?Math.PI/2:-Math.PI/2,0]} opening={openingRoom===door.room} motion={motion} destination={door.room} onClick={()=>onDoor(door.room,{x:door.x,z:door.z})} />)}
    {[
      {x:3.48,z:-6,text:['Code is poetry.','Make something','that matters.']},
      {x:-3.48,z:-18,text:['Stay curious.','Keep building.']},
      {x:3.48,z:-29,text:['less noise.','more making.']},
      {x:-3.48,z:-43,text:['Every good idea','starts with','“what if?”']},
    ].map((art,i)=><group key={i} position={[art.x,2.5,art.z]} rotation={[0,art.x<0?Math.PI/2:-Math.PI/2,0]}>
      <SketchBox size={[1.8,1.35,.08]} />
      <SketchLabel position={[0,0,.06]} lines={art.text} width={1.56} height={1.12} fontSize={85} handwritten />
    </group>)}
    {[-15,-29,-50].map((z,i)=><group key={z}>
      <SketchBox position={[i%2?2.4:-2.4,.78,z]} size={[1.4,.12,.5]} kind="door" />
      {[-.55,.55].map(x=><SketchBox key={x} position={[(i%2?2.4:-2.4)+x,.38,z]} size={[.075,.75,.36]} kind="door" />)}
      <Plant position={[i%2?2.4:-2.4,.86,z]} scale={.55} />
    </group>)}
    <SketchLabel lines={['LET’S BUILD','SOMETHING INTERESTING.']} position={[0,2.8,-54.85]} width={4.8} height={1.5} fontSize={80} handwritten onClick={()=>onDoor('contact')} />
    <Plant position={[-2.1,0,-53]} scale={1.3} />
  </group>;
}
