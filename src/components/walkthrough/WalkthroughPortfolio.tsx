'use client';

import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import RoomContent, {type Room} from '@/components/studio/RoomContent';
import { PERSONAL } from '@/data/personal';
import { PROJECTS } from '@/data/projects';
import { DOORS, type WorldRoom, type JourneyCommand, type DoorPosition } from './types';
import useJourneyControls from './useJourneyControls';
import '@/app/studio.css';
import './walkthrough.css';

const JourneyScene=dynamic(()=>import('./JourneyScene'),{ssr:false});
const NAMES:Record<WorldRoom,string>={entrance:'THE FRONT DOOR',corridor:'THE CORRIDOR',work:'THE GALLERY',about:'ABOUT ME',studio:'THE STUDIO',contact:'SAY HELLO'};
const isWorldRoom=(value:string):value is WorldRoom=>Object.prototype.hasOwnProperty.call(NAMES,value);
const HELP:Record<WorldRoom,string>={entrance:'Click the door to come inside.',corridor:'Scroll to walk. Drag to look. Click a door.',work:'Scroll or drag to browse. Click a project.',about:'Scroll to fly through my story.',studio:'Drag to rotate. Click a screen to explore.',contact:'A little space to start a conversation.'};

class SceneBoundary extends Component<{children:ReactNode;onError:()=>void},{failed:boolean}>{
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  componentDidCatch(){this.props.onError();}
  render(){return this.state.failed?null:this.props.children;}
}

