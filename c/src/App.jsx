import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import * as THREE from 'three'
import { SceneProvider, useScene } from './context/SceneContext'
import Experience from './scene/Experience'
import Preloader from './ui/Preloader'
import NavigationUI from './ui/NavigationUI'
import RoomOverlay from './ui/RoomOverlay'

function AppContent() {
  const [loaded, setLoaded] = useState(false)
  const { currentRoom, hasEntered, markEntered } = useScene()

  const onLoadDone = () => {
    setLoaded(true)
    setTimeout(() => markEntered(), 400)
  }

  return (
    <>
      {!loaded && <Preloader onComplete={onLoadDone} />}

      <div style={{ position:'fixed', inset:0, zIndex:1 }}>
        <Canvas
          camera={{ position: [0, 0, 0], fov: 65, near: 0.1, far: 200 }}
          dpr={[1, 1.5]}
          style={{ width:'100%', height:'100%' }}
        >
          <Suspense fallback={null}>
            <Experience />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {hasEntered && !currentRoom && <NavigationUI />}
      {hasEntered && !currentRoom && (
        <div style={{
          position:'fixed', bottom:30, left:'50%', transform:'translateX(-50%)',
          fontFamily:'"Caveat",cursive', fontSize:'1.1rem', color:'#888', zIndex:20,
          animation:'bounce 2s infinite',
        }}>↓ scroll to explore ↓</div>
      )}
      {currentRoom && <RoomOverlay />}
    </>
  )
}

export default function App() {
  return (
    <SceneProvider>
      <AppContent />
    </SceneProvider>
  )
}
