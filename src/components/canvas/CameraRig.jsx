import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import useMousePosition from '@/hooks/useMousePosition'
import useScrollProgress from '@/hooks/useScrollProgress'

export default function CameraRig() {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 5))
  const mouse = useMousePosition()
  const scroll = useScrollProgress()

  useFrame(() => {
    target.current.set(mouse.x * 0.25, mouse.y * 0.15, 5 - scroll * 2.5)
    camera.position.lerp(target.current, 0.04)
    camera.lookAt(0, 0, 0)
  })

  return null
}
