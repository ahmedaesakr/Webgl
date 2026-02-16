import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const COUNT = 500
const SPREAD_X = 30
const SPREAD_Y = 6
const SPREAD_Z = 60

export default function Particles() {
  const ref = useRef()

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const spd = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SPREAD_X
      pos[i * 3 + 1] = Math.random() * SPREAD_Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z
      spd[i] = 0.02 + Math.random() * 0.04
    }
    return { positions: pos, speeds: spd }
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const posArr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      posArr[i * 3 + 1] += speeds[i] * 0.016
      posArr[i * 3] += Math.sin(Date.now() * 0.001 + i) * 0.0003
      if (posArr[i * 3 + 1] > SPREAD_Y) {
        posArr[i * 3 + 1] = 0
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c8d6f0"
        size={0.008}
        sizeAttenuation
        transparent
        opacity={0.2}
        depthWrite={false}
      />
    </points>
  )
}
