import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import { lerp } from '@/utils/helpers'
import SkillOrbit from './SkillOrbit'

const BASE_RADIUS = 0.35
const BASE_HEIGHT = 0.8

export default function Pedestal({ skill, position, onHover }) {
  const [hovered, setHovered] = useState(false)
  const orbRef = useRef()
  const glowRef = useRef(0)

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    onHover?.(skill.name)
  }

  const handlePointerOut = () => {
    setHovered(false)
    onHover?.(null)
  }

  const orbSize = 0.15 + (skill.level / 100) * 0.2

  useFrame(() => {
    const target = hovered ? 0.6 : 0.15
    glowRef.current = lerp(glowRef.current, target, 0.08)
    if (orbRef.current) {
      orbRef.current.emissiveIntensity = glowRef.current
    }
  })

  return (
    <group position={position}>
      {/* Marble base */}
      <mesh position={[0, BASE_HEIGHT / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[BASE_RADIUS, BASE_RADIUS * 1.15, BASE_HEIGHT, 16]} />
        <meshStandardMaterial
          color="#e8e0d8"
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, BASE_HEIGHT + 0.02, 0]}>
        <cylinderGeometry args={[BASE_RADIUS * 1.05, BASE_RADIUS * 1.05, 0.04, 16]} />
        <meshStandardMaterial
          color="#d0c8c0"
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>

      {/* Floating glass orb */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh
          position={[0, BASE_HEIGHT + 0.5, 0]}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[orbSize, 32, 32]} />
          <meshPhysicalMaterial
            ref={orbRef}
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={0.15}
            metalness={0.1}
            roughness={0.05}
            transmission={0.6}
            thickness={0.5}
            ior={1.5}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* Orbiting mini shapes */}
      <group position={[0, BASE_HEIGHT + 0.5, 0]}>
        <SkillOrbit color={skill.color} count={4} radius={0.5} speed={0.8 + skill.level / 100} />
      </group>

      {/* Point light from below orb */}
      <pointLight
        position={[0, BASE_HEIGHT + 0.3, 0]}
        color={skill.color}
        intensity={hovered ? 0.8 : 0.2}
        distance={3}
        decay={2}
      />

      {/* Skill name */}
      <Text
        position={[0, -0.15, BASE_RADIUS + 0.15]}
        fontSize={0.12}
        color="#d7e8ff"
        anchorX="center"
        anchorY="top"
      >
        {skill.name}
      </Text>

      {/* Level indicator */}
      <Text
        position={[0, -0.32, BASE_RADIUS + 0.15]}
        fontSize={0.08}
        color="#8892b0"
        anchorX="center"
        anchorY="top"
      >
        {`${skill.level}%`}
      </Text>
    </group>
  )
}
