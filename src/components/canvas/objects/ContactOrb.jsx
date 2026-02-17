import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import { lerp } from '@/utils/helpers'

export default function ContactOrb({ position, label, color = '#8b5cf6', href }) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef()
  const scaleRef = useRef(1)

  useFrame(() => {
    scaleRef.current = lerp(scaleRef.current, hovered ? 1.3 : 1, 0.08)
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scaleRef.current)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
          onPointerOut={() => setHovered(false)}
          onClick={() => href && window.open(href, '_blank')}
        >
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.6 : 0.2}
            transmission={0.6}
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
        <pointLight color={color} intensity={0.5} distance={3} />
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.1}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  )
}
