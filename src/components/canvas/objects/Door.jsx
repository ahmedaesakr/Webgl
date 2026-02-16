import { useMemo } from 'react'

const DOOR_WIDTH = 2.5
const DOOR_HEIGHT = 3
const FRAME_THICKNESS = 0.15
const FRAME_DEPTH = 0.4

export { DOOR_WIDTH, DOOR_HEIGHT }

export default function Door({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const frameMaterial = useMemo(
    () => ({
      color: '#1a1a2e',
      metalness: 0.6,
      roughness: 0.35,
      emissive: '#6366f1',
      emissiveIntensity: 0.15,
    }),
    [],
  )

  const halfDoor = DOOR_WIDTH / 2
  const sideHeight = DOOR_HEIGHT
  const lintelY = DOOR_HEIGHT - FRAME_THICKNESS / 2

  return (
    <group position={position} rotation={rotation}>
      {/* Left pillar */}
      <mesh position={[-halfDoor - FRAME_THICKNESS / 2, sideHeight / 2, 0]}>
        <boxGeometry args={[FRAME_THICKNESS, sideHeight, FRAME_DEPTH]} />
        <meshStandardMaterial {...frameMaterial} />
      </mesh>

      {/* Right pillar */}
      <mesh position={[halfDoor + FRAME_THICKNESS / 2, sideHeight / 2, 0]}>
        <boxGeometry args={[FRAME_THICKNESS, sideHeight, FRAME_DEPTH]} />
        <meshStandardMaterial {...frameMaterial} />
      </mesh>

      {/* Top lintel */}
      <mesh position={[0, lintelY, 0]}>
        <boxGeometry args={[DOOR_WIDTH + FRAME_THICKNESS * 2, FRAME_THICKNESS, FRAME_DEPTH]} />
        <meshStandardMaterial {...frameMaterial} />
      </mesh>

      {/* Navigation light */}
      <pointLight
        position={[0, DOOR_HEIGHT - 0.5, 0]}
        color="#6366f1"
        intensity={0.5}
        distance={6}
        decay={2}
      />
    </group>
  )
}
