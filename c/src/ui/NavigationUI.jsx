import { useState } from 'react'

const items = [
  { id:'projects', label:'Projects' },
  { id:'arsenal', label:'Arsenal' },
  { id:'about', label:'About' },
  { id:'contact', label:'Contact' },
]

export default function NavigationUI() {
  const [hover, setHover] = useState(null)

  return (
    <div style={{ position:'fixed', right:30, top:'50%', transform:'translateY(-50%)', zIndex:20, display:'flex', flexDirection:'column', gap:18 }}>
      {items.map(i => (
        <div key={i.id} style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', cursor:'pointer', position:'relative' }}
          onMouseEnter={() => setHover(i.id)} onMouseLeave={() => setHover(null)}>
          <span style={{
            position:'absolute', right:22, fontFamily:'"Caveat",cursive', fontSize:'1rem', color:'#444',
            opacity: hover===i.id?1:0, transform: hover===i.id?'translateX(0)':'translateX(8px)',
            transition:'all 0.25s', whiteSpace:'nowrap', pointerEvents:'none',
          }}>{i.label}</span>
          <div style={{
            width:10, height:10, borderRadius:'50%', border:'2px solid #555',
            background: hover===i.id ? '#555' : 'transparent', transition:'all 0.25s',
          }} />
        </div>
      ))}
    </div>
  )
}
