import { useMemo } from 'react'

const BORDER_THICKNESS = 0.02
const BORDER_DEPTH = 0.025
const PANEL_RECESS = 0.01

export default function WallPanel({ position, rotation, width = 2.6, height = 1.6 }) {
  const hw = width / 2
  const hh = height / 2

  const borders = useMemo(() => [
    // Top
    { pos: [0, hh, BORDER_DEPTH / 2], args: [width + BORDER_THICKNESS, BORDER_THICKNESS, BORDER_DEPTH] },
    // Bottom
    { pos: [0, -hh, BORDER_DEPTH / 2], args: [width + BORDER_THICKNESS, BORDER_THICKNESS, BORDER_DEPTH] },
    // Left
    { pos: [-hw, 0, BORDER_DEPTH / 2], args: [BORDER_THICKNESS, height, BORDER_DEPTH] },
    // Right
    { pos: [hw, 0, BORDER_DEPTH / 2], args: [BORDER_THICKNESS, height, BORDER_DEPTH] },
  ], [hw, hh, width, height])

  return (
    <group position={position} rotation={rotation}>
      {/* Recessed panel face */}
      <mesh position={[0, 0, -PANEL_RECESS]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color="#1a1a24"
          roughness={0.75}
          metalness={0.08}
        />
      </mesh>

      {/* Raised border molding */}
      {borders.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <boxGeometry args={b.args} />
          <meshStandardMaterial
            color="#252530"
            roughness={0.5}
            metalness={0.15}
          />
        </mesh>
      ))}
    </group>
  )
}
