import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const visited = new Set()

export default function useRoomEntrance(roomName, duration = 1.5) {
  const progressRef = useRef(visited.has(roomName) ? 1 : 0)

  useFrame((_, delta) => {
    if (progressRef.current < 1) {
      progressRef.current = Math.min(1, progressRef.current + delta / duration)
    }
  })

  if (!visited.has(roomName)) {
    visited.add(roomName)
  }

  return progressRef
}
