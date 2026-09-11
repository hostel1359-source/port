import { useRef, useEffect } from 'react'
import { Text } from '@react-three/drei'
import gsap from 'gsap'
import { useScene } from '../context/SceneContext'

export default function HeroText() {
  const g = useRef()
  const { hasEntered } = useScene()

  useEffect(() => {
    if (hasEntered && g.current) {
      g.current.scale.set(0.4, 0.4, 0.4)
      gsap.to(g.current.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: 'elastic.out(1,0.5)', delay: 0.3 })
    }
  }, [hasEntered])

  return (
    <group ref={g} position={[0, 0.3, -3]}>
      <Text
        position={[0, 0.5, 0]} fontSize={1.2} color="#2a2a2a"
        anchorX="center" anchorY="middle"
        font="https://fonts.gstatic.com/s/gloriahallelujah/v12/LYjYdHv3kUk9BMV96EIswT9DIbW-MLSy3TKEvkCF.woff2"
      >MANVESH</Text>
      <Text
        position={[0, -0.3, 0]} fontSize={0.32} color="#666"
        anchorX="center" anchorY="middle"
        font="https://fonts.gstatic.com/s/caveat/v17/Wnz6HAc5bAfYB2Q7Yj8Dxg.woff"
      >{'< security researcher />'}</Text>
    </group>
  )
}
