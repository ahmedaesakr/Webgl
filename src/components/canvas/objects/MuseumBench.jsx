export default function MuseumBench({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const seatW = 1.8
  const seatD = 0.5
  const seatH = 0.08
  const seatY = 0.45
  const legH = seatY - seatH / 2
  const legW = 0.06

  return (
    <group position={position} rotation={rotation}>
      {/* Seat */}
      <mesh position={[0, seatY, 0]} castShadow receiveShadow>
        <boxGeometry args={[seatW, seatH, seatD]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* 4 legs */}
      {[
        [-(seatW / 2 - 0.08), legH / 2, -(seatD / 2 - 0.08)],
        [(seatW / 2 - 0.08), legH / 2, -(seatD / 2 - 0.08)],
        [-(seatW / 2 - 0.08), legH / 2, (seatD / 2 - 0.08)],
        [(seatW / 2 - 0.08), legH / 2, (seatD / 2 - 0.08)],
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[legW, legH, legW]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.4} roughness={0.3} />
        </mesh>
      ))}

      {/* Cross support bar */}
      <mesh position={[0, legH * 0.4, 0]} castShadow>
        <boxGeometry args={[seatW - 0.2, 0.04, 0.04]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.4} roughness={0.3} />
      </mesh>
    </group>
  )
}
