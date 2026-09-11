import { useState, useEffect } from 'react'

export default function Preloader({ onComplete }) {
  const [pct, setPct] = useState(0)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setPct(p => {
      if (p >= 100) { clearInterval(t); setTimeout(() => setHide(true), 300); setTimeout(() => onComplete?.(), 1000); return 100 }
      return p + 1
    }), 25)
    return () => clearInterval(t)
  }, [onComplete])

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:9999, display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      background:'#f0e8d8', opacity: hide ? 0 : 1, transition:'opacity 0.7s',
      pointerEvents: hide ? 'none' : 'auto',
    }}>
      <h1 style={{ fontFamily:'"Gloria Hallelujah",cursive', fontSize:'3.5rem', color:'#333', margin:'0 0 30px', letterSpacing:2 }}>MANVESH</h1>
      <div style={{ width:250, height:4, border:'1.5px solid #555', borderRadius:3, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:'#444', transition:'width 0.05s linear' }} />
      </div>
      <p style={{ fontFamily:'"Caveat",cursive', fontSize:'1.4rem', color:'#777', marginTop:15 }}>loading...</p>
    </div>
  )
}
