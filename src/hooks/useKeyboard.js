import { useEffect, useRef } from 'react'

const initialState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  interact: false,
  run: false,
}

export default function useKeyboard() {
  const keysRef = useRef({ ...initialState })

  useEffect(() => {
    const onKeyDown = (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          keysRef.current.forward = true
          break
        case 'KeyS':
        case 'ArrowDown':
          keysRef.current.backward = true
          break
        case 'KeyA':
        case 'ArrowLeft':
          keysRef.current.left = true
          break
        case 'KeyD':
        case 'ArrowRight':
          keysRef.current.right = true
          break
        case 'KeyE':
          keysRef.current.interact = true
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          keysRef.current.run = true
          break
        default:
          break
      }
    }

    const onKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          keysRef.current.forward = false
          break
        case 'KeyS':
        case 'ArrowDown':
          keysRef.current.backward = false
          break
        case 'KeyA':
        case 'ArrowLeft':
          keysRef.current.left = false
          break
        case 'KeyD':
        case 'ArrowRight':
          keysRef.current.right = false
          break
        case 'KeyE':
          keysRef.current.interact = false
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          keysRef.current.run = false
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return keysRef
}