export default function WalkthroughPortfolio(){
  const [room,setRoom]=useState<WorldRoom>('entrance');
  const [command,setCommand]=useState<JourneyCommand|null>(null);
  const [fontsReady,setFontsReady]=useState(false);
  const [ready,setReady]=useState(false);
  const [failed,setFailed]=useState(false);
  const [motion,setMotion]=useState(true);
  const [mapOpen,setMapOpen]=useState(false);
  const [detail,setDetail]=useState<Room|null>(null);
  const [projectIndex,setProjectIndex]=useState(0);
  const [notice,setNotice]=useState('');
  const input=useRef({progress:0,lookX:0,lookY:0});
  const lastCorridor=useRef(0);
  const fadeRef=useRef<HTMLDivElement>(null);
  const progressRef=useRef<HTMLDivElement>(null);
  const dialogRef=useRef<HTMLDialogElement>(null);
  const backRef=useRef<HTMLButtonElement>(null);
  const restoreRef=useRef<Element|null>(null);
  const roomRef=useRef<WorldRoom>('entrance');
  const tripRef=useRef<JourneyCommand|null>(null);
  const motionRef=useRef(true);
  const failedRef=useRef(false);
  const sequence=useRef(0);
  const startingRef=useRef<WorldRoom|null>(null);

  useEffect(()=>{
    let live=true;
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>{setMotion(!media.matches);motionRef.current=!media.matches;};sync();media.addEventListener('change',sync);
    const hash=window.location.hash.slice(1);
    if(isWorldRoom(hash) && hash!=='entrance')startingRef.current=hash;
    const styles=getComputedStyle(document.documentElement);
    Promise.all(['--font-gloria','--font-caveat','--font-space-grotesk'].map(name=>document.fonts.load(`32px ${styles.getPropertyValue(name).trim()||'sans-serif'}`))).then(()=>document.fonts.ready).then(()=>{if(live)setFontsReady(true);}).catch(()=>{if(live)setFontsReady(true);});
    return()=>{live=false;media.removeEventListener('change',sync);document.body.style.cursor='';};
  },[]);

  const arrived=useCallback((to:WorldRoom)=>{
    input.current={progress:to==='corridor'?lastCorridor.current:0,lookX:0,lookY:0};
    roomRef.current=to;setRoom(to);tripRef.current=null;setCommand(null);
    const hash=to==='entrance'?'':`#${to}`;
    if(window.location.hash!==hash)window.history.pushState(null,'',`${window.location.pathname}${window.location.search}${hash}`);
    requestAnimationFrame(()=>{if(fadeRef.current)gsap.to(fadeRef.current,{opacity:0,duration:motionRef.current?.55:0,overwrite:true});});
    backRef.current?.focus({preventScroll:true});
  },[]);

  const travel=useCallback((to:WorldRoom,door?:DoorPosition)=>{
    if(tripRef.current&&!failedRef.current)return;
    setMapOpen(false);setDetail(null);document.body.style.cursor='';
    if(failedRef.current){
      restoreRef.current=document.activeElement;
      arrived(to);
      if(to==='entrance'||to==='corridor')setMapOpen(to==='corridor');
      else setDetail(to==='studio'?'about':to);
      return;
    }
    if(roomRef.current===to)return;
    if(roomRef.current==='corridor')lastCorridor.current=input.current.progress;
    const next={id:++sequence.current,to,door};tripRef.current=next;setCommand(next);
  },[arrived]);

  const sceneReady=useCallback(()=>{
    setReady(true);
    if(startingRef.current){const target=startingRef.current;startingRef.current=null;travel(target);}
  },[travel]);
  const sceneFailed=useCallback(()=>{
    failedRef.current=true;setFailed(true);setReady(true);
    const target=tripRef.current?.to??startingRef.current??roomRef.current;
    startingRef.current=null;
    if(fadeRef.current){gsap.killTweensOf(fadeRef.current);fadeRef.current.style.opacity='0';}
    travel(target);
  },[travel]);
  const openDetails=useCallback((next:Room)=>{restoreRef.current=document.activeElement;setDetail(next);},[]);
  const closeDetails=useCallback(()=>setDetail(null),[]);
  const selectProject=useCallback((index:number)=>{setProjectIndex(index);openDetails('work');},[openDetails]);
  const contactAction=useCallback((action:'email'|'github'|'copy')=>{
    if(action==='github'){window.open(PERSONAL.github,'_blank','noopener,noreferrer');return;}
    if(action==='email'){openDetails('contact');return;}
    navigator.clipboard?.writeText(PERSONAL.email).then(()=>setNotice('Email copied. Say hello anytime.')).catch(()=>openDetails('contact'));
    if(!navigator.clipboard)openDetails('contact');
  },[openDetails]);

  useEffect(()=>{
    const dialog=dialogRef.current;
    if(detail&&dialog){if(!dialog.open)dialog.showModal();dialog.querySelector<HTMLElement>('#room-title')?.focus({preventScroll:true});}
    else if(dialog?.open){dialog.close();const target=restoreRef.current?.isConnected?restoreRef.current:backRef.current;if(target instanceof HTMLElement)target.focus({preventScroll:true});}
  },[detail]);
  useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(''),4000);return()=>clearTimeout(timer);},[notice]);
  useEffect(()=>{
    const historyChange=()=>{const target=window.location.hash.slice(1);if(!target)travel('entrance');else if(isWorldRoom(target))travel(target);};
    const escape=(event:KeyboardEvent)=>{if(event.key!=='Escape'||detail)return;if(mapOpen)setMapOpen(false);else if(roomRef.current!=='entrance')travel(roomRef.current==='corridor'?'entrance':'corridor');};
    window.addEventListener('popstate',historyChange);window.addEventListener('hashchange',historyChange);window.addEventListener('keydown',escape);
    return()=>{window.removeEventListener('popstate',historyChange);window.removeEventListener('hashchange',historyChange);window.removeEventListener('keydown',escape);};
  },[travel,detail,mapOpen]);
  const controls=useJourneyControls({room,input,blocked:failed||!!command||!!detail||mapOpen,motion});

  return <main className="walkthrough little-space" data-motion={motion?'on':'off'} {...controls}>
    <h1 className="sr-only">Manvesh — creative developer. A little room for big ideas.</h1>
    <a className="studio-skip" href="#journey-navigation" onClick={event=>{event.preventDefault();document.getElementById('journey-navigation')?.focus({preventScroll:true});}} data-journey-ui>Skip to room navigation</a>
    <div className="journey-canvas" aria-hidden="true">
      {fontsReady&&!failed&&<SceneBoundary onError={sceneFailed}><JourneyScene room={room} command={command} input={input} motion={motion} fadeRef={fadeRef} onArrive={arrived} onDoor={travel} onProject={selectProject} onDetails={openDetails} onContact={contactAction} onReady={sceneReady} onError={sceneFailed} progressBarRef={progressRef}/></SceneBoundary>}
    </div>
    <div className="journey-paper" aria-hidden="true"/>
    <div className="journey-fade" ref={fadeRef} aria-hidden="true"/>

    <header className="journey-top" data-journey-ui>
      <div className="journey-left"><button ref={backRef} className="journey-square" aria-label={room==='entrance'?'Manvesh home':room==='corridor'?'Back to front door':'Back to corridor'} disabled={!!command} onClick={()=>travel(room==='entrance'||room==='corridor'?'entrance':'corridor')}>{room==='entrance'?'M.':'←'}</button><span>{NAMES[room]}</span></div>
      <div className="journey-top-actions"><button className="journey-square" onClick={()=>setMapOpen(!mapOpen)} aria-expanded={mapOpen} aria-controls="journey-map" aria-label="Open room map">☰</button><button className="journey-square" onClick={()=>{setMotion(!motion);motionRef.current=!motion;input.current.lookX=0;input.current.lookY=0;}} aria-pressed={motion} aria-label={`Turn ${motion?'off':'on'} motion`}>{motion?'≈':'−'}</button><button className="journey-square" onClick={()=>openDetails('contact')} aria-label="Contact Manvesh">@</button></div>
    </header>

    {(!ready||failed)&&<div className="journey-loading" data-journey-ui><p className="journey-loading-name">MANVESH</p><p>{failed?'Come explore my work.':'Sketching a little space…'}</p><span>{failed?'The 3D view isn’t available on this device. Every project is still here.':'A few doors. A curious mind. A world to explore.'}</span>{!failed&&<div style={{width:'160px',height:'3px',borderRadius:'2px',backgroundColor:'rgba(0,0,0,0.08)',margin:'16px auto 0',overflow:'hidden'}}><div style={{height:'100%',borderRadius:'2px',backgroundColor:'rgba(0,0,0,0.25)',animation:'loadProgress 3s ease-out infinite'}}/><style>{`@keyframes loadProgress{0%{width:0}70%{width:90%}100%{width:90%}}`}</style></div>}{failed&&<><button onClick={()=>travel('work')}>Explore projects →</button><button onClick={()=>setMapOpen(true)}>Explore all rooms ↗</button></>}</div>}

    {mapOpen&&<nav id="journey-map" className="journey-map" aria-label="Room map" data-journey-ui>
      <div className="journey-map-heading"><h2>TAKE A LOOK AROUND</h2><button onClick={()=>setMapOpen(false)} aria-label="Close room map">×</button></div>
      <p>One corridor. Four little worlds.</p>
      <div className="journey-map-path">
        {DOORS.map((door,i)=><button key={door.room} className={`journey-map-room room-${i}`} disabled={!!command} onClick={()=>travel(door.room,room==='corridor'?{x:door.x,z:door.z}:undefined)}><span className="journey-map-icon">{['▧','⌘','✈','≈'][i]}</span><span><small>0{i+1}</small>{door.label}<em>{door.note}</em></span><span className="journey-map-arrow">↗</span></button>)}
      </div>
      <button className="journey-map-back" onClick={()=>travel('corridor')}>↳ Back to the corridor</button>
    </nav>}

    <footer className="journey-bottom" data-journey-ui>
      <div className="journey-hint"><span className="journey-hint-icon" aria-hidden="true">{room==='entrance'?'↗':room==='studio'?'↔':'↓'}</span><div><strong>{room==='entrance'?'MAKE YOURSELF AT HOME':room==='work'?'THE ART OF BUILDING':room==='about'?'STAY CURIOUS':room==='studio'?'A WORK IN PROGRESS':room==='contact'?'SAY HELLO':'A LITTLE ROOM FOR BIG IDEAS'}</strong><p>{HELP[room]}</p></div></div>
      {room==='entrance'?<button className="journey-enter" disabled={!ready||!!command} onClick={()=>travel('corridor')}>{command?'Coming inside…':'Enter the space'} <span>→</span></button>:<div className="journey-movement"><button disabled={!!command} onClick={()=>{input.current.progress=Math.max(0,input.current.progress-.09);}} aria-label="Move backward">←</button><span>EXPLORE</span><button disabled={!!command} onClick={()=>{input.current.progress=Math.min(1,input.current.progress+.09);}} aria-label="Move forward">→</button></div>}
    </footer>
    {room==='entrance'&&<div style={{position:'fixed',bottom:'4px',left:'50%',transform:'translateX(-50%)',fontSize:'9px',color:'#aaa',zIndex:9999,fontFamily:'var(--font-jetbrains-mono), monospace',whiteSpace:'nowrap',pointerEvents:'auto'}}>Source from <a href="https://itomdev.com" target="_blank" rel="noopener noreferrer" style={{color:'#999',textDecoration:'underline'}}>itomdev.com</a> — All rights reserved © {new Date().getFullYear()}</div>}
    <div className="journey-track" aria-hidden="true"><div ref={progressRef}/></div>
    <nav id="journey-navigation" className="journey-access" aria-label="Accessible room navigation" data-journey-ui tabIndex={-1}>
      {DOORS.map(door=><button key={door.room} onClick={()=>travel(door.room,room==='corridor'?{x:door.x,z:door.z}:undefined)}>{door.label}</button>)}
      <button onClick={()=>openDetails(room==='work'?'work':room==='contact'?'contact':'about')}>Read room details</button>
      {room==='work'&&PROJECTS.map((project,i)=><button key={project.id} onClick={()=>selectProject(i)}>Inspect {project.title}</button>)}
      {room==='contact'&&<><a href={`mailto:${PERSONAL.email}`}>Email Manvesh</a><a href={PERSONAL.github} target="_blank" rel="noreferrer">GitHub</a><button onClick={()=>contactAction('copy')}>Copy email</button></>}
    </nav>
    <div className={`journey-notice ${notice?'is-visible':''}`} role="status">{notice}</div>

    <dialog ref={dialogRef} className="room-dialog journey-detail" aria-labelledby="room-title" onCancel={event=>{event.preventDefault();closeDetails();}} onClick={event=>{if(event.target===event.currentTarget)closeDetails();}} data-journey-ui>
      <div className="room-sheet"><div className="room-toolbar"><button className="room-back" onClick={closeDetails}>← Back to {room==='work'?'the gallery':'exploring'}</button><button className="room-close" onClick={closeDetails} aria-label="Close details">×</button></div><div className="room-scroll" key={`${detail}-${projectIndex}`}>{detail&&<RoomContent room={detail} onNavigate={next=>{setDetail(null);travel(next);}} initialProjectIndex={projectIndex}/>}</div></div>
    </dialog>
  </main>;
}
