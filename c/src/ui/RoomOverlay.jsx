import { useState } from 'react'
import { useScene } from '../context/SceneContext'
import { siteConfig } from '../config/siteConfig'

const F = '"Gloria Hallelujah",cursive'
const C = '"Caveat",cursive'
const I = '"Inter",sans-serif'

const bg = '#f0e8d8'
const ink = '#333'

export default function RoomOverlay() {
  const { currentRoom, exitRoom } = useScene()
  const [sent, setSent] = useState('')
  if (!currentRoom) return null

  const Wrap = ({ title, sub, children }) => (
    <div style={{ position:'fixed', inset:0, zIndex:200, background:bg, overflowY:'auto', color:ink }}>
      <button onClick={exitRoom} style={{ position:'fixed', top:25, right:35, fontFamily:C, fontSize:'1.4rem', background:'none', border:'none', cursor:'pointer', color:ink, zIndex:201 }}>← back to corridor</button>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'70px 40px 60px' }}>
        <h2 style={{ fontFamily:F, fontSize:'2.8rem', margin:'0 0 5px' }}>{title}</h2>
        <p style={{ fontFamily:C, fontSize:'1.5rem', color:'#777', margin:'0 0 35px' }}>{sub}</p>
        {children}
      </div>
    </div>
  )

  if (currentRoom === 'projects') {
    const p = siteConfig.projects || []
    return (
      <Wrap title="Projects" sub="things I've built">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:25 }}>
          {p.map(pr => (
            <div key={pr.title} style={{ background:'#fff', border:'1px solid #ccc', borderRadius:4, padding:22, transition:'box-shadow .2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow='3px 3px 0 rgba(0,0,0,.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow='none'}>
              <h3 style={{ fontFamily:F, fontSize:'1.4rem', marginTop:0 }}>{pr.title}</h3>
              <p style={{ fontFamily:I, fontSize:'.95rem', lineHeight:1.6, color:'#555' }}>{pr.desc}</p>
              <div style={{ marginTop:12, display:'flex', flexWrap:'wrap', gap:6 }}>
                {pr.tags.map(t => <span key={t} style={{ fontFamily:I, fontSize:'.75rem', padding:'3px 8px', border:'1px solid #ccc', borderRadius:10 }}>{t}</span>)}
              </div>
              <a href={pr.url} target="_blank" rel="noreferrer" style={{ display:'block', marginTop:16, color:ink, fontFamily:C, fontSize:'1.1rem' }}>View on GitHub →</a>
            </div>
          ))}
        </div>
      </Wrap>
    )
  }

  if (currentRoom === 'arsenal') {
    const sk = siteConfig.skills || {}
    const levels = [95, 92, 98, 88, 90, 99]
    return (
      <Wrap title="Arsenal" sub="skills & tools">
        <h3 style={{ fontFamily:F, fontSize:'1.6rem', borderBottom:'2px dashed #ccc', paddingBottom:8, marginTop:0 }}>Security Bypass</h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16, margin:'16px 0 35px' }}>
          {(sk.bypass||[]).map((n,i) => (
            <div key={n}>
              <span style={{ fontFamily:C, fontSize:'1.2rem' }}>{n}</span>
              <div style={{ height:6, border:'1px solid #555', borderRadius:3, overflow:'hidden', marginTop:4 }}>
                <div style={{ height:'100%', width:`${levels[i]||90}%`, background:'#555' }} />
              </div>
            </div>
          ))}
        </div>
        <h3 style={{ fontFamily:F, fontSize:'1.6rem', borderBottom:'2px dashed #ccc', paddingBottom:8 }}>Languages</h3>
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, margin:'16px 0 35px' }}>
          {(sk.languages||[]).map(l => <span key={l} style={{ fontFamily:C, fontSize:'1.2rem', padding:'4px 14px', border:'1px solid #555', borderRadius:16 }}>{l}</span>)}
        </div>
        <h3 style={{ fontFamily:F, fontSize:'1.6rem', borderBottom:'2px dashed #ccc', paddingBottom:8 }}>Tools</h3>
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginTop:16 }}>
          {(sk.tools||[]).map(t => <span key={t} style={{ fontFamily:C, fontSize:'1.2rem', padding:'4px 14px', border:'1px solid #555', borderRadius:16 }}>{t}</span>)}
        </div>
      </Wrap>
    )
  }

  if (currentRoom === 'about') {
    return (
      <Wrap title="About" sub="who am I">
        <div style={{ fontFamily:C, fontSize:'1.6rem', lineHeight:1.7, maxWidth:700, color:'#444' }}>
          <p>Hi, I'm MANVESH. I break antibot systems — Cloudflare, Akamai, DataDome, PerimeterX — I've studied them all and built tools to navigate around them.</p>
          <p>When I'm not bypassing security systems, I build developer tools, trading indicators, and privacy-first applications.</p>
        </div>
        <div style={{ marginTop:40, borderTop:'2px dashed #ccc', paddingTop:25 }}>
          <a href="https://github.com/mnvvshu" target="_blank" rel="noreferrer" style={{ fontFamily:F, fontSize:'1.3rem', color:ink, textDecoration:'none' }}>github.com/mnvvshu</a>
          <div style={{ fontFamily:I, fontSize:'.9rem', marginTop:12, color:'#777', display:'flex', gap:18 }}>
            <span>🚀 7+ repos</span><span>💻 Python / TypeScript / JavaScript</span>
          </div>
        </div>
      </Wrap>
    )
  }

  if (currentRoom === 'contact') {
    const onSubmit = (e) => { e.preventDefault(); setSent('sent!'); setTimeout(() => setSent(''), 3000) }
    const inp = { width:'100%', padding:10, marginBottom:16, border:'1px solid #555', borderRadius:3, background:'transparent', fontFamily:I, fontSize:'.95rem', boxSizing:'border-box' }
    return (
      <Wrap title="Contact" sub="get in touch">
        <form onSubmit={onSubmit} style={{ maxWidth:450, marginTop:20 }}>
          <input placeholder="name" required style={inp} />
          <input type="email" placeholder="email" required style={inp} />
          <textarea placeholder="message" rows={5} required style={{ ...inp, resize:'vertical' }} />
          <button type="submit" style={{ fontFamily:C, fontSize:'1.3rem', padding:'8px 25px', background:'transparent', border:'2px solid #555', borderRadius:6, cursor:'pointer' }}>Send Message</button>
          {sent && <span style={{ fontFamily:C, fontSize:'1.3rem', marginLeft:15, color:'green' }}>{sent}</span>}
        </form>
        <div style={{ marginTop:50, borderTop:'1px solid #ccc', paddingTop:18, display:'flex', justifyContent:'space-between', fontFamily:C, fontSize:'1.1rem' }}>
          <a href="https://github.com/mnvvshu" target="_blank" rel="noreferrer" style={{ color:ink }}>github.com/mnvvshu</a>
          <span>© 2026 MANVESH</span>
        </div>
      </Wrap>
    )
  }

  return null
}
