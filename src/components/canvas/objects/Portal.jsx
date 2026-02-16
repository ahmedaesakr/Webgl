import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import portalVertexShader from '@/shaders/portal.vert.glsl?raw'
import portalFragmentShader from '@/shaders/portal.frag.glsl?raw'

export default function Portal({ position = [0, 0, 0], colorA = '#8b5cf6', colorB = '#6366f1', radius = 1.5 }) {
  const materialRef = useRef()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
  }), [colorA, colorB])

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta
    }
  })

  return (
    <group position={position}>
      {/* Outer torus ring */}
      <mesh>
        <torusGeometry args={[radius, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>

      {/* Inner swirling surface */}
      <mesh>
        <circleGeometry args={[radius - 0.06, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={portalVertexShader}
          fragmentShader={portalFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
