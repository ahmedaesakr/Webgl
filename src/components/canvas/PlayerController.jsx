import { Html } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import useKeyboard from '@/hooks/useKeyboard'
import usePlayerMovement from '@/hooks/usePlayerMovement'

export default function PlayerController({ onPointerLockChange, onRoomChange }) {
  const { camera, gl } = useThree()
  const keysRef = useKeyboard()
  const mouseDeltaRef = useRef({ x: 0, y: 0 })
  const [isLocked, setIsLocked] = useState(false)

  usePlayerMovement({
    camera,
    keysRef,
    mouseDeltaRef,
    isLocked,
    onRoomChange,
  })

  useEffect(() => {
    const handleReset = () => {
      camera.position.set(0, 1.6, 5)
      camera.rotation.set(0, 0, 0)
    }
    window.addEventListener('resetPlayerPosition', handleReset)
    return () => window.removeEventListener('resetPlayerPosition', handleReset)
  }, [camera])

  // E-key interaction: simulate a click on the canvas so R3F raycasts from crosshair
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === 'KeyE' && isLocked) {
        const rect = gl.domElement.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        gl.domElement.dispatchEvent(new PointerEvent('pointerdown', {
          clientX: cx, clientY: cy, bubbles: true,
        }))
        gl.domElement.dispatchEvent(new PointerEvent('pointerup', {
          clientX: cx, clientY: cy, bubbles: true,
        }))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [gl.domElement, isLocked])

  useEffect(() => {
    const onPointerLockChangeInternal = () => {
      const locked = document.pointerLockElement === document.body
      setIsLocked(locked)
      onPointerLockChange?.(locked)
    }

    const onMouseMove = (event) => {
      if (!isLocked) {
        return
      }

      mouseDeltaRef.current.x += event.movementX
      mouseDeltaRef.current.y += event.movementY
    }

    const requestLock = () => {
      if (document.pointerLockElement !== document.body) {
        document.body.requestPointerLock()
      }
    }

    document.addEventListener('pointerlockchange', onPointerLockChangeInternal)
    document.addEventListener('mousemove', onMouseMove)
    gl.domElement.addEventListener('click', requestLock)

    return () => {
      document.removeEventListener('pointerlockchange', onPointerLockChangeInternal)
      document.removeEventListener('mousemove', onMouseMove)
      gl.domElement.removeEventListener('click', requestLock)
    }
  }, [gl.domElement, isLocked, onPointerLockChange])

  if (isLocked) {
    return null
  }

  return (
    <Html center>
      <div className="click-enter glass-card">Click to enter museum</div>
    </Html>
  )
}
