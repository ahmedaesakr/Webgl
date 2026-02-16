import { Float, Icosahedron } from '@react-three/drei'

export default function HeroScene() {
  return (
    <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.4}>
      <Icosahedron args={[1, 1]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#6366f1"
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.9}
          emissive="#111122"
        />
      </Icosahedron>
    </Float>
  )
}
