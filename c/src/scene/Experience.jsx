/*
 * Experience.jsx — Main 3D scene
 * 
 * Uses meshBasicMaterial ONLY (no lighting dependency = guaranteed visible).
 * This is intentional: meshBasicMaterial renders flat colors regardless of lights,
 * giving a 2D sketch-on-paper feel (like itomdev.com's hand-drawn aesthetic).
 */
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useScene } from '../context/SceneContext'
import useCorridorCamera from '../hooks/useCorridorCamera'
import Corridor from './Corridor'
import HeroText from './HeroText'
import gsap from 'gsap'

export default function Experience() {
  const { currentRoom, isTransitioning, setIsTransitioning } = useScene()
  const { camera } = useThree()
  const { setScrollEnabled, setCameraOverride } = useCorridorCamera({ startZ: 0 })

  useEffect(() => {
    if (currentRoom) {
      setScrollEnabled(false)
      setTimeout(() => setIsTransitioning(false), 100)
    } else if (!currentRoom && !isTransitioning) {
      setScrollEnabled(true)
    }
  }, [currentRoom, isTransitioning])

  useEffect(() => {
    if (!currentRoom && isTransitioning) {
      setCameraOverride(true)
      gsap.to(camera.position, {
        x: 0, y: 0, duration: 1,
        ease: 'power3.inOut',
        onComplete: () => { setCameraOverride(false); setIsTransitioning(false); setScrollEnabled(true) }
      })
    }
  }, [currentRoom, isTransitioning])

  return (
    <>
      {/* Paper-white background */}
      <color attach="background" args={['#faf8f3']} />
      
      {/* Gentle fog for depth fade — same color as background */}
      <fog attach="fog" args={['#faf8f3', 25, 55]} />

      {/* Minimal ambient light — meshBasicMaterial ignores this, but Text needs it */}
      <ambientLight intensity={0.5} />

      <Corridor />
      <HeroText />
    </>
  )
}
