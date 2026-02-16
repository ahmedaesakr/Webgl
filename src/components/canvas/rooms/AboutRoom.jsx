import RoomShell from './RoomBuilder'
import { DOOR_WIDTH } from '../objects/Door'
import { LOBBY } from './Lobby'
import MuseumSpotlight from '../objects/MuseumSpotlight'
import { Text, Html, Float } from '@react-three/drei'
import { personalInfo, bio, stats } from '@/data/portfolio'

const HALF_DOOR = DOOR_WIDTH / 2

export const ABOUT = {
  width: 8,
  depth: 8,
  height: 4,
  x: LOBBY.x - LOBBY.width / 2 - 8 / 2,
  z: 0,
}

const WEST_WALL_X = ABOUT.x - ABOUT.width / 2 + 0.16
const NORTH_WALL_Z = ABOUT.z - ABOUT.depth / 2 + 0.16
const SOUTH_WALL_Z = ABOUT.z + ABOUT.depth / 2 - 0.16

export default function AboutRoom() {
  return (
    <>
      <RoomShell
        width={ABOUT.width}
        depth={ABOUT.depth}
        height={ABOUT.height}
        position={[ABOUT.x, 0, ABOUT.z]}
        doorGaps={{
          east: [{ start: -HALF_DOOR, end: HALF_DOOR }],
        }}
      />

      {/* ── Portrait wall (west) ── */}
      {/* Name plaque */}
      <Text
        position={[WEST_WALL_X + 0.02, 2.8, ABOUT.z]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.28}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SpaceGrotesk-Bold.ttf"
      >
        {personalInfo.name}
        <meshStandardMaterial
          color="#ffffff"
          emissive="#6366f1"
          emissiveIntensity={0.25}
        />
      </Text>
      <Text
        position={[WEST_WALL_X + 0.02, 2.45, ABOUT.z]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.14}
        color="#a5b4fc"
        anchorX="center"
        anchorY="middle"
      >
        {personalInfo.role}
      </Text>

      {/* Portrait frame placeholder */}
      <mesh position={[WEST_WALL_X + 0.04, 1.8, ABOUT.z]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshStandardMaterial
          color="#1e1b4b"
          emissive="#6366f1"
          emissiveIntensity={0.08}
        />
      </mesh>
      {/* Frame border */}
      {[
        [0, 0.95, 0, 1.95, 0.06, 0.06],
        [0, -0.95, 0, 1.95, 0.06, 0.06],
        [-0.95, 0, 0, 0.06, 1.84, 0.06],
        [0.95, 0, 0, 0.06, 1.84, 0.06],
      ].map(([ox, oy, oz, w, h, d], i) => (
        <mesh
          key={`frame-${i}`}
          position={[WEST_WALL_X + 0.05, 1.8 + oy, ABOUT.z + ox]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#2a1810" metalness={0.7} roughness={0.35} />
        </mesh>
      ))}

      {/* ── Bio plaques (north & south walls) ── */}
      <Html
        position={[ABOUT.x, 2, NORTH_WALL_Z + 0.02]}
        rotation={[0, 0, 0]}
        distanceFactor={4}
        transform
      >
        <div style={{
          width: '240px',
          padding: '16px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '8px',
          color: '#e2e8f0',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '13px', color: '#a5b4fc', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Background</h3>
          <p style={{ margin: 0, fontSize: '11px', lineHeight: '1.5', color: '#94a3b8' }}>{bio.background}</p>
        </div>
      </Html>

      <Html
        position={[ABOUT.x, 2, SOUTH_WALL_Z - 0.02]}
        rotation={[0, Math.PI, 0]}
        distanceFactor={4}
        transform
      >
        <div style={{
          width: '240px',
          padding: '16px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '8px',
          color: '#e2e8f0',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '13px', color: '#a5b4fc', letterSpacing: '0.1em', textTransform: 'uppercase' }}>What I Do</h3>
          <p style={{ margin: 0, fontSize: '11px', lineHeight: '1.5', color: '#94a3b8' }}>{bio.whatIDo}</p>
        </div>
      </Html>

      {/* ── Stat pedestals ── */}
      {stats.map((stat, i) => {
        const x = ABOUT.x + (i - 1) * 2
        return (
          <group key={stat.label} position={[x, 0, ABOUT.z + 1.5]}>
            {/* Pedestal */}
            <mesh position={[0, 0.35, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.3, 0.7, 16]} />
              <meshStandardMaterial color="#e8e0d8" metalness={0.1} roughness={0.4} />
            </mesh>
            {/* Value */}
            <Text
              position={[0, 0.9, 0]}
              fontSize={0.22}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/SpaceGrotesk-Bold.ttf"
            >
              {stat.value}
              <meshStandardMaterial
                color="#ffffff"
                emissive="#6366f1"
                emissiveIntensity={0.3}
              />
            </Text>
            {/* Label */}
            <Text
              position={[0, 0.65, 0]}
              fontSize={0.09}
              color="#8892b0"
              anchorX="center"
              anchorY="middle"
            >
              {stat.label}
            </Text>
          </group>
        )
      })}

      {/* ── Decorative float ── */}
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[ABOUT.x + 2.5, 2.8, ABOUT.z - 2]}>
          <dodecahedronGeometry args={[0.2, 0]} />
          <meshPhysicalMaterial
            color="#a855f7"
            metalness={0.2}
            roughness={0.1}
            iridescence={1}
            iridescenceIOR={1.4}
          />
        </mesh>
      </Float>

      {/* ── Spotlights ── */}
      <MuseumSpotlight
        position={[ABOUT.x, 3.5, ABOUT.z]}
        target={[WEST_WALL_X + 0.1, 1.8, ABOUT.z]}
        color="#fff5e6"
        intensity={2}
        angle={0.4}
        penumbra={0.5}
        distance={8}
      />
      <MuseumSpotlight
        position={[ABOUT.x, 3.5, ABOUT.z + 1.5]}
        target={[ABOUT.x, 0.7, ABOUT.z + 1.5]}
        color="#e0e8ff"
        intensity={1}
        angle={0.5}
        penumbra={0.6}
        distance={6}
      />
      {/* Ambient fill */}
      <pointLight
        position={[ABOUT.x, 3, ABOUT.z]}
        color="#fff5e6"
        intensity={0.3}
        distance={10}
        decay={2}
      />
    </>
  )
}
