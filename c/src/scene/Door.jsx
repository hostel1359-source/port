import { useRef, useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Edges, Text } from '@react-three/drei'
import { useScene } from '../context/SceneContext'
import gsap from 'gsap'
import * as THREE from 'three'

const W = 2.8
const YF = -1.2
const YC = 2.2
const MID = (YF + YC) / 2
const DS = THREE.DoubleSide

export default function Door({ roomId, label, z, side }) {
  const group = useRef()
  const panel = useRef()
  const { enterRoom, isTransitioning } = useScene()
  const { camera } = useThree()
  const [hover, setHover] = useState(false)

  const x = side === 'left' ? -W + 0.03 : W - 0.03
  const rotY = side === 'left' ? Math.PI / 2 : -Math.PI / 2
  const hinge = side === 'left' ? -0.8 : 0.8
  const handleX = side === 'left' ? 0.6 : -0.6

  useEffect(() => {
    document.body.style.cursor = hover ? 'pointer' : 'auto'
    return () => { document.body.style.cursor = 'auto' }
  }, [hover])

  const onOver = (e) => {
    e.stopPropagation()
    if (isTransitioning) return
    setHover(true)
    gsap.to(panel.current.rotation, { y: side === 'left' ? 0.12 : -0.12, duration: 0.3, ease: 'power2.out' })
  }
  const onOut = (e) => {
    e.stopPropagation()
    if (isTransitioning) return
    setHover(false)
    gsap.to(panel.current.rotation, { y: 0, duration: 0.3, ease: 'power2.out' })
  }
  const onClick = (e) => {
    e.stopPropagation()
    if (isTransitioning) return
    setHover(false)
    document.body.style.cursor = 'auto'

    gsap.to(panel.current.rotation, { y: side === 'left' ? Math.PI / 2 : -Math.PI / 2, duration: 0.7, ease: 'power2.inOut' })

    const wp = new THREE.Vector3()
    group.current.getWorldPosition(wp)

    gsap.to(camera.position, {
      x: side === 'left' ? -0.6 : 0.6,
      y: 0.1,
      z: wp.z,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => enterRoom(roomId)
    })
  }

  return (
    <group ref={group} position={[x, MID, z]} rotation={[0, rotY, 0]}>
      {/* Label */}
      <Text position={[0, 1.5, 0.02]} fontSize={0.2} color="#555"
        anchorX="center" anchorY="middle"
        font="https://fonts.gstatic.com/s/caveat/v17/Wnz6HAc5bAfYB2Q7Yj8Dxg.woff"
      >{label}</Text>

      {/* Door frame (dark rectangle behind door panel) */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.8, 2.6]} />
        <meshBasicMaterial color="#a09080" side={DS} />
        <Edges color="#555" />
      </mesh>

      {/* Door panel (the part that swings open) */}
      <group position={[hinge, 0, 0]} ref={panel}>
        <mesh position={[-hinge, 0, 0.01]}
          onPointerOver={onOver} onPointerOut={onOut} onClick={onClick}
        >
          <planeGeometry args={[1.6, 2.4]} />
          <meshBasicMaterial color={hover ? '#ddd5c5' : '#ccc4b4'} side={DS} />
          <Edges color="#666" />

          {/* Handle */}
          <mesh position={[handleX, -0.1, 0.03]}>
            <circleGeometry args={[0.04, 12]} />
            <meshBasicMaterial color="#666" />
          </mesh>

          {/* Decorative panels */}
          <mesh position={[0, 0.45, 0.003]}>
            <planeGeometry args={[1.2, 0.8]} />
            <meshBasicMaterial color="#c4bca8" side={DS} />
            <Edges color="#888" />
          </mesh>
          <mesh position={[0, -0.45, 0.003]}>
            <planeGeometry args={[1.2, 0.8]} />
            <meshBasicMaterial color="#c4bca8" side={DS} />
            <Edges color="#888" />
          </mesh>
        </mesh>
      </group>
    </group>
  )
}
