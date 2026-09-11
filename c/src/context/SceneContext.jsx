import { createContext, useContext, useState, useCallback } from 'react'

const Ctx = createContext()

export function SceneProvider({ children }) {
  const [currentRoom, setCurrentRoom] = useState(null)
  const [hasEntered, setHasEntered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const enterRoom = useCallback((id) => {
    setIsTransitioning(true)
    setCurrentRoom(id)
    setTimeout(() => setIsTransitioning(false), 200)
  }, [])

  const exitRoom = useCallback(() => {
    setIsTransitioning(true)
    setCurrentRoom(null)
  }, [])

  const markEntered = useCallback(() => setHasEntered(true), [])

  return (
    <Ctx.Provider value={{ currentRoom, hasEntered, isTransitioning, setIsTransitioning, enterRoom, exitRoom, markEntered }}>
      {children}
    </Ctx.Provider>
  )
}

export function useScene() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useScene must be inside SceneProvider')
  return c
}
