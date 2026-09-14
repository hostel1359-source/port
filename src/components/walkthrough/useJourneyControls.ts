'use client';

import { useEffect, useRef, type PointerEvent, type MouseEvent } from 'react';
import type { JourneyInput, WorldRoom } from './types';

const clamp=(value:number)=>Math.max(0,Math.min(1,value));
const isUI=(target:EventTarget|null)=>target instanceof Element && !!target.closest('[data-journey-ui],button,a,input,textarea,select,dialog,[contenteditable=true]');
const isEditable=(target:EventTarget|null)=>target instanceof Element && !!target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"])');

export default function useJourneyControls({room,input,blocked,motion}:{room:WorldRoom;input:JourneyInput;blocked:boolean;motion:boolean}) {
  const drag=useRef({active:false,x:0,y:0,distance:0});
  useEffect(()=>{
    const wheel=(event:WheelEvent)=>{
      if(blocked||room==='entrance'||isUI(event.target))return;
      event.preventDefault();
      const factor=room==='corridor'?.00022:room==='about'?.00025:room==='work'?.00065:room==='studio'?.0005:.00035;
      const delta=(Math.abs(event.deltaY)>Math.abs(event.deltaX)?event.deltaY:event.deltaX)*(event.deltaMode===1?20:event.deltaMode===2?window.innerHeight:1);
      input.current.progress=clamp(input.current.progress+delta*factor);
    };
    const key=(event:KeyboardEvent)=>{
      if(blocked||room==='entrance'||isEditable(event.target)||event.ctrlKey||event.metaKey||event.altKey)return;
      const step=room==='corridor'?.025:.045;
      if(['ArrowDown','w','W','PageDown'].includes(event.key)){event.preventDefault();input.current.progress=clamp(input.current.progress+step);}
      if(['ArrowUp','s','S','PageUp'].includes(event.key)){event.preventDefault();input.current.progress=clamp(input.current.progress-step);}
      if(event.key==='Home'){event.preventDefault();input.current.progress=0;}
      if(event.key==='End'){event.preventDefault();input.current.progress=1;}
      if(['ArrowLeft','ArrowRight','a','d','A','D'].includes(event.key)){
        event.preventDefault();const direction=['ArrowLeft','a','A'].includes(event.key)?-1:1;
        if(room==='work'||room==='studio')input.current.progress=clamp(input.current.progress+step*direction);
        else input.current.lookX=Math.max(-1.1,Math.min(1.1,input.current.lookX+direction*.16));
      }
    };
    const release=()=>{drag.current.active=false;};
    window.addEventListener('wheel',wheel,{passive:false});window.addEventListener('keydown',key);window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
    return()=>{window.removeEventListener('wheel',wheel);window.removeEventListener('keydown',key);window.removeEventListener('pointerup',release);window.removeEventListener('pointercancel',release);};
  },[room,input,blocked]);
  return {
    onPointerDown:(event:PointerEvent<HTMLDivElement>)=>{
      if(blocked||isUI(event.target)||event.button!==0)return;
      drag.current={active:true,x:event.clientX,y:event.clientY,distance:0};
    },
    onPointerMove:(event:PointerEvent<HTMLDivElement>)=>{
      if(blocked||isUI(event.target))return;
      if(drag.current.active && room!=='entrance'){
        const dx=event.clientX-drag.current.x,dy=event.clientY-drag.current.y;
        drag.current.x=event.clientX;drag.current.y=event.clientY;drag.current.distance+=Math.abs(dx)+Math.abs(dy);
        if(drag.current.distance<5)return;
        if(room==='work'||room==='studio')input.current.progress=clamp(input.current.progress-dx*.0015-dy*.0006);
        else {input.current.progress=clamp(input.current.progress-dy*.0008);input.current.lookX=Math.max(-1.1,Math.min(1.1,input.current.lookX-dx*.003));}
      }else if(motion&&event.pointerType!=='touch'){
        const rect=event.currentTarget.getBoundingClientRect();
        input.current.lookX=((event.clientX-rect.left)/rect.width-.5)*.42;
        input.current.lookY=((event.clientY-rect.top)/rect.height-.5)*.16;
      }
    },
    onPointerUp:()=>{drag.current.active=false;},
    onPointerLeave:()=>{drag.current.active=false;},
    onClickCapture:(event:MouseEvent<HTMLDivElement>)=>{if(!isUI(event.target)&&drag.current.distance>8){event.preventDefault();event.stopPropagation();drag.current.distance=0;}},
  };
}
