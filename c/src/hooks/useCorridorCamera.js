import { useEffect, useRef, useCallback } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function useCorridorCamera({ startZ = 0 } = {}) {
  const { camera } = useThree()
  const scrollOn = useRef(true)
  const override = useRef(false)
  const targetZ = useRef(startZ)
  const curZ = useRef(startZ)
  const mouse = useRef({ x: 0, y: 0 })
  const inited = useRef(false)

  useEffect(() => {
    if (!inited.current) {
      camera.position.set(0, 0, startZ)
      inited.current = true
    }
  }, [camera, startZ])

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const onWheel = (e) => {
      if (!scrollOn.current || override.current) return
      e.preventDefault()
      targetZ.current -= e.deltaY * 0.04
    }
    let ty = 0
    const onTS = (e) => { ty = e.touches[0].clientY }
    const onTM = (e) => {
      if (!scrollOn.current || override.current) return
      targetZ.current -= (ty - e.touches[0].clientY) * 0.02
      ty = e.touches[0].clientY
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTS, { passive: true })
    window.addEventListener('touchmove', onTM, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTS)
      window.removeEventListener('touchmove', onTM)
    }
  }, [])

  useFrame(() => {
    if (override.current) return
    const s = 0.07
    curZ.current = THREE.MathUtils.lerp(curZ.current, targetZ.current, s)
    const px = mouse.current.x * 0.2
    const py = mouse.current.y * 0.1
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, px, s)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, py, s)
    camera.position.z = curZ.current
    camera.lookAt(camera.position.x * 0.3, 0, curZ.current - 10)
  })

  const setScrollEnabled = useCallback((v) => { scrollOn.current = v }, [])
  const setCameraOverride = useCallback((v) => {
    override.current = v
    if (!v) { targetZ.current = camera.position.z; curZ.current = camera.position.z }
  }, [camera])

  return { setScrollEnabled, setCameraOverride }
}
