import { useMemo } from 'react'
import * as THREE from 'three'

function Stanchion({ position }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.025, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.05, 16]} />
        <meshStandardMaterial color="#c8a000" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Post */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.03, 1.0, 8]} />
        <meshStandardMaterial color="#c8a000" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 1.06, 0]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  )
}

export default function RopeBarrier({ start = [0, 0, 0], end = [2, 0, 0] }) {
  const ropeGeometry = useMemo(() => {
    const s = new THREE.Vector3(...start)
    const e = new THREE.Vector3(...end)
    const mid = new THREE.Vector3().lerpVectors(s, e, 0.5)
    mid.y = 0.75 // Rope sag

    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(s.x, 0.95, s.z),
      new THREE.Vector3(mid.x, mid.y, mid.z),
      new THREE.Vector3(e.x, 0.95, e.z)
    )

    return new THREE.TubeGeometry(curve, 20, 0.012, 6, false)
  }, [start, end])

  return (
    <group>
      <Stanchion position={start} />
      <Stanchion position={end} />
      {/* Rope */}
      <mesh geometry={ropeGeometry} castShadow>
        <meshStandardMaterial color="#8b0000" roughness={0.7} metalness={0.05} />
      </mesh>
    </group>
  )
}
