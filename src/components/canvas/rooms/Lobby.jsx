import RoomShell from './RoomBuilder'
import { DOOR_WIDTH } from '../objects/Door'
import MuseumSpotlight from '../objects/MuseumSpotlight'
import { Text, Float } from '@react-three/drei'
import { personalInfo } from '@/data/portfolio'

const HALF_DOOR = DOOR_WIDTH / 2

export const LOBBY = { width: 14, depth: 14, height: 4, x: 0, z: 0 }

export default function Lobby() {
  return (
    <>
      <RoomShell
        width={LOBBY.width}
        depth={LOBBY.depth}
        height={LOBBY.height}
        position={[LOBBY.x, 0, LOBBY.z]}
        doorGaps={{
          north: [{ start: -HALF_DOOR, end: HALF_DOOR }],
          east: [{ start: -HALF_DOOR, end: HALF_DOOR }],
          west: [{ start: -HALF_DOOR, end: HALF_DOOR }],
        }}
      />

      {/* ── Welcome text ── */}
      <Text
        position={[0, 2.4, 0]}
        fontSize={0.55}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SpaceGrotesk-Bold.ttf"
      >
        {personalInfo.name}
        <meshStandardMaterial
          color="#ffffff"
          emissive="#6366f1"
          emissiveIntensity={0.3}
        />
      </Text>
      <Text
        position={[0, 1.85, 0]}
        fontSize={0.2}
        color="#a5b4fc"
        anchorX="center"
        anchorY="middle"
      >
        {personalInfo.role}
      </Text>
      <Text
        position={[0, 1.55, 0]}
        fontSize={0.12}
        color="#8892b0"
        anchorX="center"
        anchorY="middle"
      >
        Explore the museum to discover my work
      </Text>

      {/* ── Decorative floating shapes ── */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[-3, 2.5, -2]}>
          <icosahedronGeometry args={[0.35, 0]} />
          <meshPhysicalMaterial
            color="#6366f1"
            metalness={0.2}
            roughness={0.1}
            iridescence={1}
            iridescenceIOR={1.3}
          />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[3.5, 2.2, -1.5]}>
          <torusKnotGeometry args={[0.25, 0.08, 64, 16]} />
          <meshPhysicalMaterial
            color="#a855f7"
            metalness={0.3}
            roughness={0.1}
            iridescence={1}
            iridescenceIOR={1.5}
          />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh position={[-2.5, 1.8, 2]}>
          <octahedronGeometry args={[0.25, 0]} />
          <meshPhysicalMaterial
            color="#06b6d4"
            metalness={0.2}
            roughness={0.15}
            iridescence={1}
            iridescenceIOR={1.4}
          />
        </mesh>
      </Float>

      {/* ── Floor emblem ring ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[1.8, 2.2, 64]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.15}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* ── Spotlights ── */}
      <MuseumSpotlight
        position={[2, 3.8, 1]}
        target={[0, 0, 0]}
        color="#fff5e6"
        intensity={2}
        angle={0.5}
        penumbra={0.6}
      />
      <MuseumSpotlight
        position={[-2, 3.8, -1]}
        target={[0, 0, 0]}
        color="#fff5e6"
        intensity={2}
        angle={0.5}
        penumbra={0.6}
      />
      <MuseumSpotlight
        position={[0, 3.8, -3]}
        target={[0, 1.5, 0]}
        color="#fff5e6"
        intensity={1.5}
        angle={0.35}
        penumbra={0.4}
        distance={8}
      />
    </>
  )
}
