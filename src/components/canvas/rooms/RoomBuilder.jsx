import { useMemo } from 'react'

const WALL_THICKNESS = 0.3
const FLOOR_COLOR = '#121212'
const WALL_COLOR = '#1d1d1d'
const CEILING_COLOR = '#0d0d0d'

export { WALL_THICKNESS }

/**
 * Build a wall segment as a mesh.
 * `axis` is 'x' (wall runs along X) or 'z' (wall runs along Z).
 * `gaps` is an array of { start, end } in the wall's length axis, where door openings go.
 */
function WallWithGaps({ axis, length, height, fixedPos, gaps = [], wallThickness = WALL_THICKNESS, wallMaterialProps = {} }) {
  const segments = useMemo(() => {
    if (gaps.length === 0) return [{ start: -length / 2, end: length / 2 }]

    const sorted = [...gaps].sort((a, b) => a.start - b.start)
    const segs = []
    let cursor = -length / 2

    for (const gap of sorted) {
      if (gap.start > cursor) {
        segs.push({ start: cursor, end: gap.start })
      }
      cursor = gap.end
    }
    if (cursor < length / 2) {
      segs.push({ start: cursor, end: length / 2 })
    }

    return segs
  }, [length, gaps])

  return (
    <>
      {segments.map((seg, i) => {
        const segLen = seg.end - seg.start
        const segCenter = (seg.start + seg.end) / 2

        const pos =
          axis === 'x'
            ? [segCenter, height / 2, fixedPos]
            : [fixedPos, height / 2, segCenter]

        const args =
          axis === 'x'
            ? [segLen, height, wallThickness]
            : [wallThickness, height, segLen]

        return (
          <mesh key={i} position={pos} receiveShadow castShadow>
            <boxGeometry args={args} />
            <meshStandardMaterial
              color={WALL_COLOR}
              roughness={0.8}
              metalness={0.05}
              {...wallMaterialProps}
            />
          </mesh>
        )
      })}
    </>
  )
}

/**
 * Generic room shell: floor, ceiling, 4 walls with optional door gaps.
 * `doorGaps` = { north: [{start, end}], south: [...], east: [...], west: [...] }
 */
export default function RoomShell({
  width,
  depth,
  height,
  position = [0, 0, 0],
  doorGaps = {},
  floorColor = FLOOR_COLOR,
  ceilingColor = CEILING_COLOR,
  floorMaterialProps = {},
  wallMaterialProps = {},
}) {
  const hw = width / 2
  const hd = depth / 2

  return (
    <group position={position}>
      {/* Floor — physical material for clearcoat reflections */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshPhysicalMaterial
          color={floorColor}
          roughness={0.2}
          metalness={0.1}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
          reflectivity={0.5}
          envMapIntensity={0.3}
          {...floorMaterialProps}
        />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={ceilingColor} roughness={0.9} />
      </mesh>

      {/* North wall (far -Z) */}
      <WallWithGaps axis="x" length={width} height={height} fixedPos={-hd} gaps={doorGaps.north} wallMaterialProps={wallMaterialProps} />
      {/* South wall (near +Z) */}
      <WallWithGaps axis="x" length={width} height={height} fixedPos={hd} gaps={doorGaps.south} wallMaterialProps={wallMaterialProps} />
      {/* West wall (-X) */}
      <WallWithGaps axis="z" length={depth} height={height} fixedPos={-hw} gaps={doorGaps.west} wallMaterialProps={wallMaterialProps} />
      {/* East wall (+X) */}
      <WallWithGaps axis="z" length={depth} height={height} fixedPos={hw} gaps={doorGaps.east} wallMaterialProps={wallMaterialProps} />
    </group>
  )
}
