import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

const GEOMETRIES = ['sphere', 'box', 'tetrahedron']

export default function SkillOrbit({ color, count = 4, radius = 0.5, speed = 1 }) {
  const groupRef = useRef()

  const shapes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        type: GEOMETRIES[i % GEOMETRIES.length],
      })),
    [count]
  )

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed
    }
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => {
        const angle = (i / count) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = i % 2 === 0 ? 0.1 : -0.1

        return (
          <mesh key={i} position={[x, y, z]} scale={0.8}>
            {shape.type === 'sphere' && <sphereGeometry args={[0.04, 16, 16]} />}
            {shape.type === 'box' && <boxGeometry args={[0.05, 0.05, 0.05]} />}
            {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[0.04, 0]} />}
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}
