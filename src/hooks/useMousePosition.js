import { useEffect, useState } from 'react'

function toNormalizedMouse(event) {
  const x = (event.clientX / window.innerWidth) * 2 - 1
  const y = -((event.clientY / window.innerHeight) * 2 - 1)

  return { x, y }
}

export default function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => setMouse(toNormalizedMouse(event))

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return mouse
}
