import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const PARTICLE_COUNT = 2000

export default function Particles() {
  const pointsRef = useRef(null)

  const positions = useMemo(() => {
    const data = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const i3 = i * 3
      data[i3] = (Math.random() - 0.5) * 24
      data[i3 + 1] = (Math.random() - 0.5) * 24
      data[i3 + 2] = (Math.random() - 0.5) * 24
    }

    return data
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) {
      return
    }

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#9fb6ff"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  )
}
