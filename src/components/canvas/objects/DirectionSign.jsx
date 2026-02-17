import { Text, Float } from '@react-three/drei'

export default function DirectionSign({ position, label, rotation = [0, 0, 0], color = '#6366f1' }) {
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={position} rotation={rotation}>
        {/* Sign plate */}
        <mesh>
          <boxGeometry args={[1.4, 0.4, 0.05]} />
          <meshPhysicalMaterial
            color="#0f172a"
            metalness={0.1}
            roughness={0.3}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Arrow */}
        <mesh position={[0.85, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.1, 0.2, 3]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
        {/* Label */}
        <Text
          position={[0, 0, 0.03]}
          fontSize={0.14}
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
